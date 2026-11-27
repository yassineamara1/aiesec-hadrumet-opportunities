import { useEffect, useState } from 'react'
import snapshot from '../data/opportunities.json'
import { productKey } from '../data/products.js'

const SHEET_ID = '1e_v-XLlZhVp9G3r-vJFq0LgJoGlJaYQjr32CzgVt-Gc'
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&gid=0`

/** Minimal RFC 4180 CSV parser (handles quotes, escaped quotes and newlines in fields). */
function parseCSV(text) {
  const rows = []
  let row = []
  let field = ''
  let quoted = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++ }
      else if (c === '"') quoted = false
      else field += c
    } else if (c === '"') quoted = true
    else if (c === ',') { row.push(field); field = '' }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++
      row.push(field); rows.push(row); row = []; field = ''
    } else field += c
  }
  if (field || row.length) { row.push(field); rows.push(row) }
  return rows
}

/** "18/09/2026" -> "2026-09-18"; ISO strings pass through. */
function toISODate(value = '') {
  const v = value.trim()
  const m = v.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)
  if (m) return `${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}`
  return /^\d{4}-\d{2}-\d{2}/.test(v) ? v.slice(0, 10) : null
}

/** "$600" -> 600, "Not specified" / "" -> null */
function toSalary(value) {
  if (typeof value === 'number') return value
  const digits = String(value ?? '').replace(/[^\d.]/g, '')
  return digits ? Number(digits) : null
}

/** "Fingerprint [4 weeks]" -> { title: "Fingerprint", length: "4 weeks" } */
function splitTitle(raw = '') {
  const m = raw.match(/^(.*?)\s*\[([^\]]+)\]\s*$/)
  return m ? { title: m[1].trim(), length: m[2].trim() } : { title: raw.trim(), length: null }
}

function normalise(r) {
  const key = productKey(r.product)
  if (!key) return null
  const { title, length } = splitTitle(r.title)
  return {
    id: Number(r.id) || r.id,
    product: key,
    title,
    length,
    organisation: (r.organisation || '').trim(),
    duration: (r.duration || '').trim(),
    created: toISODate(r.created),
    openings: Number(r.openings) || 0,
    salary: toSalary(r.salary),
  }
}

function fromCSV(text) {
  const [header, ...rows] = parseCSV(text)
  const cols = header.map((h) => h.trim().toLowerCase())
  const idx = (name) => cols.indexOf(name)
  return rows
    .filter((r) => r[idx('id')]?.trim() && r[idx('title')]?.trim())
    .map((r) =>
      normalise({
        id: r[idx('id')],
        product: r[idx('product')],
        title: r[idx('title')],
        organisation: r[idx('organisation')],
        duration: r[idx('duration')],
        created: r[idx('created')],
        openings: r[idx('openings')],
        salary: r[idx('salary')],
      }),
    )
    .filter(Boolean)
}

const fallback = () => snapshot.map(normalise).filter(Boolean)

/**
 * Loads opportunities live from the Google Sheet, falling back to the
 * bundled snapshot if the request fails or times out.
 * status: 'loading' | 'live' | 'fallback'
 */
export function useOpportunities() {
  const [state, setState] = useState({ status: 'loading', data: [] })

  useEffect(() => {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 8000)
    let cancelled = false

    fetch(CSV_URL, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.text()
      })
      .then((text) => {
        const data = fromCSV(text)
        if (!data.length) throw new Error('Empty sheet')
        if (!cancelled) setState({ status: 'live', data })
      })
      .catch(() => {
        // Network error, bad response or timeout: use the bundled snapshot.
        if (!cancelled) setState({ status: 'fallback', data: fallback() })
      })
      .finally(() => clearTimeout(timer))

    return () => {
      cancelled = true
      clearTimeout(timer)
      controller.abort()
    }
  }, [])

  return state
}

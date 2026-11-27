import { useEffect, useState } from 'react'
import Filters, { SORTS } from './Filters.jsx'
import OpportunityCard, { CardSkeleton, formatDate } from './OpportunityCard.jsx'
import Reveal from './Reveal.jsx'
import { PRODUCTS } from '../data/products.js'
import { Refresh, Search, Sliders, X } from './Icons.jsx'

function ActivePills({ filters, update }) {
  const pills = [
    ...filters.products.map((k) => ({ key: k, label: PRODUCTS[k].name, clear: () => update({ products: filters.products.filter((p) => p !== k) }) })),
    filters.query && { key: 'q', label: `“${filters.query}”`, clear: () => update({ query: '' }) },
    filters.paidOnly && { key: 'paid', label: 'Paid only', clear: () => update({ paidOnly: false }) },
    filters.minSalary > 0 && { key: 'min', label: `From $${filters.minSalary}`, clear: () => update({ minSalary: 0 }) },
    filters.from && { key: 'from', label: `After ${formatDate(filters.from)}`, clear: () => update({ from: '' }) },
    filters.to && { key: 'to', label: `Before ${formatDate(filters.to)}`, clear: () => update({ to: '' }) },
  ].filter(Boolean)

  if (!pills.length) return null
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Active filters">
      {pills.map((p) => (
        <li key={p.key}>
          <button
            type="button"
            onClick={p.clear}
            className="group inline-flex items-center gap-1.5 rounded-full bg-aiesec-dark px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-aiesec-blue"
            aria-label={`Remove filter ${p.label}`}
          >
            {p.label}
            <X className="size-3.5 opacity-60 group-hover:opacity-100" />
          </button>
        </li>
      ))}
    </ul>
  )
}

export default function Opportunities({ status, filters, update, reset, results, bounds, counts, activeCount }) {
  const [drawer, setDrawer] = useState(false)
  const loading = status === 'loading'

  useEffect(() => {
    document.body.style.overflow = drawer ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setDrawer(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [drawer])

  return (
    <section id="opportunities" className="bg-aiesec-light/70 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-aiesec-blue">Open opportunities</p>
            <h2 className="mt-4 text-4xl font-black leading-tight tracking-tight text-aiesec-dark sm:text-5xl">Find your experience in Sousse</h2>
          </div>
          <p className="inline-flex items-center gap-2 self-start rounded-full bg-white px-4 py-2 text-xs font-bold text-slate-500 shadow-sm ring-1 ring-slate-900/5 md:self-auto">
            {loading ? (
              <><span className="size-2 animate-pulse rounded-full bg-slate-300" /> Loading from Google Sheets…</>
            ) : status === 'live' ? (
              <><span className="size-2 rounded-full bg-emerald-500" /> Live from our Google Sheet</>
            ) : (
              <><span className="size-2 rounded-full bg-amber-400" /> Showing saved data (sheet unavailable)</>
            )}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[300px_1fr]">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block" aria-label="Filters">
            <div className="sticky top-24 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-black text-aiesec-dark">Filters</h3>
                <button
                  type="button"
                  onClick={reset}
                  disabled={!activeCount}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-aiesec-blue transition-opacity hover:underline disabled:opacity-30 disabled:no-underline"
                >
                  <Refresh className="size-4" /> Reset
                </button>
              </div>
              <Filters filters={filters} update={update} bounds={bounds} counts={counts} />
            </div>
          </aside>

          <div>
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white p-3 pl-5 shadow-sm ring-1 ring-slate-900/5">
              <p className="text-sm text-slate-500" aria-live="polite">
                <span className="text-lg font-black text-aiesec-dark">{loading ? '…' : results.length}</span>{' '}
                {results.length === 1 ? 'opportunity' : 'opportunities'}
                {!loading && <span className="hidden sm:inline"> · {results.reduce((n, o) => n + o.openings, 0)} spots</span>}
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setDrawer(true)}
                  className="inline-flex items-center gap-2 rounded-xl bg-aiesec-light px-4 py-2.5 text-sm font-bold text-aiesec-dark transition-colors hover:bg-aiesec-blue hover:text-white lg:hidden"
                >
                  <Sliders className="size-4" /> Filters
                  {activeCount > 0 && <span className="grid size-5 place-items-center rounded-full bg-aiesec-blue text-[11px] text-white">{activeCount}</span>}
                </button>
                <label className="relative">
                  <span className="sr-only">Sort by</span>
                  <select
                    value={filters.sort}
                    onChange={(e) => update({ sort: e.target.value })}
                    className="cursor-pointer appearance-none rounded-xl border-0 bg-aiesec-light py-2.5 pl-4 pr-9 text-sm font-bold text-aiesec-dark ring-1 ring-transparent transition hover:ring-aiesec-blue/30 focus:outline-none focus:ring-2 focus:ring-aiesec-blue"
                  >
                    {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                  <svg aria-hidden viewBox="0 0 20 20" fill="currentColor" className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400">
                    <path d="M5.2 7.5a.75.75 0 0 1 1.06 0L10 11.2l3.74-3.7a.75.75 0 1 1 1.06 1.06l-4.27 4.25a.75.75 0 0 1-1.06 0L5.2 8.56a.75.75 0 0 1 0-1.06Z" />
                  </svg>
                </label>
              </div>
            </div>

            <div className="mt-4 empty:hidden">
              <ActivePills filters={filters} update={update} />
            </div>

            {loading ? (
              <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }, (_, i) => <CardSkeleton key={i} />)}
              </div>
            ) : results.length ? (
              <ul className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {results.map((o) => (
                  <li key={o.id} className="flex [&>article]:w-full">
                    <OpportunityCard o={o} />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-6 flex flex-col items-center rounded-3xl border-2 border-dashed border-slate-200 bg-white px-6 py-20 text-center">
                <span className="grid size-16 place-items-center rounded-full bg-aiesec-light text-aiesec-blue">
                  <Search className="size-7" />
                </span>
                <h3 className="mt-5 text-xl font-black text-aiesec-dark">No opportunities match these filters</h3>
                <p className="mt-2 max-w-sm text-slate-500">Try widening the date range, lowering the minimum salary or picking another product.</p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-6 inline-flex items-center gap-2 rounded-lg bg-aiesec-blue px-5 py-3 text-sm font-bold text-white shadow-lg shadow-aiesec-blue/25 transition hover:bg-[#0270d8]"
                >
                  <Refresh className="size-4" /> Reset filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <div className={`fixed inset-0 z-[60] lg:hidden ${drawer ? '' : 'pointer-events-none'}`} aria-hidden={!drawer}>
        <div
          onClick={() => setDrawer(false)}
          className={`absolute inset-0 bg-aiesec-dark/50 backdrop-blur-sm transition-opacity duration-300 ${drawer ? 'opacity-100' : 'opacity-0'}`}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Filters"
          inert={!drawer}
          className={`absolute inset-x-0 bottom-0 flex max-h-[88vh] flex-col rounded-t-[2rem] bg-white shadow-2xl transition-transform duration-300 ease-out ${drawer ? 'translate-y-0' : 'translate-y-full'}`}
        >
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <span className="absolute left-1/2 top-2 h-1 w-10 -translate-x-1/2 rounded-full bg-slate-200" />
            <h3 className="text-lg font-black text-aiesec-dark">Filters</h3>
            <button type="button" onClick={() => setDrawer(false)} className="grid size-10 place-items-center rounded-full hover:bg-slate-100" aria-label="Close filters">
              <X className="size-5" />
            </button>
          </div>
          <div className="overflow-y-auto px-6 py-6">
            <Filters filters={filters} update={update} bounds={bounds} counts={counts} />
          </div>
          <div className="flex gap-3 border-t border-slate-100 p-4">
            <button type="button" onClick={reset} className="rounded-xl px-5 py-3.5 text-sm font-bold text-aiesec-blue hover:bg-aiesec-light">
              Reset
            </button>
            <button
              type="button"
              onClick={() => setDrawer(false)}
              className="flex-1 rounded-xl bg-aiesec-blue py-3.5 text-sm font-bold text-white shadow-lg shadow-aiesec-blue/25"
            >
              Show {results.length} {results.length === 1 ? 'result' : 'results'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

import { useCallback, useMemo, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import ChoosePath from './components/ChoosePath.jsx'
import Country from './components/Country.jsx'
import LC from './components/LC.jsx'
import Stats from './components/Stats.jsx'
import Opportunities from './components/Opportunities.jsx'
import Footer from './components/Footer.jsx'
import { useOpportunities } from './hooks/useOpportunities.js'
import { PRODUCT_KEYS } from './data/products.js'

const INITIAL_FILTERS = {
  query: '',
  products: [], // empty = all products
  paidOnly: false,
  minSalary: 0,
  from: '',
  to: '',
  sort: 'newest',
}

const SORTERS = {
  newest: (a, b) => (b.created ?? '').localeCompare(a.created ?? '') || a.id - b.id,
  oldest: (a, b) => (a.created ?? '').localeCompare(b.created ?? '') || a.id - b.id,
  'salary-desc': (a, b) => (b.salary ?? -1) - (a.salary ?? -1),
  'salary-asc': (a, b) => (a.salary ?? Infinity) - (b.salary ?? Infinity),
  openings: (a, b) => b.openings - a.openings,
}

export default function App() {
  const { status, data } = useOpportunities()
  const [filters, setFilters] = useState(INITIAL_FILTERS)

  const update = useCallback((patch) => setFilters((f) => ({ ...f, ...patch })), [])
  const reset = useCallback(() => setFilters((f) => ({ ...INITIAL_FILTERS, sort: f.sort })), [])

  const bounds = useMemo(() => {
    const dates = data.map((o) => o.created).filter(Boolean).sort()
    const top = Math.max(0, ...data.map((o) => o.salary ?? 0))
    return {
      minDate: dates[0] ?? '',
      maxDate: dates.at(-1) ?? '',
      maxSalary: Math.max(50, Math.ceil(top / 50) * 50),
    }
  }, [data])

  const counts = useMemo(
    () => Object.fromEntries(PRODUCT_KEYS.map((k) => [k, data.filter((o) => o.product === k).length])),
    [data],
  )

  const results = useMemo(() => {
    const q = filters.query.trim().toLowerCase()
    return data
      .filter((o) => {
        if (filters.products.length && !filters.products.includes(o.product)) return false
        if (q && !`${o.title} ${o.organisation} ${o.length ?? ''}`.toLowerCase().includes(q)) return false
        if (filters.paidOnly && o.salary == null) return false
        if (filters.minSalary > 0 && (o.salary ?? 0) < filters.minSalary) return false
        if (filters.from && (!o.created || o.created < filters.from)) return false
        if (filters.to && (!o.created || o.created > filters.to)) return false
        return true
      })
      .sort(SORTERS[filters.sort])
  }, [data, filters])

  const activeCount =
    filters.products.length +
    (filters.query.trim() ? 1 : 0) +
    (filters.paidOnly ? 1 : 0) +
    (filters.minSalary > 0 ? 1 : 0) +
    (filters.from ? 1 : 0) +
    (filters.to ? 1 : 0)

  // From the "Choose your path" split: pre-filter by product and jump to the list.
  const choosePath = useCallback((products) => {
    setFilters({ ...INITIAL_FILTERS, products })
    document.getElementById('opportunities')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const loading = status === 'loading'

  return (
    <>
      <a href="#opportunities" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-aiesec-blue focus:px-4 focus:py-2 focus:font-bold focus:text-white">
        Skip to opportunities
      </a>
      <Navbar />
      <main>
        <Hero data={data} loading={loading} />
        <ChoosePath data={data} loading={loading} onChoose={choosePath} />
        <Country />
        <LC />
        <Stats />
        <Opportunities
          status={status}
          filters={filters}
          update={update}
          reset={reset}
          results={results}
          bounds={bounds}
          counts={counts}
          activeCount={activeCount}
        />
      </main>
      <Footer />
    </>
  )
}

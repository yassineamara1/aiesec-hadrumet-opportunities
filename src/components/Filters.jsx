import { PRODUCTS, PRODUCT_KEYS } from '../data/products.js'
import { Calendar, Search, Wallet } from './Icons.jsx'

export const SORTS = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'salary-desc', label: 'Highest salary' },
  { value: 'salary-asc', label: 'Lowest salary' },
  { value: 'openings', label: 'Most openings' },
]

function Group({ title, icon: Icon, children, action }) {
  return (
    <fieldset className="border-b border-slate-100 py-6 first:pt-0 last:border-0 last:pb-0">
      <div className="mb-4 flex items-center justify-between">
        <legend className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-aiesec-dark">
          {Icon && <Icon className="size-4 text-aiesec-blue" />} {title}
        </legend>
        {action}
      </div>
      {children}
    </fieldset>
  )
}

const inputCls =
  'w-full rounded-xl border-0 bg-aiesec-light px-3.5 py-2.5 text-sm font-bold text-aiesec-dark ring-1 ring-transparent transition placeholder:font-normal placeholder:text-slate-400 hover:ring-aiesec-blue/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-aiesec-blue'

export default function Filters({ filters, update, bounds, counts }) {
  const toggleProduct = (k) => {
    const has = filters.products.includes(k)
    update({ products: has ? filters.products.filter((p) => p !== k) : [...filters.products, k] })
  }
  const fill = bounds.maxSalary ? (filters.minSalary / bounds.maxSalary) * 100 : 0

  return (
    <div>
      <Group title="Search">
        <label className="relative block">
          <span className="sr-only">Search by title or organisation</span>
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={filters.query}
            onChange={(e) => update({ query: e.target.value })}
            placeholder="Title or organisation"
            className={`${inputCls} pl-10`}
          />
        </label>
      </Group>

      <Group
        title="Product"
        action={
          filters.products.length > 0 && (
            <button type="button" onClick={() => update({ products: [] })} className="text-xs font-bold text-aiesec-blue hover:underline">
              All
            </button>
          )
        }
      >
        <div className="flex flex-col gap-2">
          {PRODUCT_KEYS.map((k) => {
            const p = PRODUCTS[k]
            const on = filters.products.includes(k)
            return (
              <button
                key={k}
                type="button"
                aria-pressed={on}
                onClick={() => toggleProduct(k)}
                className={`group flex items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-bold ring-1 transition-all duration-200 ${
                  on ? `${p.chipOn} shadow-lg` : 'bg-white text-aiesec-dark ring-slate-200 hover:ring-slate-300 hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <span className={`size-2.5 rounded-full ${on ? 'bg-white' : p.dot}`} />
                  {p.name}
                </span>
                <span className={`rounded-full px-2 py-0.5 text-xs font-black ${on ? 'bg-white/25' : 'bg-slate-100 text-slate-500'}`}>
                  {counts[k] ?? 0}
                </span>
              </button>
            )
          })}
        </div>
      </Group>

      <Group title="Salary" icon={Wallet}>
        <label className="flex cursor-pointer items-center justify-between gap-4">
          <span className="text-sm font-bold text-aiesec-dark">Paid only</span>
          <span className="relative inline-flex">
            <input
              type="checkbox"
              className="peer sr-only"
              checked={filters.paidOnly}
              onChange={(e) => update({ paidOnly: e.target.checked })}
            />
            <span className="h-6 w-11 rounded-full bg-slate-200 transition-colors peer-checked:bg-aiesec-blue peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-aiesec-blue" />
            <span className="absolute left-0.5 top-0.5 size-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
          </span>
        </label>

        <div className="mt-6">
          <div className="flex items-baseline justify-between">
            <label htmlFor="min-salary" className="text-sm font-bold text-aiesec-dark">Minimum salary</label>
            <output htmlFor="min-salary" className="text-sm font-black text-aiesec-blue">
              {filters.minSalary > 0 ? `$${filters.minSalary}+` : 'Any'}
            </output>
          </div>
          <input
            id="min-salary"
            type="range"
            min={0}
            max={bounds.maxSalary}
            step={50}
            value={filters.minSalary}
            onChange={(e) => update({ minSalary: Number(e.target.value) })}
            style={{ '--fill': `${fill}%` }}
            className="range mt-4"
          />
          <div className="mt-2 flex justify-between text-xs font-bold text-slate-400">
            <span>$0</span>
            <span>${bounds.maxSalary}</span>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-slate-400">Volunteer projects have no salary, so any minimum above $0 hides them.</p>
        </div>
      </Group>

      <Group title="Date posted" icon={Calendar}>
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold text-slate-500">From</span>
            <input
              type="date"
              value={filters.from}
              min={bounds.minDate}
              max={filters.to || bounds.maxDate}
              onChange={(e) => update({ from: e.target.value })}
              className={inputCls}
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold text-slate-500">To</span>
            <input
              type="date"
              value={filters.to}
              min={filters.from || bounds.minDate}
              max={bounds.maxDate}
              onChange={(e) => update({ to: e.target.value })}
              className={inputCls}
            />
          </label>
        </div>
      </Group>
    </div>
  )
}

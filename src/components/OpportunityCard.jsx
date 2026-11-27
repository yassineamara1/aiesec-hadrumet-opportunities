import { PRODUCTS } from '../data/products.js'
import { ArrowUpRight, Building, Calendar, Clock, Users, Wallet } from './Icons.jsx'

export const formatDate = (iso) =>
  iso ? new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Unknown'

const isNew = (iso) => iso && (Date.now() - new Date(`${iso}T00:00:00`).getTime()) / 86_400_000 <= 30

export default function OpportunityCard({ o }) {
  const p = PRODUCTS[o.product]
  const paid = o.salary != null

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.06] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${p.glow}`}
    >
      <span aria-hidden className={`absolute inset-x-0 top-0 h-1 origin-left scale-x-[0.18] transition-transform duration-500 group-hover:scale-x-100 ${p.bar}`} />

      <div className="flex items-center justify-between gap-2">
        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black ring-1 ${p.badge}`}>
          <span className={`size-1.5 rounded-full ${p.dot}`} /> {p.name}
        </span>
        {isNew(o.created) && (
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-emerald-600 ring-1 ring-emerald-500/20">
            New
          </span>
        )}
      </div>

      <h3 className="mt-5 text-xl font-black leading-snug text-aiesec-dark first-letter:uppercase">{o.title}</h3>
      <p className="mt-1.5 flex items-center gap-1.5 text-sm font-bold text-slate-500">
        <Building className="size-4 shrink-0 text-slate-400" />
        <span className="truncate capitalize">{o.organisation}</span>
      </p>

      <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-dashed border-slate-200 pt-5 text-sm">
        <div className="flex items-center gap-2">
          <Users className="size-4 text-slate-400" />
          <dt className="sr-only">Openings</dt>
          <dd className="font-bold text-aiesec-dark">
            {o.openings} {o.openings === 1 ? 'opening' : 'openings'}
          </dd>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="size-4 text-slate-400" />
          <dt className="sr-only">Duration</dt>
          <dd className="font-bold capitalize text-aiesec-dark">{o.length ?? `${o.duration || 'Short'} term`}</dd>
        </div>
        <div className="col-span-2 flex items-center gap-2">
          <Calendar className="size-4 text-slate-400" />
          <dt className="sr-only">Posted</dt>
          <dd className="text-slate-500">
            Posted <span className="font-bold text-aiesec-dark">{formatDate(o.created)}</span>
          </dd>
        </div>
      </dl>

      <div className="mt-auto flex items-end justify-between gap-3 pt-6">
        <div>
          <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
            <Wallet className="size-3.5" /> Salary
          </p>
          {paid ? (
            <p className="mt-1 text-2xl font-black text-aiesec-dark">
              ${o.salary}
              <span className="text-sm font-bold text-slate-400"> / month</span>
            </p>
          ) : (
            <p className="mt-1 text-base font-black text-slate-500">Unpaid · not specified</p>
          )}
        </div>
        <a
          href={p.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`Apply for ${o.title} at ${o.organisation} on aiesec.org`}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-aiesec-blue px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-aiesec-blue/25 transition-all hover:bg-[#0270d8] hover:shadow-aiesec-blue/40"
        >
          Apply
          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </article>
  )
}

export function CardSkeleton() {
  return (
    <div className="rounded-3xl bg-white p-6 ring-1 ring-slate-900/[0.06]">
      <div className="h-6 w-32 animate-pulse rounded-full bg-slate-100" />
      <div className="mt-6 h-6 w-3/4 animate-pulse rounded bg-slate-100" />
      <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-slate-100" />
      <div className="mt-8 grid grid-cols-2 gap-3">
        <div className="h-4 animate-pulse rounded bg-slate-100" />
        <div className="h-4 animate-pulse rounded bg-slate-100" />
      </div>
      <div className="mt-10 flex justify-between">
        <div className="h-8 w-24 animate-pulse rounded bg-slate-100" />
        <div className="h-10 w-24 animate-pulse rounded-lg bg-slate-100" />
      </div>
    </div>
  )
}

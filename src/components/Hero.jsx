import { ArrowRight, MapPin, Users } from './Icons.jsx'
import { PRODUCTS, PRODUCT_KEYS } from '../data/products.js'

export default function Hero({ data, loading }) {
  const openings = data.reduce((sum, o) => sum + o.openings, 0)
  const orgs = new Set(data.map((o) => o.organisation.toLowerCase())).size

  return (
    <section id="top" className="relative overflow-hidden bg-white">
      {/* soft background shapes */}
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 size-[38rem] rounded-full bg-aiesec-light" />
      <div aria-hidden className="pointer-events-none absolute -left-24 bottom-0 size-72 rounded-full bg-aiesec-blue/5 blur-2xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-12 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pb-28 lg:pt-20">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-aiesec-light px-4 py-1.5 text-sm font-bold text-aiesec-blue ring-1 ring-aiesec-blue/15">
            <MapPin className="size-4" />
            AIESEC in Hadrumet · Sousse, Tunisia
          </p>

          <h1 className="mt-6 text-[2.6rem] font-black leading-[1.05] tracking-tight text-aiesec-dark sm:text-6xl lg:text-[4.25rem]">
            Live your{' '}
            <span className="relative whitespace-nowrap text-aiesec-blue">
              leadership
              <svg aria-hidden viewBox="0 0 300 14" className="absolute -bottom-2 left-0 h-3 w-full text-aiesec-blue/30" preserveAspectRatio="none">
                <path d="M2 10 C 80 2, 220 2, 298 9" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" />
              </svg>
            </span>{' '}
            experience in Tunisia
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-slate-500">
            Volunteer on a social project, teach, or kick off your career with a paid internship on the Mediterranean coast.
            AIESEC in Hadrumet welcomes you to Sousse and walks with you from your first call to your last goodbye.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#paths"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-aiesec-blue px-7 py-4 text-base font-bold text-white shadow-xl shadow-aiesec-blue/30 transition-all hover:-translate-y-0.5 hover:shadow-aiesec-blue/45"
            >
              <span aria-hidden className="absolute inset-y-0 left-0 w-1/3 -translate-x-[120%] bg-white/25 blur-md group-hover:animate-shine" />
              Let&apos;s get started!
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#opportunities"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-aiesec-blue px-7 py-[14px] text-base font-bold text-aiesec-blue transition-colors hover:bg-aiesec-blue hover:text-white"
            >
              Browse opportunities
            </a>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-3 divide-x divide-slate-200 border-t border-slate-200 pt-7">
            {[
              { v: data.length, l: 'Open opportunities' },
              { v: openings, l: 'Available spots' },
              { v: orgs, l: 'Host organisations' },
            ].map((s, i) => (
              <div key={s.l} className={i === 0 ? 'pr-4' : 'px-4'}>
                <dd className="text-3xl font-black text-aiesec-dark sm:text-4xl">
                  {loading ? <span className="inline-block h-8 w-12 animate-pulse rounded bg-slate-200 align-middle" /> : s.v}
                </dd>
                <dt className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-400 sm:text-[13px]">{s.l}</dt>
              </div>
            ))}
          </dl>
        </div>

        {/* Visual collage */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative ml-auto aspect-[4/5] w-[88%] overflow-hidden rounded-[2rem] shadow-2xl shadow-aiesec-dark/20">
            <img
              src="/images/friends-sea.jpg"
              alt="A group of young people with arms around each other, looking out at the sea"
              className="size-full object-cover"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-linear-to-t from-aiesec-dark/40 via-transparent to-transparent" />
          </div>

          <div className="absolute -left-2 bottom-10 w-[46%] overflow-hidden rounded-2xl border-[6px] border-white shadow-2xl motion-safe:animate-float-slow sm:-left-6">
            <img src="/images/sousse-ribat-sunset.jpg" alt="The Ribat of Sousse at sunset" className="aspect-square w-full object-cover" />
          </div>

          <div className="absolute -top-3 left-4 flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-xl ring-1 ring-slate-900/5 backdrop-blur motion-safe:animate-float sm:left-0">
            <span className="relative flex size-3">
              <span className="absolute inline-flex size-full rounded-full bg-emerald-400 motion-safe:animate-pulse-ring" />
              <span className="relative inline-flex size-3 rounded-full bg-emerald-500" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-black text-aiesec-dark">{loading ? '…' : data.length} opportunities</p>
              <p className="text-xs text-slate-400">open right now in Sousse</p>
            </div>
          </div>

          <div className="absolute -right-1 bottom-24 hidden items-center gap-2 rounded-2xl bg-white/95 px-4 py-3 shadow-xl ring-1 ring-slate-900/5 sm:flex">
            <Users className="size-5 text-aiesec-blue" />
            <div className="flex -space-x-1.5">
              {PRODUCT_KEYS.map((k) => (
                <span key={k} className={`size-5 rounded-full ring-2 ring-white ${PRODUCTS[k].dot}`} title={PRODUCTS[k].name} />
              ))}
            </div>
            <span className="text-xs font-bold text-aiesec-dark">3 programs</span>
          </div>
        </div>
      </div>
    </section>
  )
}

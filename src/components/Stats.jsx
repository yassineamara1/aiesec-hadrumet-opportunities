import { useEffect, useState } from 'react'
import Reveal from './Reveal.jsx'
import { useInView } from '../hooks/useInView.js'
import { CYCLE, HEADLINE_STATS, PRODUCT_RANKING } from '../data/stats.js'
import { PRODUCTS } from '../data/products.js'
import { TrendUp, Trophy } from './Icons.jsx'

function CountUp({ value, decimals = 0, duration = 1400 }) {
  const [ref, inView] = useInView({ threshold: 0.4 })
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setN(value); return }
    let raf
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration)
      setN(value * (1 - Math.pow(1 - p, 3)))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration])

  return <span ref={ref}>{n.toFixed(decimals)}</span>
}

const RING = { GV: 'from-gv/30', GTa: 'from-gta/30', GTe: 'from-gte/30' }

export default function Stats() {
  const maxRealized = Math.max(...PRODUCT_RANKING.map((p) => p.realized))

  return (
    <section id="impact" className="relative isolate overflow-hidden bg-aiesec-blue py-24 text-white sm:py-28">
      <div aria-hidden className="absolute -right-32 -top-32 -z-10 size-[30rem] rounded-full bg-white/10 blur-3xl" />
      <div aria-hidden className="absolute -bottom-40 -left-20 -z-10 size-[28rem] rounded-full bg-aiesec-dark/30 blur-3xl" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-white/70">Positioning in operations</p>
            <h2 className="mt-4 text-4xl font-black leading-tight tracking-tight sm:text-5xl">
              One of the strongest LCs in Tunisia for incoming exchanges
            </h2>
          </div>
          <p className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold ring-1 ring-white/20">{CYCLE}</p>
        </Reveal>

        <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-white/15 ring-1 ring-white/15 lg:grid-cols-4">
          {HEADLINE_STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 80} className="bg-aiesec-blue p-6 transition-colors hover:bg-[#0a86f8] sm:p-8">
              <dd className="text-4xl font-black tracking-tight sm:text-5xl">
                <CountUp value={s.value} decimals={s.decimals} />
                {s.suffix}
              </dd>
              <dt className="mt-2 text-sm font-bold text-white/75">{s.label}</dt>
            </Reveal>
          ))}
        </dl>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {PRODUCT_RANKING.map((p, i) => {
            const meta = PRODUCTS[p.key]
            return (
              <Reveal
                key={p.key}
                delay={i * 100}
                className="group relative overflow-hidden rounded-3xl bg-white p-7 text-aiesec-dark shadow-2xl shadow-aiesec-dark/20 transition-transform duration-300 hover:-translate-y-1.5"
              >
                <div aria-hidden className={`absolute -right-16 -top-16 size-48 rounded-full bg-radial ${RING[p.key]} to-transparent transition-transform duration-700 group-hover:scale-125`} />
                <div className="relative flex items-start justify-between">
                  <div>
                    <p className={`text-lg font-black ${meta.text}`}>{p.label}</p>
                    <p className="text-sm font-bold text-slate-400">{meta.name}</p>
                  </div>
                  <span className="flex items-center gap-1.5 rounded-full bg-aiesec-dark px-3 py-1.5 text-sm font-black text-white">
                    <Trophy className="size-4" /> #{p.rank} national
                  </span>
                </div>
                <p className="relative mt-8 text-5xl font-black tracking-tight">
                  <CountUp value={p.realized} />
                  <span className="ml-2 text-base font-bold text-slate-400">realizations</span>
                </p>
                <div className="relative mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className={`h-full rounded-full ${meta.bar}`} style={{ width: `${(p.realized / maxRealized) * 100}%` }} />
                </div>
                <p className="relative mt-4 flex items-center gap-1.5 text-sm font-bold text-emerald-600">
                  <TrendUp className="size-4" /> +{p.growth}% vs last term
                </p>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

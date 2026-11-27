import PathPanel from './PathPanel.jsx'
import Reveal from './Reveal.jsx'
import { PRODUCTS } from '../data/products.js'
import { Check } from './Icons.jsx'

const sum = (list, f) => list.reduce((n, o) => n + f(o), 0)

export default function ChoosePath({ data, loading, onChoose }) {
  const gv = data.filter((o) => o.product === 'GV')
  const pro = data.filter((o) => o.product !== 'GV')
  const salaries = pro.map((o) => o.salary).filter((s) => s != null)
  const minPay = salaries.length ? Math.min(...salaries) : null
  const maxPay = salaries.length ? Math.max(...salaries) : null
  const count = (k) => data.filter((o) => o.product === k).length
  const dash = loading ? '…' : null
  // GV project lengths come from the titles, e.g. "Fingerprint [4 weeks]"
  const weeks = [...new Set(gv.map((o) => parseInt(o.length, 10)).filter(Boolean))].sort((a, b) => a - b)
  const weekLabel = weeks.length ? (weeks.length > 1 ? `${weeks[0]}–${weeks.at(-1)}` : `${weeks[0]}`) : '4+'

  return (
    <section id="paths" className="relative isolate overflow-hidden bg-aiesec-dark py-24 sm:py-32">
      {/* ambient light */}
      <div aria-hidden className="absolute -left-40 top-1/3 -z-10 size-[42rem] rounded-full bg-ember-600/25 blur-[140px]" />
      <div aria-hidden className="absolute -right-40 top-0 -z-10 size-[36rem] rounded-full bg-apricot-300/20 blur-[140px]" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-xs font-black uppercase tracking-[0.25em] text-apricot-300 ring-1 ring-white/10 backdrop-blur">
            <span className="size-1.5 rounded-full bg-apricot-300" /> Choose your path
          </p>
          <h2 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl">
            Make an impact, or{' '}
            <span className="bg-linear-to-r from-ember-600 via-[#ff8a3d] to-apricot-300 bg-clip-text text-transparent">build a career.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
            Two very different ways to spend your time in Sousse. Pick the one that fits who you want to become, and we will
            show you every open opportunity for it.
          </p>
        </Reveal>

        <Reveal delay={150} className="mt-14 sm:mt-16">
          <div className="group/split relative flex flex-col overflow-hidden rounded-[2rem] shadow-[0_50px_120px_-30px_rgba(210,82,15,0.55)] ring-1 ring-white/10 lg:h-[720px] lg:flex-row lg:rounded-[2.5rem]">
            <PathPanel
              variant="dark"
              index="01"
              product={PRODUCTS.GV.name}
              title={<>Volunteer.<br />Change lives.</>}
              ghostWord="Impact"
              description="Spend a few weeks on a social project linked to the UN Sustainable Development Goals, side by side with local NGOs and young people from all over the world."
              image="/images/volunteer-kids.jpg"
              stats={[
                { value: dash ?? gv.length, label: 'projects' },
                { value: dash ?? sum(gv, (o) => o.openings), label: 'spots' },
                { value: dash ?? weekLabel, label: 'weeks' },
              ]}
              features={['Work on the UN Global Goals', 'Accommodation and meals support', 'A local buddy from day one']}
              cta={`Explore ${loading ? '' : gv.length + ' '}volunteer projects`}
              onSelect={() => onChoose(['GV'])}
              className="z-20"
            >
              {/* "OR" medallion sitting on the seam between the two halves */}
              <div
                aria-hidden
                className="pointer-events-none absolute bottom-0 left-1/2 z-30 -translate-x-1/2 translate-y-1/2 lg:bottom-auto lg:left-auto lg:right-0 lg:top-1/2 lg:translate-x-1/2 lg:-translate-y-1/2"
              >
                <div className="relative grid size-20 place-items-center transition-transform duration-700 group-hover/split:scale-110">
                  <span className="absolute inset-0 rounded-full border border-dashed border-white/60 motion-safe:animate-[spin_14s_linear_infinite]" />
                  <span className="absolute inset-1.5 rounded-full bg-linear-to-br from-ember-600 via-[#ff8a3d] to-apricot-300 p-[3px] shadow-[0_10px_40px_rgba(210,82,15,0.6)]">
                    <span className="grid size-full place-items-center rounded-full bg-white text-sm font-black uppercase tracking-widest text-aiesec-dark">
                      or
                    </span>
                  </span>
                </div>
              </div>
            </PathPanel>

            <PathPanel
              variant="light"
              index="02"
              product="Talent · Teacher"
              title={<>Go pro.<br />Grow faster.</>}
              ghostWord="Career"
              description="Paid internships and teaching roles with companies, schools and universities in Sousse. Real responsibility and an international CV."
              image="/images/professional-team.jpg"
              stats={[
                { value: dash ?? pro.length, label: 'roles' },
                { value: dash ?? (minPay != null ? `$${minPay}–${maxPay}` : '—'), label: '/ month' },
                { value: dash ?? sum(pro, (o) => o.openings), label: 'spots' },
              ]}
              features={['Paid monthly salary', 'Internship and teaching roles', 'Work permit guidance']}
              cta={`Explore ${loading ? '' : pro.length + ' '}professional roles`}
              onSelect={() => onChoose(['GTa', 'GTe'])}
              className="z-10"
              extra={
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {['GTa', 'GTe'].map((k) => (
                    <button
                      key={k}
                      type="button"
                      onClick={(e) => { e.stopPropagation(); onChoose([k]) }}
                      className="group/sub inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[13px] font-bold text-aiesec-dark shadow-sm ring-1 ring-ember-700/10 transition-all hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <span className={`size-2 rounded-full ${PRODUCTS[k].dot}`} />
                      {PRODUCTS[k].name}
                      <span className="rounded-full bg-apricot-100 px-1.5 text-[11px] font-black text-ember-700 transition-colors group-hover/sub:bg-ember-700 group-hover/sub:text-white">
                        {loading ? '…' : count(k)}
                      </span>
                    </button>
                  ))}
                </div>
              }
            />
          </div>
        </Reveal>

        <Reveal delay={250}>
          <ul className="mx-auto mt-12 flex max-w-4xl flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-bold text-white/55">
            {['Airport pickup', 'Accommodation support', 'Local buddy', 'Cultural events', '24/7 LC support'].map((f) => (
              <li key={f} className="flex items-center gap-2">
                <Check className="size-4 text-apricot-300" /> {f}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

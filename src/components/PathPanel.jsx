import { ArrowRight, Check } from './Icons.jsx'

/*
 * One half of the "Choose your path" split.
 * variant "dark"  -> deep ember-orange gradient, white text (Volunteer)
 * variant "light" -> soft apricot-orange gradient, navy text (Professional)
 */
const THEMES = {
  dark: {
    text: 'text-white',
    muted: 'text-white/75',
    eyebrow: 'text-apricot-300',
    line: 'bg-apricot-300/70',
    tint: 'bg-ember-700 mix-blend-multiply opacity-80',
    gradient: 'bg-linear-to-t from-ember-950 via-ember-900/85 to-ember-700/10',
    glow: 'bg-[radial-gradient(ellipse_at_15%_0%,rgba(255,150,70,0.45),transparent_55%)]',
    dim: 'bg-ember-950/45',
    ghost: '[-webkit-text-stroke:1.5px_rgba(255,214,170,0.28)] group-hover/panel:[-webkit-text-stroke:1.5px_rgba(255,214,170,0.5)]',
    chip: 'bg-white/10 text-white ring-white/20 backdrop-blur-md',
    check: 'bg-apricot-300/20 text-apricot-200',
    cta: 'bg-white text-ember-800 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.55)] hover:bg-apricot-50',
    ctaIcon: 'bg-ember-700 text-white',
    spot: 'rgba(255,190,130,0.22)',
    ring: 'focus-visible:outline-white',
  },
  light: {
    text: 'text-aiesec-dark',
    muted: 'text-aiesec-dark/75',
    eyebrow: 'text-ember-700',
    line: 'bg-ember-600/60',
    tint: 'bg-apricot-300 mix-blend-multiply opacity-60',
    gradient: 'bg-linear-to-t from-apricot-50 via-apricot-100/95 to-apricot-300/5',
    glow: 'bg-[radial-gradient(ellipse_at_85%_0%,rgba(255,255,255,0.55),transparent_55%)]',
    dim: 'bg-white/45',
    ghost: '[-webkit-text-stroke:1.5px_rgba(168,56,10,0.16)] group-hover/panel:[-webkit-text-stroke:1.5px_rgba(168,56,10,0.32)]',
    chip: 'bg-white/70 text-aiesec-dark ring-ember-700/10 backdrop-blur-md',
    check: 'bg-ember-600/12 text-ember-700',
    cta: 'bg-aiesec-dark text-white shadow-[0_18px_40px_-12px_rgba(5,41,73,0.6)] hover:bg-[#0a3a66]',
    ctaIcon: 'bg-apricot-400 text-aiesec-dark',
    spot: 'rgba(255,255,255,0.45)',
    ring: 'focus-visible:outline-aiesec-dark',
  },
}

export default function PathPanel({
  variant,
  index,
  product,
  title,
  ghostWord,
  description,
  image,
  imageAlt,
  stats,
  features,
  cta,
  onSelect,
  extra,
  className = '',
  children,
}) {
  const t = THEMES[variant]

  const trackPointer = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <article
      onPointerMove={trackPointer}
      onClick={onSelect}
      className={`group/panel relative flex min-h-[620px] flex-1 cursor-pointer flex-col justify-end sm:min-h-[580px] lg:min-h-0 lg:transition-[flex-grow] lg:duration-700 lg:ease-[cubic-bezier(.22,1,.36,1)] lg:hover:grow-[1.5] lg:focus-within:grow-[1.5] ${t.text} ${className}`}
    >
      {/* Background layers (clipped) */}
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        <img
          src={image}
          alt=""
          loading="lazy"
          className="absolute inset-0 size-full scale-105 object-cover transition-[transform,filter] duration-[1600ms] ease-out group-hover/panel:scale-[1.14] lg:group-hover/split:saturate-50 lg:group-hover/panel:saturate-100!"
        />
        <div className={`absolute inset-0 ${t.tint}`} />
        <div className={`absolute inset-0 ${t.gradient}`} />
        <div className={`absolute inset-0 ${t.glow}`} />
        {/* cursor spotlight */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/panel:opacity-100"
          style={{ background: `radial-gradient(520px circle at var(--mx, 50%) var(--my, 50%), ${t.spot}, transparent 45%)` }}
        />
        {/* dims the panel that is NOT hovered */}
        <div className={`absolute inset-0 opacity-0 transition-opacity duration-500 lg:group-hover/split:opacity-100 lg:group-hover/panel:opacity-0! ${t.dim}`} />

        {/* giant outlined word */}
        <span
          className={`pointer-events-none absolute left-6 top-6 select-none whitespace-nowrap text-[5.5rem] font-black uppercase leading-none tracking-tighter text-transparent transition-all duration-1000 ease-out sm:left-10 sm:top-8 sm:text-[8rem] xl:text-[10rem] group-hover/panel:translate-x-6 ${t.ghost}`}
        >
          {ghostWord}
        </span>
        <span className={`absolute right-6 top-7 text-sm font-black tracking-[0.3em] sm:right-10 sm:top-10 ${t.eyebrow}`}>{index}</span>
      </div>

      {/* Content */}
      <div className="relative z-10 p-7 max-lg:py-16 sm:p-10 lg:w-[23rem] lg:p-9 xl:w-[26rem] xl:p-12 2xl:w-[28rem]">
        <p className={`flex items-center gap-3 text-xs font-black uppercase tracking-[0.25em] ${t.eyebrow}`}>
          <span className={`h-px w-8 transition-all duration-500 group-hover/panel:w-14 ${t.line}`} />
          {product}
        </p>

        <h3 className="mt-4 text-[2.6rem] font-black leading-[0.95] tracking-tight sm:text-5xl lg:text-[2.75rem] xl:text-[3.25rem]">
          {title}
        </h3>

        <p className={`mt-5 text-[15px] leading-relaxed xl:text-base ${t.muted}`}>{description}</p>

        {/* Features: always visible on touch / small screens, revealed on hover on desktop */}
        <div className="grid transition-all duration-500 ease-out lg:grid-rows-[0fr] lg:opacity-0 lg:group-hover/panel:grid-rows-[1fr] lg:group-hover/panel:opacity-100 lg:group-focus-within/panel:grid-rows-[1fr] lg:group-focus-within/panel:opacity-100">
          <ul className="min-h-0 space-y-2 overflow-hidden pt-5">
            {features.map((f, i) => (
              <li
                key={f}
                style={{ transitionDelay: `${120 + i * 70}ms` }}
                className="flex items-center gap-3 text-[15px] font-bold transition-transform duration-500 lg:translate-y-2 lg:group-hover/panel:translate-y-0"
              >
                <span className={`grid size-6 shrink-0 place-items-center rounded-full ${t.check}`}>
                  <Check className="size-3.5" />
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        <dl className="mt-6 flex flex-wrap gap-1.5">
          {stats.map((s) => (
            <div key={s.label} className={`flex items-baseline gap-1.5 rounded-full px-3 py-1.5 ring-1 ${t.chip}`}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-[15px] font-black">{s.value}</dd>
              <span aria-hidden className="text-[11px] font-bold opacity-75">{s.label}</span>
            </div>
          ))}
        </dl>

        {extra}

        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onSelect() }}
          className={`group/cta relative mt-7 inline-flex w-full items-center justify-between gap-4 overflow-hidden rounded-xl py-2 pl-6 pr-2 text-[15px] font-black transition-all duration-300 hover:-translate-y-0.5 sm:w-auto ${t.cta} ${t.ring}`}
        >
          <span aria-hidden className="absolute inset-y-0 left-0 w-1/3 -translate-x-[120%] bg-white/40 blur-md group-hover/cta:animate-shine" />
          {cta}
          <span className={`grid size-10 place-items-center rounded-lg transition-transform duration-300 group-hover/cta:scale-105 ${t.ctaIcon}`}>
            <ArrowRight className="size-5 transition-transform duration-500 group-hover/panel:-rotate-45 group-hover/cta:rotate-0! group-hover/cta:translate-x-0.5" />
          </span>
        </button>
      </div>

      {children}
    </article>
  )
}

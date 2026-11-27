import { useEffect, useState } from 'react'
import Logo from './Logo.jsx'
import { ArrowRight, Menu, X } from './Icons.jsx'

const LINKS = [
  { href: '#paths', label: 'Programs' },
  { href: '#tunisia', label: 'About Tunisia' },
  { href: '#lc', label: 'Our LC' },
  { href: '#impact', label: 'Impact' },
  { href: '#opportunities', label: 'Opportunities' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled || open ? 'border-slate-200/70 bg-white/90 shadow-[0_8px_30px_-12px_rgba(5,41,73,0.18)] backdrop-blur-xl' : 'border-transparent bg-white'
      }`}
    >
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8" aria-label="Main">
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative rounded-full px-4 py-2 text-[15px] font-bold text-aiesec-dark/80 transition-colors hover:text-aiesec-blue after:absolute after:inset-x-4 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-aiesec-blue after:transition-transform hover:after:scale-x-100"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#opportunities"
            className="group hidden items-center gap-2 rounded-lg bg-aiesec-blue px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-aiesec-blue/25 transition-all hover:-translate-y-0.5 hover:bg-[#0270d8] hover:shadow-aiesec-blue/40 sm:inline-flex"
          >
            See opportunities
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="grid size-11 place-items-center rounded-lg text-aiesec-dark transition-colors hover:bg-aiesec-light lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 lg:hidden ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="min-h-0">
          <ul className="space-y-1 px-5 pb-6 pt-2">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                  className="flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-bold text-aiesec-dark transition-colors hover:bg-aiesec-light hover:text-aiesec-blue"
                >
                  {l.label}
                  <ArrowRight className="size-4 opacity-40" />
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href="#opportunities"
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className="flex items-center justify-center gap-2 rounded-xl bg-aiesec-blue px-5 py-3.5 font-bold text-white"
              >
                See opportunities <ArrowRight className="size-4" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}

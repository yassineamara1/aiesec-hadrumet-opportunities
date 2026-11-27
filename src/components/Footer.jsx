import Logo from './Logo.jsx'
import { Facebook, Instagram, LinkedIn, Mail, MapPin, XBrand, YouTube } from './Icons.jsx'

const GROUPS = [
  {
    title: 'Explore',
    links: [
      ['About Tunisia', '#tunisia'],
      ['Our LC', '#lc'],
      ['Impact', '#impact'],
      ['Opportunities', '#opportunities'],
    ],
  },
  {
    title: 'Programs',
    links: [
      ['Global Volunteer', 'https://aiesec.org/global-volunteer'],
      ['Global Talent', 'https://aiesec.org/global-talent'],
      ['Global Teacher', 'https://aiesec.org/global-teacher'],
      ['Become a member', 'https://aiesec.org/membership'],
    ],
  },
  {
    title: 'AIESEC',
    links: [
      ['aiesec.org', 'https://aiesec.org'],
      ['Search opportunities', 'https://aiesec.org/search'],
    ],
  },
]

// Global AIESEC accounts. Swap for the LC's own pages if you have them.
const SOCIALS = [
  { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/aiesec' },
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/aiesec' },
  { icon: XBrand, label: 'X (Twitter)', href: 'https://x.com/aiesec' },
  { icon: LinkedIn, label: 'LinkedIn', href: 'https://www.linkedin.com/company/aiesec' },
  { icon: YouTube, label: 'YouTube', href: 'https://www.youtube.com/@aiesec' },
]

const external = (href) => href.startsWith('http')

export default function Footer() {
  return (
    <footer className="bg-aiesec-dark text-white/70">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo light />
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed">
              The AIESEC local committee of Sousse, Tunisia. We host young people from around the world for volunteer,
              internship and teaching experiences.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm">
              <li>
                <a href="mailto:aiesec.lc.hadrumet@gmail.com" className="inline-flex items-center gap-2 font-bold text-white transition-colors hover:text-aiesec-blue">
                  <Mail className="size-4" /> aiesec.lc.hadrumet@gmail.com
                </a>
              </li>
              <li className="inline-flex items-center gap-2">
                <MapPin className="size-4" /> Sousse, Tunisia
              </li>
            </ul>
          </div>

          {GROUPS.map((g) => (
            <nav key={g.title} aria-label={g.title}>
              <h3 className="text-sm font-black uppercase tracking-wider text-white">{g.title}</h3>
              <ul className="mt-5 space-y-3 text-[15px]">
                {g.links.map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      {...(external(href) ? { target: '_blank', rel: 'noreferrer' } : {})}
                      className="transition-colors hover:text-white"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <ul className="flex gap-2">
            {SOCIALS.map(({ icon: Icon, label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-full bg-white/5 ring-1 ring-white/10 transition-all hover:-translate-y-0.5 hover:bg-aiesec-blue hover:text-white hover:ring-aiesec-blue"
                >
                  <Icon className="size-4" />
                </a>
              </li>
            ))}
          </ul>
          <p className="text-sm">
            © {new Date().getFullYear()} AIESEC in Hadrumet · Part of{' '}
            <a href="https://aiesec.org" target="_blank" rel="noreferrer" className="font-bold text-white/80 hover:text-white">AIESEC International</a>
          </p>
        </div>

        <p className="mt-8 text-xs leading-relaxed text-white/40">
          Photos: Sousse medina &amp; Ribat by Sharon Hahn Darlin (CC BY 2.0), Ribat tower by Christian Manhart (CC BY-SA 3.0 IGO),
          El Jem by Agnieszka Wolska (CC BY-SA 3.0), Sidi Bou Said by Habib M&apos;henni (CC BY 4.0), via Wikimedia Commons.
          Other photos from Unsplash.
        </p>
      </div>
    </footer>
  )
}

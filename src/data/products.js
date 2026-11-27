// Product metadata. Tailwind classes are written out in full so the
// compiler can see them (no string concatenation of class names).
export const PRODUCTS = {
  GV: {
    key: 'GV',
    name: 'Global Volunteer',
    short: 'Volunteer',
    tagline: 'Volunteer abroad on a social impact project',
    url: 'https://aiesec.org/global-volunteer',
    badge: 'bg-gv/10 text-[#c63a22] ring-gv/25',
    chipOn: 'bg-gv text-white ring-gv shadow-gv/30',
    dot: 'bg-gv',
    bar: 'bg-gv',
    text: 'text-gv',
    glow: 'group-hover:shadow-gv/20',
  },
  GTa: {
    key: 'GTa',
    name: 'Global Talent',
    short: 'Talent',
    tagline: 'Gain professional experience in a paid internship',
    url: 'https://aiesec.org/global-talent',
    badge: 'bg-gta/10 text-[#06858b] ring-gta/25',
    chipOn: 'bg-gta text-white ring-gta shadow-gta/30',
    dot: 'bg-gta',
    bar: 'bg-gta',
    text: 'text-gta',
    glow: 'group-hover:shadow-gta/20',
  },
  GTe: {
    key: 'GTe',
    name: 'Global Teacher',
    short: 'Teacher',
    tagline: 'Teach abroad and inspire the next generation',
    url: 'https://aiesec.org/global-teacher',
    badge: 'bg-gte/10 text-[#b85d0a] ring-gte/25',
    chipOn: 'bg-gte text-white ring-gte shadow-gte/30',
    dot: 'bg-gte',
    bar: 'bg-gte',
    text: 'text-gte',
    glow: 'group-hover:shadow-gte/20',
  },
}

export const PRODUCT_KEYS = ['GV', 'GTa', 'GTe']

/** Map a product label from the sheet to a product key. */
export function productKey(label = '') {
  const l = label.toLowerCase()
  if (l.includes('volunteer')) return 'GV'
  if (l.includes('talent')) return 'GTa'
  if (l.includes('teach')) return 'GTe' // the sheet says "Global Teaching"
  return null
}

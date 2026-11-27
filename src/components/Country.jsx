import Reveal from './Reveal.jsx'
import { Coins, Globe, Shield, Sun, Utensils } from './Icons.jsx'

const PLACES = [
  {
    img: '/images/sidi-bou-said.jpg',
    alt: 'White and blue houses of Sidi Bou Said above the Gulf of Tunis',
    tag: 'Coast',
    title: 'Over 1,100 km of Mediterranean coastline',
    text: 'Golden beaches, blue-and-white villages like Sidi Bou Said and marinas such as Port El Kantaoui, a short ride from Sousse.',
    className: 'md:col-span-2 md:row-span-2',
    big: true,
  },
  {
    img: '/images/el-jem.jpg',
    alt: 'Inside the Roman amphitheatre of El Jem',
    tag: 'History',
    title: '3,000 years of history',
    text: 'From Carthage to the Roman amphitheatre of El Jem, one of the largest ever built.',
  },
  {
    img: '/images/sousse-medina-archway.jpg',
    alt: 'A stone archway in the walls of the medina of Sousse',
    tag: 'UNESCO',
    title: 'The medina of Sousse',
    text: 'A UNESCO World Heritage Site since 1988, with its Ribat and Great Mosque.',
  },
]

const FACTS = [
  { icon: Sun, title: 'Sunny all year', text: 'Mediterranean climate: hot, dry summers and mild winters.' },
  { icon: Globe, title: 'Easy to communicate', text: 'Arabic and French are spoken everywhere, and young people speak English.' },
  { icon: Utensils, title: 'Food you will miss', text: 'Couscous, brik, lablabi, harissa and sweet mint tea.' },
  { icon: Coins, title: 'Affordable living', text: 'Rent, transport and eating out cost far less than in Europe.' },
  { icon: Shield, title: 'Warm and welcoming', text: 'Tunisian hospitality is famous, and Sousse is a safe student city.' },
]

const QUICK = [
  ['Capital', 'Tunis'],
  ['Population', '≈ 12 million'],
  ['Currency', 'Tunisian dinar (TND)'],
  ['Time zone', 'UTC+1'],
  ['UNESCO sites', '9'],
]

export default function Country() {
  return (
    <section id="tunisia" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <Reveal>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-aiesec-blue">Discover Tunisia</p>
            <h2 className="mt-4 text-4xl font-black leading-tight tracking-tight text-aiesec-dark sm:text-5xl">
              Where Africa, Europe and the Arab world meet
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-lg leading-relaxed text-slate-500">
              Tunisia is the northernmost country in Africa, facing Italy across the Mediterranean. It is small enough to
              cross in a day, yet it packs Saharan dunes, Roman ruins, lively medinas and some of the best beaches on the sea.
            </p>
            <dl className="mt-6 flex flex-wrap gap-2">
              {QUICK.map(([k, v]) => (
                <div key={k} className="rounded-full bg-aiesec-light px-4 py-1.5 text-sm">
                  <dt className="inline font-bold text-slate-400">{k}: </dt>
                  <dd className="inline font-black text-aiesec-dark">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <div className="mt-14 grid auto-rows-[18rem] gap-5 md:grid-cols-3 md:auto-rows-[17rem]">
          {PLACES.map((p, i) => (
            <Reveal
              key={p.title}
              delay={i * 100}
              as="figure"
              className={`group relative overflow-hidden rounded-3xl shadow-lg shadow-aiesec-dark/10 ${p.className ?? ''}`}
            >
              <img
                src={p.img}
                alt={p.alt}
                loading="lazy"
                className="absolute inset-0 size-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-aiesec-dark/90 via-aiesec-dark/25 to-transparent transition-opacity duration-500 group-hover:opacity-95" />
              <figcaption className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-7">
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-black uppercase tracking-wider ring-1 ring-white/25 backdrop-blur">
                  {p.tag}
                </span>
                <h3 className={`mt-3 font-black leading-tight ${p.big ? 'text-2xl sm:text-4xl' : 'text-xl sm:text-2xl'}`}>{p.title}</h3>
                <p className={`mt-2 text-sm leading-relaxed text-white/80 sm:text-base ${p.big ? 'max-w-md' : ''}`}>{p.text}</p>
              </figcaption>
            </Reveal>
          ))}
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {FACTS.map(({ icon: Icon, title, text }, i) => (
            <Reveal
              key={title}
              delay={i * 70}
              className="group rounded-3xl border border-slate-100 bg-aiesec-light/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-aiesec-blue/20 hover:bg-white hover:shadow-xl hover:shadow-aiesec-blue/10"
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-white text-aiesec-blue shadow-sm transition-colors group-hover:bg-aiesec-blue group-hover:text-white">
                <Icon className="size-6" />
              </span>
              <h3 className="mt-5 text-lg font-black text-aiesec-dark">{title}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-slate-500">{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

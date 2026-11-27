import Reveal from './Reveal.jsx'
import { Heart, Home, MapPin, Plane, Sparkles, Users } from './Icons.jsx'

const OFFER = [
  { icon: Plane, title: 'Airport pickup', text: 'Someone from the LC waits for you when you land.' },
  { icon: Home, title: 'Accommodation support', text: 'We help you find a safe place to stay near your project.' },
  { icon: Users, title: 'A local buddy', text: 'A member who shows you the city and is one message away.' },
  { icon: Sparkles, title: 'Events and trips', text: 'Welcome nights, global villages and weekend trips across Tunisia.' },
]

const VALUES = ['Striving for excellence', 'Demonstrating integrity', 'Activating leadership', 'Living diversity', 'Enjoying participation', 'Acting sustainably']

export default function LC() {
  return (
    <section id="lc" className="relative overflow-hidden bg-aiesec-light py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
        <Reveal className="relative order-last lg:order-first">
          <div className="relative overflow-hidden rounded-[2rem] shadow-2xl shadow-aiesec-dark/20">
            <img
              src="/images/sousse-ribat-tower.jpg"
              alt="The Ribat of Sousse with its round watchtower"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover sm:aspect-[5/4] lg:aspect-[4/5]"
            />
            <div className="absolute inset-0 bg-linear-to-t from-aiesec-dark/80 via-transparent to-transparent" />
            <blockquote className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-9">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-white/70">Our motto</p>
              <p className="mt-2 text-2xl font-black italic leading-snug sm:text-3xl">&ldquo;Till we die, we will never forget.&rdquo;</p>
            </blockquote>
          </div>
          <div className="absolute -right-3 -top-5 rounded-2xl bg-white p-5 shadow-xl ring-1 ring-slate-900/5 sm:-right-6">
            <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
              <MapPin className="size-3.5" /> Hadrumetum
            </p>
            <p className="mt-1 max-w-[12rem] text-sm font-bold leading-snug text-aiesec-dark">
              The Phoenician and Roman name of Sousse, founded in the 9th century BC.
            </p>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-aiesec-blue">Our LC</p>
            <h2 className="mt-4 text-4xl font-black leading-tight tracking-tight text-aiesec-dark sm:text-5xl">
              AIESEC in Hadrumet, your family in Sousse
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-500">
              We are a local committee of AIESEC in Tunisia, run by students and young graduates from the universities of
              Sousse. Our mission is simple: develop leadership in young people through cross-cultural experiences, and make
              sure every exchange participant we host feels at home from the first day to the last.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {OFFER.map(({ icon: Icon, title, text }, i) => (
              <Reveal
                key={title}
                delay={i * 80}
                className="group flex gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-aiesec-blue/10"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-aiesec-blue/10 text-aiesec-blue transition-all group-hover:scale-110 group-hover:bg-aiesec-blue group-hover:text-white">
                  <Icon className="size-5" />
                </span>
                <div>
                  <h3 className="font-black text-aiesec-dark">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200} className="mt-10">
            <p className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-aiesec-dark">
              <Heart className="size-4 text-gv" /> The values we live by
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {VALUES.map((v) => (
                <li key={v} className="rounded-full border border-aiesec-blue/20 bg-white px-4 py-2 text-sm font-bold text-aiesec-dark transition-colors hover:border-aiesec-blue hover:bg-aiesec-blue hover:text-white">
                  {v}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

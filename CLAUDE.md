# AIESEC in Hadrumet — Opportunities Web Page

## The assignment (MMB Application 27.28 — Information Management, Q5)

> Build a web page using **React.js & TailwindCSS** that promotes AIESEC in Hadrumet and displays our open opportunities. The opportunities data live in this Google Sheet: https://docs.google.com/spreadsheets/d/1e_v-XLlZhVp9G3r-vJFq0LgJoGlJaYQjr32CzgVt-Gc/edit?gid=0#gid=0
> The web page should include: an **introduction to our country**, **our LC**, its **positioning in operations** (data can be static), and the **different opportunities with product, salary & date filters**. Focus on the **UI/UX** of the page and its **design & responsiveness**. Finally put the link of the **GitHub repo** of this page and make sure to make it **public**.

**Deadline:** the whole application is due Friday 27/11/2026 at 23:00 (Tunis time). The public GitHub repo link goes into the application PDF.

### Checklist of required sections
- [ ] Introduction to Tunisia (the country)
- [ ] Introduction to AIESEC in Hadrumet (the LC, based in Sousse)
- [ ] LC positioning in operations (static numbers are fine)
- [ ] Opportunities list, with filters for:
  - [ ] **Product** (Global Volunteer / Global Talent / Global Teacher)
  - [ ] **Salary** (range or min salary; "Not specified" counts as none/unpaid)
  - [ ] **Date** (the `Created` date: range, or newest/oldest sorting)
- [ ] Strong UI/UX, fully responsive (mobile → desktop)
- [ ] Public GitHub repo (and ideally a live deploy on Vercel / Netlify / GitHub Pages)

---

## Tech stack
- **Vite + React 19** (JavaScript, `.jsx`)
- **Tailwind CSS v4** via `@tailwindcss/vite` — config lives in `src/index.css` under `@theme` (there is no `tailwind.config.js` in v4)
- No other UI libraries unless needed. Icons: inline SVG or `lucide-react` if added.

### Commands
```bash
npm install
npm run dev      # local dev server
npm run build    # production build into dist/
```

## Project structure
```
aiesec-hadrumet-opportunities/
├── CLAUDE.md
├── index.html              # Lato font + AIESEC favicon loaded here
├── package.json
├── vite.config.js
├── public/
└── src/
    ├── main.jsx
    ├── App.jsx             # placeholder for now
    ├── index.css           # Tailwind import + brand tokens (@theme)
    ├── assets/
    ├── components/         # Navbar, Hero, Country, LC, Stats, Opportunities, Filters, OpportunityCard, Footer…
    └── data/
        └── opportunities.json   # snapshot of the Google Sheet (fallback)
```

---

## Data source

### Google Sheet
- Sheet ID: `1e_v-XLlZhVp9G3r-vJFq0LgJoGlJaYQjr32CzgVt-Gc`, tab `gid=0`
- Columns: `ID | Product | Title | Organisation | Duration | Created | Openings | Salary`
- 16 rows at time of writing.
- Dates are `DD/MM/YYYY` in the sheet. Salary is like `$600`, or the text `Not specified`.

**Plan:** fetch live from the sheet so it stays in sync, with `src/data/opportunities.json` as a fallback if the fetch fails.
- CSV endpoint (works if the sheet is shared "anyone with the link can view"):
  `https://docs.google.com/spreadsheets/d/1e_v-XLlZhVp9G3r-vJFq0LgJoGlJaYQjr32CzgVt-Gc/gviz/tq?tqx=out:csv&gid=0`
- Parse into: `{ id, product, title, organisation, duration, created (ISO date), openings (number), salary (number | null) }`
- Normalise product names: the sheet says "Global Teaching" — show it as **Global Teacher** (the official AIESEC product name).
- Show loading and error states, plus a "no results" state for the filters.

### Snapshot (already in `src/data/opportunities.json`)
| ID | Product | Title | Organisation | Created | Openings | Salary |
|---|---|---|---|---|---|---|
| 1 | Global Teaching | Italian Teaching | Progress Professional Center | 18/09/2026 | 1 | $600 |
| 2 | Global Teaching | English teacher | Progress Professional Center | 18/09/2026 | 2 | $600 |
| 3 | Global Teaching | German Teaching | Progress Professional Center | 18/09/2026 | 2 | $600 |
| 4 | Global Teaching | English teacher | 365 University | 14/04/2026 | 5 | $750 |
| 5 | Global Talent | Social media manager | Brandicom Agency | 27/10/2026 | 1 | $600 |
| 6 | Global Talent | interior architect | Zitouni Interior | 07/10/2026 | 1 | $600 |
| 7 | Global Talent | Marketing | Sast Education | 24/09/2026 | 3 | $700 |
| 8 | Global Talent | Social Media Manager | Progress Professional Center | 18/09/2026 | 4 | $600 |
| 9 | Global Talent | Web Developer | Progress Professional Center | 18/09/2026 | 4 | $600 |
| 10 | Global Talent | Graphic Designer | Polytechnique Sousse | 19/03/2026 | 2 | $500 |
| 11 | Global Volunteer | Aquatica [4 week] | tahec | 31/10/2026 | 10 | Not specified |
| 12 | Global Volunteer | Fingerprint [4 weeks] | Centre Culturel SEE | 31/10/2026 | 4 | Not specified |
| 13 | Global Volunteer | Fingerprint [4 weeks] | Centre Culturel SEE | 31/10/2026 | 6 | Not specified |
| 14 | Global Volunteer | Scale Up! [4 weeks] | atpec | 31/10/2026 | 4 | Not specified |
| 15 | Global Volunteer | Fingerprint [4 weeks] | atpec | 31/10/2026 | 3 | Not specified |
| 16 | Global Volunteer | Fingerprint [4 weeks] | atpec | 31/10/2026 | 3 | Not specified |

Duration is "short" for every row.

---

## Design: follow aiesec.org

The UI should look and feel like **https://aiesec.org**: same fonts, logo, colours, button style and overall layout. Open the site to check details while building.

### Brand tokens (already in `src/index.css`)
| Token | Hex | Use |
|---|---|---|
| `aiesec-blue` | `#037EF3` | Primary brand colour: buttons, links, accents, logo |
| `aiesec-dark` | `#052949` | Dark text and dark sections/footer |
| `aiesec-light` | `#F2F7FC` | Light section backgrounds |
| `gv` | `#F85A40` | Global Volunteer (red) |
| `gta` | `#0CB9C1` | Global Talent (teal) |
| `gte` | `#F48924` | Global Teacher (orange) |

- **Font:** Lato (AIESEC's brand font), loaded from Google Fonts in `index.html`. Bold or black weights for headings, regular for body.
- **Logo:** `https://cdn-expa.aiesec.org/assets/images/logos/aiesec-icon-blue.svg` (blue icon). Use the AIESEC wordmark in the navbar; "AIESEC in Hadrumet" next to or under it.
- Each product has its own colour. Use it for that product's badges, card accents and filter chips.

### aiesec.org layout to mirror
Sections on aiesec.org, from top to bottom:
1. Navbar: logo on the left, links, and a primary CTA button on the right
2. Hero: big headline ("Leadership is for every young person"), subheading, **"Let's get started!"** CTA button, and an image of young people
3. "Our Programs": three cards (Volunteer / Intern / Teach), each with its product colour
4. "Join AIESEC" block with a "Become a member" link and an image
5. "The AIESEC way" / "We create value-driven leaders" with a "Learn more" link
6. Stats band: 100+ countries & territories · 5,000+ partner organisations · 30,000+ experiences/year
7. Testimonial slider
8. Partner logos grid
9. Footer: link groups (Youth, Organizations, Resources, Company), social icons (Facebook, Instagram, Twitter/X, LinkedIn, YouTube), Terms & Privacy, copyright

### UI style notes
- Clean, airy, white backgrounds; plenty of whitespace; rounded corners; soft shadows on cards.
- Buttons: solid AIESEC blue with white bold text and rounded corners; secondary = outlined blue. Clear hover/focus states.
- Big bold headings in dark navy, body text in grey.
- Mobile first: the navbar collapses to a hamburger, cards stack in one column, filters go into a drawer or collapsible panel on mobile.
- Accessibility: good contrast, visible focus rings, alt text, semantic HTML.

---

## Page plan (our version)
1. **Navbar:** AIESEC logo + "Hadrumet". Links: About Tunisia, Our LC, Impact, Opportunities. CTA: "See opportunities".
2. **Hero:** e.g. "Live your leadership experience in Tunisia", with a short subheading about AIESEC in Hadrumet in Sousse and a CTA that scrolls to the opportunities.
3. **Introduction to Tunisia:** Mediterranean coast, history (Carthage, El Jem, the medina of Sousse, a UNESCO site), culture and food, climate, languages (Arabic, French, English widely spoken), safety and cost of living. Cards or an image grid.
4. **Our LC: AIESEC in Hadrumet:** based in Sousse ("Hadrumetum" is the ancient name of Sousse). Mission and values, what we offer exchange participants (pickup, accommodation support, buddy, events), and the motto "Till we die, we will never forget".
5. **Positioning in operations (static):** stats band and/or cards showing the LC's rank and numbers per product (iGV / iGT / iGTe) nationally. *Numbers are placeholders until the user provides real ones.*
6. **Opportunities:**
   - Product filter as colour-coded chips (All / GV / GTa / GTe)
   - Salary filter: min salary slider or ranges, plus a "Paid only" toggle
   - Date filter: from/to date range and sort by newest/oldest
   - Optional: search by title or organisation, and a reset filters button
   - Live count ("12 opportunities")
   - Card: product badge, title, organisation, openings, salary ("$600 / month" or "Unpaid / not specified"), created date, "Apply" button (link to aiesec.org)
7. **Testimonials** (optional, placeholder quotes from EPs)
8. **Footer:** like aiesec.org, with LC contact (aiesec.lc.hadrumet@gmail.com), socials and copyright.

## Conventions
- Functional components and hooks; one component per file in `src/components/`.
- Tailwind classes only (no separate CSS files except `index.css`).
- Filtering and sorting logic in a `useMemo`; keep filter state in `App` or a small hook.
- All page text in **English** (application rule).
- Don't copy aiesec.org images that are not ours. Use royalty-free photos (Unsplash/Pexels) of Tunisia or Sousse, credited if needed.

## Deliverable
1. Push to a **public** GitHub repo, e.g. `aiesec-hadrumet-opportunities`.
2. (Recommended) Deploy on Vercel or Netlify and put the live link in the README.
3. Put the GitHub repo link in the application PDF, under IM Q5.

## Status
- [x] Project scaffolded (Vite + React + Tailwind v4), brand tokens, data snapshot
- [x] Build the website (all sections, live sheet fetch + fallback, filters, responsive)
- [x] Premium "Choose your path" split section (`ChoosePath.jsx` + `PathPanel.jsx`): Volunteer half = dark orange gradient, Professional half = light orange gradient, each with its own photo, hover expand/spotlight/reveal
- [ ] Replace placeholder LC numbers in `src/data/stats.js` with real ones
- [ ] Push to a public GitHub repo and deploy (Vercel/Netlify)

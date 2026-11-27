# AIESEC in Hadrumet — Opportunities

A web page that promotes AIESEC in Hadrumet (Sousse, Tunisia) and lists our open opportunities, with filters for product, salary and date.

Built with React 19 (Vite) and Tailwind CSS v4.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## What's on the page
- **Choose your path**: a split section where visitors pick *Volunteer* (Global Volunteer) or *Professional* (Global Talent / Global Teacher). Clicking a side pre-filters the list and scrolls to it.
- **Discover Tunisia**: the country, its coast, history, culture and practical facts.
- **Our LC**: AIESEC in Hadrumet, what we offer exchange participants, our values and motto.
- **Positioning in operations**: static LC numbers and national ranking per product (`src/data/stats.js`).
- **Opportunities**: loaded live from the Google Sheet (CSV export), with `src/data/opportunities.json` as a fallback. Filters: product, search, paid only, minimum salary, date range, and sorting.

## Photo credits
- Medina of Sousse and the Ribat: Sharon Hahn Darlin, CC BY 2.0
- Ribat tower: Christian Manhart, CC BY-SA 3.0 IGO
- Amphitheatre of El Jem: Agnieszka Wolska, CC BY-SA 3.0
- Sidi Bou Said: Habib M'henni, CC BY 4.0
- People photos: Unsplash (Unsplash License)

All Tunisia photos are from Wikimedia Commons.

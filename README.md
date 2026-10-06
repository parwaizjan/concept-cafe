# concept-cafe

A reusable, translation-ready concept website for small cafés in Sri Lanka.
Visitors discover the café — menu, photos, what's-on, hours — and tap **Get
directions** to walk in. WhatsApp is a secondary **"Message us"** channel for group
bookings, catering and questions. No ordering, no payments, no backend, no monthly
cost.

This repository is a **concept / template**. It is shown to café owners as a live
demo and then cloned and rebranded into that café's real site. The demo lives at
`https://demo-cafe.zuvo.lk`, and is catalogued on `express.zuvo.lk`.

> If you are an AI agent or a developer about to change anything, read
> [`AGENTS.md`](./AGENTS.md) first. It contains the non-negotiable rules.

## Why this exists

A café earns from walk-ins and dwell time, not from orders taken on a website —
delivery runs through PickMe and Uber Eats. What a café needs online is to **get
found nearby, show the vibe, and get people through the door**. This concept gives
a café a fast, mobile-first page with its menu, photos, what's-on and one-tap
directions, plus a WhatsApp "message us" button for everything else.

- **Zero running cost** — static files on Cloudflare's free tier.
- **Discovery-first** — menu, gallery, hours and one-tap Google Maps directions.
- **WhatsApp "message us"** — group bookings, catering and questions, never "Order now".
- **Owner-editable menu/prices** — via a free Google Sheet (see below).
- **Translation-ready** — English ships first; Sinhala/Tamil structure is in place.
- **Fast to clone** — branding and content are centralized so a rebrand is quick.

## Quickstart

```sh
corepack pnpm install   # install deps (pnpm 12)
corepack pnpm dev       # http://localhost:4321
corepack pnpm build     # static output in dist/
corepack pnpm preview   # preview the built site
corepack pnpm check     # astro check (types + content schema)
corepack pnpm lint      # prettier check
corepack pnpm deploy    # wrangler deploy
```

If `pnpm` is installed globally, drop the `corepack` prefix.

## Documentation

| Doc                                                                | What it covers                                                 |
| ------------------------------------------------------------------ | -------------------------------------------------------------- |
| [`AGENTS.md`](./AGENTS.md)                                         | Purpose, rules, where to change what, definition of done       |
| [`docs/DECISIONS.md`](./docs/DECISIONS.md)                         | Every locked decision and its rationale                        |
| [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md)                   | Stack, folder structure, data flow, i18n, components           |
| [`docs/DESIGN-BRIEF.md`](./docs/DESIGN-BRIEF.md)                   | Sections, mobile-first rules, theme tokens, image shot list    |
| [`docs/CONTENT-AND-MENU.md`](./docs/CONTENT-AND-MENU.md)           | Menu data, the Google Sheet, what's-on, translations           |
| [`docs/DISCOVERY-AND-CONTACT.md`](./docs/DISCOVERY-AND-CONTACT.md) | SEO, JSON-LD, one-tap directions and the WhatsApp flow         |
| [`docs/CUSTOMIZATION.md`](./docs/CUSTOMIZATION.md)                 | Clone/rebrand checklist for a real café                        |
| [`docs/CLIENT-CHECKLIST.md`](./docs/CLIENT-CHECKLIST.md)           | Client-facing intake list and ready-to-send WhatsApp message   |
| [`docs/DEPLOYMENT.md`](./docs/DEPLOYMENT.md)                       | Cloudflare Workers, domain, GitHub, indexing headers           |
| [`docs/EXPRESS-HANDOFF.md`](./docs/EXPRESS-HANDOFF.md)             | Exact changes the express.zuvo.lk repo needs to list this demo |

## Status

Implemented and building clean (`pnpm check` 0 errors, `pnpm lint`, `pnpm build`,
`wrangler deploy --dry-run`). The documentation set was written first (see
`docs/DECISIONS.md` D-C14) and then built as a light, warm craft-coffee single-page
site with anchored sections.

The demo brand is **Fern & Bean** — a Colombo 05 café. English is enabled; the
`si`/`ta` structure is in place but not yet translated. The demo ships
`indexable: false` plus the sample-website ribbon, an empty `menu.sheetId` (so it
runs from the content collections until a Google Sheet is connected) and
`menu.mode: "runtime"`.

- Single page with anchored sections: Hero, Menu, Gallery, What's-on, Location,
  Reviews and a "Message us" CTA band, plus `404` and `robots.txt`.
- Primary CTAs **View the menu** and **Get directions**; WhatsApp is the secondary
  **Message us** channel.
- Google Sheet reader shared by the runtime and build-time paths
  (`src/lib/sheet.ts`, `scripts/fetch-menu.ts`).
- Licensed stock photography (Unsplash/Pexels) optimized to WebP.
- `CafeOrCoffeeShop` / `LocalBusiness` JSON-LD and per-page meta.

Remaining implementation detail: the exact event-driven build trigger for clones.
See `docs/CONTENT-AND-MENU.md` and `AGENTS.md` §8.

## The demo brand

| Field        | Value                                    |
| ------------ | ---------------------------------------- |
| Name         | **Fern & Bean**                          |
| Tagline (EN) | Good coffee, slow mornings, Colombo 05.  |
| Location     | 42 Havelock Road, Colombo 05, Sri Lanka  |
| WhatsApp     | +94 74 343 0033 (Zuvo demo number)       |
| Hours        | Mon–Fri 07:00–19:00; Sat–Sun 08:00–20:00 |
| Currency     | LKR (Rs.)                                |

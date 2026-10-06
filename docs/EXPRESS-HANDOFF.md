# Express hand-off — listing `demo-cafe.zuvo.lk`

This document is for the agent/developer who maintains
`~/Projects/zuvo-studio-express` (**express.zuvo.lk**). It lists the exact changes
needed to list the new café demo. The `concept-cafe` repo must **not** edit the
express repo; apply these there.

The café category page and position already exist and are **discovery-first**
(express commit `8b50cdc`, "Make the cafe category discovery-first", and decision
D-030). `src/data/categories.ts` already has the `cafe` entry with
`ctaLabel: 'Chat on WhatsApp'` and the discovery-first includes/FAQ/add-ons. Only
the **demo** is `coming-soon`. This hand-off flips it to `live` and updates the
registry docs.

Verify the live demo first: the home page loads at 375px, **View the menu** jumps
to `#menu`, **Get directions** opens Google Maps, and **Message us** opens WhatsApp
to +94 74 343 0033.

## 1. `src/data/demos.ts` — flip the café demo to live

Replace the existing `cafe` entry:

```ts
  {
    slug: 'cafe',
    category: 'Café',
    tagline: 'Your menu, your space and your location in one link.',
    url: '',
    screenshot: '',
    features: ['Menu', 'Gallery', 'Location'],
    status: 'coming-soon',
    order: 5,
  },
```

with:

```ts
  {
    slug: 'cafe',
    category: 'Café',
    tagline: 'Your menu, your space and your location in one link.',
    url: 'https://demo-cafe.zuvo.lk',
    screenshot: '/demos/cafe.webp',
    features: ['Menu with prices', 'Gallery', 'Location & directions', 'WhatsApp enquiries'],
    status: 'live',
    order: 5,
  },
```

`CategoryCard.astro` and `DemoPreview.astro` read `getDemo(category.demoSlug)`, so
this single edit makes the home card and `/websites/cafe/` show the live demo,
screenshot and link. No page/code changes are needed.

## 2. `public/demos/cafe.webp` — add the screenshot

- Capture the live demo and save to `public/demos/cafe.webp`.
- Match the existing screenshots: **1280×960 (4:3)**, WebP. `laundry.webp`,
  `bakery.webp`, `salon.webp` and `restaurant.webp` are all 1280×960.
- Capture the mobile/home view (a phone-width screenshot scaled to 4:3 is what the
  other demos use). The hero + menu is the most representative frame.

## 3. `docs/demos.md` — update the registry

In the **Registry** table, change the Café row:

```md
| Café | `cafe` | Rs. 34,500 | Rs. 14,000 | https://demo-cafe.zuvo.lk | `/websites/cafe/` | **Live** |
```

In **Live demos**, add a café line, e.g.:

```md
- **Café** ("Fern & Bean", light/warm craft-coffee) — menu with prices, gallery,
  what's-on, location & one-tap directions, WhatsApp enquiries (discovery-first, not
  ordering), EN (SI/TA ready).
```

## 4. `docs/product.md` — category catalogue table

Change the Café row's Demo column from `Planned` to
`` `demo-cafe.zuvo.lk` ✅ ``.

## 5. `docs/strategy.md` — target categories table

Change the Café row's Demo column from `Planned` to
`` `demo-cafe.zuvo.lk` ✅ ``.

## 6. `docs/roadmap.md` — phase 7 progress

In **Phase 7 — Growth**, update:

```md
- [~] Build the remaining category demos — **laundry ✅, bakery ✅, salon ✅,
  restaurant ✅, café ✅**; spa outstanding.
```

## 7. `docs/decisions.md` — optional note

If desired, add a decision entry recording that the fifth demo (`concept-cafe`)
shipped and that it is deliberately **discovery-first, not ordering-first** (per
D-030), light/warm craft-coffee to stay visually distinct from the other demos, with
a single anchored page and no baseline ordering (ordering stays a paid add-on). No
decision is strictly required for listing.

## Notes / possible follow-ups

- **Copy alignment:** `docs/product.md` §"Value proposition" still lists "WhatsApp
  ordering" as a generic practical feature. Café page copy and `categories.ts` are
  already discovery-first; only the generic hub copy could optionally be softened to
  "WhatsApp enquiries" for consistency. Do not imply café online ordering is
  included — it is an add-on.
- **Languages:** express markets Sinhala/Tamil as paid add-ons. The demo ships
  English-only with translation structure in place, which matches that position.
- **Screenshot for the hub** must be captured after the demo is deployed and
  polished; do not advertise the category (or publish conflicting copy) before the
  demo is live.
- **Noindex:** the demo stays `noindex` and carries the sample-website ribbon (per
  express `strategy.md` §7 / `demos.md` conventions).

## What is already in express (no change needed)

- `cafe` category entry in `src/data/categories.ts` (discovery-first includes,
  add-ons, FAQs, `ctaLabel: 'Chat on WhatsApp'`, SEO).
- Demo page route `/websites/cafe/`.
- Category grid card rendering from `demos.ts`.

Handoff verified against express as of 2026-10-06 (commit state at time of writing).

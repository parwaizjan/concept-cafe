# Decision Log

Append-only. Each entry: ID, date, decision, rationale, alternatives considered.

Context: `concept-cafe` is the fifth entry in the Zuvo Web Studio Express concept
series (after `concept-laundry-shop`, `concept-bakery`, `concept-salon` and
`concept-restaurant`). It is built to be cloned and rebranded quickly for paying
café clients. See `AGENTS.md` for the rules, and the express hub's D-027 (Café split
from Restaurant) and D-030 (cafés are discovery-first) for the business positioning.

---

## D-C01 — Base: port `concept-restaurant`'s structure

- **Date:** 2026-10-06
- **Decision:** Build `concept-cafe` from the structure and patterns of
  `concept-restaurant`: Astro Content Collections for menu/categories, a
  `src/data/site.ts` single source of truth, `src/i18n/ui.ts` UI catalog, a Google
  Sheet pipeline for owner-editable prices, and the same Astro 7 / Tailwind v4 /
  Cloudflare toolchain. The restaurant's multi-page shape is collapsed to a single
  page (D-C14).
- **Rationale:** Restaurant is the newest sibling and already ships the Sheet
  reader, gallery, visit/map, i18n and the exact static/Cloudflare setup on the
  current toolchain. Cafés share the menu + photos + location domain, so reuse keeps
  turnaround fast.
- **Alternatives:** `concept-salon` (equivalent shape; slightly older than
  restaurant — rejected: restaurant is newer); build fresh (rejected: no reuse
  benefit).

## D-C02 — Visually distinct from every sibling

- **Date:** 2026-10-06
- **Decision:** The café concept deliberately diverges in skin: a **light, warm,
  airy craft-coffee** design (cream canvas, espresso-brown type/buttons, matcha/
  olive accent), a soft editorial hero, a coffee-house menu treatment, a roomy
  gallery and a calm, magazine-like rhythm. It must not resemble the laundry-blue,
  bakery-crumb, salon-rose or restaurant-charcoal demos.
- **Rationale:** User and express direction: the Express catalogue will look
  repetitive if every concept reuses the same layout. Reuse the architecture, not
  the skin.
- **Alternatives:** reuse restaurant's dark ember skin (rejected by rule §3.12);
  another mid-tone palette (rejected: less distinct from bakery/salon warmth).

## D-C03 — Toolchain: latest Astro 7 stack on pnpm

- **Date:** 2026-10-06
- **Decision:** Pin the current Astro 7 line: **Astro 7.3.5**, **Tailwind CSS
  4.3.3** via `@tailwindcss/vite` 4.3.3, **`@astrojs/cloudflare` 14.3.3**,
  **`@astrojs/sitemap` 3.7.4**, **`@astrojs/check` 0.9.10**, **TypeScript ^6.0.3**,
  **Node 22**, **pnpm 12.5.1**. `wrangler` pinned to **4.147.0**.
- **Rationale:** Matches the sibling Astro 7 projects so the concepts share one
  mental model and one dependency surface.
- **TypeScript exception:** the registry's latest is TypeScript 7, but `astro check`
  still relies on the TypeScript 6 programmatic API. Pin `^6.0.3` until `astro check`
  supports TS 7.
- **Alternatives:** bakery's Astro 5 / npm (rejected); TypeScript 7 (blocked).

## D-C04 — Adapter and static output

- **Date:** 2026-10-06
- **Decision:** Use `@astrojs/cloudflare` with `output: 'static'`,
  `session: false` and `imageService: 'compile'`. All routes are prerendered; no
  on-demand/SSR code ships.
- **Rationale:** The current official Cloudflare integration; `session: false`
  avoids a KV namespace and `compile` optimizes imported content images at build
  time. Keeps hosting free.
- **Alternatives:** adapter-less static `dist/` (works, but diverges from the Astro
  7 siblings); SSR (rejected: breaks the zero-cost/static rule).

## D-C05 — Discovery-first, not ordering-first

- **Date:** 2026-10-06
- **Decision:** The baseline is a **local discovery brochure**. Primary actions are
  **View the menu** and **Get directions**. WhatsApp is a **secondary "Message us"**
  channel for group bookings, catering and questions — never labelled "Order now".
  No cart, checkout, online ordering, table booking, contact form or email endpoint.
- **Rationale:** Express D-030: cafés earn from walk-ins and dwell time; delivery
  runs through PickMe/Uber Eats. Forcing ordering misrepresents the business and
  converts worse. The site's job is to be found nearby, show the vibe, and get
  people through the door.
- **Alternatives:** treat cafés like restaurants with ordering/reservations as
  baseline (rejected: wrong model, mismatched CTA).

## D-C06 — One-tap directions is a first-class feature

- **Date:** 2026-10-06
- **Decision:** A `Get directions` link built by `src/lib/directions.ts` to
  `https://www.google.com/maps/dir/?api=1&destination=<lat>,<lng>` appears in the
  hero, the location section, the header CTA and the footer. The location section
  also embeds a map. The destination is `site.geo` (lat/lng), falling back to the
  address if geo is absent.
- **Rationale:** Conversion for a café is a physical visit. A single tap that
  starts navigation is more valuable than any on-site action.
- **Alternatives:** link only to the map listing (rejected: an extra tap and it
  does not start navigation); embed only (rejected: cannot launch the app).

## D-C07 — Owner edits the menu and prices via a Google Sheet

- **Date:** 2026-10-06
- **Decision:** The item list and live prices come from a shared, free Google Sheet.
  The demo fetches the public Sheet in the browser at runtime (`mode: "runtime"`);
  production clones fetch during the build and redeploy (`mode: "build"`). Leaving
  `sheetId` empty runs entirely from the content collections. The owner edits price,
  availability and a "special"/what's-on flag; they do not add new categories or
  items.
- **Rationale:** Menu prices and specials change often; the owner must update them
  for free with minimal tech skill, and no CMS may be introduced. Keeps one pattern
  across all clones. There is always a graceful static fallback if the Sheet fails.
- **Alternatives:** agency-managed files only (rejected: slower); a CMS/admin
  (rejected by rule §3.4).

## D-C08 — English first, translation-ready

- **Date:** 2026-10-06
- **Decision:** Ship **English only** in the demo: `locales: ['en']`. The `Locale`
  type is `'en' | 'si' | 'ta'`, localized fields (`LocalizedText`) exist on all
  content, `src/i18n/ui.ts` is structured for `si`/`ta`, and locale routing is
  configured so enabling a language is a config + content change, never a refactor.
- **Rationale:** Express markets Sinhala/Tamil as paid add-ons and the demo ships
  English-first, matching the position. Matches sibling architecture.
- **Alternatives:** trilingual now (rejected: translations not yet available);
  English-only hardcoded (rejected: violates rule §3.6).

## D-C09 — Demo brand is invented: Fern & Bean

- **Date:** 2026-10-06
- **Decision:** The demo uses an invented placeable café: **Fern & Bean** at 42
  Havelock Road, Colombo 05, LKR pricing, Instagram/Facebook `@fernandbean`. Real
  clone values replace it via `docs/CUSTOMIZATION.md`.
- **Rationale:** The concept must be pitchable without a real client and must never
  use another business's trademark. "Fern & Bean" reads warm, local and craft-coffee
  and fits the palette.
- **Alternatives:** use a real café (rejected: permissions/trademark); no brand
  (rejected: weaker demo).

## D-C10 — Design direction: warm cream, espresso and matcha

- **Date:** 2026-10-06
- **Decision:** Warm cream canvas, white surfaces, espresso-brown primary for
  buttons, a matcha/olive accent for eyebrows and badges, and a warm near-black
  body text. Editorial display serif headings (**Newsreader**) with a clean humanist
  sans body (**Figtree**). Generous whitespace, soft photography, subtle hairlines.
- **Rationale:** Express-approved and clearly distinct from laundry-blue,
  bakery-crumb, salon-rose and restaurant-charcoal. Reads as a modern specialty
  café.
- **Alternatives:** a dark coffee-house skin (rejected: too close to restaurant);
  a bright Scandinavian white (rejected: colder, less craft-coffee).

## D-C11 — Demo domain, noindex and the sample ribbon

- **Date:** 2026-10-06
- **Decision:** Deploy to **https://demo-cafe.zuvo.lk** (`workers_dev: false`),
  Worker name `concept-cafe`, source a private GitHub repo
  `parwaizjan/concept-cafe`. `indexable: false` plus the `X-Robots-Tag: noindex`
  header in `public/_headers` keep the demo out of search. A slim, non-dismissible,
  brand-tinted ribbon above the header on every page reads "Sample website — a demo
  by Zuvo Web Studio Express" with an optional "Message us" link. A real clone flips
  all three indexing switches and sets `showDemoRibbon: false`.
- **Rationale:** Demo is a pitch tool shared by link; real clones want SEO. The
  ribbon is an honesty/rights signal (stock imagery, invented brand).
- **Alternatives:** index the demo (rejected by rule §3.5); no ribbon (rejected by
  express strategy §7).

## D-C12 — Imagery: licensed stock, optimized to WebP

- **Date:** 2026-10-06
- **Decision:** Demo imagery is licensed stock from **Unsplash or Pexels** (free
  for commercial use, no on-page attribution required), committed as optimized WebP
  (≤ ~200 KB, ≤ ~1600 px wide). Canva AI is an acceptable fallback where stock is
  weak. No text, logos or watermarks. Brand marks (`logo.svg`, `favicon.svg`) are
  made in-repo.
- **Rationale:** Express direction: real stock photography reads more trustworthy
  for food than AI, and both sources are legally safe for a demo. The restaurant
  used Canva AI; real stock is preferred for café/food.
- **Alternatives:** Canva AI as primary (rejected: can look uncanny for food);
  wait for client photos (rejected: blocks the demo).

## D-C13 — Documentation-first

- **Date:** 2026-10-06
- **Decision:** Write and maintain `AGENTS.md`, `README.md` and `/docs` **before**
  application code, and keep them current as the source of durable context.
- **Rationale:** Preserves decisions across conversations; required by the studio
  workflow and explicitly requested for this concept.
- **Alternatives:** code-first (rejected).

## D-C14 — Single-page with anchored sections

- **Date:** 2026-10-06
- **Decision:** The site is a **single page** (`/`) with anchored sections: hero →
  menu → gallery → what's-on → location → reviews → "message us" CTA band, plus
  `404` and generated `robots.txt`. There is **no** `/menu`, `/gallery`, `/about`
  or `/visit` route. A `[lang]` variant is kept for future locales.
- **Rationale:** Express sells the café baseline as a single-page, mobile-first
  site (anchored sections); a **multi-page menu is a paid add-on**. A café's menu is
  short enough to sit on the home page, and discovery rewards a single scannable
  page.
- **Alternatives:** multi-page like restaurant (rejected: bakes a paid add-on into
  the baseline, weaker fit for discovery).

## D-C15 — Add-ons are hinted, never baseline

- **Date:** 2026-10-06
- **Decision:** Online ordering/pickup, delivery-app links, table/group booking,
  loyalty, an events calendar and an Instagram feed are **paid add-ons**. The demo
  does not implement them; the CTA band and docs mention that they are available.
- **Rationale:** Matches the express café category add-on list (§4.4) and prevents
  scope creep in the baseline.
- **Alternatives:** ship ordering (rejected: wrong model, D-C05); omit any mention
  (rejected: hides a supported upsell).

## D-C16 — JSON-LD: `CafeOrCoffeeShop`

- **Date:** 2026-10-06
- **Decision:** The home page emits `CafeOrCoffeeShop` (a `LocalBusiness`)
  structured data: name, description, url, image, telephone, address (with locality
  and country), geo coordinates, opening hours, price range, menu URL and `sameAs`
  socials. Additional `Restaurant`/`Menu` subtypes are not used.
- **Rationale:** Google Business Profile and local search are a café's biggest
  discovery asset; precise, complete local structured data supports them.
- **Alternatives:** generic `LocalBusiness` only (rejected: less specific);
  `Restaurant` (rejected: café is the correct type).

## D-C17 — Configuration lives in `src/data/site.ts`

- **Date:** 2026-10-06
- **Decision:** All café-specific values live in `src/data/site.ts`, matching the
  newest siblings (salon/restaurant). The older root `site.config.ts` convention
  (laundry/express) is **not** used.
- **Rationale:** The template we clone is the newest sibling; one convention across
  the current concept series reduces rebrand mistakes.
- **Alternatives:** root `site.config.ts` (rejected: older convention, breaks
  parity with the cloned template).

## D-C18 — No analytics or pixels in the concept

- **Date:** 2026-10-06
- **Decision:** The concept ships without analytics or pixels. Cloudflare Web
  Analytics and/or Meta Pixel may be added per client later behind config, with a
  privacy page added at the same time.
- **Rationale:** Keep the concept lean and avoid a required consent/privacy surface.
- **Alternatives:** ship Cloudflare Web Analytics now (deferred).

## D-C19 — No sticky/floating CTA

- **Date:** 2026-10-06
- **Decision:** There is no mobile sticky bar and no floating WhatsApp button. The
  header carries a persistent **Get directions** CTA; the hero and location section
  carry the full set of actions. The footer and CTA band carry the "Message us"
  action.
- **Rationale:** Restaurant removed its sticky bar (D-R23) after mobile review;
  express removed its floating button (D-029). Keeping the header CTA as the single
  persistent action avoids duplicate, competing buttons.
- **Alternatives:** sticky "menu + directions" bar (rejected: duplicates header and
  crowds the viewport); floating WhatsApp bubble (rejected: competes with the
  discovery CTAs).

## D-C20 — Reviews are invented placeholders; no rating badge

- **Date:** 2026-10-06
- **Decision:** The reviews section uses invented, first-name/initial placeholders
  with generic copy (consistent with the restaurant demo). It does **not** show an
  aggregate star rating or a "4.9 on Google" badge.
- **Rationale:** A demo has no real customers; a fake aggregate rating would be
  misleading and risks structured-data abuse. Plain quotes are enough to convey the
  section.
- **Alternatives:** omit reviews (rejected: weaker social proof); fabricated Google
  rating (rejected: dishonest).

---

## Open questions

Copied from `AGENTS.md` §8 and tracked there:

- Whether clones need Privacy/Terms pages.
- Sheet build trigger for production clones.
- Where `si`/`ta` item names come from once translated.
- Capturing `public/demos/cafe.webp` for express.
- Native-speaker review of translations before pitching.

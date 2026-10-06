# Design Brief

## Brand feeling

**Light, warm, airy and craft-coffee.** A neighbourhood café you would settle into
for a slow morning — coffee, brunch, plants and good light. Warm cream canvas,
espresso-brown type and buttons, a matcha/olive accent, generous whitespace, soft
photography and hairline rules. Editorial serif headings (**Newsreader**) with a
clean humanist sans body (**Figtree**). It must feel clearly different from the
laundry (blue), bakery (crumb orange), salon (rose) and restaurant (dark charcoal)
concepts — see `DECISIONS.md` D-C02 and D-C10.

Demo brand (placeholder, invented — see `DECISIONS.md` D-C09):

| Field        | Value                                    |
| ------------ | ---------------------------------------- |
| Name         | **Fern & Bean**                          |
| Tagline (EN) | Good coffee, slow mornings, Colombo 05.  |
| Location     | 42 Havelock Road, Colombo 05, Sri Lanka  |
| WhatsApp     | +94 74 343 0033 (Zuvo demo number)       |
| Hours        | Mon–Fri 07:00–19:00; Sat–Sun 08:00–20:00 |
| Currency     | LKR (Rs.)                                |

## Theme tokens

Edit `src/styles/theme.css` to rebrand; `global.css` maps tokens to Tailwind.

| Token                | Value     | Use                             |
| -------------------- | --------- | ------------------------------- |
| `--c-bg`             | `#FBF7EF` | Warm cream page canvas          |
| `--c-surface`        | `#FFFFFF` | Cards / raised panels           |
| `--c-surface-alt`    | `#F2EADD` | Subtle section background       |
| `--c-text`           | `#2B2620` | Primary text (warm near-black)  |
| `--c-text-muted`     | `#766A5B` | Secondary text                  |
| `--c-primary`        | `#4A342A` | Espresso — buttons              |
| `--c-primary-strong` | `#38261D` | Primary hover                   |
| `--c-on-primary`     | `#FBF7EF` | Text on primary                 |
| `--c-accent`         | `#6E8B4B` | Matcha/olive — badges, eyebrows |
| `--c-border`         | `#E5DCCB` | Hairline borders                |
| `--c-success`        | `#4E7D4E` | Vegetarian / available          |
| `--c-danger`         | `#B2463A` | Sold out / error                |
| `--c-focus`          | `#1D4ED8` | Focus ring                      |

- Radius: `--radius-sm 6px`, `--radius-md 12px`, `--radius-lg 20px`.
- Shadow: one soft `--shadow-soft` for raised cards only; default to hairlines and
  photography.
- Type: `font-heading` **Newsreader** (warm editorial serif), `font-body`
  **Figtree** (humanist sans). Both stacks append Noto Sans Sinhala and Noto Sans
  Tamil.
- Scale: hero `text-5xl sm:text-7xl` (display), section headings
  `text-3xl sm:text-4xl`, body `text-base`, menu prices `text-base tabular-nums`,
  meta `text-sm`.
- Utilities: `bg-bg bg-surface text-text text-text-muted border-border bg-primary
text-primary bg-accent`. Classes: `.eyebrow .btn-primary .btn-outline .card`
  and `.price-leader` (item name · dotted rule · price).
- Light theme is the default and only shipping theme. Presets may live in
  `src/styles/theme.css` with a `data-theme` attribute for clone variety (e.g. a
  darker "Roast" preset, a cooler "Mint" preset).

## The single page and its sections

One route (`/`) with anchored sections so the whole café is scannable on a phone:

| #   | Section   | Anchor      | Job                                                                  |
| --- | --------- | ----------- | -------------------------------------------------------------------- |
| 1   | Hero      | —           | Atmosphere photo, name, tagline, **View menu** + **Get directions**. |
| 2   | Menu      | `#menu`     | Full menu by category with prices, veg markers, specials.            |
| 3   | Gallery   | `#gallery`  | Space + food photos; the decisive trust signal.                      |
| 4   | What's-on | `#whats-on` | Specials, seasonal drinks and small events.                          |
| 5   | Location  | `#visit`    | Address, hours, embedded map, one-tap directions.                    |
| 6   | Reviews   | `#reviews`  | Short invented quotes (no rating badge).                             |
| 7   | CTA band  | —           | "Message us on WhatsApp" for group bookings/catering/questions.      |
| 8   | Footer    | —           | Brand, anchors, socials, hours, address, "Message us".               |

There is no `/menu`, `/gallery`, `/about` or `/visit` route (see D-C14). Legal pages
are deferred (see `AGENTS.md` §8). `robots.txt` is generated.

## Mobile-first rules

Most traffic arrives on phones from social apps or a Google search, often on 3G.

- Design and test at **375px first**, then scale up.
- Tap targets ≥ 44px; primary actions thumb-reachable.
- There is **no sticky/floating CTA** (D-C19). The header **Get directions** button
  is the single persistent action; the hero carries both primary actions.
- Images are pre-sized, lazy-loaded below the fold, and served with explicit
  `width`/`height` to avoid layout shift. The hero uses `heroImageMobile` below
  `sm`.
- The header stays a single row on desktop and uses a horizontally scrollable
  anchor nav on mobile (no hamburger). The sticky category tabs on the menu park
  directly beneath the ribbon + header via the `--header-h` CSS variable.
- No horizontal scroll; no more than one visual accent competing with the CTAs.
- Verify the espresso-on-cream button and matcha badge contrast at WCAG AA.

## Component inventory

| Component                                  | Notes                                                                   |
| ------------------------------------------ | ----------------------------------------------------------------------- |
| `SampleRibbon`                             | Demo-only slim strip above the header; "sample website" + "Message us". |
| `Header`                                   | Logo, anchor nav, **Get directions** CTA, language switcher.            |
| `Footer`                                   | Brand, anchors, socials, hours, address, "Message us", copyright.       |
| `LangSwitcher`                             | Hidden when only one locale is enabled.                                 |
| `Seo`                                      | Title/description/canonical/OG/hreflang/JSON-LD helpers.                |
| `MediaImage`                               | Renders an optimized imported WebP or a public path.                    |
| `hero/CafeHero`                            | Editorial hero with atmosphere image and the two primary CTAs.          |
| `menu/CategoryTabs`                        | Sticky category jump chips.                                             |
| `menu/MenuList`                            | Category-grouped menu.                                                  |
| `menu/MenuItem`                            | Name, description, dotted leader, price, veg badge, sold-out.           |
| `menu/DietaryBadges`                       | Veg marker (and future dietary tags).                                   |
| `menu/SpecialsStrip`                       | Sheet-driven `special: true` items on the home page.                    |
| `menu/SignatureItems`                      | Featured items with images.                                             |
| `gallery/GalleryGrid`                      | Responsive image grid.                                                  |
| `whatson/WhatsOnList`                      | Specials / seasonal / events list.                                      |
| `visit/LocationSection`                    | Address, hours, map embed, directions block.                            |
| `visit/ContactLinks`, `visit/OpeningHours` | Reusable visit blocks.                                                  |
| `visit/MapEmbed`                           | Lazy iframe/local map embed.                                            |
| `reviews/Reviews`                          | Invented short quotes.                                                  |
| `ContactSection`                           | "Message us" enquiry form (topic chips + name + note) + add-ons hint.   |
| `pages/HomePage.astro`                     | Composes the single page from the above.                                |

## Accessibility

- Semantic landmarks (`header`, `nav`, `main`, `footer`), one `h1` per page.
- All images have localized alt text; decorative images are `alt=""`.
- Anchor nav is keyboard operable; sticky tabs are links, not JS tabs.
- Contrast targets WCAG AA: espresso on cream, cream on espresso, matcha/success
  badges against light surfaces.
- `lang` set per locale; focus visible on all interactive elements.
- Veg badges never rely on colour alone: text + accessible name.

## Image shot list (licensed stock)

All demo imagery is **licensed stock** from Unsplash or Pexels (free for commercial
use, no on-page attribution required), exported/optimized to **WebP** (≤ ~200 KB,
≤ ~1600 px wide) and committed (see `DECISIONS.md` D-C12). Keep a warm, natural,
daylight "specialty café" look across the set. No text, logos or watermarks.

**Search terms to use** (Unsplash / Pexels):

| Slot          | File                                   | Size / ratio | Stock search terms                                          |
| ------------- | -------------------------------------- | ------------ | ----------------------------------------------------------- |
| Hero (wide)   | `public/images/hero.webp`              | 2000×1250    | "sunlit cafe interior plants", "coffee shop morning light"  |
| Hero (mobile) | `public/images/hero-mobile.webp`       | 1200×1600    | "latte on wooden table cafe", "cafe table plants vertical"  |
| Open Graph    | `public/og.jpg`                        | 1200×630     | "cafe flat lay coffee and pastries", room for logo top-left |
| Featured 1    | `src/assets/dishes/flat-white.jpg`     | 1200×900     | "flat white latte art cup", "cappuccino on saucer"          |
| Featured 2    | `src/assets/dishes/avocado-toast.jpg`  | 1200×900     | "avocado toast poached egg", "brunch toast plate"           |
| Featured 3    | `src/assets/dishes/cinnamon-roll.jpg`  | 1200×900     | "cinnamon roll pastry", "fresh baked pastry counter"        |
| Featured 4    | `src/assets/dishes/matcha-latte.jpg`   | 1200×900     | "iced matcha latte glass", "matcha latte on table"          |
| Gallery 1     | `src/assets/gallery/interior.jpg`      | 1200×1600    | "cafe interior plants natural light"                        |
| Gallery 2     | `src/assets/gallery/coffee-pour.jpg`   | 1200×900     | "barista pouring espresso", "coffee brewing"                |
| Gallery 3     | `src/assets/gallery/seating.jpg`       | 1200×900     | "cafe seating window light", "studio cafe interior"         |
| Gallery 4     | `src/assets/gallery/pastries.jpg`      | 1200×1600    | "pastry display cafe", "croissants counter"                 |
| Gallery 5     | `src/assets/gallery/brunch.jpg`        | 1200×900     | "brunch table overhead", "breakfast spread cafe"            |
| Gallery 6     | `src/assets/gallery/plants-detail.jpg` | 1200×1600    | "cafe plant detail", "coffee cup plant shadow"              |

Brand marks (`public/logo.svg`, `public/favicon.svg`) are simple wordmark SVGs made
in-repo (espresso + matcha on cream), not stock.

Preferred delivery: download the stock image at the listed pixel size, convert to
WebP (quality ~80), and commit. Imported assets (`src/assets/**`) are additionally
optimized to WebP variants by Astro at build time; the two hero images are served
as public CSS backgrounds (no build optimization), so pre-convert those. Keep each
file under ~200 KB.

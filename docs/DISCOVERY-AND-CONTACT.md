# Discovery and contact

This is the model the whole concept exists to sell: **get found nearby, show the
vibe, and get people through the door.** Read it before touching `src/lib/directions.ts`,
`src/lib/contact.ts`, `src/lib/whatsapp.ts`, `src/components/Seo.astro` or the
`visit/*` components.

## 1. Principles

- **Discovery, not ordering.** The two primary actions are **View the menu** and
  **Get directions**. WhatsApp is a **secondary "Message us"** channel, never
  "Order now" (see `docs/DECISIONS.md` D-C05).
- **The physical visit is the conversion.** Every discovery element should make it
  easier to walk in: menu, photos, hours, one-tap navigation.
- **No backend, no payment, no account, no cart.** Enquiries are messages.
- **Mobile-first.** Assume the visitor is on a phone, arriving from a Facebook,
  Instagram or Google search.
- **Never lose the enquiry.** The WhatsApp link contains the full message; a stale
  price never blocks contacting the café.

## 2. Primary actions

| Action             | Where                                      | Behaviour                                   |
| ------------------ | ------------------------------------------ | ------------------------------------------- |
| **View the menu**  | Hero, header nav, footer                   | In-page jump to `#menu` (smooth scroll).    |
| **Get directions** | Hero, header CTA, location section, footer | Opens Google Maps directions to `site.geo`. |
| **Message us**     | CTA band, footer, sample ribbon            | Opens WhatsApp with a pre-filled enquiry.   |

`Get directions` is built by `src/lib/directions.ts`:

```ts
const dest = site.geo ? `${site.geo.lat},${site.geo.lng}` : site.address.en;
return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(dest)}`;
```

Use `&travelmode=driving` only if a clone wants car-only; default lets the Maps app
choose walking/transit/driving.

## 3. On-page discovery SEO

- **Title/description** per page via `Seo.astro`, written around
  "café in `<area>`" (e.g. "Fern & Bean — specialty café in Colombo 05").
- **One `h1`** with the café name + area; section `h2`s use plain language
  ("Our menu", "Find us").
- **Menu text is real HTML** (not an image), so item names and prices are
  crawlable.
- **Semantic landmarks** and descriptive, localized image alt text.
- **Fast and light**: pre-sized WebP, lazy loading below the fold, no client
  framework.
- When `indexable` is on, `@astrojs/sitemap` is generated and `robots.txt` allows
  crawling. The demo keeps all three indexing switches off (see §6).

## 4. Structured data (`CafeOrCoffeeShop`)

`src/components/Seo.astro` emits JSON-LD on the home page. Keep it factual and in
sync with `src/data/site.ts`:

```json
{
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  "name": "Fern & Bean",
  "description": "Good coffee, slow mornings, Colombo 05.",
  "url": "https://demo-cafe.zuvo.lk",
  "image": "https://demo-cafe.zuvo.lk/og.jpg",
  "telephone": "+94 74 343 0033",
  "servesCuisine": ["Coffee", "Brunch"],
  "priceRange": "Rs. 450–2,200",
  "hasMenu": "https://demo-cafe.zuvo.lk/#menu",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "42 Havelock Road",
    "addressLocality": "Colombo 05",
    "addressCountry": "LK"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 6.8895,
    "longitude": 79.8635
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "07:00",
      "closes": "19:00"
    }
  ],
  "sameAs": [
    "https://instagram.com/fernandbean",
    "https://facebook.com/fernandbean"
  ]
}
```

`dayOfWeek` uses full English day names (schema.org expects English literals);
opens/closes are 24h `HH:MM`. Do not fabricate an aggregate rating (D-C20).

## 5. WhatsApp "Message us" flow

Built by `src/lib/contact.ts` and delivered by `src/lib/whatsapp.ts`. Numbers are
digits with country code (`94743430033`), never `+`; messages are
`encodeURIComponent`-ed.

Optional topic chips let the visitor pick a context (`site.contact.topics`); the
message is short and unambiguous on a phone.

```text
Hi Fern & Bean! I found you online and I'd like to ask about a group booking.

*Name*: Nimal
*Details*: Around 10 people, Saturday morning if possible.

Thank you!
```

- Use `*bold*` (WhatsApp markdown) for field labels.
- Omit optional lines when blank.
- Default (no topic): "Hi Fern & Bean! I'd like to ask a question." + name/notes.
- Never include an order or a cart — this is an enquiry, not an order.

### Demo tag and the ribbon enquiry

- **Every visitor-facing message is prefixed with `site.demoTag`** (`[DEMO: Café]`),
  applied once inside `buildContactMessage` so the contact form, the "Message us"
  links and any future booking/ordering all inherit it. The tag is demo-only and is
  removed (with the ribbon) in a real clone.
- The **sample-ribbon** link is the exception: it calls `buildWebsiteEnquiry`,
  which is **untagged** and names the demo — it is an owner asking the studio for a
  website ("Hi Zuvo Web Studio Express, I'd like a website like the `<name>` demo
  for my shop."), not a site visitor. The demo name comes from `site.name`.

### Topics

| Key        | Label         | Intent                       |
| ---------- | ------------- | ---------------------------- |
| `general`  | A question    | Anything else                |
| `group`    | Group booking | Larger tables / group visits |
| `catering` | Catering      | Platters, events, offices    |

Labels live in `src/i18n/ui.ts` (`contact.topic.*`); keys live in
`src/data/site.ts` (`contact.topics`).

## 6. Indexing switches (all three)

The demo must stay out of search. A real clone turns indexing on in **three**
places together, or it stays invisible:

1. `src/data/site.ts` → `indexable: true` (enables the sitemap and an allow-all
   `robots.txt`).
2. `public/_headers` → delete the `X-Robots-Tag: noindex, nofollow` line.
3. `src/data/site.ts` → `siteUrl` set to the real domain.

Also set `showDemoRibbon: false` and remove the sample ribbon for a real café. See
`docs/CUSTOMIZATION.md`.

## 7. The sample-website ribbon

`src/components/SampleRibbon.astro` renders a slim, non-dismissible, brand-tinted
strip **above the header on every page** when `site.showDemoRibbon` is true:

> Sample website — a demo by Zuvo Web Studio Express · Message us

- It is an honesty/rights signal (licensed stock imagery, invented brand) and must
  not be removed from the demo (rule §3.11).
- The "Message us" link opens the untagged **website enquiry** naming the demo
  (`buildWebsiteEnquiry`) — see §5.
- A clone sets `showDemoRibbon: false` (and may delete the component).

## 8. Verification (smoke test)

After any change to the flow, manually verify on a phone-sized viewport:

1. Tapping **View the menu** jumps to `#menu` and the sticky tabs park below the
   ribbon + header.
2. Tapping **Get directions** opens Google Maps with navigation to the configured
   `site.geo`.
3. Tapping **Message us** (ribbon, CTA band, footer) opens WhatsApp with a
   correctly encoded message to the configured number.
4. Choose each topic; confirm the message wording changes and blank fields are
   omitted.
5. Disable JavaScript; confirm the menu, directions and WhatsApp links still work.
6. With `indexable: false`, confirm `<meta name="robots" content="noindex">` and the
   `X-Robots-Tag` header; with it true, confirm all three switches are on.

If a Playwright smoke test is added later, automate steps 1–5 and document it in
`AGENTS.md`.

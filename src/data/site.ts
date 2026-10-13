/**
 * THE per-café configuration.
 *
 * Every café-specific value lives here. A clone only needs to edit this file,
 * `src/styles/theme.css`, the content collections and `public/`. Components must
 * never contain café-specific literals.
 */

export type Locale = "en" | "si" | "ta";

export type LocalizedText = {
  en: string;
  si?: string;
  ta?: string;
};

export type OpeningHour = {
  /** 0 = Sunday … 6 = Saturday */
  day: number;
  /** 24h "HH:MM". Leave `open` empty to mark the day closed. */
  open: string;
  close: string;
};

export type GeoPoint = {
  lat: number;
  lng: number;
};

/** Keys for the "Message us" topics; labels live in `src/i18n/ui.ts`. */
export type ContactTopic = "general" | "group" | "catering";

const tagline: LocalizedText = {
  en: "Good coffee, slow mornings, Colombo 05.",
};

const address: LocalizedText = {
  en: "42 Havelock Road, Colombo 05, Sri Lanka",
};

export const site = {
  // Identity
  name: "Fern & Bean",
  tagline,
  logo: "/logo.svg",
  ogImage: "/og.jpg",
  heroImage: "/images/hero.webp",
  heroImageMobile: "/images/hero-mobile.webp",

  // Contact
  whatsappNumber: "94743430033", // digits only, country code, no "+"
  phone: "+94 74 343 0033",
  email: "", // display only; enquiries go to WhatsApp
  address,
  locality: "Colombo 05",
  geo: { lat: 6.8895, lng: 79.8635 } as GeoPoint,
  mapEmbedUrl:
    "https://www.google.com/maps?q=Havelock%20Road%2C%20Colombo%2005%2C%20Sri%20Lanka&output=embed",
  mapLink: "https://maps.google.com/?q=42+Havelock+Road,+Colombo+05,+Sri+Lanka",
  /** Used if `geo` is absent; otherwise the directions link is built from `geo`. */
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=6.8895,79.8635",

  // Opening hours (0 = Sunday … 6 = Saturday). Open every day.
  hours: [
    { day: 0, open: "08:00", close: "20:00" },
    { day: 1, open: "07:00", close: "19:00" },
    { day: 2, open: "07:00", close: "19:00" },
    { day: 3, open: "07:00", close: "19:00" },
    { day: 4, open: "07:00", close: "19:00" },
    { day: 5, open: "07:00", close: "19:00" },
    { day: 6, open: "08:00", close: "20:00" },
  ] as OpeningHour[],

  // Socials (empty string hides the link)
  socials: {
    facebook: "https://facebook.com/fernandbean",
    instagram: "https://instagram.com/fernandbean",
    tiktok: "",
  },

  // i18n — English ships first; add "si"/"ta" when translations exist.
  defaultLocale: "en" as Locale,
  locales: ["en"] as Locale[],

  // The secondary "Message us" channel. These are keys; labels live in i18n.
  contact: {
    topics: ["general", "group", "catering"] as ContactTopic[],
  },

  // Menu data source.
  //  - "runtime": the demo fetches the public Sheet in the browser (instant edits).
  //  - "build":   clones fetch the Sheet during the build (static, event-driven rebuild).
  // Leave `sheetId` empty to run entirely from the content collections.
  menu: {
    mode: "runtime" as "runtime" | "build",
    sheetId: "",
    sheetTab: "Menu",
    refreshMinutes: 5,
  },

  // Paid add-ons the demo only hints at (never implemented in the baseline).
  addOns: [
    "Online ordering & pickup",
    "Delivery-app links (PickMe, Uber Eats)",
    "Table & group booking",
    "Events calendar",
    "Loyalty",
    "Instagram feed",
  ],

  // SEO — false for the concept demo, true for a real café clone.
  indexable: false,
  /** Demo-only "sample website" ribbon above the header. */
  showDemoRibbon: true,
  /**
   * Demo-only. Prefixes every visitor-facing WhatsApp message so the studio can
   * tell demo enquiries apart (see `src/lib/contact.ts`). Removed in a real clone.
   */
  demoTag: "[DEMO: Café]",
  siteUrl: "https://demo-cafe.zuvo.lk",
  currency: { code: "LKR", symbol: "Rs." },
  priceRange: "Rs. 450–2,200",
  servesCuisine: ["Coffee", "Brunch"],
} as const;

export type Site = typeof site;

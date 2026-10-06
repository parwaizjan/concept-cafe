/**
 * All user-facing UI strings.
 *
 * English ships complete. `si` and `ta` are intentionally empty until translated;
 * missing values fall back to English at runtime (see `utils.ts`). Every new
 * string must be added to `en` (and translated later) — do not hardcode English
 * copy into components.
 */

import type { Locale } from "../data/site";

export const languages = {
  en: "English",
  si: "සිංහල",
  ta: "தமிழ்",
} as const;

export const defaultLang: Locale = "en";

const en = {
  "a11y.skip": "Skip to content",

  "nav.menu": "Menu",
  "nav.gallery": "Gallery",
  "nav.whatsOn": "What's on",
  "nav.visit": "Find us",

  "common.viewMenu": "View the menu",
  "common.getDirections": "Get directions",
  "common.directionsShort": "Directions",
  "common.messageUs": "Message us",
  "common.viewGallery": "View gallery",
  "common.language": "Language",
  "common.close": "Close",

  "ribbon.text": "Sample website — a demo by Zuvo Web Studio Express",

  "hero.eyebrow": "Specialty coffee · Colombo 05",
  "hero.cta": "View the menu",
  "hero.directions": "Get directions",
  "hero.imageAlt": "Inside Fern & Bean",

  "menu.title": "Our menu",
  "menu.subtitle":
    "Freshly brewed, baked and cooked on Havelock Road. Prices in Sri Lankan rupees.",
  "menu.jumpTo": "Jump to a section",
  "menu.empty": "Our menu is being updated. Please check back soon.",
  "menu.soldOut": "Sold out",
  "menu.special": "This week",
  "menu.veg": "Veg",
  "menu.vegAlt": "Vegetarian",

  "specials.title": "On this week",
  "specials.subtitle":
    "Seasonal drinks and bakes — ask us before they run out.",
  "specials.tab": "Specials",

  "featured.title": "Café favourites",

  "gallery.title": "Inside Fern & Bean",
  "gallery.subtitle": "The room, the coffee and the food.",
  "gallery.altInterior": "The café interior with plants and warm daylight",
  "gallery.altCoffee": "A barista pouring coffee behind the counter",
  "gallery.altSeating": "Window seating with soft afternoon light",
  "gallery.altPastries": "A display of fresh pastries and croissants",
  "gallery.altBrunch": "A brunch table seen from above",
  "gallery.altPlants": "A coffee cup among green plants",

  "whatsOn.title": "What's on",
  "whatsOn.subtitle": "Things happening at the café.",

  "visit.title": "Find us",
  "visit.address": "Address",
  "visit.hours": "Opening hours",
  "visit.phone": "Phone",
  "visit.whatsapp": "WhatsApp",
  "visit.map": "Find us on the map",
  "visit.directions": "Get directions",
  "visit.openNow": "Open now",
  "visit.closedNow": "Closed",
  "visit.messageUs": "Message us",

  "testimonials.title": "What guests say",

  "contact.title": "Message us",
  "contact.subtitle":
    "For group bookings, catering and anything else, send us a WhatsApp.",
  "contact.whatAbout": "What's it about?",
  "contact.note": "Anything we should know?",
  "contact.notePlaceholder": "Optional — a date, a rough number of people…",
  "contact.send": "Open WhatsApp",
  "contact.topic.general": "A question",
  "contact.topic.group": "Group booking",
  "contact.topic.catering": "Catering",

  "msg.intro": "I found you online and I'd like to get in touch.",
  "msg.topic": "About",
  "msg.name": "Name",
  "msg.notes": "Details",
  "msg.footer": "Thank you!",

  "addOns.title": "Want more?",
  "addOns.body":
    "Online ordering, delivery-app links, table booking, loyalty and an events calendar can be added whenever you need them.",

  "cta.title": "Come say hello",
  "cta.body":
    "We are open every day on Havelock Road. Planning a group or a catch-up? Send us a message.",
  "cta.message": "Message us on WhatsApp",

  "footer.note": "Enquiries are answered on WhatsApp.",
  "footer.rights": "All rights reserved.",

  "notFound.title": "Page not found",
  "notFound.body": "Sorry, we could not find that page.",
  "notFound.cta": "Back to the beginning",
};

const si: Partial<typeof en> = {};

const ta: Partial<typeof en> = {};

export const ui = { en, si, ta } as const;

export type UiKey = keyof typeof en;

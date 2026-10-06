import type { LocalizedText } from "./site";

/**
 * Guest quotes shown in the reviews section.
 *
 * These are placeholder, invented quotes (see DECISIONS.md D-C20). A clone
 * replaces them with the café's real reviews (with permission). No aggregate
 * rating is shown. Add `si`/`ta` values when translated.
 */
export type Testimonial = {
  quote: LocalizedText;
  author: string;
  detail?: LocalizedText;
};

export const testimonials: Testimonial[] = [
  {
    quote: {
      en: "My favourite flat white in Colombo and the light is perfect for working.",
    },
    author: "Nadia R.",
    detail: { en: "Regular" },
  },
  {
    quote: {
      en: "We booked a table for a friends' brunch on WhatsApp and everything was ready.",
    },
    author: "Tharindu P.",
    detail: { en: "Group brunch" },
  },
  {
    quote: {
      en: "The cinnamon rolls are dangerously good. The plants make it feel like a greenhouse.",
    },
    author: "Ishara M.",
    detail: { en: "Weekend visitor" },
  },
  {
    quote: {
      en: "Catered our office morning — smooth, friendly and the coffee was excellent.",
    },
    author: "Dinesh K.",
    detail: { en: "Catering" },
  },
];

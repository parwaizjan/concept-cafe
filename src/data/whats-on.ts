import type { LocalizedText } from "./site";

/**
 * Standalone "what's on" notices (recurring events, seasonal drinks, opening
 * notes). Developer-edited; localized. Specials on the menu are driven by the
 * Google Sheet instead (see `docs/CONTENT-AND-MENU.md`).
 */
export type WhatsOnItem = {
  title: LocalizedText;
  detail?: LocalizedText;
  when?: LocalizedText;
};

export const whatsOn: WhatsOnItem[] = [
  {
    title: { en: "Seasonal: Iced Matcha Latte" },
    detail: { en: "Ceremonial matcha over ice with your choice of milk." },
    when: { en: "All week" },
  },
  {
    title: { en: "Weekend brunch" },
    detail: { en: "Our full brunch menu, served until 2pm." },
    when: { en: "Sat & Sun" },
  },
  {
    title: { en: "Vinyl Sundays" },
    detail: { en: "Records on the turntable all morning — bring a favourite." },
    when: { en: "Every Sunday, 10am–1pm" },
  },
  {
    title: { en: "Latte Art Throwdown" },
    detail: { en: "A friendly pour-off with the baristas; free to watch." },
    when: { en: "Last Friday, 6pm" },
  },
];

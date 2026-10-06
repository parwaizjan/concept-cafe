import type { ImageMetadata } from "astro";

import brunch from "../assets/gallery/brunch.jpg";
import coffeePour from "../assets/gallery/coffee-pour.jpg";
import interior from "../assets/gallery/interior.jpg";
import pastries from "../assets/gallery/pastries.jpg";
import plantsDetail from "../assets/gallery/plants-detail.jpg";
import seating from "../assets/gallery/seating.jpg";
import type { UiKey } from "../i18n/ui";

/**
 * Photos shown in the gallery section. Imported assets are optimized to WebP
 * variants at build time. Replace the files in `src/assets/gallery/` (keeping the
 * imports) and keep each `altKey` present in every enabled language
 * (`src/i18n/ui.ts`).
 */
export type GalleryImage = {
  src: ImageMetadata | string;
  altKey: UiKey;
};

export const gallery: GalleryImage[] = [
  { src: interior, altKey: "gallery.altInterior" },
  { src: coffeePour, altKey: "gallery.altCoffee" },
  { src: seating, altKey: "gallery.altSeating" },
  { src: pastries, altKey: "gallery.altPastries" },
  { src: brunch, altKey: "gallery.altBrunch" },
  { src: plantsDetail, altKey: "gallery.altPlants" },
];

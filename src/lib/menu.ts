import type { ImageMetadata } from "astro";
import { getCollection } from "astro:content";

import { dishImages } from "../data/dish-images";
import { type Locale, type LocalizedText } from "../data/site";
import menuLive from "../data/menu-live.json";

/** An item image: an optimized imported asset, or a public path (e.g. an SVG). */
export type ItemImage = ImageMetadata | string;

export type LiveItemRow = {
  price?: number;
  available?: boolean;
  special?: boolean;
  note?: string;
};

const live = menuLive as Record<string, LiveItemRow>;

export type MenuItem = {
  id: string;
  category: string;
  name: string;
  description?: string;
  image: ItemImage;
  price: number;
  available: boolean;
  veg: boolean;
  special: boolean;
  featured: boolean;
  order: number;
  note?: string;
};

export type MenuCategory = {
  id: string;
  name: string;
  description?: string;
  order: number;
};

/** Pick a localized string, falling back to English then an empty string. */
export function pickLocalized(
  text: LocalizedText | undefined,
  lang: Locale,
): string {
  if (!text) return "";
  return text[lang] ?? text.en;
}

/** The full item list for a locale, with build-time Sheet overrides merged in. */
export async function getItems(lang: Locale): Promise<MenuItem[]> {
  const items = await getCollection("menu");

  return items
    .map((entry): MenuItem => {
      const data = entry.data;
      const override = live[entry.id] ?? {};
      return {
        id: entry.id,
        category: data.category,
        name: pickLocalized(data.name, lang),
        description: data.description
          ? pickLocalized(data.description, lang)
          : undefined,
        image: dishImages[entry.id] ?? data.image ?? "/images/placeholder.svg",
        price: override.price ?? data.price,
        available: override.available ?? data.available,
        veg: data.veg,
        special: override.special ?? data.special,
        featured: data.featured,
        order: data.order,
        note: override.note,
      };
    })
    .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
}

/** Menu categories for a locale, ordered. */
export async function getCategories(lang: Locale): Promise<MenuCategory[]> {
  const categories = await getCollection("categories");

  return categories
    .map((entry): MenuCategory => ({
      id: entry.id,
      name: pickLocalized(entry.data.name, lang),
      description: entry.data.description
        ? pickLocalized(entry.data.description, lang)
        : undefined,
      order: entry.data.order,
    }))
    .sort((a, b) => a.order - b.order);
}

import { site } from "../data/site";

/**
 * One-tap directions. Prefer precise coordinates (so navigation starts at the
 * door), falling back to the configured URL, then the address.
 */
export function buildDirectionsUrl(): string {
  if (site.geo) {
    return `https://www.google.com/maps/dir/?api=1&destination=${site.geo.lat},${site.geo.lng}`;
  }
  if (site.directionsUrl) return site.directionsUrl;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    site.address.en,
  )}`;
}

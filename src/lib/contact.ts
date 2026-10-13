import { site, type ContactTopic } from "../data/site";
import type { UiKey } from "../i18n/ui";

/**
 * The secondary "Message us" enquiry. This is deliberately NOT an order — no
 * cart, no items, no total. See `docs/DISCOVERY-AND-CONTACT.md`.
 */
export type ContactDetails = {
  topic?: ContactTopic;
  name?: string;
  notes?: string;
};

/**
 * Assemble the WhatsApp enquiry text. `t` is the locale-bound translator.
 *
 * Every visitor-facing message is prefixed with the demo tag (`site.demoTag`),
 * applied here in one place so all CTAs — the contact form, the "Message us"
 * links and any future booking/ordering — inherit it. See
 * `docs/DISCOVERY-AND-CONTACT.md`.
 */
export function buildContactMessage(
  details: ContactDetails,
  t: (key: UiKey) => string,
): string {
  const lines: string[] = [`${site.demoTag} ${t("msg.intro")}`, ""];

  if (details.topic) {
    lines.push(
      `*${t("msg.topic")}*: ${t(`contact.topic.${details.topic}` as UiKey)}`,
    );
  }
  if (details.name?.trim()) {
    lines.push(`*${t("msg.name")}*: ${details.name.trim()}`);
  }
  if (details.notes?.trim()) {
    lines.push(`*${t("msg.notes")}*: ${details.notes.trim()}`);
  }

  lines.push("", t("msg.footer"));
  return lines.join("\n");
}

/**
 * Website enquiry for the demo ribbon: an owner asking the studio for a site like
 * this demo. Deliberately NOT tagged — it comes from an owner, not a site visitor.
 */
export function buildWebsiteEnquiry(t: (key: UiKey) => string): string {
  return t("ribbon.enquiry").replace("{name}", site.name);
}

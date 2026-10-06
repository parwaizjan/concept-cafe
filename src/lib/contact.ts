import type { ContactTopic } from "../data/site";
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

/** Assemble the WhatsApp enquiry text. `t` is the locale-bound translator. */
export function buildContactMessage(
  details: ContactDetails,
  t: (key: UiKey) => string,
): string {
  const lines: string[] = [t("msg.intro"), ""];

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

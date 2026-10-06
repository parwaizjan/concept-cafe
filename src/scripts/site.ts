/**
 * Client script: runtime Google Sheet refresh, the "open now" badge, and the
 * WhatsApp "Message us" link builder. Plain DOM, no framework. Runs on every page
 * (there is only one). All café-specific values and UI strings arrive through the
 * `#site-config` JSON block rendered by `BaseLayout`.
 */
import { formatPrice } from "../lib/format";
import { getSheetCsvUrl, parseMenuSheet } from "../lib/sheet";
import { buildContactMessage } from "../lib/contact";
import { buildWhatsAppUrl } from "../lib/whatsapp";
import type { ContactTopic } from "../data/site";
import type { UiKey } from "../i18n/ui";

type SiteConfig = {
  whatsappNumber: string;
  siteName: string;
  lang: string;
  i18n: Record<string, string>;
  menu: {
    mode: "runtime" | "build";
    sheetId: string;
    sheetTab: string;
    refreshMinutes: number;
  };
};

const CACHE_PREFIX = "fern-and-bean-menu-sheet-v1";

function readConfig(): SiteConfig | null {
  const node = document.getElementById("site-config");
  if (!node?.textContent) return null;
  try {
    return JSON.parse(node.textContent) as SiteConfig;
  } catch {
    return null;
  }
}

function updateOpenNow(t: (key: UiKey) => string): void {
  const badge = document.querySelector<HTMLElement>("[data-open-badge]");
  if (!badge) return;

  const rows = Array.from(
    document.querySelectorAll<HTMLElement>("[data-hours-day]"),
  );
  if (rows.length === 0) return;

  const now = new Date();
  const today = now.getDay();
  const minutes = now.getHours() * 60 + now.getMinutes();

  const toMinutes = (value: string): number => {
    const [h, m] = value.split(":").map(Number);
    return (h ?? 0) * 60 + (m ?? 0);
  };

  const row = rows.find((r) => Number(r.dataset.hoursDay) === today);
  let open = false;
  if (row?.dataset.hoursOpen && row?.dataset.hoursClose) {
    const start = toMinutes(row.dataset.hoursOpen);
    const end = toMinutes(row.dataset.hoursClose);
    open = minutes >= start && minutes < end;
  }

  badge.textContent = open ? t("visit.openNow") : t("visit.closedNow");
  badge.className = `badge ${open ? "bg-success text-white" : "bg-danger text-white"}`;
  badge.hidden = false;
}

async function fetchSheet(
  sheetId: string,
  sheetTab: string,
  refreshMinutes: number,
) {
  const cacheKey = `${CACHE_PREFIX}:${sheetId}`;
  try {
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      const parsed = JSON.parse(cached) as { at: number; data: unknown };
      if (Date.now() - parsed.at < refreshMinutes * 60_000) {
        return parsed.data as ReturnType<typeof parseMenuSheet>;
      }
    }
  } catch {
    /* ignore cache errors */
  }

  try {
    const response = await fetch(getSheetCsvUrl(sheetId, sheetTab));
    if (!response.ok) return null;
    const data = parseMenuSheet(await response.text());
    try {
      sessionStorage.setItem(
        cacheKey,
        JSON.stringify({ at: Date.now(), data }),
      );
    } catch {
      /* ignore cache write errors */
    }
    return data;
  } catch {
    return null;
  }
}

async function refreshFromSheet(config: SiteConfig): Promise<void> {
  const { mode, sheetId, sheetTab, refreshMinutes } = config.menu;
  if (mode !== "runtime" || !sheetId) return;

  const sheet = await fetchSheet(sheetId, sheetTab, refreshMinutes);
  if (!sheet) return;

  for (const [id, row] of Object.entries(sheet)) {
    const selector = CSS.escape(id);
    const hosts = document.querySelectorAll<HTMLElement>(
      `[data-item][data-id="${selector}"], [data-special-card][data-id="${selector}"]`,
    );

    hosts.forEach((host) => {
      if (typeof row.price === "number") {
        host.dataset.price = String(row.price);
        host
          .querySelectorAll<HTMLElement>("[data-price-display]")
          .forEach((node) => {
            node.textContent = formatPrice(row.price as number);
          });
      }

      const item = host.matches("[data-item]") ? host : null;
      if (!item) return;

      if (typeof row.available === "boolean") {
        item.dataset.available = String(row.available);
        item.classList.toggle("opacity-60", !row.available);
        const unavailable =
          item.querySelector<HTMLElement>("[data-unavailable]");
        if (unavailable) unavailable.hidden = row.available;
      }

      if (typeof row.special === "boolean") {
        item.dataset.special = String(row.special);
        const badge = item.querySelector<HTMLElement>("[data-special-badge]");
        if (badge) badge.hidden = !row.special;
      }
    });
  }
}

/** Keep the "Message us" WhatsApp link in sync with the contact form. */
function bindContactForm(config: SiteConfig, t: (key: UiKey) => string): void {
  const form = document.querySelector<HTMLFormElement>("[data-contact-form]");
  const send = document.querySelector<HTMLAnchorElement>("[data-contact-send]");
  if (!form || !send) return;

  const update = () => {
    const topic = form.querySelector<HTMLInputElement>(
      'input[name="topic"]:checked',
    )?.value as ContactTopic | undefined;
    const name = form.querySelector<HTMLInputElement>(
      "[data-contact-name]",
    )?.value;
    const notes = form.querySelector<HTMLTextAreaElement>(
      "[data-contact-note]",
    )?.value;

    const message = buildContactMessage({ topic, name, notes }, t);
    send.href = buildWhatsAppUrl(message, config.whatsappNumber);
  };

  form.addEventListener("input", update);
  form.addEventListener("change", update);
  update();
}

const config = readConfig();
if (config) {
  const t = (key: UiKey): string => config.i18n[key] ?? key;
  updateOpenNow(t);
  bindContactForm(config, t);
  void refreshFromSheet(config);
}

import type { Locale } from "@/data/i18n";

// Single source of truth for the static legal page routes — used by the
// footer links, the pages themselves, and their metadata.
export const LEGAL_PATHS: Record<Locale, { imprint: string; privacy: string }> = {
  de: { imprint: "/impressum/", privacy: "/datenschutz/" },
  en: { imprint: "/en/imprint/", privacy: "/en/privacy/" },
};

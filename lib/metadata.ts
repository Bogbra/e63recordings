import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/data/i18n";
import { LOCALE_HOME_PATHS } from "./locales";
import { LEGAL_PATHS } from "./legalRoutes";

const SITE_URL = "https://e63recordings.com";
const SHARE_IMAGE = "/og-image.jpg";

const OPENGRAPH_LOCALES: Record<Locale, string> = {
  de: "de_DE",
  en: "en_US",
};

// Shared metadata shape for both locale home pages — only the locale differs.
export function buildMetadata(locale: Locale): Metadata {
  const dict = getDictionary(locale);
  const path = LOCALE_HOME_PATHS[locale];

  return {
    metadataBase: new URL(SITE_URL),
    title: dict.meta.title,
    description: dict.meta.description,
    applicationName: "E63 Recordings",
    keywords: [
      "E63 Recordings",
      "Theo Schmitt",
      "Techno",
      "Elsenfeld",
      "Electronic Music",
      "Record Label",
    ],
    alternates: {
      canonical: path,
      languages: LOCALE_HOME_PATHS,
    },
    icons: {
      icon: "/favicon.svg",
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.ogDescription,
      url: `${SITE_URL}${path}`,
      siteName: "E63 Recordings",
      type: "website",
      locale: OPENGRAPH_LOCALES[locale],
      images: [SHARE_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.ogDescription,
      images: [SHARE_IMAGE],
    },
  };
}

// Shared metadata shape for the four static legal pages.
export function buildLegalMetadata(locale: Locale, type: "imprint" | "privacy"): Metadata {
  const dict = getDictionary(locale);
  const path = LEGAL_PATHS[locale][type];
  const title = type === "imprint" ? dict.legal.imprint.title : dict.legal.privacy.title;

  return {
    metadataBase: new URL(SITE_URL),
    title: `${title} — E63 Recordings`,
    alternates: {
      canonical: path,
      languages: {
        de: LEGAL_PATHS.de[type],
        en: LEGAL_PATHS.en[type],
      },
    },
    icons: {
      icon: "/favicon.svg",
    },
  };
}

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

// Shared metadata shape for the four static legal pages. Deliberately
// minimal (no description/openGraph/twitter): Next.js inherits any field a
// page doesn't set from the enclosing layout's metadata, so leaving those
// out would otherwise leak the home page's social-share data onto a legal
// page instead of just showing nothing. `noindex` also keeps these out of
// search results as separate pages — an imprint/privacy page has no content
// worth ranking on its own.
export function buildLegalMetadata(locale: Locale, type: "imprint" | "privacy"): Metadata {
  const dict = getDictionary(locale);
  const path = LEGAL_PATHS[locale][type];
  const title = type === "imprint" ? dict.legal.imprint.title : dict.legal.privacy.title;

  return {
    metadataBase: new URL(SITE_URL),
    title: `${title} — E63 Recordings`,
    // Explicit `null` overwrites the layout's nested openGraph/twitter
    // objects instead of merging into them (Next replaces whole nested
    // fields per segment, it doesn't merge their inner keys) — otherwise
    // this page would inherit the home page's og:title/og:url/etc.
    openGraph: null,
    twitter: null,
    robots: {
      index: false,
      follow: true,
    },
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

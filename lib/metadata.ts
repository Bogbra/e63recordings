import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/data/i18n";

const SITE_URL = "https://e63recordings.com";
const SHARE_IMAGE = "/og-image.jpg";

const LOCALE_PATHS: Record<Locale, string> = {
  de: "/",
  en: "/en/",
};

const OPENGRAPH_LOCALES: Record<Locale, string> = {
  de: "de_DE",
  en: "en_US",
};

// Shared metadata shape for both locale layouts — only the locale differs.
export function buildMetadata(locale: Locale): Metadata {
  const dict = getDictionary(locale);
  const path = LOCALE_PATHS[locale];

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
      languages: LOCALE_PATHS,
    },
    icons: {
      icon: "/favicon.svg",
    },
    manifest: "/site.webmanifest",
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

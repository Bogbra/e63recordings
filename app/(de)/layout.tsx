import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../globals.css";
import { getDictionary } from "@/data/i18n";

const dict = getDictionary("de");

export const metadata: Metadata = {
  metadataBase: new URL("https://e63recordings.com"),
  title: dict.meta.title,
  description: dict.meta.description,
  applicationName: "E63 Recordings",
  keywords: [
    "E63 Recordings",
    "Theo Schmitt",
    "Techno",
    "Frankfurt",
    "Electronic Music",
    "Record Label",
  ],
  alternates: {
    canonical: "/",
    languages: {
      de: "/",
      en: "/en/",
    },
  },
  icons: {
    icon: "/favicon.svg",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: dict.meta.title,
    description: dict.meta.ogDescription,
    url: "https://e63recordings.com",
    siteName: "E63 Recordings",
    type: "website",
    locale: "de_DE",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}

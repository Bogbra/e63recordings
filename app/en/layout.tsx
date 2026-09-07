import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../globals.css";
import { getDictionary } from "@/data/i18n";

const dict = getDictionary("en");

export const metadata: Metadata = {
  metadataBase: new URL("https://e63recordings.com"),
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
    canonical: "/en/",
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
    url: "https://e63recordings.com/en/",
    siteName: "E63 Recordings",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

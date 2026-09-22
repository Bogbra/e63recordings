import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../globals.css";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata("de");

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}

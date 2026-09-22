import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { buildLegalMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildLegalMetadata("en", "imprint");

export default function ImprintPage() {
  return <LegalPage locale="en" type="imprint" />;
}

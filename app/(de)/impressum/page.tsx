import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { buildLegalMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildLegalMetadata("de", "imprint");

export default function ImpressumPage() {
  return <LegalPage locale="de" type="imprint" />;
}

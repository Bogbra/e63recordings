import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { buildLegalMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildLegalMetadata("de", "privacy");

export default function DatenschutzPage() {
  return <LegalPage locale="de" type="privacy" />;
}

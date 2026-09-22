"use client";

import { useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { Logo } from "./Logo";
import { LegalPanel } from "./LegalPanel";
import { LEGAL_PATHS } from "@/lib/legalRoutes";
import type { Dictionary, Locale } from "@/data/i18n";

type SiteInfo = {
  name: string;
  addressLines: string[];
  director: string;
  email: string;
  website: string;
};

type SiteFooterProps = {
  locale: Locale;
  footerDict: Dictionary["footer"];
  legalDict: Dictionary["legal"];
  site: SiteInfo;
};

export function SiteFooter({ locale, footerDict, legalDict, site }: SiteFooterProps) {
  const [legal, setLegal] = useState<"imprint" | "privacy" | null>(null);
  const imprintLinkRef = useRef<HTMLAnchorElement>(null);
  const privacyLinkRef = useRef<HTMLAnchorElement>(null);
  // Remembers whichever link was clicked, so LegalPanel can restore focus to
  // it on close regardless of what `legal` has changed to by then.
  const triggerLinkRef = useRef<HTMLAnchorElement | null>(null);
  const paths = LEGAL_PATHS[locale];

  // Real links to the static /impressum/ and /datenschutz/ pages are the
  // baseline (work with no JS, are bookmarkable, satisfy § 5 DDG's "always
  // reachable" requirement); JS progressively enhances the click into the
  // slide-in dialog instead of a full navigation.
  const openImprint = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    triggerLinkRef.current = imprintLinkRef.current;
    setLegal("imprint");
  };

  const openPrivacy = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    triggerLinkRef.current = privacyLinkRef.current;
    setLegal("privacy");
  };

  return (
    <>
      <footer className="footer">
        <Logo />
        <span>© E63 Recordings</span>
        <div className="footerLegal">
          <a ref={imprintLinkRef} href={paths.imprint} onClick={openImprint}>
            {footerDict.imprint}
          </a>
          <a ref={privacyLinkRef} href={paths.privacy} onClick={openPrivacy}>
            {footerDict.privacy}
          </a>
        </div>
      </footer>

      <LegalPanel
        type={legal}
        dict={legalDict}
        site={site}
        onClose={() => setLegal(null)}
        restoreFocusRef={triggerLinkRef}
      />
    </>
  );
}

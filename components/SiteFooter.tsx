"use client";

import { useRef, useState } from "react";
import type { RefObject } from "react";
import { Logo } from "./Logo";
import { LegalPanel } from "./LegalPanel";
import type { Locale } from "@/data/i18n";

type FooterDict = {
  imprint: string;
  privacy: string;
};

export function SiteFooter({ locale, dict }: { locale: Locale; dict: FooterDict }) {
  const [legal, setLegal] = useState<"imprint" | "privacy" | null>(null);
  const imprintButtonRef = useRef<HTMLButtonElement>(null);
  const privacyButtonRef = useRef<HTMLButtonElement>(null);
  // Remembers whichever button was clicked, so LegalPanel can restore focus
  // to it on close regardless of what `legal` has changed to by then.
  const triggerButtonRef = useRef<HTMLButtonElement | null>(null);

  const openLegal = (type: "imprint" | "privacy", buttonRef: RefObject<HTMLButtonElement | null>) => {
    triggerButtonRef.current = buttonRef.current;
    setLegal(type);
  };

  return (
    <>
      <footer className="footer">
        <Logo />
        <span>© {new Date().getFullYear()} E63 Recordings</span>
        <div className="footerLegal">
          <button ref={imprintButtonRef} onClick={() => openLegal("imprint", imprintButtonRef)}>{dict.imprint}</button>
          <button ref={privacyButtonRef} onClick={() => openLegal("privacy", privacyButtonRef)}>{dict.privacy}</button>
        </div>
      </footer>

      <LegalPanel
        type={legal}
        locale={locale}
        onClose={() => setLegal(null)}
        restoreFocusRef={triggerButtonRef}
      />
    </>
  );
}

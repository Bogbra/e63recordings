"use client";

import { useId, useRef } from "react";
import type { MouseEvent as ReactMouseEvent, RefObject } from "react";
import type { Dictionary } from "@/data/i18n";
import { useOverlayChrome } from "@/hooks/useOverlayChrome";
import { LegalContent } from "./LegalContent";

// Stable reference required by useOverlayChrome (see its inertSelectors doc).
const LEGAL_INERT_SELECTORS = ["#top", "header", "footer"];

type SiteInfo = {
  name: string;
  addressLines: string[];
  director: string;
  email: string;
  website: string;
};

type LegalPanelProps = {
  type: "imprint" | "privacy" | null;
  dict: Dictionary["legal"];
  site: SiteInfo;
  onClose: () => void;
  restoreFocusRef: RefObject<HTMLElement | null>;
};

// Takes the already-resolved dictionary slice + site info as plain props
// (rather than importing getDictionary/site itself) so this client
// component doesn't pull the whole i18n module into the client bundle —
// HomePage (a server component) already has the resolved locale data.
export function LegalPanel({ type, dict, site, onClose, restoreFocusRef }: LegalPanelProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useOverlayChrome({
    active: type !== null,
    panelRef,
    initialFocusRef: closeButtonRef,
    restoreFocusRef,
    onEscape: onClose,
    inertSelectors: LEGAL_INERT_SELECTORS,
  });

  if (!type) return null;

  return (
    <div className="legalBackdrop" role="presentation" onMouseDown={onClose}>
      <section
        ref={panelRef}
        className="legalPanel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        data-lenis-prevent
        onMouseDown={(event: ReactMouseEvent<HTMLElement>) => event.stopPropagation()}
      >
        <button ref={closeButtonRef} className="legalClose" onClick={onClose} aria-label={dict.close}>
          ×
        </button>
        <LegalContent type={type} dict={dict} site={site} headingLevel="h2" titleId={titleId} />
      </section>
    </div>
  );
}

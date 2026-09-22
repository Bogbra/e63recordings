"use client";

import { useRef } from "react";
import type { MouseEvent as ReactMouseEvent, RefObject } from "react";
import { site } from "@/data/site";
import { getDictionary, type Locale } from "@/data/i18n";
import { useOverlayChrome } from "@/hooks/useOverlayChrome";

// Stable reference required by useOverlayChrome (see its inertSelectors doc).
const LEGAL_INERT_SELECTORS = ["#top", "header", "footer"];

type LegalPanelProps = {
  type: "imprint" | "privacy" | null;
  locale: Locale;
  onClose: () => void;
  restoreFocusRef: RefObject<HTMLElement | null>;
};

export function LegalPanel({ type, locale, onClose, restoreFocusRef }: LegalPanelProps) {
  const dict = getDictionary(locale).legal;
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
        aria-labelledby="legal-title"
        data-lenis-prevent
        onMouseDown={(event: ReactMouseEvent<HTMLElement>) => event.stopPropagation()}
      >
        <button ref={closeButtonRef} className="legalClose" onClick={onClose} aria-label={dict.close}>
          ×
        </button>

        {type === "imprint" ? (
          <div className="legalContent">
            <p className="eyebrow">{dict.imprint.eyebrow}</p>
            <h2 id="legal-title">{dict.imprint.title}</h2>
            <p>{dict.imprint.intro}</p>
            <p>
              <strong>{site.name}</strong><br />
              {site.addressLines.map((line) => (
                <span key={line}>{line}<br /></span>
              ))}
            </p>
            <p>
              {dict.imprint.represented}: {site.director}<br />
              {dict.imprint.email}: <a href={`mailto:${site.email}`}>{site.email}</a><br />
              {dict.imprint.website}: {site.website}
            </p>
          </div>
        ) : (
          <div className="legalContent">
            <p className="eyebrow">{dict.privacy.eyebrow}</p>
            <h2 id="legal-title">{dict.privacy.title}</h2>
            <h3>{dict.privacy.s1title}</h3>
            <p>
              {site.name}<br />
              {site.addressLines.join(", ")}<br />
              {dict.imprint.email}: <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>

            <h3>{dict.privacy.s2title}</h3>
            <p>{dict.privacy.s2body}</p>

            <h3>{dict.privacy.s3title}</h3>
            <p>{dict.privacy.s3body}</p>

            <h3>{dict.privacy.s4title}</h3>
            <p>{dict.privacy.s4body}</p>

            <h3>{dict.privacy.s5title}</h3>
            <p>{dict.privacy.s5body}</p>

            <h3>{dict.privacy.s6title}</h3>
            <p>{dict.privacy.s6body}</p>
          </div>
        )}
      </section>
    </div>
  );
}

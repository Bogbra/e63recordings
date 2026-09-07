"use client";

import { useEffect } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { site } from "@/data/site";
import { getDictionary, type Locale } from "@/data/i18n";

type LegalPanelProps = {
  type: "imprint" | "privacy" | null;
  locale: Locale;
  onClose: () => void;
};

export function LegalPanel({ type, locale, onClose }: LegalPanelProps) {
  const dict = getDictionary(locale).legal;

  useEffect(() => {
    if (!type) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.documentElement.classList.add("modalOpen");
    window.dispatchEvent(new Event("lenis:stop"));
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.classList.remove("modalOpen");
      window.dispatchEvent(new Event("lenis:start"));
      window.removeEventListener("keydown", onKey);
    };
  }, [type, onClose]);

  if (!type) return null;

  return (
    <div className="legalBackdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="legalPanel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-title"
        data-lenis-prevent
        onMouseDown={(event: ReactMouseEvent<HTMLElement>) => event.stopPropagation()}
      >
        <button className="legalClose" onClick={onClose} aria-label={dict.close}>
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
              {dict.imprint.phone}: <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a><br />
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

"use client";

import { CSSProperties, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { releases } from "@/data/site";
import { ArrowIcon } from "./ArrowIcon";

gsap.registerPlugin(ScrollTrigger);

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(callback: () => void) {
  const media = window.matchMedia(REDUCED_MOTION_QUERY);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

function readableTextColor(hex: string) {
  let c = hex.replace("#", "");
  if (c.length === 3) c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
  const r = parseInt(c.substr(0, 2), 16) / 255;
  const g = parseInt(c.substr(2, 2), 16) / 255;
  const b = parseInt(c.substr(4, 2), 16) / 255;
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 0.5 ? "#090909" : "#f5f4ef";
}

type AlbumsDict = {
  topline: string;
  link: string;
  scroll: string;
};

export function AlbumsShowcase({ dict }: { dict: AlbumsDict }) {
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const vinylRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  // Drives which markup the sr-only list renders (see below).
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // gsap.matchMedia (rather than a one-time `.matches` check) also handles
    // the OS-level setting changing live while the page is open in either
    // direction, tearing the animation down / setting it up as needed.
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // -1 (not 0): forces the very first applyLayout(0) call below to run
      // setActiveIndex(0), resyncing the text state to the freshly-applied
      // visual layout even if `activeIndex` was left on a different release
      // from a previous no-preference session (e.g. reduce → no-preference
      // → reduce → no-preference while the page stayed open).
      let active = -1;

      function applyLayout(position: number) {
        const rounded = Math.round(position);
        if (rounded !== active) {
          active = rounded;
          setActiveIndex(rounded);
        }

        releases.forEach((_, i) => {
          const item = itemRefs.current[i];
          const vinyl = vinylRefs.current[i];
          if (!item || !vinyl) return;

          const offset = i - position;
          const absOffset = Math.abs(offset);

          gsap.set(item, {
            xPercent: offset * 165,
            rotateY: gsap.utils.clamp(-55, 55, offset * -42),
            scale: 1 - Math.min(absOffset, 1.5) * 0.14,
            opacity: gsap.utils.clamp(0.08, 1, 1 - absOffset * 0.7),
            zIndex: Math.round(50 - absOffset * 10),
          });

          const bump = gsap.utils.clamp(0, 1, 1 - absOffset);

          gsap.set(vinyl, {
            xPercent: bump * 55,
            scale: 0.86 + bump * 0.05,
            rotate: position * 300,
            opacity: 0.3 + bump * 0.7,
          });
        });
      }

      // The CSS-only resting state (`.albums__item:first-child` z-index, see
      // globals.css) already shows the correct release before this runs —
      // this just spreads the items into the 3D fan layout once GSAP is
      // ready. It runs in an effect, i.e. after the first paint, so it must
      // never be the thing responsible for the *correct* initial state.
      applyLayout(0);

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.4,
        onUpdate: (self) => applyLayout(self.progress * (releases.length - 1)),
      });

      return () => trigger.kill();
    });

    return () => mm.revert();
  }, []);

  const release = releases[activeIndex];
  const sectionStyle = { "--album-count": releases.length } as CSSProperties;

  return (
    <section ref={sectionRef} className="albums" id="latest" style={sectionStyle}>
      <h2 className="sr-only albums__a11yHeading">{dict.topline}</h2>
      {/* Non-interactive by default: a focusable-but-invisible link has no
          visible focus indicator (a real WCAG 2.4.7 failure for sighted
          keyboard users), so this only becomes a real link list once the
          reduced-motion CSS makes it visible — at that point it's the only
          way to reach each release, since `.albums__meta`'s link is
          `display: none` in that mode (see globals.css). In normal mode,
          the currently-active release stays reachable via the visible
          `.albums__link` CTA below. */}
      <ul className="sr-only albums__a11yList">
        {releases.map((item) => {
          const label = `${item.artist} — ${item.title} (${item.catalogue})`;
          return (
            <li key={item.num}>
              {reducedMotion ? (
                <a href={item.href} target="_blank" rel="noreferrer">
                  {label}
                </a>
              ) : (
                label
              )}
            </li>
          );
        })}
      </ul>

      <div className="albums__pin">
        <div className="albums__stage" aria-hidden="true">
          {releases.map((item, i) => (
            <div
              key={item.num}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className="albums__item"
            >
              <div
                ref={(el) => {
                  vinylRefs.current[i] = el;
                }}
                className="albums__vinyl"
                style={
                  {
                    "--vinyl-accent": item.accent,
                    "--vinyl-label-fg": readableTextColor(item.accent),
                  } as CSSProperties
                }
              >
                <span className="albums__vinylLabel">{item.catalogue}</span>
              </div>
              <div className="albums__sleeve" style={{ backgroundImage: `url(${item.cover})` }} />
            </div>
          ))}
        </div>

        {/* Decorative — driven by scroll position, not meant to be read by
            assistive tech. The sr-only heading + list above are the single
            accessible description of all releases; duplicating it here via
            aria-live would mean announcing the same info twice, and mid-
            scroll live-region announcements are disorienting anyway. */}
        <div className="albums__topline" aria-hidden="true">
          <span>{dict.topline}</span>
          <span>{release.catalogue}</span>
        </div>

        <h3 className="albums__title" aria-hidden="true" key={`${release.num}-${release.title}`}>
          <span>{release.artist}</span>
          {release.title}
        </h3>

        <div className="albums__meta">
          <span className="albums__num" aria-hidden="true">
            <span className="albums__num-dash">/</span>
            <span>{release.num}</span>
          </span>
          <a
            href={release.href}
            target="_blank"
            rel="noreferrer"
            className="albums__link"
            aria-label={`${dict.link}: ${release.artist} — ${release.title}`}
          >
            {dict.link} <ArrowIcon />
          </a>
        </div>

        <div className="albums__scroll" aria-hidden="true">
          <span>{dict.scroll}</span>
          <i />
        </div>
      </div>
    </section>
  );
}

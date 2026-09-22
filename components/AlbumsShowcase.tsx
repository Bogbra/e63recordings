"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { releases } from "@/data/site";
import { ArrowIcon } from "./ArrowIcon";

gsap.registerPlugin(ScrollTrigger);

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

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let active = 0;

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

    // Apply the resting (scroll-progress 0) layout synchronously, right
    // after mount, so the very first paint already shows the correct
    // spread-out order — otherwise the items sit stacked at their default
    // position (last one in the DOM on top) until ScrollTrigger's onUpdate
    // fires on the next scroll/ticker frame.
    applyLayout(0);

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.4,
      onUpdate: (self) => applyLayout(self.progress * (releases.length - 1)),
    });

    return () => trigger.kill();
  }, []);

  const release = releases[activeIndex];
  const sectionStyle = { "--album-count": releases.length } as CSSProperties;

  return (
    <section ref={sectionRef} className="albums" id="latest" style={sectionStyle}>
      <h2 className="sr-only albums__a11yHeading">{dict.topline}</h2>
      <ul className="sr-only albums__a11yList">
        {releases.map((item) => (
          <li key={item.num}>
            <a href={item.href} target="_blank" rel="noreferrer">
              {item.artist} — {item.title} ({item.catalogue})
            </a>
          </li>
        ))}
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

        <div className="albums__meta" aria-hidden="true">
          <span className="albums__num">
            <span className="albums__num-dash">/</span>
            <span>{release.num}</span>
          </span>
          <a href={release.href} target="_blank" rel="noreferrer" className="albums__link" tabIndex={-1}>
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

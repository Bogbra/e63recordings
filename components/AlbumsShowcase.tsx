"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/data/site";
import { ArrowIcon } from "./ArrowIcon";

gsap.registerPlugin(ScrollTrigger);

type Release = {
  num: string;
  title: string;
  artist: string;
  catalogue: string;
  href: string;
  cover?: string;
  palette: [string, string, string];
  motif: "rings" | "slash" | "grid";
};

// Newest catalogue number first — matches the physical "new releases"
// shelf order and the carousel's scroll direction.
const releases: Release[] = [
  {
    num: "06",
    title: "Feel the High",
    artist: "Theo Schmitt & Karibik Joe",
    catalogue: "E63NR06",
    href: site.bandcamp,
    cover: "/feel-the-high-cover.webp",
    palette: ["#1a1204", "#f5f4ef", "#EFC639"],
    motif: "rings",
  },
  {
    num: "05",
    title: "Turbo Evolution",
    artist: "Theo Schmitt",
    catalogue: "E63NR05",
    href: site.bandcamp,
    cover: "/turbo-evolution-cover.webp",
    palette: ["#070707", "#dfff00", "#fff"],
    motif: "rings",
  },
  {
    // The vinyl's B-side ("Take That") isn't a separate catalogue entry —
    // same record, so it lives under this one release.
    num: "04",
    title: "Joy",
    artist: "Theo Schmitt",
    catalogue: "E63NR04",
    href: site.bandcamp,
    cover: "/joy-cover.webp",
    palette: ["#ecebe5", "#090909", "#000"],
    motif: "slash",
  },
];

function readableTextColor(hex: string) {
  let c = hex.replace("#", "");
  if (c.length === 3) c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
  const r = parseInt(c.substr(0, 2), 16) / 255;
  const g = parseInt(c.substr(2, 2), 16) / 255;
  const b = parseInt(c.substr(4, 2), 16) / 255;
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 0.5 ? "#090909" : "#f5f4ef";
}

function drawSleeveImage(release: Release, index: number) {
  const canvas = document.createElement("canvas");
  canvas.width = 1600;
  canvas.height = 1000;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context unavailable");

  const [bg, fg, accent] = release.palette;
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const gradient = ctx.createRadialGradient(1160, 250, 20, 1160, 250, 620);
  gradient.addColorStop(0, accent);
  gradient.addColorStop(0.24, `${accent}b8`);
  gradient.addColorStop(1, `${accent}00`);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.globalAlpha = 0.84;
  ctx.strokeStyle = fg;
  ctx.lineWidth = 2;

  if (release.motif === "rings") {
    const cx = 1130;
    const cy = 520;
    for (let r = 35; r < 710; r += 27) {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  if (release.motif === "slash") {
    ctx.lineWidth = 8;
    for (let x = -380; x < 1900; x += 72) {
      ctx.beginPath();
      ctx.moveTo(x, 1000);
      ctx.lineTo(x + 570, 0);
      ctx.stroke();
    }
    ctx.globalAlpha = 0.98;
    ctx.fillStyle = accent;
    ctx.fillRect(920, 0, 250, 1000);
  }

  if (release.motif === "grid") {
    ctx.globalAlpha = 0.46;
    ctx.lineWidth = 1.5;
    for (let x = 0; x <= 1600; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 1000);
      ctx.stroke();
    }
    for (let y = 0; y <= 1000; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1600, y);
      ctx.stroke();
    }
    ctx.globalAlpha = 0.92;
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.arc(1120, 470, 310, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.arc(1120, 470, 205, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  ctx.save();
  ctx.fillStyle = fg;
  ctx.globalAlpha = 0.92;
  ctx.font = "900 430px Arial, Helvetica, sans-serif";
  ctx.fillText("E63", 38, 440);
  ctx.restore();

  ctx.save();
  ctx.fillStyle = fg;
  ctx.globalAlpha = 0.9;
  ctx.font = "700 38px Arial, Helvetica, sans-serif";
  ctx.fillText(release.catalogue, 52, 925);
  ctx.font = "18px Arial, Helvetica, sans-serif";
  ctx.fillText(`FRANKFURT AM MAIN · ${String(index + 1).padStart(2, "0")}`, 1230, 930);
  ctx.restore();

  return canvas.toDataURL("image/png");
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
  const [sleeves, setSleeves] = useState<string[]>([]);

  useEffect(() => {
    setSleeves(releases.map((release, i) => release.cover ?? drawSleeveImage(release, i)));
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

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
      <div className="albums__pin" id="albumsPin">
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
                    "--vinyl-accent": item.palette[2],
                    "--vinyl-label-fg": readableTextColor(item.palette[2]),
                  } as CSSProperties
                }
              >
                <span className="albums__vinylLabel">{item.catalogue}</span>
              </div>
              <div
                className="albums__sleeve"
                style={sleeves[i] ? { backgroundImage: `url(${sleeves[i]})` } : undefined}
              />
            </div>
          ))}
        </div>

        <div className="albums__topline">
          <span>{dict.topline}</span>
          <span>{release.catalogue}</span>
        </div>

        <h3 className="albums__title" id="albumTitle" aria-live="polite" key={`${release.num}-${release.title}`}>
          <span>{release.artist}</span>
          {release.title}
        </h3>

        <div className="albums__meta">
          <span className="albums__num">
            <span className="albums__num-dash">/</span>
            <span id="albumNum">{release.num}</span>
          </span>
          <a href={release.href} target="_blank" rel="noreferrer" className="albums__link">
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

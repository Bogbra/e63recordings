"use client";

import { useRef, useState } from "react";
import { Logo } from "./Logo";
import { ArrowIcon } from "./ArrowIcon";
import { useOverlayChrome } from "@/hooks/useOverlayChrome";
import type { Locale } from "@/data/i18n";

// Stable reference required by useOverlayChrome (see its inertSelectors doc).
const MENU_INERT_SELECTORS = ["#top", "footer"];

type HeaderDict = {
  tagline: string;
  menuOpen: string;
  menuClose: string;
};

type MenuDict = {
  eyebrow: string;
  items: { label: string; href: string }[];
};

type LangSwitchDict = {
  label: string;
  href: string;
};

type SiteHeaderProps = {
  locale: Locale;
  headerDict: HeaderDict;
  menuDict: MenuDict;
  langSwitch: LangSwitchDict;
  instagram: string;
  bandcamp: string;
};

export function SiteHeader({ locale, headerDict, menuDict, langSwitch, instagram, bandcamp }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const closeMenu = () => setMenuOpen(false);

  useOverlayChrome({
    active: menuOpen,
    panelRef: navRef,
    initialFocusRef: firstLinkRef,
    restoreFocusRef: menuButtonRef,
    onEscape: closeMenu,
    inertSelectors: MENU_INERT_SELECTORS,
  });

  return (
    <>
      <header className="siteHeader">
        <a href="#top" className="brandLink" aria-label="E63 Recordings home">
          <Logo />
        </a>
        <div className="headerCenter">
          <p className="headerMeta">{headerDict.tagline}</p>
          <a href={langSwitch.href} className="langSwitch" hrefLang={locale === "de" ? "en" : "de"}>
            {langSwitch.label}
          </a>
        </div>
        <button
          ref={menuButtonRef}
          className="menuButton"
          onClick={() => setMenuOpen((value) => !value)}
          aria-expanded={menuOpen}
          aria-controls="site-menu"
        >
          {menuOpen ? headerDict.menuClose : headerDict.menuOpen}
        </button>
      </header>

      <nav
        ref={navRef}
        id="site-menu"
        className={`siteMenu ${menuOpen ? "siteMenu--open" : ""}`}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <div className="siteMenuInner">
          <p className="eyebrow">{menuDict.eyebrow}</p>
          <div className="menuLinks">
            {menuDict.items.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                ref={index === 0 ? firstLinkRef : undefined}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {item.label}
              </a>
            ))}
          </div>
          <div className="menuFoot">
            <a href={instagram} target="_blank" rel="noreferrer">Instagram <ArrowIcon /></a>
            <a href={bandcamp} target="_blank" rel="noreferrer">Bandcamp <ArrowIcon /></a>
          </div>
        </div>
      </nav>
    </>
  );
}

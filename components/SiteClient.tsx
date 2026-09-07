"use client";

import { useState } from "react";
import { SmoothScroll } from "./SmoothScroll";
import { FitText } from "./FitText";
import { Logo } from "./Logo";
import { LegalPanel } from "./LegalPanel";
import { CoverArt } from "./CoverArt";
import { AlbumsShowcase } from "./AlbumsShowcase";
import { site, artists } from "@/data/site";
import { getDictionary, type Locale } from "@/data/i18n";

export function SiteClient({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const [menuOpen, setMenuOpen] = useState(false);
  const [legal, setLegal] = useState<"imprint" | "privacy" | null>(null);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <SmoothScroll />
      <header className="siteHeader">
        <a href="#top" className="brandLink" aria-label="E63 Recordings home">
          <Logo />
        </a>
        <div className="headerCenter">
          <p className="headerMeta">{dict.header.tagline}</p>
          <a href={dict.langSwitch.href} className="langSwitch" hrefLang={locale === "de" ? "en" : "de"}>
            {dict.langSwitch.label}
          </a>
        </div>
        <button
          className="menuButton"
          onClick={() => setMenuOpen((value: boolean) => !value)}
          aria-expanded={menuOpen}
          aria-controls="site-menu"
        >
          {menuOpen ? dict.header.menuClose : dict.header.menuOpen}
        </button>
      </header>

      <nav id="site-menu" className={`siteMenu ${menuOpen ? "siteMenu--open" : ""}`} aria-hidden={!menuOpen}>
        <div className="siteMenuInner">
          <p className="eyebrow">{dict.menu.eyebrow}</p>
          <div className="menuLinks">
            {dict.menu.items.map((item, index) => (
              <a key={item.href} href={item.href} onClick={closeMenu}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {item.label}
              </a>
            ))}
          </div>
          <div className="menuFoot">
            <a href={site.instagram} target="_blank" rel="noreferrer">Instagram ↗</a>
            <a href={site.bandcamp} target="_blank" rel="noreferrer">Bandcamp ↗</a>
          </div>
        </div>
      </nav>

      <main id="top">
        <section className="hero sectionDark">
          <div className="heroMeta">
            <span>{dict.hero.kicker}</span>
            <span>2020—∞</span>
          </div>
          <div className="heroTitleWrap" aria-label="E63 Recordings">
            <div className="heroLine heroLine--e63">E63</div>
            <div className="heroLine heroLine--recordings">Recordings</div>
          </div>
          <div className="heroBottom">
            <p>
              {dict.hero.copy.split("\n").map((line, i) => (
                <span key={line}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </p>
            <a href="#latest" className="circleLink" aria-label={dict.hero.scrollAria}>↓</a>
          </div>
        </section>

        <AlbumsShowcase dict={dict.albums} />

        <section id="about" className="about sectionAcid">
          <div className="sectionIndex">/02</div>
          <div className="aboutGrid">
            <p className="eyebrow">{dict.about.eyebrow}</p>
            <div className="aboutCopy">
              <p className="largeStatement">{dict.about.statement}</p>
              {dict.about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="aboutTicker" aria-hidden="true">
            <span>FRANKFURT · TECHNO · AMBIENT · E63 · FRANKFURT · TECHNO · AMBIENT · E63 · </span>
            <span>FRANKFURT · TECHNO · AMBIENT · E63 · FRANKFURT · TECHNO · AMBIENT · E63 · </span>
          </div>
        </section>

        <section id="artists" className="sound sectionDark">
          <div className="sectionIndex">/03</div>
          <div className="sectionHead sectionHead--inverse">
            <p className="eyebrow">{dict.artists.eyebrow}</p>
            <h2>
              {dict.artists.heading[0]}
              <br />
              {dict.artists.heading[1]}
            </h2>
          </div>
          <div className="soundGrid">
            {artists.map((artist, index) => (
              <article
                key={artist.id}
                className={`soundCard ${index === 1 ? "soundCard--offset" : ""}`}
              >
                {artist.photo ? (
                  <div className="artistPhoto">
                    <img src={artist.photo} alt={artist.name} />
                    <span className="coverCode">{artist.code}</span>
                  </div>
                ) : (
                  <CoverArt code={artist.code} title={artist.name} variant={index === 0 ? "b" : "c"} />
                )}
                <div className="soundCardText">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{artist.name}</h3>
                  <p>{dict.artists.bios[artist.id]}</p>
                  {artist.instagram && (
                    <a href={artist.instagram} target="_blank" rel="noreferrer" className="artistLink">
                      Instagram ↗
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="join" className="about sectionAcid">
          <div className="sectionIndex">/04</div>
          <div className="aboutGrid">
            <p className="eyebrow">{dict.join.eyebrow}</p>
            <div className="aboutCopy">
              <p className="largeStatement">{dict.join.statement}</p>
              {dict.join.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section id="demos" className="demos sectionLight">
          <div className="sectionIndex">/05</div>
          <div className="demoGrid">
            <div>
              <p className="eyebrow">{dict.demos.eyebrow}</p>
              <h2>
                {dict.demos.heading[0]}
                <br />
                {dict.demos.heading[1]}
              </h2>
            </div>
            <div className="demoCopy">
              <p>{dict.demos.copy}</p>
              <p className="demoCopy__secondary">{dict.demos.copy2}</p>
              <a className="bigButton" href={`mailto:${site.email}?subject=E63%20Demo%20Submission`}>
                {dict.demos.cta}
              </a>
            </div>
          </div>
        </section>

        <section id="contact" className="contact sectionDark">
          <div className="sectionIndex">/06</div>
          <p className="eyebrow">{dict.contact.eyebrow}</p>
          <FitText className="contactMarquee" href={`mailto:${site.email}`}>
            {dict.contact.marquee}
          </FitText>
          <div className="contactFoot">
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <div className="socialLinks">
              <a href={site.instagram} target="_blank" rel="noreferrer">Instagram ↗</a>
              <a href={site.facebook} target="_blank" rel="noreferrer">Facebook ↗</a>
              <a href={site.bandcamp} target="_blank" rel="noreferrer">Bandcamp ↗</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <Logo />
        <span>© {new Date().getFullYear()} E63 Recordings</span>
        <div className="footerLegal">
          <button onClick={() => setLegal("imprint")}>{dict.footer.imprint}</button>
          <button onClick={() => setLegal("privacy")}>{dict.footer.privacy}</button>
        </div>
      </footer>

      <LegalPanel type={legal} locale={locale} onClose={() => setLegal(null)} />
    </>
  );
}

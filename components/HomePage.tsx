import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { SmoothScroll } from "./SmoothScroll";
import { Hero } from "./Hero";
import { AlbumsShowcase } from "./AlbumsShowcase";
import { AboutSection } from "./AboutSection";
import { Artists } from "./Artists";
import { Demos } from "./Demos";
import { Contact } from "./Contact";
import { site, artists } from "@/data/site";
import { getDictionary, type Locale } from "@/data/i18n";

const ABOUT_TICKER = "FRANKFURT · TECHNO · AMBIENT · E63 · ";

// The one-page layout, shared by the `/` (de) and `/en/` routes — only the
// locale differs between them.
export function HomePage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <>
      <SmoothScroll />
      <SiteHeader
        locale={locale}
        homeHref="#top"
        headerDict={dict.header}
        menuDict={dict.menu}
        langSwitch={dict.langSwitch}
        instagram={site.instagram}
        bandcamp={site.bandcamp}
      />

      <main id="top">
        <Hero dict={dict.hero} />
        <AlbumsShowcase dict={dict.albums} />
        <AboutSection
          id="about"
          index="/02"
          eyebrow={dict.about.eyebrow}
          statement={dict.about.statement}
          paragraphs={dict.about.paragraphs}
          ticker={ABOUT_TICKER}
        />
        <Artists dict={dict.artists} artists={artists} />
        <AboutSection
          id="join"
          index="/04"
          eyebrow={dict.join.eyebrow}
          statement={dict.join.statement}
          paragraphs={dict.join.paragraphs}
        />
        <Demos dict={dict.demos} email={site.email} />
        <Contact dict={dict.contact} site={site} />
      </main>

      <SiteFooter locale={locale} footerDict={dict.footer} legalDict={dict.legal} site={site} />
    </>
  );
}

import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { LegalContent } from "./LegalContent";
import { site } from "@/data/site";
import { getDictionary, type Locale } from "@/data/i18n";
import { LOCALE_HOME_PATHS } from "@/lib/locales";
import { LEGAL_PATHS } from "@/lib/legalRoutes";

type LegalPageProps = {
  locale: Locale;
  type: "imprint" | "privacy";
};

// The standalone /impressum/, /datenschutz/, /en/imprint/ and /en/privacy/
// pages — the real, always-reachable version of the legal content. The
// slide-in dialog (LegalPanel, reachable from any page's footer) is the
// enhancement on top of these, not a replacement for them.
export function LegalPage({ locale, type }: LegalPageProps) {
  const dict = getDictionary(locale);
  const otherLocale: Locale = locale === "de" ? "en" : "de";
  const langSwitch = {
    label: dict.langSwitch.label,
    href: LEGAL_PATHS[otherLocale][type],
  };

  return (
    <>
      <SiteHeader
        locale={locale}
        homeHref={LOCALE_HOME_PATHS[locale]}
        headerDict={dict.header}
        menuDict={dict.menu}
        langSwitch={langSwitch}
        instagram={site.instagram}
        bandcamp={site.bandcamp}
      />

      <main id="top" className="legalPage">
        <LegalContent type={type} dict={dict.legal} site={site} headingLevel="h1" />
      </main>

      <SiteFooter locale={locale} footerDict={dict.footer} legalDict={dict.legal} site={site} />
    </>
  );
}

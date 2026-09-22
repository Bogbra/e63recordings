import type { Dictionary } from "@/data/i18n";

type SiteInfo = {
  name: string;
  addressLines: string[];
  director: string;
  email: string;
  website: string;
};

type LegalContentProps = {
  type: "imprint" | "privacy";
  dict: Dictionary["legal"];
  site: SiteInfo;
  /**
   * The top title's tag: "h1" on the standalone static pages (where it's the
   * page's own top-level heading), "h2" inside the slide-in dialog (where
   * it's nested under the page's real h1). Visual size comes from the
   * `.legalTitle`/`.legalSectionTitle` classes below, not the tag itself, so
   * this only changes semantics, never appearance.
   */
  headingLevel?: "h1" | "h2";
};

export function LegalContent({ type, dict, site, headingLevel = "h2" }: LegalContentProps) {
  const TitleTag = headingLevel;
  const SectionTag = headingLevel === "h1" ? "h2" : "h3";

  if (type === "imprint") {
    return (
      <div className="legalContent">
        <p className="eyebrow">{dict.imprint.eyebrow}</p>
        <TitleTag id="legal-title" className="legalTitle">{dict.imprint.title}</TitleTag>
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
    );
  }

  return (
    <div className="legalContent">
      <p className="eyebrow">{dict.privacy.eyebrow}</p>
      <TitleTag id="legal-title" className="legalTitle">{dict.privacy.title}</TitleTag>
      <SectionTag className="legalSectionTitle">{dict.privacy.s1title}</SectionTag>
      <p>
        {site.name}<br />
        {site.addressLines.join(", ")}<br />
        {dict.imprint.email}: <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>

      <SectionTag className="legalSectionTitle">{dict.privacy.s2title}</SectionTag>
      <p>{dict.privacy.s2body}</p>

      <SectionTag className="legalSectionTitle">{dict.privacy.s3title}</SectionTag>
      <p>{dict.privacy.s3body}</p>

      <SectionTag className="legalSectionTitle">{dict.privacy.s4title}</SectionTag>
      <p>{dict.privacy.s4body}</p>

      <SectionTag className="legalSectionTitle">{dict.privacy.s5title}</SectionTag>
      <p>{dict.privacy.s5body}</p>

      <SectionTag className="legalSectionTitle">{dict.privacy.s6title}</SectionTag>
      <p>{dict.privacy.s6body}</p>
    </div>
  );
}

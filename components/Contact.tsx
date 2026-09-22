import { FitText } from "./FitText";
import { ArrowIcon } from "./ArrowIcon";

type ContactDict = {
  eyebrow: string;
  marquee: string;
};

type ContactSite = {
  email: string;
  instagram: string;
  facebook: string;
  bandcamp: string;
};

export function Contact({ dict, site }: { dict: ContactDict; site: ContactSite }) {
  return (
    <section id="contact" className="contact sectionDark">
      <div className="sectionIndex">/06</div>
      <h2 className="eyebrow">{dict.eyebrow}</h2>
      <FitText className="contactMarquee" href={`mailto:${site.email}`}>
        {dict.marquee}
      </FitText>
      <div className="contactFoot">
        <a href={`mailto:${site.email}`}>{site.email}</a>
        <div className="socialLinks">
          <a href={site.instagram} target="_blank" rel="noreferrer">Instagram <ArrowIcon /></a>
          <a href={site.facebook} target="_blank" rel="noreferrer">Facebook <ArrowIcon /></a>
          <a href={site.bandcamp} target="_blank" rel="noreferrer">Bandcamp <ArrowIcon /></a>
        </div>
      </div>
    </section>
  );
}

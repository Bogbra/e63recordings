import { ArrowIcon } from "./ArrowIcon";

type DemosDict = {
  eyebrow: string;
  heading: string[];
  copy: string;
  copy2: string;
  cta: string;
};

export function Demos({ dict, email }: { dict: DemosDict; email: string }) {
  return (
    <section id="demos" className="demos sectionLight">
      <div className="sectionIndex" aria-hidden="true">/05</div>
      <div className="demoGrid">
        <div>
          <p className="eyebrow">{dict.eyebrow}</p>
          <h2>
            {dict.heading[0]}
            <br />
            {dict.heading[1]}
          </h2>
        </div>
        <div className="demoCopy">
          <p>{dict.copy}</p>
          <p className="demoCopy__secondary">{dict.copy2}</p>
          <a className="bigButton" href={`mailto:${email}?subject=E63%20Demo%20Submission`}>
            {dict.cta} <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  );
}

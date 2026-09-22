import { ArrowIcon } from "./ArrowIcon";

type HeroDict = {
  kicker: string;
  copy: string;
  scrollAria: string;
};

export function Hero({ dict }: { dict: HeroDict }) {
  return (
    <section className="hero sectionDark">
      <div className="heroMeta">
        <span>{dict.kicker}</span>
        <span>2020—∞</span>
      </div>
      <h1 className="heroTitleWrap">
        <span className="heroLine heroLine--e63">E63</span>
        <span className="heroLine heroLine--recordings">Recordings</span>
      </h1>
      <div className="heroBottom">
        <p>
          {dict.copy.split("\n").map((line, i) => (
            <span key={line}>
              {i > 0 && <br />}
              {line}
            </span>
          ))}
        </p>
        <a href="#latest" className="circleLink" aria-label={dict.scrollAria}>
          <ArrowIcon direction="down" />
        </a>
      </div>
    </section>
  );
}

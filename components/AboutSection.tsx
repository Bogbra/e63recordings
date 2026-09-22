type AboutSectionProps = {
  id: string;
  index: string;
  eyebrow: string;
  statement: string;
  paragraphs: string[];
  ticker?: string;
};

export function AboutSection({ id, index, eyebrow, statement, paragraphs, ticker }: AboutSectionProps) {
  return (
    <section id={id} className="about sectionAcid">
      <div className="sectionIndex" aria-hidden="true">{index}</div>
      <div className="aboutGrid">
        <p className="eyebrow">{eyebrow}</p>
        <div className="aboutCopy">
          <h2 className="largeStatement">{statement}</h2>
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
      {ticker && (
        <div className="aboutTicker" aria-hidden="true">
          <span>{ticker}</span>
          <span>{ticker}</span>
        </div>
      )}
    </section>
  );
}

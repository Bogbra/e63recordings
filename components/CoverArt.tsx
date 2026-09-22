type CoverArtProps = {
  variant?: "a" | "b" | "c";
  code: string;
  title: string;
};

export function CoverArt({ variant = "a", code, title }: CoverArtProps) {
  return (
    <div className={`coverArt coverArt--${variant}`} aria-label={`${title} artwork placeholder`}>
      <div className="coverGrid" aria-hidden="true" />
      <div className="coverHalo coverHalo--one" aria-hidden="true" />
      <div className="coverHalo coverHalo--two" aria-hidden="true" />
      <span className="coverCode" aria-hidden="true">{code}</span>
      <span className="coverStamp" aria-hidden="true">FRA · E63</span>
    </div>
  );
}

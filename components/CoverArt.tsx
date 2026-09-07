type CoverArtProps = {
  variant?: "a" | "b" | "c";
  code: string;
  title: string;
};

export function CoverArt({ variant = "a", code, title }: CoverArtProps) {
  return (
    <div className={`coverArt coverArt--${variant}`} aria-label={`${title} artwork placeholder`}>
      <div className="coverGrid" />
      <div className="coverHalo coverHalo--one" />
      <div className="coverHalo coverHalo--two" />
      <span className="coverCode">{code}</span>
      <span className="coverStamp">FRA · E63</span>
    </div>
  );
}

import { CoverArt } from "./CoverArt";
import { ArrowIcon } from "./ArrowIcon";

type Artist = {
  id: "theo" | "joe";
  name: string;
  code: string;
  photo: string | null;
  instagram: string | null;
};

type ArtistsDict = {
  eyebrow: string;
  heading: string[];
  bios: Record<"theo" | "joe", string>;
};

export function Artists({ dict, artists }: { dict: ArtistsDict; artists: Artist[] }) {
  return (
    <section id="artists" className="sound sectionDark">
      <div className="sectionIndex">/03</div>
      <div className="sectionHead sectionHead--inverse">
        <p className="eyebrow">{dict.eyebrow}</p>
        <h2>
          {dict.heading[0]}
          <br />
          {dict.heading[1]}
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
                {/* Decorative: the artist's name is already the heading right below. */}
                <img src={artist.photo} alt="" loading="lazy" decoding="async" />
                <span className="coverCode">{artist.code}</span>
              </div>
            ) : (
              <CoverArt code={artist.code} title={artist.name} variant={index === 0 ? "b" : "c"} />
            )}
            <div className="soundCardText">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{artist.name}</h3>
              <p>{dict.bios[artist.id]}</p>
              {artist.instagram && (
                <a href={artist.instagram} target="_blank" rel="noreferrer" className="artistLink">
                  Instagram <ArrowIcon />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

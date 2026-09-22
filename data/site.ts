export const site = {
  name: "E63 Recordings",
  email: "info@e63recordings.com",
  addressLines: ["Am Mühlweg 5", "63820 Elsenfeld", "Germany"],
  director: "Theofilos Schmitt",
  website: "e63recordings.com",
  instagram: "https://www.instagram.com/e63recordings/",
  facebook: "https://www.facebook.com/E63Recordings",
  bandcamp: "https://e63recordings.bandcamp.com/",
};

export type Release = {
  num: string;
  title: string;
  artist: string;
  catalogue: string;
  href: string;
  cover: string;
  accent: string;
};

// Newest catalogue number first — matches the physical "new releases"
// shelf order and the carousel's scroll direction.
export const releases: Release[] = [
  {
    num: "06",
    title: "Feel the High",
    artist: "Theo Schmitt & Karibik Joe",
    catalogue: "E63NR06",
    href: site.bandcamp,
    cover: "/feel-the-high-cover.webp",
    accent: "#EFC639",
  },
  {
    num: "05",
    title: "Turbo Evolution",
    artist: "Theo Schmitt",
    catalogue: "E63NR05",
    href: site.bandcamp,
    cover: "/turbo-evolution-cover.webp",
    accent: "#fff",
  },
  {
    // The vinyl's B-side ("Take That") isn't a separate catalogue entry —
    // same record, so it lives under this one release.
    num: "04",
    title: "Joy",
    artist: "Theo Schmitt",
    catalogue: "E63NR04",
    href: site.bandcamp,
    cover: "/joy-cover.webp",
    accent: "#000",
  },
];

export const artists: {
  id: "theo" | "joe";
  name: string;
  code: string;
  photo: string | null;
  instagram: string | null;
}[] = [
  {
    id: "theo",
    name: "Theo Schmitt",
    code: "TS",
    photo: "/theo-schmitt.webp",
    instagram: "https://www.instagram.com/theo_schmitt/",
  },
  {
    id: "joe",
    name: "Karibik Joe",
    code: "KJ",
    photo: "/karibik-joe.webp",
    instagram: "https://www.instagram.com/karibikjoe/",
  },
];

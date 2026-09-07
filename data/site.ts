export const site = {
  name: "E63 Recordings",
  founded: "2020",
  location: "Elsenfeld, Germany",
  email: "info@e63recordings.com",
  phone: "+49 6022 5089506",
  addressLines: ["Am Mühlweg 5", "63820 Elsenfeld", "Germany"],
  director: "Theofilos Schmitt",
  website: "e63recordings.com",
  instagram: "https://www.instagram.com/e63recordings/",
  facebook: "https://www.facebook.com/E63Recordings",
  bandcamp: "https://e63recordings.bandcamp.com/",
  latestRelease: {
    catalogue: "E63NR06",
    title: "Feel the High",
    artist: "Theo Schmitt & Karibik Joe",
    buyUrl: "https://e63recordings.bandcamp.com/",
  },
};

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

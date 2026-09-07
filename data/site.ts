export const site = {
  name: "E63 Recordings",
  founded: "2020",
  location: "Frankfurt am Main, Germany",
  email: "info@e63recordings.com",
  phone: "+49 6022 5089506",
  addressLines: ["Marienstrasse 3", "63820 Elsenfeld", "Germany"],
  director: "Theo Schmitt",
  website: "e63recordings.com",
  instagram: "https://www.instagram.com/e63recordings/",
  facebook: "https://www.facebook.com/E63Recordings",
  bandcamp: "https://e63recordings.bandcamp.com/",
  latestRelease: {
    catalogue: "E63NR05",
    title: "Turbo Evolution",
    artist: "Theo Schmitt",
    date: "28.08.2026",
    tracks: ["Turbo Evolution", "Deos"],
    buyUrl: "https://e63recordings.bandcamp.com/",
  },
  upcomingRelease: {
    catalogue: "E63NR06",
    title: "Feel the High",
    artist: "Karibik Joe & Theo Schmitt",
    date: "02.10.2026",
  },
};

export const artists = [
  { id: "theo", name: "Theo Schmitt", code: "TS", photo: "/theo-schmitt.webp" },
  { id: "joe", name: "Karibik Joe", code: "KJ", photo: null },
] as const;

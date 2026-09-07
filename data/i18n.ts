export type Locale = "de" | "en";

export const locales: Locale[] = ["de", "en"];
export const defaultLocale: Locale = "de";

type NavItem = { label: string; href: string };

export type Dictionary = {
  meta: {
    title: string;
    description: string;
    ogDescription: string;
  };
  header: {
    tagline: string;
    menuOpen: string;
    menuClose: string;
  };
  menu: {
    eyebrow: string;
    items: NavItem[];
  };
  hero: {
    kicker: string;
    copy: string;
    scrollAria: string;
  };
  albums: {
    topline: string;
    link: string;
    scroll: string;
  };
  about: {
    eyebrow: string;
    statement: string;
    paragraphs: string[];
  };
  artists: {
    eyebrow: string;
    heading: string[];
    bios: Record<"theo" | "joe", string>;
  };
  demos: {
    eyebrow: string;
    heading: string[];
    copy: string;
    rules: string[];
    cta: string;
  };
  contact: {
    eyebrow: string;
    marquee: string;
  };
  footer: {
    imprint: string;
    privacy: string;
  };
  legal: {
    close: string;
    imprint: {
      eyebrow: string;
      title: string;
      intro: string;
      represented: string;
      phone: string;
      email: string;
      website: string;
    };
    privacy: {
      eyebrow: string;
      title: string;
      s1title: string;
      s1body: string;
      s2title: string;
      s2body: string;
      s3title: string;
      s3body: string;
      s4title: string;
      s4body: string;
      s5title: string;
      s5body: string;
      s6title: string;
      s6body: string;
    };
  };
  langSwitch: {
    label: string;
    href: string;
  };
};

export const dictionaries: Record<Locale, Dictionary> = {
  de: {
    meta: {
      title: "E63 Recordings — Frankfurt",
      description:
        "E63 Recordings ist ein unabhängiges Electronic-Music-Label, gegründet 2020 in Frankfurt am Main, mit Fokus auf Dancefloor-Elektronik und melodischen Ambient.",
      ogDescription: "Elektronische Musik für den Dancefloor und melodische Ambient-Räume.",
    },
    header: {
      tagline: "Frankfurt am Main · Gegründet 2020",
      menuOpen: "Menü",
      menuClose: "Schließen",
    },
    menu: {
      eyebrow: "Navigation",
      items: [
        { label: "Neuestes", href: "#latest" },
        { label: "Über uns", href: "#about" },
        { label: "Artists", href: "#artists" },
        { label: "Demos", href: "#demos" },
        { label: "Kontakt", href: "#contact" },
      ],
    },
    hero: {
      kicker: "Unabhängiges Electronic-Label",
      copy: "Elektronische Musik für den Dancefloor\nund melodische Ambient-Räume.",
      scrollAria: "Zu den neuesten Veröffentlichungen scrollen",
    },
    albums: {
      topline: "Ausgewählte Veröffentlichungen",
      link: "Anhören / Kaufen ↗",
      scroll: "Scrollen",
    },
    about: {
      eyebrow: "Über das Label",
      statement:
        "E63 Recordings wurde 2020 von Produzent Theo Schmitt in Frankfurt am Main gegründet.",
      paragraphs: [
        "Theo Schmitt lebt in Frankfurt am Main und wurde vom pulsierenden Nachtleben und der renommierten Techno-Kultur der Stadt geprägt. In einer stetig wachsenden Szene aus Produzent:innen und DJs bleibt Theo im Kern Produzent — sein roher Techno-Sound hat die Unterstützung führender Namen wie Maceo Plex, John Digweed und Butch gewonnen.",
        "Sein Debütalbum „The Game“ erreichte die Beatport-Top-10, sein aktuelles Album „Intoxication“ stieg direkt auf Platz 1 der Beatport-Techno-Charts ein — und zeigt seine Bandbreite von Downtempo-Breakbeat bis zu rohem Peak-Time-Techno.",
        "Das Label bewegt sich zwischen direkter, physischer Clubmusik und melodischer Ambient-Arbeit — immer auf der Suche nach Charakter, Spannung und einer klaren Haltung.",
      ],
    },
    artists: {
      eyebrow: "Die Artists",
      heading: ["Zwei Artists.", "Eine Vision."],
      bios: {
        theo: "Frankfurt-Produzent mit rohem, dubgeprägtem Techno-Sound, unterstützt von Maceo Plex, John Digweed und Butch — sein Album „Intoxication“ stieg direkt auf Platz 1 der Beatport-Techno-Charts ein.",
        joe: "Kollaborateur und Co-Artist auf der kommenden Veröffentlichung „Feel the High“ (E63NR06).",
      },
    },
    demos: {
      eyebrow: "Demo-Einsendungen",
      heading: ["Neues Signal", "gesucht."],
      copy: "E63 ist an neuen Produzent:innen und Musiker:innen aus Deutschland und ganz Europa interessiert. Wir suchen fertige Musik mit klarer Identität — keine Kopien von dem, was schon funktioniert.",
      rules: [
        "Privater Streaming-Link",
        "Keine Anhänge",
        "Kurze Künstler-Vorstellung",
        "Fertige oder nahezu fertige Musik",
      ],
      cta: "Demo einreichen ↗",
    },
    contact: {
      eyebrow: "Kontakt / Booking / Demos",
      marquee: "LET’S TALK —",
    },
    footer: {
      imprint: "Impressum",
      privacy: "Datenschutz",
    },
    legal: {
      close: "Rechtliche Informationen schließen",
      imprint: {
        eyebrow: "Rechtliches / 01",
        title: "Impressum",
        intro: "Angaben gemäß § 5 DDG",
        represented: "Vertreten durch",
        phone: "Telefon",
        email: "E-Mail",
        website: "Website",
      },
      privacy: {
        eyebrow: "Rechtliches / 02",
        title: "Datenschutz",
        s1title: "1. Verantwortlicher",
        s1body: "",
        s2title: "2. Hosting und Server-Logfiles",
        s2body:
          "Diese Website ist für statisches Hosting bei IONOS vorgesehen. Beim Aufruf können technisch notwendige Server-Logdaten verarbeitet werden, insbesondere IP-Adresse, Zeitpunkt des Zugriffs, angeforderte Datei, Referrer sowie Browser- und Betriebssysteminformationen. Die Verarbeitung dient dem sicheren und störungsfreien Betrieb der Website.",
        s3title: "3. Cookies und Analytics",
        s3body:
          "Diese Version der Website setzt selbst keine Cookies, verwendet keine Webanalyse und bindet keine externen Audio-, Video- oder Social-Media-Player ein. Externe Plattformen werden ausschließlich über normale Links geöffnet.",
        s4title: "4. Kontakt per E-Mail",
        s4body:
          "Wenn du uns per E-Mail kontaktierst, verarbeiten wir die von dir übermittelten Angaben zur Bearbeitung der Anfrage. Die Daten werden nur so lange gespeichert, wie dies für die Kommunikation und etwaige gesetzliche Aufbewahrungspflichten erforderlich ist.",
        s5title: "5. Externe Links",
        s5body:
          "Links zu Bandcamp, Instagram, Facebook oder anderen Plattformen führen auf Websites externer Anbieter. Erst beim Anklicken gelten deren jeweilige Datenschutzbestimmungen.",
        s6title: "6. Betroffenenrechte",
        s6body:
          "Im Rahmen der gesetzlichen Voraussetzungen bestehen insbesondere Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch sowie ein Beschwerderecht bei einer Datenschutzaufsichtsbehörde.",
      },
    },
    langSwitch: { label: "EN", href: "/en/" },
  },
  en: {
    meta: {
      title: "E63 Recordings — Frankfurt",
      description:
        "E63 Recordings is an independent electronic music label founded in Frankfurt am Main in 2020, focused on dancefloor electronics and melodic ambient music.",
      ogDescription: "Electronic music for the dancefloor and melodic ambient spaces.",
    },
    header: {
      tagline: "Frankfurt am Main · Est. 2020",
      menuOpen: "Menu",
      menuClose: "Close",
    },
    menu: {
      eyebrow: "Navigate",
      items: [
        { label: "Latest", href: "#latest" },
        { label: "About", href: "#about" },
        { label: "Artists", href: "#artists" },
        { label: "Demos", href: "#demos" },
        { label: "Contact", href: "#contact" },
      ],
    },
    hero: {
      kicker: "Independent electronic label",
      copy: "Electronic music for the dancefloor\nand melodic ambient spaces.",
      scrollAria: "Scroll to latest release",
    },
    albums: {
      topline: "Selected releases",
      link: "Listen / Buy ↗",
      scroll: "Scroll",
    },
    about: {
      eyebrow: "About the label",
      statement:
        "E63 Recordings was founded by producer Theo Schmitt in Frankfurt am Main, Germany, in 2020.",
      paragraphs: [
        "Based in Frankfurt, Theo Schmitt has been shaped by the city’s vibrant nightlife and renowned techno culture. In an ever-expanding field of producers and DJs, Theo remains a producer at heart — his raw techno sound has earned support from leading names including Maceo Plex, John Digweed and Butch.",
        "His debut album ‘The Game’ reached the Beatport Top 10, while his latest album ‘Intoxication’ went straight to Number One on Beatport’s techno chart — tracing his range from downtempo breakbeat to raw, peak-time techno.",
        "The label moves between direct, physical club music and melodic ambient work — always looking for character, tension and a strong point of view.",
      ],
    },
    artists: {
      eyebrow: "The Artists",
      heading: ["Two artists.", "One vision."],
      bios: {
        theo: "Frankfurt-based producer known for a raw, dub-inflected techno sound backed by Maceo Plex, John Digweed and Butch — his album ‘Intoxication’ went straight to Number One on Beatport’s techno chart.",
        joe: "Collaborator and co-artist on the upcoming release “Feel the High” (E63NR06).",
      },
    },
    demos: {
      eyebrow: "Demo submissions",
      heading: ["New signal", "wanted."],
      copy: "E63 is interested in new producers and musicians from Germany and across Europe. We are looking for finished music with a clear identity — not copies of what is already working.",
      rules: [
        "Private streaming link",
        "No attachments",
        "Short artist introduction",
        "Finished or near-finished music",
      ],
      cta: "Submit a demo ↗",
    },
    contact: {
      eyebrow: "Contact / Booking / Demos",
      marquee: "LET’S TALK —",
    },
    footer: {
      imprint: "Imprint",
      privacy: "Privacy",
    },
    legal: {
      close: "Close legal information",
      imprint: {
        eyebrow: "Legal / 01",
        title: "Imprint",
        intro: "Information according to § 5 DDG (German Digital Services Act)",
        represented: "Represented by",
        phone: "Phone",
        email: "Email",
        website: "Website",
      },
      privacy: {
        eyebrow: "Legal / 02",
        title: "Privacy Policy",
        s1title: "1. Controller",
        s1body: "",
        s2title: "2. Hosting and server log files",
        s2body:
          "This website is intended for static hosting with IONOS. When you access it, technically necessary server log data may be processed, in particular IP address, time of access, requested file, referrer, and browser and operating system information. This processing serves the secure and trouble-free operation of the website.",
        s3title: "3. Cookies and analytics",
        s3body:
          "This version of the website sets no cookies itself, uses no web analytics, and embeds no external audio, video, or social media players. External platforms are only opened via regular links.",
        s4title: "4. Contact by email",
        s4body:
          "If you contact us by email, we process the information you provide to handle your inquiry. The data is stored only as long as necessary for the communication and any statutory retention obligations.",
        s5title: "5. External links",
        s5body:
          "Links to Bandcamp, Instagram, Facebook, or other platforms lead to websites of external providers. Their respective privacy policies apply once you click through.",
        s6title: "6. Data subject rights",
        s6body:
          "Within the scope of the statutory requirements, you have rights to access, rectification, erasure, restriction of processing, data portability, and objection, as well as the right to lodge a complaint with a data protection supervisory authority.",
      },
    },
    langSwitch: { label: "DE", href: "/" },
  },
};

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];

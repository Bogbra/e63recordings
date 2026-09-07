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
  join: {
    eyebrow: string;
    statement: string;
    paragraphs: string[];
  };
  demos: {
    eyebrow: string;
    heading: string[];
    copy: string;
    copy2: string;
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
      title: "E63 Recordings — Elsenfeld",
      description:
        "E63 Recordings ist ein unabhängiges Electronic-Music-Label, gegründet 2020 in Elsenfeld, mit Fokus auf Dancefloor.",
      ogDescription: "Elektronische Musik mit Fokus auf den Dancefloor",
    },
    header: {
      tagline: "Elsenfeld - gegründet 2020",
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
      kicker: "Unabhängiges Electronic Music Label",
      copy: "Elektronische Musik mit Fokus auf den Dancefloor",
      scrollAria: "Zu den neuesten Veröffentlichungen scrollen",
    },
    albums: {
      topline: "Ausgewählte Veröffentlichungen",
      link: "Anhören / Kaufen",
      scroll: "Scrollen",
    },
    about: {
      eyebrow: "Über das Label",
      statement:
        "E63 Recordings wurde 2020 von Produzent Theo Schmitt in Elsenfeld, nahe Frankfurt am Main, gegründet.",
      paragraphs: [
        "Theo Schmitt kommt aus Elsenfeld und wurde vom pulsierenden Nachtleben und der renommierten Techno-Kultur der Stadt Frankfurt am Main geprägt. Im Mittelpunkt stand für ihn dabei immer das Produzieren und Selektieren von Musik.",
        "Sein Sound bewegt sich zwischen rohem, hypnotischem Techno, Breakbeat, atmosphärischen Downtempo-Produktionen und Indie Dance. Seine Musik fand Unterstützung bei Künstlern wie Sven Väth, Maceo Plex, John Digweed, Butch, Dino Lenny, Gabriel Ananda, Krystal Klear und Drumcomplex – und vielen mehr.",
        "Sein Debütalbum „The Game“ erreichte die Beatport Top 10. Mit „Intoxication“ folgte Platz 1 der Beatport-Techno-Album-Charts.",
        "Mit E63 Recordings führt Theo diesen Ansatz weiter: Direkte, physische Clubmusik trifft auf experimentellere und melodische Arbeiten – ohne sich auf einen bestimmten Sound festzulegen.",
      ],
    },
    artists: {
      eyebrow: "Die Artists",
      heading: ["Unsere Artists.", "Unsere Vision."],
      bios: {
        theo: "Produzent aus Elsenfeld bei Frankfurt am Main. Sein Sound bewegt sich zwischen rohem, hypnotischem Techno, Breakbeat, Downtempo und Indie Dance. Seine Musik wird von Künstlern wie Sven Väth, Maceo Plex, John Digweed, Butch, Dino Lenny und Gabriel Ananda unterstützt. Sein Album „Intoxication“ erreichte Platz 1 der Beatport-Techno-Album-Charts.",
        joe: "DJ und Artist aus der Frankfurter Szene. Seit mehreren Jahren hinter den Decks aktiv und musikalisch zwischen Techno, House, Minimal und elektronischer Clubmusik zu Hause. Gemeinsam mit Theo Schmitt entstand die „Feel the High“ EP (E63NR06) für E63 Recordings.",
      },
    },
    join: {
      eyebrow: "Demo-Einsendungen",
      statement: "Join E63",
      paragraphs: [
        "Wir suchen Musik mit Charakter. E63 ist offen für Künstler und Künstlerinnen aus Deutschland, Europa und der ganzen Welt, die ihren eigenen musikalischen Weg gehen. Keine Genregrenzen, keine Trends als Vorgabe – entscheidend ist die Musik.",
        "Wenn du glaubst, dass dein Sound zu E63 Recordings passt, dann schick uns deine Musik per E-Mail – am besten als privaten Streaming-Link, zum Beispiel über SoundCloud. Wir freuen uns darauf, sie zu hören.",
      ],
    },
    demos: {
      eyebrow: "So funktioniert’s",
      heading: ["Für deine", "Demo:"],
      copy: "Am liebsten hören wir deine Musik über einen privaten Streaming-Link, zum Beispiel SoundCloud. Schreib uns ein paar Worte zu dir und deinem Projekt und schick uns Musik, die schon weitgehend fertig ist. Mehr braucht es eigentlich nicht.",
      copy2: "P.S.: Deine Follower-Zahl ist uns egal. Wenn uns deine Musik überzeugt, zählt genau das.",
      cta: "Demo einreichen",
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
      title: "E63 Recordings — Elsenfeld",
      description:
        "E63 Recordings is an independent electronic music label founded in Elsenfeld in 2020, focused on the dancefloor.",
      ogDescription: "Electronic music focused on the dancefloor",
    },
    header: {
      tagline: "Elsenfeld - est. 2020",
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
      kicker: "Independent electronic music label",
      copy: "Electronic music focused on the dancefloor",
      scrollAria: "Scroll to latest release",
    },
    albums: {
      topline: "Selected releases",
      link: "Listen / Buy",
      scroll: "Scroll",
    },
    about: {
      eyebrow: "About the label",
      statement:
        "E63 Recordings was founded by producer Theo Schmitt in Elsenfeld, near Frankfurt am Main, Germany, in 2020.",
      paragraphs: [
        "Theo Schmitt comes from Elsenfeld and was shaped by the vibrant nightlife and renowned techno culture of the city of Frankfurt am Main. For him, producing and selecting music has always been at the centre of it all.",
        "His sound moves between raw, hypnotic techno, breakbeat, atmospheric downtempo productions and indie dance. His music has found support from artists such as Sven Väth, Maceo Plex, John Digweed, Butch, Dino Lenny, Gabriel Ananda, Krystal Klear and Drumcomplex — and many more.",
        "His debut album ‘The Game’ reached the Beatport Top 10. ‘Intoxication’ followed, going straight to Number One on the Beatport techno album charts.",
        "With E63 Recordings, Theo continues this approach: direct, physical club music meets more experimental and melodic work — without committing to any one sound.",
      ],
    },
    artists: {
      eyebrow: "The Artists",
      heading: ["Our Artists.", "Our Vision."],
      bios: {
        theo: "Producer from Elsenfeld, near Frankfurt am Main. His sound moves between raw, hypnotic techno, breakbeat, downtempo and indie dance. His music is supported by artists such as Sven Väth, Maceo Plex, John Digweed, Butch, Dino Lenny and Gabriel Ananda. His album ‘Intoxication’ reached Number One on the Beatport techno album charts.",
        joe: "DJ and artist from the Frankfurt scene. Active behind the decks for several years, musically at home between techno, house, minimal and electronic club music. Together with Theo Schmitt, he created the ‘Feel the High’ EP (E63NR06) for E63 Recordings.",
      },
    },
    join: {
      eyebrow: "Demo submissions",
      statement: "Join E63",
      paragraphs: [
        "We’re looking for music with character. E63 is open to artists from Germany, Europe and around the world who follow their own musical path. No genre boundaries, no trends as a blueprint — what matters is the music.",
        "If you think your sound fits E63 Recordings, send us your music by email — ideally as a private streaming link, for example via SoundCloud. We look forward to hearing it.",
      ],
    },
    demos: {
      eyebrow: "How it works",
      heading: ["For your", "Demo:"],
      copy: "We’d love to hear your music via a private streaming link, for example SoundCloud. Write us a few words about you and your project, and send music that’s already largely finished. That’s really all it takes.",
      copy2: "P.S.: We don’t care about your follower count. If your music convinces us, that’s all that matters.",
      cta: "Submit a demo",
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

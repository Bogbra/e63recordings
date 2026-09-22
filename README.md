# E63 Recordings — Next.js One Pager

A custom editorial one-page website for E63 Recordings, built with Next.js and TypeScript. The project is configured for static export so it can be deployed on IONOS Deploy Now or uploaded as static files to compatible IONOS webspace.

![Hero section screenshot](docs/hero-screenshot.jpg)

## Stack

- Next.js 16 (requires Node.js >= 20.9.0)
- React 19
- TypeScript
- Pure CSS (no UI framework)
- GSAP (ScrollTrigger) + Lenis for the scroll-driven release carousel and smooth scrolling
- Static export (`output: "export"`)

## Run locally

```bash
npm ci
npm run dev
```

Open http://localhost:3000

## Production build

```bash
npm run build
```

The deployable website is generated in:

```text
out/
```

## IONOS deployment

### Option A — IONOS Deploy Now / GitHub

1. Create a GitHub repository and push this project.
2. In IONOS Deploy Now, connect the repository.
3. Use `npm run build` as the build command if IONOS asks for it.
4. Set the output directory to `out`.
5. Connect `e63recordings.com` to the deployment.

### Option B — Existing IONOS webspace

1. Run `npm ci` and `npm run build` locally.
2. Upload the complete contents of `out/` into the web root of your domain using SFTP / Webspace Explorer.
3. Point the domain to that directory and enable SSL.

## Content to review before launch

Main editable content is in `data/site.ts`.

Please verify:

- legal operator name
- postal address
- phone number
- email address
- social links
- Bandcamp purchase URL
- current release and upcoming release

## Artwork

Release artwork and artist photos are real, owned assets in `public/`. There are no placeholder covers left — swap the files in `public/` and the `cover`/`photo` paths in `data/site.ts` when a new release or artist photo comes in.

## Privacy

This implementation intentionally avoids:

- Google Analytics
- tracking pixels
- cookie banners
- embedded YouTube / Spotify / SoundCloud players
- third-party web fonts

That keeps the initial deployment lightweight and minimizes consent requirements. The privacy text is a technical template, not legal advice, and must be reviewed for the actual production setup.

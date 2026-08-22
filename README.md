# AHPixel Studio — Sevalla Static Site

Static build of the interactive AHPixel Studio portfolio with the VANTA Barber Club and LUMEN Dental Studio concept demos bundled into one deployable site.

This deployment lives on the `sevalla` branch so the existing `main` branch and Vercel deployment remain untouched.

## Local development

```bash
npm ci
npm run dev
```

## Production build

```bash
npm run build
```

The deployable output is generated in `dist/`. The project has no server runtime, database, object storage, or paid infrastructure dependency.

## Sevalla Static Site settings

- Site type: Static Site
- Node.js: current LTS (22 or newer)
- Build command: `npm run build`
- Publish directory: `dist`
- Index file: `index.html`
- SPA fallback: `public/_redirects` is copied to `dist/_redirects`

Sevalla's free Static Site allowances are subject to its current monthly build-minute, bandwidth, site-size, and site-count limits. Do not enable Applications, Databases, Object Storage, Load Balancers, or paid add-ons for this project.

## Routes

- `/`
- `/demos/vanta`
- `/demos/vanta/services`
- `/demos/vanta/about`
- `/demos/vanta/gallery`
- `/demos/vanta/contact`
- `/demos/lumen`
- `/demos/lumen/treatments`
- `/demos/lumen/about`
- `/demos/lumen/team`
- `/demos/lumen/contact`

VANTA and LUMEN are concept websites for portfolio presentation; they are not represented as real clients.

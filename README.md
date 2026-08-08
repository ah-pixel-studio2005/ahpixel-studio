# AHPixel Studio

Premium multi-page portfolio and business website for AHPixel Studio, built with React, TypeScript and vinext.

## Routes

- `/` — Studio homepage
- `/work` — Selected projects
- `/work/vanta-barber-club` — VANTA concept case study
- `/services` — Services and process
- `/about` — Studio philosophy
- `/contact` — Project inquiry form

## Local development

```bash
npm ci
npm run dev
```

Production verification:

```bash
npm run lint
npm run build
npm run start
```

Contact details, WhatsApp, social links and project URLs are centralized in `app/data/site.ts`. The inquiry form is frontend-only until a production endpoint is configured.

VANTA Barber Club is explicitly presented as a fictional concept project, not as a real client.
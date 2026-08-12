# AHPixel Studio

Production portfolio and business website for AHPixel Studio, built with React, TypeScript, vinext and Nitro.

## Routes

- `/` — English studio homepage
- `/work` — Selected projects
- `/work/vanta-barber-club` — VANTA concept case study
- `/services` — Services and process
- `/about` — Studio philosophy
- `/contact` — English project inquiry form
- `/es` — Spanish entry route
- `/es/contact` — Spanish project inquiry form

VANTA Barber Club is explicitly presented as a fictional concept project, not as a real client.

## Local development

```bash
npm ci
npm run dev
```

Production verification:

```bash
npm run lint
npm run build
npm test
```

Business data, select options and project URLs are centralized in `app/data/site.ts`. The browser submits inquiries to `POST /api/inquiries`; privileged Supabase and Resend credentials are only read by that server route.

## PRODUCTION SETUP

1. Create a Supabase project.
2. Open Supabase SQL Editor and run `supabase/inquiries.sql`. The table uses row-level security and browser clients receive no direct write policy; the server writes with the service-role key.
3. Copy `.env.example` to the appropriate local or hosting environment and add the variables listed below.
4. Create a Resend account. During testing, the included `onboarding@resend.dev` sender can be used subject to Resend's testing-recipient restrictions.
5. Add `RESEND_API_KEY` and confirm `CONTACT_EMAIL` is the email permitted by the Resend account.
6. Deploy the sibling VANTA project as its own Vercel project.
7. Set `NEXT_PUBLIC_VANTA_URL` to the actual standalone VANTA production URL.
8. Deploy AHPixel to Vercel. Do not set a static output directory or add SPA rewrites; Nitro produces the Vercel server output.
9. Submit a real contact form in Spanish and English and confirm the success screen.
10. Confirm the saved inquiry in Supabase and the notification email in the inbox.
11. Test direct WhatsApp and the post-submission WhatsApp continuation link.
12. Test every route listed above on desktop and mobile.

Required environment-variable names:

```text
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_WHATSAPP_NUMBER
NEXT_PUBLIC_INSTAGRAM_URL
NEXT_PUBLIC_VANTA_URL
SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
RESEND_API_KEY
CONTACT_EMAIL
RATE_LIMIT_SALT
```

Never commit real secret values. If Supabase is not configured, the API returns a safe server error and never shows a false success. If Resend is unavailable after the database save, the inquiry remains successful and the email failure is logged server-side.

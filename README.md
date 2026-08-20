# AdSyncd — Headquarters

AdSyncd is a premium, dark growth-tech marketing site for a growth marketing agency serving clinics, D2C brands, and selected local service businesses. The site is positioned around one connected system: **Acquire → Convert → Retain → Scale**.

## Stack

The project uses React 19, Vite, Tailwind CSS 4, Lucide React, and the Supabase JavaScript client. It is organized as a static frontend so it can deploy to Netlify or the built-in Manus hosting environment. The growth-audit form is ready for Supabase public inserts; the database schema intentionally does not create an anonymous SELECT policy.

## Local development

```bash
pnpm install
pnpm dev
```

The production build is:

```bash
npm run build
```

The scaffold's Vite build emits the frontend into `dist`; the included Netlify configuration publishes that directory and provides an SPA fallback.

## Supabase setup

1. Create a Supabase project.
2. Run [`supabase/schema.sql`](./supabase/schema.sql) in the Supabase SQL editor.
3. Create a local `.env` file from the template below.
4. Start the site with `pnpm dev` and submit a test audit from the modal.

The required `.env.example` contents are:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

The browser only uses the Supabase anonymous key. Never place a service-role key in the frontend. The schema enables Row Level Security and permits public inserts only; lead reads must happen through a separately authenticated workflow.

## Netlify deployment

The repository contains [`netlify.toml`](./netlify.toml), which sets Node 20, runs `npm run build`, publishes `dist`, and routes all paths to `/index.html` for SPA navigation. In Netlify, add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` under Site configuration → Environment variables before deploying.

## Content and proof policy

Unavailable business results are marked as **example**, **illustrative**, or **placeholder**. The proof rail uses `X` placeholders and the calculator clearly states that actual outcomes vary. No testimonials, reviews, or verified client results have been fabricated.

The supplied AdSyncd logo is used in the navigation, Growth Engine, footer, and favicon. Generated signal textures are used as supporting visual surfaces rather than as claims or client imagery.

## Project map

```text
client/
  index.html
  src/
    App.tsx
    index.css
    main.tsx
    pages/Home.tsx
supabase/
  schema.sql
netlify.toml
ideas.md
```

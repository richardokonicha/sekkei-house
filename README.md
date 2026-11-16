# Sekkei House

A local-first, GitHub-backed house for art, design, and inspiration—an archive of attention. Built on Next.js (App Router) with a browsing experience for collecting and revisiting what moves you: searchable/filterable cards, in-place dialog previews, code view, fullscreen, and direct source links.

**Live demo:** [sekkei-house.vercel.app](https://sekkei-house.vercel.app) · **Repo:** [github.com/richardokonicha/sekkei-house](https://github.com/richardokonicha/sekkei-house)

> Supabase/auth/submit/data-enrichment code from the original Cult Directory template is **preserved in the codebase** but kept dormant behind a feature flag in local mode.

## Features

- **Local-first data**: bookmarks live in `data/bookmarks.json`, images in `public/images/bookmarks/` — no database required to run.
- **Component-driven bookmarks**: each entry maps to a React component in `components/bookmarks/` (registered in `components/bookmarks/registry.tsx`) with live preview in a dialog.
- **In-place preview dialog**: click a card to expand (no route change) — preview, **View code**, **Full screen**, GitHub source link, and external site link.
- **Detail route**: `/products/[id]` renders the same preview experience for direct links/sharing.
- **Search & filters**: debounced search plus category/label filtering (sidebar on desktop, sheet menu on mobile).
- **Motion/UI**: staggered cards, hover/tap interactions, route transitions, and reduced-motion fallbacks.
- **Supabase-ready (dormant)**: data/auth/middleware wrappers preserve original Supabase paths for future scale; local mode avoids persistent DB writes.

## Tech stack

- Next.js 14 (App Router), React 18, TypeScript
- Tailwind CSS, shadcn/ui (Radix), Framer Motion
- Local JSON data store (`data/bookmarks.json`)

## Getting started

### Prerequisites

- Node.js >= 18
- pnpm (recommended) or npm

### Install & run

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Open http://localhost:3000.

`.env.example` defaults to local mode:

```env
NEXT_PUBLIC_USE_LOCAL_DATA=true
```

When `NEXT_PUBLIC_USE_LOCAL_DATA=true`, Supabase env vars can be left empty.

## Project structure

- `data/bookmarks.json` — bookmark records (source of truth in local mode)
- `public/images/bookmarks/` — local image assets
- `components/bookmarks/` — preview components (one per bookmark)
- `components/bookmarks/registry.tsx` — codename → component map
- `components/directory-product-card.tsx` — grid card + dialog
- `components/bookmark-preview.tsx` — shared preview/code/fullscreen UI
- `app/api/component-source/route.ts` — serves component source for code view
- `lib/local-data.ts`, `lib/bookmark-types.ts` — local data/types
- `app/actions/*`, `db/supabase/*`, `middleware.ts` — data/auth wrappers (local + Supabase paths)

## Adding a bookmark

1. Add a component in `components/bookmarks/<slug>.tsx` and export it (see existing examples).
2. Register it in `components/bookmarks/registry.tsx` keyed by `codename`.
3. Add an entry to `data/bookmarks.json` with fields like `id`, `codename`, `punchline`, `description`, `categories`, `labels`, `product_website`, `logo_src` (or `null`), `component_path`, and `github_url`.
4. (Optional) add an image to `public/images/bookmarks/`.

## Scripts

- `pnpm dev` — start dev server
- `pnpm build` — production build
- `pnpm start` — run production server
- `pnpm lint` — lint
- `pnpm check-types` — TypeScript check (`tsc --noEmit`)

## Deployment

- **Vercel (recommended):** this app uses dynamic routes, middleware, server actions, and a route handler (`/api/component-source`), so it requires a Node/server runtime. Deploy on Vercel with `NEXT_PUBLIC_USE_LOCAL_DATA=true`.
- **GitHub Pages:** not compatible out-of-the-box because Next.js static export (`output: 'export'`) does not support the server features used here.

## Credits

Based on [nolly-studio/cult-directory-template](https://github.com/nolly-studio/cult-directory-template). Original template license: see [`LICENSE.md`](LICENSE.md).

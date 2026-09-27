<div align="center">

# 🍇 Loza

### A modern restaurant ordering experience — browse, order, and track, built to feel like a real product.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Postgres_%26_Auth-3ECF8E?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

[Quick Start](#-quick-start) · [Features](#-key-features) · [Tech Stack](#-tech-stack) · [Architecture](#-architecture)

</div>

---

<div align="center">
  <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80" alt="Loza restaurant hero" width="100%" />
  <p><em>🎬 Add your own demo GIF/screenshot here (menu browsing → cart → checkout).</em></p>
</div>

> No hosted demo yet — it runs locally in under a minute, see [Quick Start](#-quick-start).

---

## ✨ Key Features

- 🍽️ **Interactive menu** — live search, category tabs, and dietary filters (vegetarian / spicy) over 24 dishes. Filtering runs entirely client-side with `useMemo`, and each dish opens in a detail modal built on the native `<dialog>` element (free focus trap + Esc-to-close, no extra JS library).
- 🛒 **Persistent cart** — add, adjust quantity, or remove items; survives page reloads. A single `CartProvider` (React Context) syncs state to `localStorage`.
- 📦 **Real checkout flow** — delivery/pickup toggle, Zod-validated contact form, guest checkout with no account required. Works identically whether Supabase is configured or not.
- 🔐 **Auth-gated order history** — email/password sign-up via Supabase Auth, with a personal cabinet showing past orders scoped to the logged-in user through Postgres Row Level Security.
- 🗄️ **Dual-mode data layer** — one repository module (`src/lib/data.ts`, `src/lib/orders-client.ts`) that reads/writes Supabase when configured, and transparently falls back to local seed data + `localStorage` when it isn't — so the whole app is demoable with zero setup.
- 📱 **Fully responsive UI** — adaptive grid layouts, a collapsible mobile nav, and hover/focus/empty/error states throughout, styled with a small hand-rolled component kit on top of Tailwind v4's CSS-variable theming.

---

## 🧱 Tech Stack

| Technology | Used for |
|---|---|
| **Next.js 16** (App Router, Turbopack) | Routing, server components, data fetching |
| **TypeScript** | End-to-end type safety |
| **Tailwind CSS v4** | Design system via CSS-first `@theme` tokens |
| **Supabase** (Postgres + Auth) | Database, authentication, Row Level Security |
| **Zod** | Checkout form validation |
| **React Context** | Cart state, persisted to `localStorage` |
| **Sonner** | Toast notifications |
| **lucide-react** | Icon set |

---

## 🚀 Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/Tonxetyz/loza-restaurant.git
cd loza-restaurant

# 2. Install dependencies
npm install

# 3. (Optional) configure Supabase — the app runs fully without this step
cp .env.local.example .env.local
# fill in NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY

# 4. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Without Supabase configured, the menu is served from local seed data and guest orders are stored in the browser's `localStorage` — enough to demo the entire flow with no setup. To enable real persistence and auth, create a [Supabase](https://supabase.com) project and run `supabase/schema.sql` then `supabase/seed.sql` in its SQL editor before adding the env vars above.

---

## 🏗️ Architecture

```
src/app/            Routes: home, menu, cart, order confirmation, personal
                    cabinet, login/register — mostly Server Components
src/components/     UI primitives (button, dialog, input…), dish cards/
                    modal, site header/footer, auth form
src/lib/            Types, seed data, cart context, Supabase clients,
                    checkout schema, and the Supabase-or-local data layer
supabase/           schema.sql (tables + RLS policies) and seed.sql
                    (the same demo menu as src/lib/seed.ts)
```

The core architectural idea is the **data layer seam**: `src/lib/data.ts` and `src/lib/orders-client.ts` each check `isSupabaseConfigured` once and branch to either a Supabase query or a local/`localStorage` equivalent — every page above that seam is written against a single, backend-agnostic API.

---

## 📄 License

MIT — see [LICENSE](LICENSE).

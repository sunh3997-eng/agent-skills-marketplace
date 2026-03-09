# Agent Skills Marketplace — Agent 技能交易所

A platform for discovering, distributing, and trading AI Agent skill packages.

**Tech stack:** Next.js 14 (App Router) · Supabase · Stripe · Tailwind CSS · TypeScript

---

## Features

- **Skill discovery** — full-text search, category browsing, sort by popularity/recency/price
- **Skill detail pages** — rich descriptions, install instructions, author info, reviews
- **One-click install** — `openclaw install <pkg>` CLI commands with copy-to-clipboard
- **Publish flow** — 4-step wizard: manifest → details → pricing → review & submit
- **Author dashboard** — published skills, download stats, earnings breakdown
- **SQL schema** — production-ready Supabase migrations with RLS policies

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero, featured skills, categories |
| `/explore` | Search + filter + browse all skills |
| `/skills/[id]` | Skill detail: description, manifest, reviews, install instructions |
| `/publish` | 4-step skill submission wizard |
| `/dashboard` | Author dashboard: skills, analytics, earnings |

---

## Quick Start

### Prerequisites

- Node.js 18+
- npm / pnpm / yarn

### 1. Clone & install

```bash
git clone <repo-url>
cd agent-skills-marketplace
npm install
```

### 2. Configure environment

```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials (see below for obtaining them).
For local development the UI works fully with **mock data** — no credentials needed.

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Wiring up Supabase

### 1. Create a project

Go to [supabase.com](https://supabase.com), create a new project, and copy the project URL and anon key into `.env.local`.

### 2. Run migrations

```bash
# Install Supabase CLI
npm install -g supabase

# Link to your project
supabase link --project-ref <your-project-ref>

# Apply migrations
supabase db push
```

Or paste the SQL files manually in the Supabase SQL editor:

1. `supabase/migrations/001_create_tables.sql` — creates all tables, indexes, RLS policies, triggers
2. `supabase/migrations/002_seed_data.sql` — optional dev seed data

### 3. Replace mock data

In `lib/mock-data.ts`, swap the exported functions to call Supabase:

```typescript
// Before (mock)
export function searchSkills(query: string, category?: string) {
  return MOCK_SKILLS.filter(...)
}

// After (Supabase)
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export async function searchSkills(query: string, category?: string) {
  let q = supabase.from('skills').select('*, authors(*)').eq('status', 'published')
  if (query) q = q.textSearch('search_vector', query)
  if (category) q = q.eq('category_id', category)
  const { data } = await q
  return data ?? []
}
```

### 4. Enable Auth

In Supabase dashboard → Authentication → Providers, enable Email and/or OAuth providers (GitHub recommended for a dev tool audience).

Add the auth helper to your layout using `@supabase/auth-helpers-nextjs`.

---

## Wiring up Stripe

### 1. Create a Stripe account

Go to [stripe.com](https://stripe.com) and create a product for each paid skill.

### 2. Add credentials

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### 3. Checkout flow

Create a route handler at `app/api/checkout/route.ts`:

```typescript
import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  const { skillId, priceId } = await req.json()
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/skills/${skillId}?purchased=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/skills/${skillId}`,
  })
  return Response.json({ url: session.url })
}
```

### 4. Stripe Connect for author payouts

Use [Stripe Connect](https://stripe.com/connect) so authors receive 80% of revenue automatically.

---

## Database Schema

```
authors         — extends Supabase auth.users
categories      — skill categories (seeded)
skills          — skill packages with manifest fields + full-text search vector
reviews         — one review per user per skill, auto-recalculates avg_rating
downloads       — install audit log for analytics
purchases       — Stripe payment records
```

All tables have Row Level Security enabled. See `supabase/migrations/001_create_tables.sql` for full schema.

---

## Project Structure

```
├── app/
│   ├── layout.tsx              Root layout (Navbar + Footer)
│   ├── page.tsx                Landing page
│   ├── explore/page.tsx        Search & browse
│   ├── skills/[id]/page.tsx    Skill detail
│   ├── publish/page.tsx        Publish wizard
│   └── dashboard/page.tsx      Author dashboard
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── SkillCard.tsx
│   ├── InstallCommand.tsx      Copy-to-clipboard install command
│   └── StarRating.tsx
├── lib/
│   ├── mock-data.ts            Mock skills, authors, reviews
│   ├── types.ts                TypeScript interfaces
│   └── utils.ts                Helpers (cn, formatNumber, etc.)
└── supabase/
    └── migrations/
        ├── 001_create_tables.sql
        └── 002_seed_data.sql
```

---

## CLI Integration

Skills are installed via the `openclaw` CLI:

```bash
# Install a skill
openclaw install github-assistant

# Install specific version
openclaw install github-assistant@4.2.0

# List installed skills
openclaw skills list

# Update all skills
openclaw skills update
```

The install command is auto-generated from the skill's package name and displayed on every skill detail page with a copy button.

---

## License

MIT

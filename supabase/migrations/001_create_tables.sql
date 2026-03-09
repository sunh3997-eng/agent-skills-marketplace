-- =====================================================
-- Agent Skills Marketplace — Initial Schema
-- =====================================================

-- Enable required extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pg_trgm";   -- For full-text search

-- =====================================================
-- Authors (extends Supabase auth.users)
-- =====================================================
create table public.authors (
  id            uuid primary key references auth.users(id) on delete cascade,
  username      text not null unique,
  display_name  text not null,
  avatar_url    text,
  bio           text,
  website       text,
  github        text,
  stripe_account_id text,               -- Stripe Connect account for payouts
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

alter table public.authors enable row level security;

create policy "Authors are viewable by everyone"
  on public.authors for select using (true);

create policy "Authors can update own profile"
  on public.authors for update using (auth.uid() = id);

-- =====================================================
-- Categories
-- =====================================================
create table public.categories (
  id          text primary key,           -- e.g. 'coding', 'data'
  label       text not null,
  icon        text,
  description text,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now()
);

insert into public.categories (id, label, icon, sort_order) values
  ('productivity',   'Productivity',   '⚡', 1),
  ('coding',         'Coding',         '💻', 2),
  ('data',           'Data',           '📊', 3),
  ('communication',  'Communication',  '💬', 4),
  ('research',       'Research',       '🔬', 5),
  ('creative',       'Creative',       '🎨', 6),
  ('automation',     'Automation',     '🤖', 7),
  ('security',       'Security',       '🔒', 8);

-- =====================================================
-- Skills
-- =====================================================
create table public.skills (
  id                uuid primary key default uuid_generate_v4(),
  slug              text not null unique,
  name              text not null,
  short_description text not null,
  long_description  text,
  readme            text,
  category_id       text references public.categories(id),
  author_id         uuid references public.authors(id) on delete cascade,

  -- Manifest fields
  version           text not null default '1.0.0',
  install_command   text generated always as ('openclaw install ' || slug) stored,
  runtime           text not null default 'node18',
  entrypoint        text not null default 'dist/index.js',
  permissions       text[] not null default '{}',
  dependencies      jsonb not null default '[]',

  -- Commerce
  price             numeric(10, 2) not null default 0,
  stripe_price_id   text,

  -- Metadata
  tags              text[] not null default '{}',
  screenshots       text[] not null default '{}',
  featured          boolean not null default false,
  status            text not null default 'pending'
                      check (status in ('draft', 'pending', 'published', 'rejected')),

  -- Stats (denormalized for performance)
  download_count    bigint not null default 0,
  star_count        int not null default 0,
  review_count      int not null default 0,
  avg_rating        numeric(3, 2) not null default 0,

  -- Search
  search_vector     tsvector generated always as (
    setweight(to_tsvector('english', coalesce(name, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(short_description, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(array_to_string(tags, ' '), '')), 'C')
  ) stored,

  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index skills_search_idx on public.skills using gin(search_vector);
create index skills_category_idx on public.skills(category_id);
create index skills_author_idx on public.skills(author_id);
create index skills_status_idx on public.skills(status);
create index skills_downloads_idx on public.skills(download_count desc);
create index skills_created_idx on public.skills(created_at desc);
create index skills_tags_idx on public.skills using gin(tags);

alter table public.skills enable row level security;

create policy "Published skills are viewable by everyone"
  on public.skills for select using (status = 'published');

create policy "Authors can view their own skills"
  on public.skills for select using (auth.uid() = author_id);

create policy "Authors can insert their own skills"
  on public.skills for insert with check (auth.uid() = author_id);

create policy "Authors can update their own skills"
  on public.skills for update using (auth.uid() = author_id);

-- =====================================================
-- Reviews
-- =====================================================
create table public.reviews (
  id          uuid primary key default uuid_generate_v4(),
  skill_id    uuid not null references public.skills(id) on delete cascade,
  author_id   uuid not null references public.authors(id) on delete cascade,
  rating      smallint not null check (rating between 1 and 5),
  title       text not null,
  body        text not null,
  helpful     int not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  unique (skill_id, author_id)             -- one review per user per skill
);

create index reviews_skill_idx on public.reviews(skill_id);

alter table public.reviews enable row level security;

create policy "Reviews are viewable by everyone"
  on public.reviews for select using (true);

create policy "Authenticated users can insert reviews"
  on public.reviews for insert with check (auth.uid() = author_id);

create policy "Authors can update their own reviews"
  on public.reviews for update using (auth.uid() = author_id);

-- =====================================================
-- Downloads / Installs (audit log)
-- =====================================================
create table public.downloads (
  id          bigserial primary key,
  skill_id    uuid not null references public.skills(id) on delete cascade,
  user_id     uuid references public.authors(id) on delete set null,
  ip_hash     text,                        -- anonymized IP for dedup
  created_at  timestamptz not null default now()
);

create index downloads_skill_idx on public.downloads(skill_id);
create index downloads_date_idx on public.downloads(created_at);

-- =====================================================
-- Purchases
-- =====================================================
create table public.purchases (
  id                    uuid primary key default uuid_generate_v4(),
  skill_id              uuid not null references public.skills(id),
  buyer_id              uuid not null references public.authors(id),
  stripe_payment_intent text not null unique,
  amount_cents          int not null,
  currency              text not null default 'usd',
  status                text not null default 'pending'
                          check (status in ('pending', 'completed', 'refunded')),
  created_at            timestamptz not null default now()
);

create index purchases_buyer_idx on public.purchases(buyer_id);
create index purchases_skill_idx on public.purchases(skill_id);

-- =====================================================
-- Trigger: auto-update updated_at
-- =====================================================
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger skills_updated_at
  before update on public.skills
  for each row execute procedure public.set_updated_at();

create trigger reviews_updated_at
  before update on public.reviews
  for each row execute procedure public.set_updated_at();

create trigger authors_updated_at
  before update on public.authors
  for each row execute procedure public.set_updated_at();

-- =====================================================
-- Trigger: recalculate skill rating on review change
-- =====================================================
create or replace function public.recalculate_skill_rating()
returns trigger language plpgsql as $$
begin
  update public.skills
  set
    avg_rating   = (select coalesce(avg(rating), 0) from public.reviews where skill_id = coalesce(new.skill_id, old.skill_id)),
    review_count = (select count(*) from public.reviews where skill_id = coalesce(new.skill_id, old.skill_id))
  where id = coalesce(new.skill_id, old.skill_id);
  return new;
end;
$$;

create trigger reviews_rating_update
  after insert or update or delete on public.reviews
  for each row execute procedure public.recalculate_skill_rating();

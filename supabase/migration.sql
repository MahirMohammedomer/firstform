-- Firstform public site — portfolio, contact form, reviews
-- Run this once in Supabase SQL Editor (Dashboard → SQL → New query).
-- Then create ONE owner user: Authentication → Users → Add user (email + password).
-- Never enable public sign-up.

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  description text,
  url text,
  image_url text,
  category text,
  is_published boolean not null default false,
  is_featured boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  business_name text,
  email text,
  phone text,
  service_needed text,
  message text not null,
  status text not null default 'new'
    check (status in ('new', 'read', 'replied', 'archived')),
  created_at timestamptz not null default now(),
  ip_hash text,
  user_agent text
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  reviewer_name text not null,
  business_or_project text,
  rating integer check (rating is null or (rating between 1 and 5)),
  body text not null,
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now(),
  approved_at timestamptz
);

-- Seed existing hardcoded projects + Galaxy Skate House (featured)
insert into public.projects (title, slug, description, url, category, is_published, is_featured, sort_order)
values
  (
    'Galaxy Skate House',
    'galaxy-skate-house',
    'Website for Galaxy Skate House — skating community in Ethiopia.',
    'https://galaxyskate.pro.et/',
    'Business',
    true,
    true,
    0
  ),
  (
    'Attikem Furniture',
    'attikem-furniture',
    'Landing page with product highlights, brand story and one-tap contact.',
    'https://attikem-furniture-landing-page.vercel.app/',
    'Furniture',
    true,
    false,
    1
  ),
  (
    'Dream Furniture PLC',
    'dream-furniture',
    'Bilingual site with catalog, Google Maps and local SEO structured data.',
    'https://dazzling-kataifi-e1bc50.netlify.app/',
    'Furniture',
    true,
    false,
    2
  ),
  (
    'Yegar Nur',
    'yegar-nur',
    'Full bilingual storefront with categories, services, gallery and FAQ.',
    'https://soft-axolotl-afc50d.netlify.app/',
    'Furniture',
    true,
    false,
    3
  ),
  (
    'MS Group',
    'ms-group',
    'Corporate presence with services overview and clear ways to get in touch.',
    'http://msgroup.page.gd/',
    'Business',
    true,
    false,
    4
  )
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  url = excluded.url,
  category = excluded.category,
  is_published = excluded.is_published,
  is_featured = excluded.is_featured,
  sort_order = excluded.sort_order;

-- Indexes
create index if not exists projects_published_sort_idx
  on public.projects (is_published, is_featured desc, sort_order);
create index if not exists contact_submissions_created_idx
  on public.contact_submissions (created_at desc);
create index if not exists contact_submissions_status_idx
  on public.contact_submissions (status);
create index if not exists reviews_status_idx
  on public.reviews (status, created_at desc);

-- updated_at trigger
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists projects_updated_at on public.projects;
create trigger projects_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------

alter table public.projects enable row level security;
alter table public.contact_submissions enable row level security;
alter table public.reviews enable row level security;

-- Drop old policies if re-running
drop policy if exists "Public can read published projects" on public.projects;
drop policy if exists "Authenticated admin full access on projects" on public.projects;
drop policy if exists "Anyone can submit contact form" on public.contact_submissions;
drop policy if exists "Authenticated admin full access on contact_submissions" on public.contact_submissions;
drop policy if exists "Anyone can submit a review" on public.reviews;
drop policy if exists "Public can read approved reviews" on public.reviews;
drop policy if exists "Authenticated admin full access on reviews" on public.reviews;

-- PROJECTS: public reads only published rows; admin (authenticated) full access
create policy "Public can read published projects"
  on public.projects for select
  using (is_published = true);

create policy "Authenticated admin full access on projects"
  on public.projects for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- CONTACT: anyone may insert; only admin may select/update/delete
create policy "Anyone can submit contact form"
  on public.contact_submissions for insert
  with check (true);

create policy "Authenticated admin full access on contact_submissions"
  on public.contact_submissions for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- REVIEWS: anyone may insert as pending; public reads only approved; admin full access
create policy "Anyone can submit a review"
  on public.reviews for insert
  with check (status = 'pending');

create policy "Public can read approved reviews"
  on public.reviews for select
  using (status = 'approved');

create policy "Authenticated admin full access on reviews"
  on public.reviews for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

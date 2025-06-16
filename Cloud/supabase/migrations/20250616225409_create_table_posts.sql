create table public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text,
  body text not null,
  is_pinned boolean not null default false
);

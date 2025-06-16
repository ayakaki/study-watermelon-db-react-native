create table public.comments (
  id uuid primary key default gen_random_uuid(),
  body text not null,
  post_id uuid references public.posts(id) on delete cascade
);

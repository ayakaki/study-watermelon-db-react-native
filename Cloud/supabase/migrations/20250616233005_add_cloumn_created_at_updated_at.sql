alter table public.posts
add column created_at timestamp with time zone default now();

alter table public.posts
add column updated_at timestamp with time zone default now();

alter table public.comments
add column created_at timestamp with time zone default now();

alter table public.comments
add column updated_at timestamp with time zone default now();

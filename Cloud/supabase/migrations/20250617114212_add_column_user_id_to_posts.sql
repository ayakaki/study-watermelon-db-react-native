alter table public.posts
add column user_id text not null default ''::text;

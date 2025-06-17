alter table public.comments
add column user_id text not null default ''::text;

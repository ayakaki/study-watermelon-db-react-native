CREATE TABLE public.deleted_posts (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  deleted_at BIGINT NOT NULL
);

CREATE TABLE public.deleted_comments (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  deleted_at BIGINT NOT NULL
);

ALTER TABLE posts ALTER COLUMN created_at DROP DEFAULT;
ALTER TABLE posts ALTER COLUMN updated_at DROP DEFAULT;
ALTER TABLE comments ALTER COLUMN created_at DROP DEFAULT;
ALTER TABLE comments ALTER COLUMN updated_at DROP DEFAULT;


ALTER TABLE posts
  ALTER COLUMN created_at SET DATA TYPE bigint USING (EXTRACT(EPOCH FROM created_at) * 1000)::bigint,
  ALTER COLUMN updated_at SET DATA TYPE bigint USING (EXTRACT(EPOCH FROM updated_at) * 1000)::bigint;

ALTER TABLE comments
  ALTER COLUMN created_at SET DATA TYPE bigint USING (EXTRACT(EPOCH FROM created_at) * 1000)::bigint,
  ALTER COLUMN updated_at SET DATA TYPE bigint USING (EXTRACT(EPOCH FROM updated_at) * 1000)::bigint;

ALTER TABLE comments DROP CONSTRAINT comments_post_id_fkey;

ALTER TABLE posts ALTER COLUMN id TYPE text;

ALTER TABLE comments ALTER COLUMN post_id TYPE text;

ALTER TABLE comments
  ADD CONSTRAINT comments_post_id_fkey
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE;

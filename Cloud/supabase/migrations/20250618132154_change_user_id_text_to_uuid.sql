ALTER TABLE posts ADD COLUMN user_id_uuid UUID;
ALTER TABLE comments ADD COLUMN user_id_uuid UUID;


UPDATE posts
SET user_id_uuid = user_id::uuid;

UPDATE comments
SET user_id_uuid = user_id::uuid;


ALTER TABLE posts DROP COLUMN user_id;
ALTER TABLE posts RENAME COLUMN user_id_uuid TO user_id;

ALTER TABLE comments DROP COLUMN user_id;
ALTER TABLE comments RENAME COLUMN user_id_uuid TO user_id;

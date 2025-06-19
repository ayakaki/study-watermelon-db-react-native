-- UUID 型の新しいカラムを追加
ALTER TABLE deleted_posts ADD COLUMN user_id_uuid UUID;
ALTER TABLE deleted_comments ADD COLUMN user_id_uuid UUID;

-- TEXT → UUID 変換してデータコピー
UPDATE deleted_posts
SET user_id_uuid = user_id::uuid;

UPDATE deleted_comments
SET user_id_uuid = user_id::uuid;

-- 古いカラムを削除し、新しいカラムをリネーム
ALTER TABLE deleted_posts DROP COLUMN user_id;
ALTER TABLE deleted_posts RENAME COLUMN user_id_uuid TO user_id;

ALTER TABLE deleted_comments DROP COLUMN user_id;
ALTER TABLE deleted_comments RENAME COLUMN user_id_uuid TO user_id;

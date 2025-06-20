-- posts テーブルに CRUD 権限を与える
GRANT SELECT, INSERT, UPDATE, DELETE ON posts TO anon;

-- comments テーブルに CRUD 権限を与える
GRANT SELECT, INSERT, UPDATE, DELETE ON comments TO anon;

-- deleted_posts テーブルに CRUD 権限を与える
GRANT SELECT, INSERT, UPDATE, DELETE ON deleted_posts TO anon;

-- deleted_comments テーブルに CRUD 権限を与える
GRANT SELECT, INSERT, UPDATE, DELETE ON deleted_comments TO anon;

-- posts テーブルの REVOKE
REVOKE ALL ON posts FROM anon;
REVOKE ALL ON posts FROM authenticated;

-- comments テーブルの REVOKE
REVOKE ALL ON comments FROM anon;
REVOKE ALL ON comments FROM authenticated;

-- deleted_posts テーブルの REVOKE
REVOKE ALL ON deleted_posts FROM anon;
REVOKE ALL ON deleted_posts FROM authenticated;

-- deleted_comments テーブルの REVOKE
REVOKE ALL ON deleted_comments FROM anon;
REVOKE ALL ON deleted_comments FROM authenticated;

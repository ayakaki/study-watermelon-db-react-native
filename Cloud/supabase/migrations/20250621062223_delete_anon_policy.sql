-- deleted_posts
DROP POLICY IF EXISTS "Anon user can insert own deleted posts" ON deleted_posts;
DROP POLICY IF EXISTS "Anon user can delete own deleted posts" ON deleted_posts;

-- deleted_comments
DROP POLICY IF EXISTS "Anon user can insert own deleted comments" ON deleted_comments;
DROP POLICY IF EXISTS "Anon user can delete own deleted comments" ON deleted_comments;

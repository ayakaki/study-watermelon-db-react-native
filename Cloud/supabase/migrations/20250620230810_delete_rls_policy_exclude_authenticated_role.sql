-- posts テーブル
DROP POLICY IF EXISTS "Anon user can delete own posts" ON public.posts;
DROP POLICY IF EXISTS "Anon user can update own posts" ON public.posts;
DROP POLICY IF EXISTS "Anon user can insert own posts" ON public.posts;
DROP POLICY IF EXISTS "Anon user can read own posts" ON public.posts;
DROP POLICY IF EXISTS "User can delete own posts" ON public.posts;
DROP POLICY IF EXISTS "User can update own posts" ON public.posts;
DROP POLICY IF EXISTS "User can insert own posts" ON public.posts;
DROP POLICY IF EXISTS "User can read own posts" ON public.posts;

-- comments テーブル
DROP POLICY IF EXISTS "Anon user can delete own comments" ON public.comments;
DROP POLICY IF EXISTS "Anon user can update own comments" ON public.comments;
DROP POLICY IF EXISTS "Anon user can insert own comments" ON public.comments;
DROP POLICY IF EXISTS "Anon user can read own comments" ON public.comments;
DROP POLICY IF EXISTS "User can delete own comments" ON public.comments;
DROP POLICY IF EXISTS "User can update own comments" ON public.comments;
DROP POLICY IF EXISTS "User can insert own comments" ON public.comments;
DROP POLICY IF EXISTS "User can read own comments" ON public.comments;

-- deleted_posts テーブル
DROP POLICY IF EXISTS "Anon user can read own deleted posts" ON public.deleted_posts;
DROP POLICY IF EXISTS "Anon user can insert own deleted posts" ON public.deleted_posts;
DROP POLICY IF EXISTS "User can read own deleted posts" ON public.deleted_posts;

-- deleted_comments テーブル
DROP POLICY IF EXISTS "Anon user can read own deleted comments" ON public.deleted_comments;
DROP POLICY IF EXISTS "Anon user can insert own deleted comments" ON public.deleted_comments;
DROP POLICY IF EXISTS "User can read own deleted comments" ON public.deleted_comments;

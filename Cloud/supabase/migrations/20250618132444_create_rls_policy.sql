ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE deleted_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE deleted_comments ENABLE ROW LEVEL SECURITY;


-- posts: 自分のデータのみ読み書き可能
CREATE POLICY "User can read own posts"
  ON posts FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "User can insert own posts"
  ON posts FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "User can update own posts"
  ON posts FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "User can delete own posts"
  ON posts FOR DELETE USING (auth.uid() = user_id);


-- comments
CREATE POLICY "User can read own comments"
  ON comments FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "User can insert own comments"
  ON comments FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "User can update own comments"
  ON comments FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "User can delete own comments"
  ON comments FOR DELETE USING (auth.uid() = user_id);

-- deleted_posts
CREATE POLICY "User can read own deleted posts"
  ON deleted_posts FOR SELECT USING (auth.uid() = user_id);

-- deleted_comments
CREATE POLICY "User can read own deleted comments"
  ON deleted_comments FOR SELECT USING (auth.uid() = user_id);


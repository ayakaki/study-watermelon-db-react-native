CREATE POLICY "Anon user can insert own deleted posts"
  ON deleted_posts FOR INSERT
  TO anon
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anon user can insert own deleted comments"
  ON deleted_comments FOR INSERT
  TO anon
  WITH CHECK (auth.uid() = user_id);

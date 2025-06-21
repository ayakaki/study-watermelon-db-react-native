-- deleted_posts: INSERT
CREATE POLICY "Authenticated user can insert own deleted posts"
  ON deleted_posts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- deleted_comments: INSERT
CREATE POLICY "Authenticated user can insert own deleted comments"
  ON deleted_comments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

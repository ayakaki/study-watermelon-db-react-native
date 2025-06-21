CREATE POLICY "Anon user can delete own deleted posts"
  ON deleted_posts FOR DELETE
  TO anon
  USING (auth.uid() = user_id);

CREATE POLICY "Anon user can delete own deleted comments"
  ON deleted_comments FOR DELETE
  TO anon
  USING (auth.uid() = user_id);

CREATE POLICY "Anon user can read own posts"
  ON posts FOR SELECT
  TO anon
  USING (auth.uid() = user_id);

CREATE POLICY "Anon user can update own posts"
  ON posts FOR UPDATE
  TO anon
  USING (auth.uid() = user_id);

CREATE POLICY "Anon user can delete own posts"
  ON posts FOR DELETE
  TO anon
  USING (auth.uid() = user_id);


CREATE POLICY "Anon user can read own comments"
  ON comments FOR SELECT
  TO anon
  USING (auth.uid() = user_id);

CREATE POLICY "Anon user can update own comments"
  ON comments FOR UPDATE
  TO anon
  USING (auth.uid() = user_id);

CREATE POLICY "Anon user can delete own comments"
  ON comments FOR DELETE
  TO anon
  USING (auth.uid() = user_id);

CREATE POLICY "Anon user can read own deleted posts"
  ON deleted_posts FOR SELECT
  TO anon
  USING (auth.uid() = user_id);

CREATE POLICY "Anon user can read own deleted comments"
  ON deleted_comments FOR SELECT
  TO anon
  USING (auth.uid() = user_id);

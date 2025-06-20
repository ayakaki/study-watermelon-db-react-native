CREATE POLICY "Authenticated user can read own posts"
  ON posts FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Authenticated user can insert own posts"
  ON posts FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Authenticated user can update own posts"
  ON posts FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Authenticated user can delete own posts"
  ON posts FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Authenticated user can read own comments"
  ON comments FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Authenticated user can insert own comments"
  ON comments FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Authenticated user can update own comments"
  ON comments FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Authenticated user can delete own comments"
  ON comments FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Authenticated user can read own deleted posts"
  ON deleted_posts FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Authenticated user can read own deleted comments"
  ON deleted_comments FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

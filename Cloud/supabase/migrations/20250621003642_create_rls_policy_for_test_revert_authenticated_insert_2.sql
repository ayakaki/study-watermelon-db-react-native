CREATE POLICY "Authenticated user can insert own posts"
  ON posts FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

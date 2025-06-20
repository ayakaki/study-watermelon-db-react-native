-- posts
CREATE POLICY "Anon user can insert own posts"
  ON posts FOR INSERT
  TO anon
  WITH CHECK (auth.uid() = user_id);

-- comments
CREATE POLICY "Anon user can insert own comments"
  ON comments FOR INSERT
  TO anon
  WITH CHECK (auth.uid() = user_id);

-- deleted_posts（通常はINSERTさせないと思われますが、要件次第で）
CREATE POLICY "Anon user can insert own deleted posts"
  ON deleted_posts FOR INSERT
  TO anon
  WITH CHECK (auth.uid() = user_id);

-- deleted_comments（同様に要件次第）
CREATE POLICY "Anon user can insert own deleted comments"
  ON deleted_comments FOR INSERT
  TO anon
  WITH CHECK (auth.uid() = user_id);

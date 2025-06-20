##　About This Repository
WatermelonDB/Supabase の挙動を確認するリポジトリ

## コマンド一覧
### React Native
- `npx react-native run-ios`: アプリケーション起動
- `npx react-native start --reset-cache`: キャッシュ削除

### Supabase
- `supabase login`: アカウントにログイン
- `supabase link`: プロジェクトに紐付け
- `supabase init`: Supabase 利用のための初期化
- `supabase migration new create_posts`: DDLファイル(.sql)の自動作成
- `supabase db push`: Supabase への DDL ファイル適用
- `supabase functions deploy push-changes`: Edge Functions へのデプロイ

## データベース参照（DB Browser for SQLite）
- DB Browser for SQLite を起動する
- 以下のコマンドで .db ファイルを検索する（不可視ディレクトリ内に存在）
  - `find ~/Library/Developer/CoreSimulator/Devices -name "mydb.db"`
- 以下のコマンドで .db ファイルを開く
  - `open /Users/~/mydb.db`

## その他
### Table 作成時に行うべき事項
```
-- ① 必要ならば既存のGRANTを全て取り消す（安全のため）
REVOKE ALL ON TABLE posts FROM PUBLIC;
REVOKE ALL ON TABLE posts FROM anon;
REVOKE ALL ON TABLE posts FROM authenticated;

-- ② 必要なロールに対してGRANT（最低限の権限を明示）
GRANT SELECT, INSERT, UPDATE, DELETE ON posts TO authenticated;

-- ③ RLS（行レベルセキュリティ）を有効化
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- ④ 認証済ユーザーが自分のデータのみ操作できるようにPOLICY作成

-- SELECT
CREATE POLICY "Authenticated user can read own posts"
  ON posts FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- INSERT
CREATE POLICY "Authenticated user can insert own posts"
  ON posts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- UPDATE
CREATE POLICY "Authenticated user can update own posts"
  ON posts FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- DELETE
CREATE POLICY "Authenticated user can delete own posts"
  ON posts FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
```

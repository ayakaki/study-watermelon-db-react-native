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

## データベース参照（DB Browser for SQLite）
- DB Browser for SQLite を起動する
- 以下のコマンドで .db ファイルを検索する（不可視ディレクトリ内に存在）
  - `find ~/Library/Developer/CoreSimulator/Devices -name "mydb.db"`
- DB Browser for SQLite にドラッグ&ドロップ

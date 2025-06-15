##　About This Repository
WatermelonDB の挙動を確認するリポジトリ

## コマンド一覧
### アプリケーション起動
npx react-native run-ios

### キャッシュ削除
npx react-native start --reset-cache

## データベース参照（DB Browser for SQLite）
- DB Browser for SQLite を起動する
- 以下のコマンドで .db ファイルを検索する（不可視ディレクトリ内に存在）
  - `find ~/Library/Developer/CoreSimulator/Devices -name "mydb.db"`
- DB Browser for SQLite にドラッグ&ドロップ

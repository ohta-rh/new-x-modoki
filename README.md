# new-x-modoki

X（Twitter）風のSNSアプリケーション

## 技術スタック

- **フレームワーク**: Next.js 15 (App Router)
- **UI**: React 19
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **リンター/フォーマッター**: Biome
- **テスト**: Vitest + Testing Library

## 機能

- タイムライン表示
- 投稿作成
- いいね
- リポスト
- リプライ
- プロフィール編集

## セットアップ

```bash
npm install
```

## 開発

```bash
npm run dev
```

http://localhost:3000 でアプリケーションが起動します。

## スクリプト

| コマンド | 説明 |
|---------|------|
| `npm run dev` | 開発サーバー起動 |
| `npm run build` | プロダクションビルド |
| `npm run start` | プロダクションサーバー起動 |
| `npm run lint` | Biomeでリント実行 |
| `npm run lint:fix` | リントエラーを自動修正 |
| `npm run format` | コードフォーマット |
| `npm run test` | テスト実行 |
| `npm run test:ui` | テストUI起動 |
| `npm run test:coverage` | カバレッジレポート生成 |

## ディレクトリ構成

```
├── app/              # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx
│   ├── post/[id]/    # 投稿詳細ページ
│   └── profile/      # プロフィールページ
├── components/       # 共通コンポーネント
├── features/         # 機能別モジュール
│   ├── header/
│   ├── like-button/
│   ├── post-card/
│   ├── post-form/
│   ├── profile-form/
│   ├── reply-button/
│   ├── repost-button/
│   └── timeline/
├── shared/           # 共有ユーティリティ
└── tests/            # テストファイル
```

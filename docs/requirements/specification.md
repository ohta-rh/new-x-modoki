# X クローンサイト 仕様書

## プロジェクト概要

軽量なXクローンアプリケーション。データベースを使用せず、ローカルストレージでデータを管理する。

## 技術スタック

- **フレームワーク**: Next.js (App Router)
- **パッケージマネージャー**: pnpm
- **言語**: TypeScript
- **UIフレームワーク**: shadcn/ui
- **テスト**: vitest
- **Lint/Format**: Biome

## 機能要件

### 1. 投稿機能
- テキスト投稿（最大280文字）
- 投稿の作成日時表示
- 投稿者名の表示

### 2. タイムライン表示
- 投稿一覧を新しい順に表示
- リアルタイム更新（ページリロード時）

### 3. インタラクション機能
- いいね機能
- リポスト機能
- 返信機能

### 4. ユーザー機能
- ユーザー名の設定（localStorage）
- プロフィール表示

## データ管理

### ストレージ方式
- **localStorage**: ユーザー設定、投稿データ
- **sessionStorage**: 一時的な状態管理

### データ構造

```typescript
// 投稿データ
interface Post {
  id: string;
  content: string;
  authorName: string;
  createdAt: string;
  likes: number;
  reposts: number;
  replies: string[]; // 返信投稿のID配列
}

// ユーザーデータ
interface User {
  name: string;
  displayName: string;
  bio: string;
  createdAt: string;
}
```

## 画面構成

### 1. ホーム画面 (`/`)
- 投稿フォーム
- タイムライン表示

### 2. プロフィール画面 (`/profile`)
- ユーザー情報表示
- ユーザー情報編集

### 3. 投稿詳細画面 (`/post/[id]`)
- 投稿内容
- 返信一覧

## 非機能要件

### パフォーマンス
- 初回ロード時間: 2秒以内
- インタラクション応答: 100ms以内

### ブラウザ対応
- Chrome（最新版）
- Firefox（最新版）
- Safari（最新版）
- Edge（最新版）

### アクセシビリティ
- キーボード操作対応
- スクリーンリーダー対応
- WCAG 2.1 AA準拠

## 開発環境

### セットアップコマンド
```bash
pnpm install
pnpm dev
```

### テスト実行
```bash
pnpm test
```

### Lint/Format
```bash
pnpm lint
pnpm format
```

## 制約事項

- データベース不使用（localStorage のみ）
- データの永続化はブラウザに依存
- 複数デバイス間でのデータ同期なし
- 画像・動画のアップロード機能なし（初期バージョン）

# アーキテクチャ設計

## ディレクトリ構成（Feature Sliced Design）

```
new-x-modoki/
├── src/
│   ├── app/                           # Next.js App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx                  # ホーム画面
│   │   ├── profile/
│   │   │   └── page.tsx              # プロフィール画面
│   │   └── post/
│   │       └── [id]/
│   │           └── page.tsx          # 投稿詳細画面
│   ├── features/                      # Features層: 機能単位
│   │   ├── timeline/
│   │   │   ├── ui/
│   │   │   │   └── Timeline.tsx
│   │   │   └── index.ts
│   │   ├── post-form/
│   │   │   ├── ui/
│   │   │   │   └── PostForm.tsx
│   │   │   ├── model/
│   │   │   └── index.ts
│   │   ├── post-card/
│   │   │   ├── ui/
│   │   │   │   └── PostCard.tsx
│   │   │   └── index.ts
│   │   ├── like-button/
│   │   │   ├── ui/
│   │   │   │   └── LikeButton.tsx
│   │   │   ├── model/
│   │   │   └── index.ts
│   │   ├── repost-button/
│   │   │   ├── ui/
│   │   │   ├── model/
│   │   │   └── index.ts
│   │   ├── reply-button/
│   │   │   ├── ui/
│   │   │   ├── model/
│   │   │   └── index.ts
│   │   ├── profile-form/
│   │   │   ├── ui/
│   │   │   │   └── ProfileForm.tsx
│   │   │   ├── model/
│   │   │   └── index.ts
│   │   └── header/
│   │       ├── ui/
│   │       │   └── Header.tsx
│   │       └── index.ts
│   └── shared/                        # Shared層: 共通コード
│       ├── ui/                        # shadcn/ui コンポーネント
│       │   ├── button.tsx
│       │   ├── card.tsx
│       │   ├── input.tsx
│       │   ├── textarea.tsx
│       │   ├── avatar.tsx
│       │   └── dialog.tsx
│       ├── lib/
│       │   ├── storage.ts            # localStorage操作
│       │   └── utils.ts
│       ├── types/
│       │   └── index.ts              # 共通型定義
│       └── config/
│           └── constants.ts
├── tests/                             # テストファイル
├── docs/                              # ドキュメント
├── public/                            # 静的ファイル
└── package.json
```

### FSD層の説明

1. **app/** - ルーティングとページ構成（Next.js App Router）
2. **features/** - 機能単位のコンポーネント（Timeline、PostForm、PostCardなど）
3. **shared/** - 再利用可能な共通コード（UI、ユーティリティ、型定義）

### 依存関係ルール

```
app → features → shared
```

- features は shared のみに依存
- features 間の依存は禁止

## コンポーネント設計（FSD準拠）

### Features層
- `Timeline`: 投稿一覧表示
- `PostForm`: 投稿作成フォーム
- `PostCard`: 投稿カード表示
- `LikeButton`: いいね機能
- `RepostButton`: リポスト機能
- `ReplyButton`: 返信機能
- `ProfileForm`: プロフィール編集フォーム
- `Header`: ヘッダーナビゲーション

### Shared層
- UIコンポーネント（shadcn/ui）: Button, Card, Input, Textarea, Avatar, Dialog
- ユーティリティ: storage, utils
- 型定義: Post, User
- 設定: constants

## データフロー（FSD準拠）

```
User Action (app)
    ↓
Feature Component (features/*/ui)
    ↓
Feature Model (features/*/model)
    ↓
Shared Storage (shared/lib/storage)
    ↓
State Update
    ↓
UI Re-render
```

## 状態管理

- **ローカル状態**: React useState
- **グローバル状態**: Context API（必要に応じて）
- **永続化**: localStorage

## ストレージAPI設計（FSD準拠）

```typescript
// shared/lib/storage.ts
export const storage = {
  // 投稿関連
  getPosts(): Post[]
  getPost(id: string): Post | null
  createPost(post: Omit<Post, 'id'>): Post
  updatePost(id: string, updates: Partial<Post>): void
  deletePost(id: string): void
  likePost(postId: string): void
  unlikePost(postId: string): void
  
  // ユーザー関連
  getUser(): User | null
  setUser(user: User): void
  updateUser(updates: Partial<User>): void
}
```

## パフォーマンス最適化

- Client Componentの最小化
- 動的インポート活用
- メモ化（useMemo, useCallback）
- 仮想スクロール（投稿数が多い場合）

## エラーハンドリング

- localStorage容量超過時の警告
- データ破損時のフォールバック
- エラーバウンダリの実装

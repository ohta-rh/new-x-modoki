# タスク03: 型定義の作成

## 目的
アプリケーション全体で使用する型定義を作成

## 具体的な作業

### 1. 共通型定義ファイル作成
`src/shared/types/index.ts`:
```typescript
export interface Post {
  id: string
  content: string
  authorName: string
  authorId: string
  createdAt: string
  likes: number
  likedBy: string[] // ユーザーIDの配列
  reposts: number
  repostedBy: string[] // ユーザーIDの配列
  replyTo?: string // 返信先の投稿ID
  replies: string[] // 返信投稿のID配列
}

export interface User {
  id: string
  name: string // @username
  displayName: string
  bio: string
  createdAt: string
}

export interface CreatePostInput {
  content: string
  replyTo?: string
}

export interface UpdateUserInput {
  displayName?: string
  bio?: string
}
```

### 2. 定数ファイル作成
`src/shared/config/constants.ts`:
```typescript
export const STORAGE_KEYS = {
  POSTS: 'x-clone-posts',
  USER: 'x-clone-user',
} as const

export const MAX_POST_LENGTH = 280
export const MAX_BIO_LENGTH = 160
export const MAX_DISPLAY_NAME_LENGTH = 50
```

## 完了条件
- [ ] `src/shared/types/index.ts` が作成されている
- [ ] `src/shared/config/constants.ts` が作成されている
- [ ] 型定義が specification.md と一致している

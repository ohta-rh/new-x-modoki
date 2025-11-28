# タスク02: ディレクトリ構造の作成

## 目的
FSD に基づいたディレクトリ構造を作成

## 具体的な作業

### 1. ディレクトリ作成
```bash
# features
mkdir -p src/features/timeline/ui
mkdir -p src/features/post-form/ui src/features/post-form/model
mkdir -p src/features/post-card/ui
mkdir -p src/features/like-button/ui src/features/like-button/model
mkdir -p src/features/repost-button/ui src/features/repost-button/model
mkdir -p src/features/reply-button/ui src/features/reply-button/model
mkdir -p src/features/profile-form/ui src/features/profile-form/model
mkdir -p src/features/header/ui

# shared
mkdir -p src/shared/lib
mkdir -p src/shared/types
mkdir -p src/shared/config

# app routes
mkdir -p src/app/profile
mkdir -p src/app/post/[id]

# tests
mkdir -p tests/features
mkdir -p tests/shared
```

### 2. index.ts ファイル作成
各 feature に `index.ts` を作成:

`src/features/timeline/index.ts`:
```typescript
export { Timeline } from './ui/Timeline'
```

`src/features/post-form/index.ts`:
```typescript
export { PostForm } from './ui/PostForm'
```

`src/features/post-card/index.ts`:
```typescript
export { PostCard } from './ui/PostCard'
```

`src/features/like-button/index.ts`:
```typescript
export { LikeButton } from './ui/LikeButton'
```

`src/features/repost-button/index.ts`:
```typescript
export { RepostButton } from './ui/RepostButton'
```

`src/features/reply-button/index.ts`:
```typescript
export { ReplyButton } from './ui/ReplyButton'
```

`src/features/profile-form/index.ts`:
```typescript
export { ProfileForm } from './ui/ProfileForm'
```

`src/features/header/index.ts`:
```typescript
export { Header } from './ui/Header'
```

### 3. .gitkeep ファイル配置
空のディレクトリに `.gitkeep` を配置

## 完了条件
- [ ] すべてのディレクトリが作成されている
- [ ] 各 feature に index.ts が存在する
- [ ] ディレクトリ構造が architecture.md と一致している

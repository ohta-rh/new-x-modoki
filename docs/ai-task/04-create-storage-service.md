# タスク04: ストレージサービスの実装

## 目的
localStorage を使ったデータ永続化機能を実装

## 具体的な作業

### 1. ストレージサービス実装
`src/shared/lib/storage.ts`:
```typescript
import type { Post, User, CreatePostInput } from '@/shared/types'
import { STORAGE_KEYS } from '@/shared/config/constants'

export const storage = {
  // 投稿関連
  getPosts(): Post[] {
    if (typeof window === 'undefined') return []
    const data = localStorage.getItem(STORAGE_KEYS.POSTS)
    return data ? JSON.parse(data) : []
  },

  getPost(id: string): Post | null {
    const posts = this.getPosts()
    return posts.find((post) => post.id === id) || null
  },

  createPost(input: CreatePostInput, user: User): Post {
    const posts = this.getPosts()
    const newPost: Post = {
      id: crypto.randomUUID(),
      content: input.content,
      authorName: user.displayName,
      authorId: user.id,
      createdAt: new Date().toISOString(),
      likes: 0,
      likedBy: [],
      reposts: 0,
      repostedBy: [],
      replyTo: input.replyTo,
      replies: [],
    }

    // 返信の場合、親投稿の replies に追加
    if (input.replyTo) {
      const parentPost = posts.find((p) => p.id === input.replyTo)
      if (parentPost) {
        parentPost.replies.push(newPost.id)
      }
    }

    posts.unshift(newPost)
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts))
    return newPost
  },

  deletePost(id: string): void {
    const posts = this.getPosts().filter((post) => post.id !== id)
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts))
  },

  likePost(postId: string, userId: string): void {
    const posts = this.getPosts()
    const post = posts.find((p) => p.id === postId)
    if (post && !post.likedBy.includes(userId)) {
      post.likes += 1
      post.likedBy.push(userId)
      localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts))
    }
  },

  unlikePost(postId: string, userId: string): void {
    const posts = this.getPosts()
    const post = posts.find((p) => p.id === postId)
    if (post && post.likedBy.includes(userId)) {
      post.likes -= 1
      post.likedBy = post.likedBy.filter((id) => id !== userId)
      localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts))
    }
  },

  repost(postId: string, userId: string): void {
    const posts = this.getPosts()
    const post = posts.find((p) => p.id === postId)
    if (post && !post.repostedBy.includes(userId)) {
      post.reposts += 1
      post.repostedBy.push(userId)
      localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts))
    }
  },

  unrepost(postId: string, userId: string): void {
    const posts = this.getPosts()
    const post = posts.find((p) => p.id === postId)
    if (post && post.repostedBy.includes(userId)) {
      post.reposts -= 1
      post.repostedBy = post.repostedBy.filter((id) => id !== userId)
      localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts))
    }
  },

  // ユーザー関連
  getUser(): User | null {
    if (typeof window === 'undefined') return null
    const data = localStorage.getItem(STORAGE_KEYS.USER)
    return data ? JSON.parse(data) : null
  },

  setUser(user: User): void {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
  },

  updateUser(updates: Partial<User>): void {
    const user = this.getUser()
    if (user) {
      const updatedUser = { ...user, ...updates }
      this.setUser(updatedUser)
    }
  },

  initializeUser(): User {
    const existingUser = this.getUser()
    if (existingUser) return existingUser

    const newUser: User = {
      id: crypto.randomUUID(),
      name: `user${Math.floor(Math.random() * 10000)}`,
      displayName: 'Anonymous User',
      bio: '',
      createdAt: new Date().toISOString(),
    }
    this.setUser(newUser)
    return newUser
  },
}
```

### 2. テストファイル作成
`tests/shared/storage.test.ts`:
```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { storage } from '@/shared/lib/storage'

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should create and get posts', () => {
    const user = storage.initializeUser()
    const post = storage.createPost({ content: 'Test post' }, user)
    
    expect(post.content).toBe('Test post')
    expect(post.authorId).toBe(user.id)
    
    const posts = storage.getPosts()
    expect(posts).toHaveLength(1)
    expect(posts[0].id).toBe(post.id)
  })

  it('should like and unlike posts', () => {
    const user = storage.initializeUser()
    const post = storage.createPost({ content: 'Test' }, user)
    
    storage.likePost(post.id, user.id)
    let updatedPost = storage.getPost(post.id)
    expect(updatedPost?.likes).toBe(1)
    
    storage.unlikePost(post.id, user.id)
    updatedPost = storage.getPost(post.id)
    expect(updatedPost?.likes).toBe(0)
  })

  it('should initialize user', () => {
    const user = storage.initializeUser()
    expect(user.id).toBeDefined()
    expect(user.name).toBeDefined()
  })
})
```

## 完了条件
- [ ] `src/shared/lib/storage.ts` が実装されている
- [ ] すべてのメソッドが動作する
- [ ] テストが通る (`pnpm test`)

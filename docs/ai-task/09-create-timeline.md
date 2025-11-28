# タスク09: Timeline コンポーネントの実装

## 目的
投稿一覧を表示する Timeline コンポーネントを実装

## 具体的な作業

### 1. Timeline コンポーネント実装
`src/features/timeline/ui/Timeline.tsx`:
```typescript
'use client'

import { useState, useEffect } from 'react'
import { PostCard } from '@/features/post-card'
import { storage } from '@/shared/lib/storage'
import type { Post } from '@/shared/types'

interface TimelineProps {
  replyTo?: string
}

export function Timeline({ replyTo }: TimelineProps) {
  const [posts, setPosts] = useState<Post[]>([])

  const loadPosts = () => {
    const allPosts = storage.getPosts()
    if (replyTo) {
      // 特定の投稿への返信のみ表示
      setPosts(allPosts.filter((post) => post.replyTo === replyTo))
    } else {
      // トップレベルの投稿のみ表示（返信でないもの）
      setPosts(allPosts.filter((post) => !post.replyTo))
    }
  }

  useEffect(() => {
    loadPosts()
  }, [replyTo])

  if (posts.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        {replyTo ? '返信はまだありません' : '投稿はまだありません'}
      </div>
    )
  }

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onUpdate={loadPosts} />
      ))}
    </div>
  )
}
```

### 2. テストファイル作成
`tests/features/timeline.test.tsx`:
```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Timeline } from '@/features/timeline'
import { storage } from '@/shared/lib/storage'

describe('Timeline', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should show empty message when no posts', () => {
    render(<Timeline />)
    expect(screen.getByText('投稿はまだありません')).toBeInTheDocument()
  })

  it('should display posts', () => {
    const user = storage.initializeUser()
    storage.createPost({ content: 'Test post 1' }, user)
    storage.createPost({ content: 'Test post 2' }, user)

    render(<Timeline />)
    expect(screen.getByText('Test post 1')).toBeInTheDocument()
    expect(screen.getByText('Test post 2')).toBeInTheDocument()
  })

  it('should not display replies in main timeline', () => {
    const user = storage.initializeUser()
    const mainPost = storage.createPost({ content: 'Main post' }, user)
    storage.createPost({ content: 'Reply post', replyTo: mainPost.id }, user)

    render(<Timeline />)
    expect(screen.getByText('Main post')).toBeInTheDocument()
    expect(screen.queryByText('Reply post')).not.toBeInTheDocument()
  })
})
```

## 完了条件
- [ ] Timeline コンポーネントが実装されている
- [ ] 投稿が新しい順に表示される
- [ ] 返信は表示されない（メインタイムライン）
- [ ] 投稿がない場合のメッセージが表示される
- [ ] テストが通る

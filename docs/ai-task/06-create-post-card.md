# タスク06: PostCard コンポーネントの実装

## 目的
投稿を表示する PostCard コンポーネントを実装

## 具体的な作業

### 1. PostCard コンポーネント実装
`src/features/post-card/ui/PostCard.tsx`:
```typescript
'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import type { Post } from '@/shared/types'
import { LikeButton } from '@/features/like-button'
import { RepostButton } from '@/features/repost-button'
import { ReplyButton } from '@/features/reply-button'

interface PostCardProps {
  post: Post
  onUpdate?: () => void
}

export function PostCard({ post, onUpdate }: PostCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex gap-4">
          <Avatar>
            <AvatarFallback>{getInitials(post.authorName)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold">{post.authorName}</span>
              <span className="text-sm text-muted-foreground">
                {formatDate(post.createdAt)}
              </span>
            </div>
            <p className="whitespace-pre-wrap mb-4">{post.content}</p>
            <div className="flex gap-4">
              <LikeButton post={post} onUpdate={onUpdate} />
              <RepostButton post={post} onUpdate={onUpdate} />
              <ReplyButton post={post} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
```

### 2. テストファイル作成
`tests/features/post-card.test.tsx`:
```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PostCard } from '@/features/post-card'
import type { Post } from '@/shared/types'

describe('PostCard', () => {
  const mockPost: Post = {
    id: '1',
    content: 'Test post content',
    authorName: 'Test User',
    authorId: 'user1',
    createdAt: new Date().toISOString(),
    likes: 5,
    likedBy: [],
    reposts: 2,
    repostedBy: [],
    replies: [],
  }

  it('should render post content', () => {
    render(<PostCard post={mockPost} />)
    expect(screen.getByText('Test post content')).toBeInTheDocument()
    expect(screen.getByText('Test User')).toBeInTheDocument()
  })

  it('should display like and repost counts', () => {
    render(<PostCard post={mockPost} />)
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })
})
```

## 完了条件
- [ ] PostCard コンポーネントが実装されている
- [ ] 投稿内容、作成者、日時が表示される
- [ ] いいね、リポスト、返信ボタンが表示される
- [ ] テストが通る

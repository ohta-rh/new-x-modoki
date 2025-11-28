# タスク07: インタラクションボタンの実装

## 目的
いいね、リポスト、返信ボタンを実装

## 具体的な作業

### 1. LikeButton 実装
`src/features/like-button/ui/LikeButton.tsx`:
```typescript
'use client'

import { useState } from 'react'
import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { storage } from '@/shared/lib/storage'
import type { Post } from '@/shared/types'

interface LikeButtonProps {
  post: Post
  onUpdate?: () => void
}

export function LikeButton({ post, onUpdate }: LikeButtonProps) {
  const [user] = useState(() => storage.getUser())
  const isLiked = user ? post.likedBy.includes(user.id) : false

  const handleLike = () => {
    if (!user) return
    
    if (isLiked) {
      storage.unlikePost(post.id, user.id)
    } else {
      storage.likePost(post.id, user.id)
    }
    onUpdate?.()
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLike}
      className="gap-2"
    >
      <Heart className={isLiked ? 'fill-red-500 text-red-500' : ''} size={18} />
      <span>{post.likes}</span>
    </Button>
  )
}
```

### 2. RepostButton 実装
`src/features/repost-button/ui/RepostButton.tsx`:
```typescript
'use client'

import { useState } from 'react'
import { Repeat2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { storage } from '@/shared/lib/storage'
import type { Post } from '@/shared/types'

interface RepostButtonProps {
  post: Post
  onUpdate?: () => void
}

export function RepostButton({ post, onUpdate }: RepostButtonProps) {
  const [user] = useState(() => storage.getUser())
  const isReposted = user ? post.repostedBy.includes(user.id) : false

  const handleRepost = () => {
    if (!user) return
    
    if (isReposted) {
      storage.unrepost(post.id, user.id)
    } else {
      storage.repost(post.id, user.id)
    }
    onUpdate?.()
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleRepost}
      className="gap-2"
    >
      <Repeat2 className={isReposted ? 'text-green-500' : ''} size={18} />
      <span>{post.reposts}</span>
    </Button>
  )
}
```

### 3. ReplyButton 実装
`src/features/reply-button/ui/ReplyButton.tsx`:
```typescript
'use client'

import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import type { Post } from '@/shared/types'

interface ReplyButtonProps {
  post: Post
}

export function ReplyButton({ post }: ReplyButtonProps) {
  const router = useRouter()

  const handleReply = () => {
    router.push(`/post/${post.id}`)
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleReply}
      className="gap-2"
    >
      <MessageCircle size={18} />
      <span>{post.replies.length}</span>
    </Button>
  )
}
```

## 完了条件
- [ ] LikeButton が実装されている
- [ ] RepostButton が実装されている
- [ ] ReplyButton が実装されている
- [ ] クリックで状態が変更される
- [ ] アイコンの色が状態に応じて変わる

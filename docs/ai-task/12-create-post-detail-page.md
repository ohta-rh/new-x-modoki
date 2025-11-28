# タスク12: 投稿詳細ページの実装

## 目的
投稿詳細と返信を表示するページを実装

## 具体的な作業

### 1. 投稿詳細ページ実装
`src/app/post/[id]/page.tsx`:
```typescript
'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { PostCard } from '@/features/post-card'
import { PostForm } from '@/features/post-form'
import { Timeline } from '@/features/timeline'
import { storage } from '@/shared/lib/storage'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import type { Post } from '@/shared/types'

export default function PostDetailPage() {
  const params = useParams()
  const router = useRouter()
  const postId = params.id as string
  const [post, setPost] = useState<Post | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    const foundPost = storage.getPost(postId)
    setPost(foundPost)
  }, [postId, refreshKey])

  const handlePostCreated = () => {
    setRefreshKey((prev) => prev + 1)
  }

  const handleUpdate = () => {
    setRefreshKey((prev) => prev + 1)
  }

  if (!post) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">投稿が見つかりません</p>
        <Button onClick={() => router.push('/')}>ホームに戻る</Button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
        >
          <ArrowLeft />
        </Button>
        <h1 className="text-2xl font-bold">投稿</h1>
      </div>

      <PostCard post={post} onUpdate={handleUpdate} />

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">返信</h2>
        <PostForm replyTo={postId} onPostCreated={handlePostCreated} />
        <Timeline key={refreshKey} replyTo={postId} />
      </div>
    </div>
  )
}
```

## 完了条件
- [ ] 投稿詳細ページが表示される
- [ ] 元の投稿が表示される
- [ ] 返信フォームが表示される
- [ ] 返信一覧が表示される
- [ ] 戻るボタンが機能する
- [ ] 存在しない投稿IDの場合エラーメッセージが表示される

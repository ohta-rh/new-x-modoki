# タスク08: PostForm コンポーネントの実装

## 目的
投稿作成フォームを実装

## 具体的な作業

### 1. PostForm コンポーネント実装
`src/features/post-form/ui/PostForm.tsx`:
```typescript
'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { storage } from '@/shared/lib/storage'
import { MAX_POST_LENGTH } from '@/shared/config/constants'

interface PostFormProps {
  replyTo?: string
  onPostCreated?: () => void
}

export function PostForm({ replyTo, onPostCreated }: PostFormProps) {
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const remainingChars = MAX_POST_LENGTH - content.length
  const isValid = content.trim().length > 0 && remainingChars >= 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid || isSubmitting) return

    setIsSubmitting(true)
    try {
      const user = storage.getUser()
      if (!user) {
        storage.initializeUser()
      }
      const currentUser = storage.getUser()!
      
      storage.createPost({ content: content.trim(), replyTo }, currentUser)
      setContent('')
      onPostCreated?.()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit}>
          <Textarea
            placeholder={replyTo ? '返信を投稿' : 'いまどうしてる？'}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[100px] resize-none mb-4"
            maxLength={MAX_POST_LENGTH}
          />
          <div className="flex justify-between items-center">
            <span
              className={`text-sm ${
                remainingChars < 0
                  ? 'text-red-500'
                  : remainingChars < 20
                    ? 'text-yellow-500'
                    : 'text-muted-foreground'
              }`}
            >
              {remainingChars}
            </span>
            <Button type="submit" disabled={!isValid || isSubmitting}>
              {isSubmitting ? '投稿中...' : '投稿'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
```

### 2. テストファイル作成
`tests/features/post-form.test.tsx`:
```typescript
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { PostForm } from '@/features/post-form'

describe('PostForm', () => {
  it('should render form', () => {
    render(<PostForm />)
    expect(screen.getByPlaceholderText('いまどうしてる？')).toBeInTheDocument()
  })

  it('should update character count', () => {
    render(<PostForm />)
    const textarea = screen.getByPlaceholderText('いまどうしてる？')
    fireEvent.change(textarea, { target: { value: 'Test' } })
    expect(screen.getByText('276')).toBeInTheDocument()
  })

  it('should disable submit when empty', () => {
    render(<PostForm />)
    const button = screen.getByRole('button', { name: '投稿' })
    expect(button).toBeDisabled()
  })

  it('should enable submit when valid', () => {
    render(<PostForm />)
    const textarea = screen.getByPlaceholderText('いまどうしてる？')
    fireEvent.change(textarea, { target: { value: 'Valid post' } })
    const button = screen.getByRole('button', { name: '投稿' })
    expect(button).not.toBeDisabled()
  })
})
```

## 完了条件
- [ ] PostForm コンポーネントが実装されている
- [ ] 文字数カウントが表示される
- [ ] 280文字制限が機能する
- [ ] 投稿が localStorage に保存される
- [ ] テストが通る

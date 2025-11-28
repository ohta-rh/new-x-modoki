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

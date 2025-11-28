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

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

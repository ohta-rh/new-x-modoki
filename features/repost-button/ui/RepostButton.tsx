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

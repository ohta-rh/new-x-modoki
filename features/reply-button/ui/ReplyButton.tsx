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

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
      setPosts(allPosts.filter((post) => post.replyTo === replyTo))
    } else {
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

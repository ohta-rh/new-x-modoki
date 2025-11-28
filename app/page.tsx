'use client'

import { useState, useEffect } from 'react'
import { PostForm } from '@/features/post-form'
import { Timeline } from '@/features/timeline'
import { storage } from '@/shared/lib/storage'

export default function HomePage() {
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    storage.initializeUser()
  }, [])

  const handlePostCreated = () => {
    setRefreshKey((prev) => prev + 1)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">ホーム</h1>
      <PostForm onPostCreated={handlePostCreated} />
      <Timeline key={refreshKey} />
    </div>
  )
}

# タスク11: ホームページの実装

## 目的
メインのホームページを実装

## 具体的な作業

### 1. レイアウトファイル更新
`src/app/layout.tsx`:
```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/features/header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'X Clone',
  description: 'A lightweight X clone application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Header />
        <main className="container max-w-2xl mx-auto py-6">
          {children}
        </main>
      </body>
    </html>
  )
}
```

### 2. ホームページ実装
`src/app/page.tsx`:
```typescript
'use client'

import { useState, useEffect } from 'react'
import { PostForm } from '@/features/post-form'
import { Timeline } from '@/features/timeline'
import { storage } from '@/shared/lib/storage'

export default function HomePage() {
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    // ユーザーの初期化
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
```

## 完了条件
- [ ] ホームページが表示される
- [ ] PostForm が表示される
- [ ] Timeline が表示される
- [ ] 投稿作成後にタイムラインが更新される
- [ ] Header が表示される

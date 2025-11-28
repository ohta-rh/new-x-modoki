# タスク13: プロフィールページの実装

## 目的
ユーザープロフィール表示・編集ページを実装

## 具体的な作業

### 1. ProfileForm コンポーネント実装
`src/features/profile-form/ui/ProfileForm.tsx`:
```typescript
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { storage } from '@/shared/lib/storage'
import { MAX_BIO_LENGTH, MAX_DISPLAY_NAME_LENGTH } from '@/shared/config/constants'
import type { User } from '@/shared/types'

export function ProfileForm() {
  const [user, setUser] = useState<User | null>(null)
  const [displayName, setDisplayName] = useState('')
  const [bio, setBio] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const currentUser = storage.getUser()
    if (currentUser) {
      setUser(currentUser)
      setDisplayName(currentUser.displayName)
      setBio(currentUser.bio)
    }
  }, [])

  const handleSave = async () => {
    if (!user) return

    setIsSaving(true)
    try {
      storage.updateUser({
        displayName: displayName.trim(),
        bio: bio.trim(),
      })
      const updatedUser = storage.getUser()
      setUser(updatedUser)
      setIsEditing(false)
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    if (user) {
      setDisplayName(user.displayName)
      setBio(user.bio)
    }
    setIsEditing(false)
  }

  if (!user) {
    return <div>読み込み中...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>プロフィール</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">ユーザー名</label>
          <Input value={`@${user.name}`} disabled />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">表示名</label>
          <Input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            disabled={!isEditing}
            maxLength={MAX_DISPLAY_NAME_LENGTH}
          />
          {isEditing && (
            <p className="text-sm text-muted-foreground mt-1">
              {MAX_DISPLAY_NAME_LENGTH - displayName.length} 文字残り
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">自己紹介</label>
          <Textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            disabled={!isEditing}
            maxLength={MAX_BIO_LENGTH}
            className="min-h-[100px]"
          />
          {isEditing && (
            <p className="text-sm text-muted-foreground mt-1">
              {MAX_BIO_LENGTH - bio.length} 文字残り
            </p>
          )}
        </div>

        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? '保存中...' : '保存'}
              </Button>
              <Button variant="outline" onClick={handleCancel} disabled={isSaving}>
                キャンセル
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>編集</Button>
          )}
        </div>

        <div className="pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            登録日: {new Date(user.createdAt).toLocaleDateString('ja-JP')}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
```

### 2. プロフィールページ実装
`src/app/profile/page.tsx`:
```typescript
import { ProfileForm } from '@/features/profile-form'

export default function ProfilePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">プロフィール</h1>
      <ProfileForm />
    </div>
  )
}
```

## 完了条件
- [ ] プロフィールページが表示される
- [ ] ユーザー情報が表示される
- [ ] 編集モードに切り替えられる
- [ ] 表示名と自己紹介を編集できる
- [ ] 文字数制限が機能する
- [ ] 保存後に localStorage に反映される

# タスク14: テストの追加

## 目的
主要コンポーネントのテストを追加

## 具体的な作業

### 1. 統合テストの追加
`tests/integration/post-flow.test.tsx`:
```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import HomePage from '@/app/page'
import { storage } from '@/shared/lib/storage'

describe('Post Flow Integration', () => {
  beforeEach(() => {
    localStorage.clear()
    storage.initializeUser()
  })

  it('should create and display a post', async () => {
    render(<HomePage />)

    const textarea = screen.getByPlaceholderText('いまどうしてる？')
    const submitButton = screen.getByRole('button', { name: '投稿' })

    fireEvent.change(textarea, { target: { value: 'Test post content' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Test post content')).toBeInTheDocument()
    })
  })

  it('should like a post', async () => {
    const user = storage.getUser()!
    storage.createPost({ content: 'Test post' }, user)

    render(<HomePage />)

    const likeButton = screen.getAllByRole('button').find(
      (btn) => btn.querySelector('svg')
    )
    
    if (likeButton) {
      fireEvent.click(likeButton)
      await waitFor(() => {
        expect(screen.getByText('1')).toBeInTheDocument()
      })
    }
  })
})
```

### 2. ProfileForm テスト追加
`tests/features/profile-form.test.tsx`:
```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ProfileForm } from '@/features/profile-form'
import { storage } from '@/shared/lib/storage'

describe('ProfileForm', () => {
  beforeEach(() => {
    localStorage.clear()
    storage.initializeUser()
  })

  it('should display user information', () => {
    render(<ProfileForm />)
    expect(screen.getByText('プロフィール')).toBeInTheDocument()
  })

  it('should enable editing mode', () => {
    render(<ProfileForm />)
    const editButton = screen.getByRole('button', { name: '編集' })
    fireEvent.click(editButton)
    expect(screen.getByRole('button', { name: '保存' })).toBeInTheDocument()
  })

  it('should save profile changes', () => {
    render(<ProfileForm />)
    
    const editButton = screen.getByRole('button', { name: '編集' })
    fireEvent.click(editButton)

    const displayNameInput = screen.getByLabelText('表示名')
    fireEvent.change(displayNameInput, { target: { value: 'New Name' } })

    const saveButton = screen.getByRole('button', { name: '保存' })
    fireEvent.click(saveButton)

    const user = storage.getUser()
    expect(user?.displayName).toBe('New Name')
  })
})
```

### 3. テストカバレッジ確認
`package.json` にカバレッジスクリプト追加:
```json
{
  "scripts": {
    "test:coverage": "vitest run --coverage"
  }
}
```

カバレッジツールのインストール:
```bash
pnpm add -D @vitest/coverage-v8
```

## 完了条件
- [ ] 統合テストが追加されている
- [ ] ProfileForm のテストが追加されている
- [ ] すべてのテストが通る
- [ ] カバレッジが確認できる

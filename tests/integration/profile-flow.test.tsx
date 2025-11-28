import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { storage } from '@/shared/lib/storage'
import { ProfileForm } from '@/features/profile-form'
import { PostCard } from '@/features/post-card'

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}))

describe('Profile Flow Integration', () => {
  beforeEach(() => {
    localStorage.clear()
    storage.initializeUser()
  })

  it('should update profile and reflect in posts', async () => {
    const user = storage.getUser()!
    const post = storage.createPost({ content: 'Test post' }, user)

    render(<ProfileForm />)

    const editButton = screen.getByRole('button', { name: '編集' })
    fireEvent.click(editButton)

    const displayNameInput = screen.getByLabelText('表示名')
    fireEvent.change(displayNameInput, { target: { value: 'Updated User' } })

    const saveButton = screen.getByRole('button', { name: '保存' })
    fireEvent.click(saveButton)

    await waitFor(() => {
      const updatedUser = storage.getUser()
      expect(updatedUser?.displayName).toBe('Updated User')
    })

    const newPost = storage.createPost({ content: 'New post' }, storage.getUser()!)
    expect(newPost.authorName).toBe('Updated User')
  })

  it('should persist profile changes across sessions', async () => {
    render(<ProfileForm />)

    const editButton = screen.getByRole('button', { name: '編集' })
    fireEvent.click(editButton)

    const displayNameInput = screen.getByLabelText('表示名')
    const bioInput = screen.getByLabelText('自己紹介')
    
    fireEvent.change(displayNameInput, { target: { value: 'Persistent User' } })
    fireEvent.change(bioInput, { target: { value: 'Test bio' } })

    const saveButton = screen.getByRole('button', { name: '保存' })
    fireEvent.click(saveButton)

    await waitFor(() => {
      const user = storage.getUser()
      expect(user?.displayName).toBe('Persistent User')
      expect(user?.bio).toBe('Test bio')
    })

    const { unmount } = render(<ProfileForm />)
    unmount()

    render(<ProfileForm />)
    expect(screen.getByDisplayValue('Persistent User')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Test bio')).toBeInTheDocument()
  })

  it('should validate profile field lengths', () => {
    render(<ProfileForm />)

    const editButton = screen.getByRole('button', { name: '編集' })
    fireEvent.click(editButton)

    const displayNameInput = screen.getByLabelText('表示名') as HTMLInputElement
    const bioInput = screen.getByLabelText('自己紹介') as HTMLInputElement

    expect(displayNameInput.maxLength).toBe(50)
    expect(bioInput.maxLength).toBe(160)
  })

  it('should show character counters in edit mode', () => {
    render(<ProfileForm />)

    const editButton = screen.getByRole('button', { name: '編集' })
    fireEvent.click(editButton)

    const counters = screen.getAllByText(/文字残り/)
    expect(counters.length).toBeGreaterThan(0)
  })
})

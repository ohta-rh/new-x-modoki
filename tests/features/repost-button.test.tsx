import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { RepostButton } from '@/features/repost-button'
import { storage } from '@/shared/lib/storage'
import type { Post } from '@/shared/types'

describe('RepostButton', () => {
  let mockPost: Post

  beforeEach(() => {
    localStorage.clear()
    const user = storage.initializeUser()
    mockPost = storage.createPost({ content: 'Test' }, user)
  })

  it('should render repost button with count', () => {
    render(<RepostButton post={mockPost} />)
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('should toggle repost on click', () => {
    const onUpdate = vi.fn()
    render(<RepostButton post={mockPost} onUpdate={onUpdate} />)
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    expect(onUpdate).toHaveBeenCalled()
  })

  it('should show green icon when reposted', () => {
    const user = storage.getUser()!
    const repostedPost = { ...mockPost, repostedBy: [user.id] }
    
    render(<RepostButton post={repostedPost} />)
    const icon = screen.getByRole('button').querySelector('svg')
    expect(icon).toHaveClass('text-green-500')
  })

  it('should show normal icon when not reposted', () => {
    render(<RepostButton post={mockPost} />)
    const icon = screen.getByRole('button').querySelector('svg')
    expect(icon).not.toHaveClass('text-green-500')
  })
})

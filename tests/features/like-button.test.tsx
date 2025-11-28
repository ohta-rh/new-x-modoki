import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { LikeButton } from '@/features/like-button'
import { storage } from '@/shared/lib/storage'
import type { Post } from '@/shared/types'

describe('LikeButton', () => {
  let mockPost: Post

  beforeEach(() => {
    localStorage.clear()
    const user = storage.initializeUser()
    mockPost = storage.createPost({ content: 'Test' }, user)
  })

  it('should render like button with count', () => {
    render(<LikeButton post={mockPost} />)
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('should toggle like on click', () => {
    const onUpdate = vi.fn()
    render(<LikeButton post={mockPost} onUpdate={onUpdate} />)
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    expect(onUpdate).toHaveBeenCalled()
  })

  it('should show filled heart when liked', () => {
    const user = storage.getUser()!
    const likedPost = { ...mockPost, likedBy: [user.id] }
    
    render(<LikeButton post={likedPost} />)
    const heart = screen.getByRole('button').querySelector('svg')
    expect(heart).toHaveClass('fill-red-500')
  })

  it('should show empty heart when not liked', () => {
    render(<LikeButton post={mockPost} />)
    const heart = screen.getByRole('button').querySelector('svg')
    expect(heart).not.toHaveClass('fill-red-500')
  })
})

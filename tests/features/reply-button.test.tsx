import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ReplyButton } from '@/features/reply-button'
import { storage } from '@/shared/lib/storage'
import type { Post } from '@/shared/types'

const mockPush = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

describe('ReplyButton', () => {
  let mockPost: Post

  beforeEach(() => {
    localStorage.clear()
    mockPush.mockClear()
    const user = storage.initializeUser()
    mockPost = storage.createPost({ content: 'Test' }, user)
  })

  it('should render reply button with count', () => {
    render(<ReplyButton post={mockPost} />)
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('should navigate to post detail on click', () => {
    render(<ReplyButton post={mockPost} />)
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    expect(mockPush).toHaveBeenCalledWith(`/post/${mockPost.id}`)
  })

  it('should show correct reply count', () => {
    const postWithReplies = { ...mockPost, replies: ['r1', 'r2'] }
    render(<ReplyButton post={postWithReplies} />)
    expect(screen.getByText('2')).toBeInTheDocument()
  })
})

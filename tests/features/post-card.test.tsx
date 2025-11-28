import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PostCard } from '@/features/post-card'
import type { Post } from '@/shared/types'

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}))

describe('PostCard', () => {
  const mockPost: Post = {
    id: '1',
    content: 'Test post content',
    authorName: 'Test User',
    authorId: 'user1',
    createdAt: new Date('2024-01-01T12:00:00').toISOString(),
    likes: 5,
    likedBy: [],
    reposts: 2,
    repostedBy: [],
    replies: [],
  }

  beforeEach(() => {
    localStorage.clear()
  })

  it('should render post content', () => {
    render(<PostCard post={mockPost} />)
    expect(screen.getByText('Test post content')).toBeInTheDocument()
  })

  it('should render author name', () => {
    render(<PostCard post={mockPost} />)
    expect(screen.getByText('Test User')).toBeInTheDocument()
  })

  it('should render formatted date', () => {
    render(<PostCard post={mockPost} />)
    expect(screen.getByText(/2024/)).toBeInTheDocument()
  })

  it('should render avatar with initials', () => {
    render(<PostCard post={mockPost} />)
    expect(screen.getByText('TU')).toBeInTheDocument()
  })

  it('should render like count', () => {
    render(<PostCard post={mockPost} />)
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('should render repost count', () => {
    render(<PostCard post={mockPost} />)
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('should render reply count', () => {
    const postWithReplies = { ...mockPost, replies: ['r1', 'r2', 'r3'] }
    render(<PostCard post={postWithReplies} />)
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('should handle multi-line content', () => {
    const multiLinePost = { ...mockPost, content: 'Line 1\nLine 2\nLine 3' }
    render(<PostCard post={multiLinePost} />)
    expect(screen.getByText(/Line 1.*Line 2.*Line 3/s)).toBeInTheDocument()
  })
})

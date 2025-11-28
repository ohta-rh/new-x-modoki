import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Timeline } from '@/features/timeline'
import { storage } from '@/shared/lib/storage'

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}))

describe('Timeline', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should show empty message when no posts', () => {
    render(<Timeline />)
    expect(screen.getByText('投稿はまだありません')).toBeInTheDocument()
  })

  it('should show empty message for replies when no replies', () => {
    render(<Timeline replyTo="123" />)
    expect(screen.getByText('返信はまだありません')).toBeInTheDocument()
  })

  it('should display posts', () => {
    const user = storage.initializeUser()
    storage.createPost({ content: 'Test post 1' }, user)
    storage.createPost({ content: 'Test post 2' }, user)

    render(<Timeline />)
    expect(screen.getByText('Test post 1')).toBeInTheDocument()
    expect(screen.getByText('Test post 2')).toBeInTheDocument()
  })

  it('should not display replies in main timeline', () => {
    const user = storage.initializeUser()
    const mainPost = storage.createPost({ content: 'Main post' }, user)
    storage.createPost({ content: 'Reply post', replyTo: mainPost.id }, user)

    render(<Timeline />)
    expect(screen.getByText('Main post')).toBeInTheDocument()
    expect(screen.queryByText('Reply post')).not.toBeInTheDocument()
  })

  it('should display only replies when replyTo is provided', () => {
    const user = storage.initializeUser()
    const mainPost = storage.createPost({ content: 'Main post' }, user)
    storage.createPost({ content: 'Reply 1', replyTo: mainPost.id }, user)
    storage.createPost({ content: 'Reply 2', replyTo: mainPost.id }, user)
    storage.createPost({ content: 'Other post' }, user)

    render(<Timeline replyTo={mainPost.id} />)
    expect(screen.getByText('Reply 1')).toBeInTheDocument()
    expect(screen.getByText('Reply 2')).toBeInTheDocument()
    expect(screen.queryByText('Main post')).not.toBeInTheDocument()
    expect(screen.queryByText('Other post')).not.toBeInTheDocument()
  })

  it('should display posts in reverse chronological order', () => {
    const user = storage.initializeUser()
    storage.createPost({ content: 'First' }, user)
    storage.createPost({ content: 'Second' }, user)

    render(<Timeline />)
    const posts = screen.getAllByText(/First|Second/)
    expect(posts[0]).toHaveTextContent('Second')
    expect(posts[1]).toHaveTextContent('First')
  })
})

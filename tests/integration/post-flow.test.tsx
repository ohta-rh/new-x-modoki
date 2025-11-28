import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { storage } from '@/shared/lib/storage'
import { PostForm } from '@/features/post-form'
import { Timeline } from '@/features/timeline'
import { PostCard } from '@/features/post-card'

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  usePathname: () => '/',
}))

describe('Post Flow Integration', () => {
  beforeEach(() => {
    localStorage.clear()
    storage.initializeUser()
  })

  it('should create and display a post', async () => {
    const { rerender } = render(
      <>
        <PostForm />
        <Timeline />
      </>
    )

    const textarea = screen.getByPlaceholderText('いまどうしてる？')
    fireEvent.change(textarea, { target: { value: 'Integration test post' } })

    const submitButton = screen.getByRole('button', { name: '投稿' })
    fireEvent.click(submitButton)

    rerender(
      <>
        <PostForm />
        <Timeline />
      </>
    )

    await waitFor(() => {
      expect(screen.getByText('Integration test post')).toBeInTheDocument()
    })
  })

  it('should like a post and update count', () => {
    const user = storage.getUser()!
    const post = storage.createPost({ content: 'Test post' }, user)

    const { rerender } = render(<PostCard post={post} />)

    const likeButton = screen.getAllByRole('button')[0]
    fireEvent.click(likeButton)

    const updatedPost = storage.getPost(post.id)!
    rerender(<PostCard post={updatedPost} />)

    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('should repost a post and update count', () => {
    const user = storage.getUser()!
    const post = storage.createPost({ content: 'Test post' }, user)

    const { rerender } = render(<PostCard post={post} />)

    const repostButton = screen.getAllByRole('button')[1]
    fireEvent.click(repostButton)

    const updatedPost = storage.getPost(post.id)!
    rerender(<PostCard post={updatedPost} />)

    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('should create reply and link to parent', async () => {
    const user = storage.getUser()!
    const mainPost = storage.createPost({ content: 'Main post' }, user)

    render(<PostForm replyTo={mainPost.id} />)

    const textarea = screen.getByPlaceholderText('返信を投稿')
    fireEvent.change(textarea, { target: { value: 'Reply content' } })

    const submitButton = screen.getByRole('button', { name: '投稿' })
    fireEvent.click(submitButton)

    await waitFor(() => {
      const updatedMain = storage.getPost(mainPost.id)
      expect(updatedMain?.replies.length).toBe(1)
    })
  })

  it('should display replies separately from main timeline', () => {
    const user = storage.getUser()!
    const mainPost = storage.createPost({ content: 'Main' }, user)
    storage.createPost({ content: 'Reply', replyTo: mainPost.id }, user)

    const { rerender } = render(<Timeline />)
    expect(screen.getByText('Main')).toBeInTheDocument()
    expect(screen.queryByText('Reply')).not.toBeInTheDocument()

    rerender(<Timeline replyTo={mainPost.id} />)
    expect(screen.getByText('Reply')).toBeInTheDocument()
    expect(screen.queryByText('Main')).not.toBeInTheDocument()
  })

  it('should handle multiple interactions on same post', () => {
    const user = storage.getUser()!
    const post = storage.createPost({ content: 'Test' }, user)

    storage.likePost(post.id, user.id)
    storage.repost(post.id, user.id)

    const updatedPost = storage.getPost(post.id)!
    expect(updatedPost.likes).toBe(1)
    expect(updatedPost.reposts).toBe(1)
  })
})

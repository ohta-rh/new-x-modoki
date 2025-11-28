import { describe, it, expect, beforeEach } from 'vitest'
import { storage } from '@/shared/lib/storage'

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('User Management', () => {
    it('should initialize a new user', () => {
      const user = storage.initializeUser()
      expect(user.id).toBeDefined()
      expect(user.name).toMatch(/^user\d+$/)
      expect(user.displayName).toBe('Anonymous User')
      expect(user.bio).toBe('')
      expect(user.createdAt).toBeDefined()
    })

    it('should return existing user on second initialization', () => {
      const user1 = storage.initializeUser()
      const user2 = storage.initializeUser()
      expect(user1.id).toBe(user2.id)
    })

    it('should get user', () => {
      storage.initializeUser()
      const user = storage.getUser()
      expect(user).not.toBeNull()
      expect(user?.displayName).toBe('Anonymous User')
    })

    it('should update user', () => {
      storage.initializeUser()
      storage.updateUser({ displayName: 'Test User', bio: 'Test bio' })
      const user = storage.getUser()
      expect(user?.displayName).toBe('Test User')
      expect(user?.bio).toBe('Test bio')
    })
  })

  describe('Post Management', () => {
    it('should create a post', () => {
      const user = storage.initializeUser()
      const post = storage.createPost({ content: 'Test post' }, user)
      
      expect(post.id).toBeDefined()
      expect(post.content).toBe('Test post')
      expect(post.authorId).toBe(user.id)
      expect(post.likes).toBe(0)
      expect(post.reposts).toBe(0)
      expect(post.replies).toEqual([])
    })

    it('should get all posts', () => {
      const user = storage.initializeUser()
      storage.createPost({ content: 'Post 1' }, user)
      storage.createPost({ content: 'Post 2' }, user)
      
      const posts = storage.getPosts()
      expect(posts).toHaveLength(2)
      expect(posts[0].content).toBe('Post 2')
      expect(posts[1].content).toBe('Post 1')
    })

    it('should get a specific post', () => {
      const user = storage.initializeUser()
      const post = storage.createPost({ content: 'Test' }, user)
      
      const retrieved = storage.getPost(post.id)
      expect(retrieved).not.toBeNull()
      expect(retrieved?.content).toBe('Test')
    })

    it('should delete a post', () => {
      const user = storage.initializeUser()
      const post = storage.createPost({ content: 'Test' }, user)
      
      storage.deletePost(post.id)
      const retrieved = storage.getPost(post.id)
      expect(retrieved).toBeNull()
    })

    it('should create a reply post', () => {
      const user = storage.initializeUser()
      const mainPost = storage.createPost({ content: 'Main' }, user)
      const reply = storage.createPost({ content: 'Reply', replyTo: mainPost.id }, user)
      
      expect(reply.replyTo).toBe(mainPost.id)
      const updatedMain = storage.getPost(mainPost.id)
      expect(updatedMain?.replies).toContain(reply.id)
    })
  })

  describe('Like Functionality', () => {
    it('should like a post', () => {
      const user = storage.initializeUser()
      const post = storage.createPost({ content: 'Test' }, user)
      
      storage.likePost(post.id, user.id)
      const updated = storage.getPost(post.id)
      expect(updated?.likes).toBe(1)
      expect(updated?.likedBy).toContain(user.id)
    })

    it('should not like a post twice', () => {
      const user = storage.initializeUser()
      const post = storage.createPost({ content: 'Test' }, user)
      
      storage.likePost(post.id, user.id)
      storage.likePost(post.id, user.id)
      const updated = storage.getPost(post.id)
      expect(updated?.likes).toBe(1)
    })

    it('should unlike a post', () => {
      const user = storage.initializeUser()
      const post = storage.createPost({ content: 'Test' }, user)
      
      storage.likePost(post.id, user.id)
      storage.unlikePost(post.id, user.id)
      const updated = storage.getPost(post.id)
      expect(updated?.likes).toBe(0)
      expect(updated?.likedBy).not.toContain(user.id)
    })
  })

  describe('Repost Functionality', () => {
    it('should repost a post', () => {
      const user = storage.initializeUser()
      const post = storage.createPost({ content: 'Test' }, user)
      
      storage.repost(post.id, user.id)
      const updated = storage.getPost(post.id)
      expect(updated?.reposts).toBe(1)
      expect(updated?.repostedBy).toContain(user.id)
    })

    it('should not repost a post twice', () => {
      const user = storage.initializeUser()
      const post = storage.createPost({ content: 'Test' }, user)
      
      storage.repost(post.id, user.id)
      storage.repost(post.id, user.id)
      const updated = storage.getPost(post.id)
      expect(updated?.reposts).toBe(1)
    })

    it('should unrepost a post', () => {
      const user = storage.initializeUser()
      const post = storage.createPost({ content: 'Test' }, user)
      
      storage.repost(post.id, user.id)
      storage.unrepost(post.id, user.id)
      const updated = storage.getPost(post.id)
      expect(updated?.reposts).toBe(0)
      expect(updated?.repostedBy).not.toContain(user.id)
    })
  })
})

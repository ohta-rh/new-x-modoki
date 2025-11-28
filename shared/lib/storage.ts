import type { Post, User, CreatePostInput } from '@/shared/types'
import { STORAGE_KEYS } from '@/shared/config/constants'

export const storage = {
  getPosts(): Post[] {
    if (typeof window === 'undefined') return []
    const data = localStorage.getItem(STORAGE_KEYS.POSTS)
    return data ? JSON.parse(data) : []
  },

  getPost(id: string): Post | null {
    const posts = this.getPosts()
    return posts.find((post) => post.id === id) || null
  },

  createPost(input: CreatePostInput, user: User): Post {
    const posts = this.getPosts()
    const newPost: Post = {
      id: crypto.randomUUID(),
      content: input.content,
      authorName: user.displayName,
      authorId: user.id,
      createdAt: new Date().toISOString(),
      likes: 0,
      likedBy: [],
      reposts: 0,
      repostedBy: [],
      replyTo: input.replyTo,
      replies: [],
    }

    if (input.replyTo) {
      const parentPost = posts.find((p) => p.id === input.replyTo)
      if (parentPost) {
        parentPost.replies.push(newPost.id)
      }
    }

    posts.unshift(newPost)
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts))
    return newPost
  },

  deletePost(id: string): void {
    const posts = this.getPosts().filter((post) => post.id !== id)
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts))
  },

  likePost(postId: string, userId: string): void {
    const posts = this.getPosts()
    const post = posts.find((p) => p.id === postId)
    if (post && !post.likedBy.includes(userId)) {
      post.likes += 1
      post.likedBy.push(userId)
      localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts))
    }
  },

  unlikePost(postId: string, userId: string): void {
    const posts = this.getPosts()
    const post = posts.find((p) => p.id === postId)
    if (post && post.likedBy.includes(userId)) {
      post.likes -= 1
      post.likedBy = post.likedBy.filter((id) => id !== userId)
      localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts))
    }
  },

  repost(postId: string, userId: string): void {
    const posts = this.getPosts()
    const post = posts.find((p) => p.id === postId)
    if (post && !post.repostedBy.includes(userId)) {
      post.reposts += 1
      post.repostedBy.push(userId)
      localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts))
    }
  },

  unrepost(postId: string, userId: string): void {
    const posts = this.getPosts()
    const post = posts.find((p) => p.id === postId)
    if (post && post.repostedBy.includes(userId)) {
      post.reposts -= 1
      post.repostedBy = post.repostedBy.filter((id) => id !== userId)
      localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts))
    }
  },

  getUser(): User | null {
    if (typeof window === 'undefined') return null
    const data = localStorage.getItem(STORAGE_KEYS.USER)
    return data ? JSON.parse(data) : null
  },

  setUser(user: User): void {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
  },

  updateUser(updates: Partial<User>): void {
    const user = this.getUser()
    if (user) {
      const updatedUser = { ...user, ...updates }
      this.setUser(updatedUser)
    }
  },

  initializeUser(): User {
    const existingUser = this.getUser()
    if (existingUser) return existingUser

    const newUser: User = {
      id: crypto.randomUUID(),
      name: `user${Math.floor(Math.random() * 10000)}`,
      displayName: 'Anonymous User',
      bio: '',
      createdAt: new Date().toISOString(),
    }
    this.setUser(newUser)
    return newUser
  },
}

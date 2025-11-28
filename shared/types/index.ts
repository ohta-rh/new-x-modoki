export interface Post {
  id: string
  content: string
  authorName: string
  authorId: string
  createdAt: string
  likes: number
  likedBy: string[]
  reposts: number
  repostedBy: string[]
  replyTo?: string
  replies: string[]
}

export interface User {
  id: string
  name: string
  displayName: string
  bio: string
  createdAt: string
}

export interface CreatePostInput {
  content: string
  replyTo?: string
}

export interface UpdateUserInput {
  displayName?: string
  bio?: string
}

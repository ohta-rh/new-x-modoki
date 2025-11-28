import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { PostForm } from '@/features/post-form'

describe('PostForm', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should render form', () => {
    render(<PostForm />)
    expect(screen.getByPlaceholderText('いまどうしてる？')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '投稿' })).toBeInTheDocument()
  })

  it('should render reply placeholder when replyTo is provided', () => {
    render(<PostForm replyTo="123" />)
    expect(screen.getByPlaceholderText('返信を投稿')).toBeInTheDocument()
  })

  it('should update character count', () => {
    render(<PostForm />)
    const textarea = screen.getByPlaceholderText('いまどうしてる？')
    fireEvent.change(textarea, { target: { value: 'Test' } })
    expect(screen.getByText('276')).toBeInTheDocument()
  })

  it('should show warning color when approaching limit', () => {
    render(<PostForm />)
    const textarea = screen.getByPlaceholderText('いまどうしてる？')
    const longText = 'a'.repeat(265)
    fireEvent.change(textarea, { target: { value: longText } })
    const counter = screen.getByText('15')
    expect(counter).toHaveClass('text-yellow-500')
  })

  it('should show error color when exceeding limit', () => {
    render(<PostForm />)
    const textarea = screen.getByPlaceholderText('いまどうしてる？')
    const longText = 'a'.repeat(281)
    fireEvent.change(textarea, { target: { value: longText } })
    const counter = screen.getByText('-1')
    expect(counter).toHaveClass('text-red-500')
  })

  it('should disable submit when empty', () => {
    render(<PostForm />)
    const button = screen.getByRole('button', { name: '投稿' })
    expect(button).toBeDisabled()
  })

  it('should enable submit when valid', () => {
    render(<PostForm />)
    const textarea = screen.getByPlaceholderText('いまどうしてる？')
    fireEvent.change(textarea, { target: { value: 'Valid post' } })
    const button = screen.getByRole('button', { name: '投稿' })
    expect(button).not.toBeDisabled()
  })

  it('should disable submit when exceeding limit', () => {
    render(<PostForm />)
    const textarea = screen.getByPlaceholderText('いまどうしてる？')
    const longText = 'a'.repeat(281)
    fireEvent.change(textarea, { target: { value: longText } })
    const button = screen.getByRole('button', { name: '投稿' })
    expect(button).toBeDisabled()
  })

  it('should call onPostCreated after submission', () => {
    const onPostCreated = vi.fn()
    render(<PostForm onPostCreated={onPostCreated} />)
    
    const textarea = screen.getByPlaceholderText('いまどうしてる？')
    fireEvent.change(textarea, { target: { value: 'Test post' } })
    
    const button = screen.getByRole('button', { name: '投稿' })
    fireEvent.click(button)
    
    expect(onPostCreated).toHaveBeenCalled()
  })

  it('should clear form after submission', () => {
    render(<PostForm />)
    
    const textarea = screen.getByPlaceholderText('いまどうしてる？') as HTMLTextAreaElement
    fireEvent.change(textarea, { target: { value: 'Test post' } })
    
    const button = screen.getByRole('button', { name: '投稿' })
    fireEvent.click(button)
    
    expect(textarea.value).toBe('')
  })
})

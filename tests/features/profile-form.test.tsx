import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ProfileForm } from '@/features/profile-form'
import { storage } from '@/shared/lib/storage'

describe('ProfileForm', () => {
  beforeEach(() => {
    localStorage.clear()
    storage.initializeUser()
  })

  it('should display user information', () => {
    render(<ProfileForm />)
    expect(screen.getByText('プロフィール')).toBeInTheDocument()
    expect(screen.getByDisplayValue(/^@user\d+$/)).toBeInTheDocument()
  })

  it('should show username as disabled', () => {
    render(<ProfileForm />)
    const usernameInput = screen.getByDisplayValue(/^@user\d+$/) as HTMLInputElement
    expect(usernameInput).toBeDisabled()
  })

  it('should enable editing mode', () => {
    render(<ProfileForm />)
    const editButton = screen.getByRole('button', { name: '編集' })
    fireEvent.click(editButton)
    expect(screen.getByRole('button', { name: '保存' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'キャンセル' })).toBeInTheDocument()
  })

  it('should allow editing display name', () => {
    render(<ProfileForm />)
    
    const editButton = screen.getByRole('button', { name: '編集' })
    fireEvent.click(editButton)
    
    const displayNameInput = screen.getByLabelText('表示名') as HTMLInputElement
    expect(displayNameInput).not.toBeDisabled()
    fireEvent.change(displayNameInput, { target: { value: 'New Name' } })
    expect(displayNameInput.value).toBe('New Name')
  })

  it('should save profile changes', async () => {
    render(<ProfileForm />)
    
    const editButton = screen.getByRole('button', { name: '編集' })
    fireEvent.click(editButton)
    
    const displayNameInput = screen.getByLabelText('表示名')
    fireEvent.change(displayNameInput, { target: { value: 'Updated Name' } })
    
    const saveButton = screen.getByRole('button', { name: '保存' })
    fireEvent.click(saveButton)
    
    await waitFor(() => {
      const user = storage.getUser()
      expect(user?.displayName).toBe('Updated Name')
    })
  })

  it('should cancel editing', () => {
    render(<ProfileForm />)
    
    const editButton = screen.getByRole('button', { name: '編集' })
    fireEvent.click(editButton)
    
    const displayNameInput = screen.getByLabelText('表示名')
    fireEvent.change(displayNameInput, { target: { value: 'Changed' } })
    
    const cancelButton = screen.getByRole('button', { name: 'キャンセル' })
    fireEvent.click(cancelButton)
    
    expect(screen.getByRole('button', { name: '編集' })).toBeInTheDocument()
  })

  it('should show character count in edit mode', () => {
    render(<ProfileForm />)
    
    const editButton = screen.getByRole('button', { name: '編集' })
    fireEvent.click(editButton)
    
    expect(screen.getByText(/文字残り/)).toBeInTheDocument()
  })

  it('should display registration date', () => {
    render(<ProfileForm />)
    expect(screen.getByText(/登録日:/)).toBeInTheDocument()
  })
})

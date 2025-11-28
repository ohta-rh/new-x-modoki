import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Header } from '@/features/header'

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/'),
}))

describe('Header', () => {
  it('should render navigation links', () => {
    render(<Header />)
    expect(screen.getByText('ホーム')).toBeInTheDocument()
    expect(screen.getByText('プロフィール')).toBeInTheDocument()
  })

  it('should render logo', () => {
    render(<Header />)
    expect(screen.getByText('𝕏')).toBeInTheDocument()
  })

  it('should have links with correct hrefs', () => {
    render(<Header />)
    const homeLink = screen.getByText('ホーム').closest('a')
    const profileLink = screen.getByText('プロフィール').closest('a')
    
    expect(homeLink).toHaveAttribute('href', '/')
    expect(profileLink).toHaveAttribute('href', '/profile')
  })

  it('should highlight active page', () => {
    const { usePathname } = require('next/navigation')
    usePathname.mockReturnValue('/')
    
    render(<Header />)
    const homeButton = screen.getByText('ホーム').closest('button')
    expect(homeButton).not.toHaveClass('ghost')
  })

  it('should not highlight inactive page', () => {
    const { usePathname } = require('next/navigation')
    usePathname.mockReturnValue('/')
    
    render(<Header />)
    const profileButton = screen.getByText('プロフィール').closest('button')
    expect(profileButton).toHaveClass('ghost')
  })
})

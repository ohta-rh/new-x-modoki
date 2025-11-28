'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-xl">𝕏</span>
          </Link>
        </div>
        <nav className="flex items-center gap-2">
          <Button
            variant={pathname === '/' ? 'default' : 'ghost'}
            size="sm"
            asChild
          >
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              ホーム
            </Link>
          </Button>
          <Button
            variant={pathname === '/profile' ? 'default' : 'ghost'}
            size="sm"
            asChild
          >
            <Link href="/profile">
              <User className="mr-2 h-4 w-4" />
              プロフィール
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}

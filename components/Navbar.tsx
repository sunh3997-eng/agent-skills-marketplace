'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Package, Compass, LayoutDashboard, Upload, Search } from 'lucide-react'

const navLinks = [
  { href: '/explore',    label: 'Explore',    icon: Compass },
  { href: '/dashboard',  label: 'Dashboard',  icon: LayoutDashboard },
  { href: '/publish',    label: 'Publish',    icon: Upload },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 shadow-lg shadow-brand-600/20">
              <Package className="h-4.5 w-4.5 text-white" size={18} />
            </div>
            <div className="leading-none">
              <span className="text-sm font-bold text-white tracking-tight">Skills</span>
              <span className="text-sm font-bold text-brand-400 tracking-tight">Marketplace</span>
            </div>
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
                  pathname === href || pathname.startsWith(href + '/')
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                )}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <Link
              href="/explore"
              className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors md:hidden"
            >
              <Search size={18} />
            </Link>
            {/* Mock auth buttons */}
            <Link href="/publish" className="btn-primary hidden sm:inline-flex">
              <Upload size={14} />
              Publish Skill
            </Link>
            <button className="btn-secondary">
              Sign in
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

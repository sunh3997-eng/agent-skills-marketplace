import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`
  return n.toString()
}

export function formatPrice(price: number): string {
  if (price === 0) return 'Free'
  return `$${price.toFixed(2)}`
}

export function timeAgo(dateStr: string): string {
  const now = Date.now()
  const then = new Date(dateStr).getTime()
  const diff = now - then
  const days = Math.floor(diff / 86400000)
  if (days < 1) return 'today'
  if (days < 7) return `${days}d ago`
  if (days < 30) return `${Math.floor(days / 7)}w ago`
  if (days < 365) return `${Math.floor(days / 30)}mo ago`
  return `${Math.floor(days / 365)}y ago`
}

export function categoryColor(category: string): string {
  const map: Record<string, string> = {
    productivity:  'bg-yellow-500/10 text-yellow-400 ring-yellow-500/20',
    coding:        'bg-blue-500/10 text-blue-400 ring-blue-500/20',
    data:          'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20',
    communication: 'bg-purple-500/10 text-purple-400 ring-purple-500/20',
    research:      'bg-cyan-500/10 text-cyan-400 ring-cyan-500/20',
    creative:      'bg-pink-500/10 text-pink-400 ring-pink-500/20',
    automation:    'bg-orange-500/10 text-orange-400 ring-orange-500/20',
    security:      'bg-red-500/10 text-red-400 ring-red-500/20',
  }
  return map[category] ?? 'bg-slate-500/10 text-slate-400 ring-slate-500/20'
}

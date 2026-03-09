'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Download, Star, TrendingUp, Package, Plus,
  ExternalLink, Settings, BarChart3, Clock, DollarSign,
  Eye, CheckCircle, XCircle, AlertCircle,
} from 'lucide-react'
import { InstallCommand } from '@/components/InstallCommand'
import { MOCK_SKILLS, MOCK_AUTHORS } from '@/lib/mock-data'
import { formatNumber, formatPrice, categoryColor, timeAgo } from '@/lib/utils'
import { cn } from '@/lib/utils'

// Mock: pretend author-1 is logged in
const CURRENT_AUTHOR = MOCK_AUTHORS[0]
const MY_SKILLS = MOCK_SKILLS.filter((s) => s.author.id === CURRENT_AUTHOR.id)

// Add a mock "pending" skill for demo
const ALL_MY_SKILLS = [
  ...MY_SKILLS,
  {
    ...MY_SKILLS[0],
    id: 'skill-draft-1',
    slug: 'browser-controller',
    name: 'Browser Controller',
    shortDescription: 'Control headless browsers for complex automation tasks.',
    status: 'pending' as const,
    downloads: 0,
    stars: 0,
    rating: 0,
    reviewCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    featured: false,
    price: 12.99,
  },
]

const TABS = ['Overview', 'Skills', 'Analytics', 'Earnings'] as const
type Tab = typeof TABS[number]

export default function DashboardPage() {
  const [tab, setTab] = useState<Tab>('Overview')

  const totalDownloads = MY_SKILLS.reduce((s, sk) => s + sk.downloads, 0)
  const totalRevenue = MY_SKILLS.reduce((s, sk) => s + (sk.price * sk.downloads * 0.001), 0) // mock estimate
  const avgRating = MY_SKILLS.reduce((s, sk) => s + sk.rating, 0) / (MY_SKILLS.length || 1)

  // Mock sparkline data
  const sparkData = Array.from({ length: 30 }, (_, i) => ({
    day: i,
    downloads: Math.floor(Math.random() * 150 + 50),
  }))
  const sparkMax = Math.max(...sparkData.map((d) => d.downloads))

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Image
            src={CURRENT_AUTHOR.avatarUrl}
            alt={CURRENT_AUTHOR.displayName}
            width={56}
            height={56}
            className="rounded-xl border border-slate-700"
          />
          <div>
            <h1 className="text-2xl font-bold text-white">{CURRENT_AUTHOR.displayName}</h1>
            <p className="text-slate-400 text-sm">@{CURRENT_AUTHOR.username}</p>
          </div>
        </div>
        <Link href="/publish" className="btn-primary">
          <Plus size={14} />
          New Skill
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-slate-800 mb-8">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              'px-4 py-2.5 text-sm font-medium border-b-2 transition-colors',
              tab === t
                ? 'border-brand-500 text-white'
                : 'border-transparent text-slate-500 hover:text-slate-300'
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ── Overview tab ── */}
      {tab === 'Overview' && (
        <div className="space-y-8">
          {/* Stats cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: 'Total installs',
                value: formatNumber(totalDownloads),
                icon: Download,
                change: '+12.4%',
                positive: true,
              },
              {
                label: 'Skills published',
                value: MY_SKILLS.filter(s => s.status === 'published').length.toString(),
                icon: Package,
                change: `${ALL_MY_SKILLS.length} total`,
                positive: true,
              },
              {
                label: 'Avg rating',
                value: avgRating.toFixed(1),
                icon: Star,
                change: `${MY_SKILLS.reduce((s, sk) => s + sk.reviewCount, 0)} reviews`,
                positive: true,
              },
              {
                label: 'Est. earnings',
                value: `$${totalRevenue.toFixed(0)}`,
                icon: DollarSign,
                change: 'This month',
                positive: true,
              },
            ].map(({ label, value, icon: Icon, change, positive }) => (
              <div key={label} className="card p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</span>
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-600/10">
                    <Icon size={14} className="text-brand-400" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">{value}</div>
                <div className={cn('text-xs', positive ? 'text-emerald-400' : 'text-red-400')}>
                  {change}
                </div>
              </div>
            ))}
          </div>

          {/* Download chart (sparkline mock) */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-semibold text-white">Downloads over time</h3>
                <p className="text-sm text-slate-500">Last 30 days</p>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-emerald-400 font-medium">
                <TrendingUp size={14} />
                +12.4%
              </div>
            </div>
            {/* SVG sparkline */}
            <div className="h-24 flex items-end gap-1">
              {sparkData.map((d, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-brand-600/60 hover:bg-brand-500/80 transition-colors"
                  style={{ height: `${(d.downloads / sparkMax) * 100}%` }}
                  title={`${d.downloads} downloads`}
                />
              ))}
            </div>
            <div className="flex justify-between text-xs text-slate-600 mt-2">
              <span>30 days ago</span>
              <span>Today</span>
            </div>
          </div>

          {/* Recent skills */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-white">Your Skills</h3>
              <button onClick={() => setTab('Skills')} className="btn-ghost text-xs">
                View all
              </button>
            </div>
            <div className="space-y-3">
              {ALL_MY_SKILLS.slice(0, 3).map((skill) => (
                <SkillRow key={skill.id} skill={skill} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Skills tab ── */}
      {tab === 'Skills' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-400">{ALL_MY_SKILLS.length} skills total</p>
            <Link href="/publish" className="btn-primary text-sm">
              <Plus size={13} />
              Publish new skill
            </Link>
          </div>

          <div className="card divide-y divide-slate-800">
            {ALL_MY_SKILLS.map((skill) => (
              <SkillRow key={skill.id} skill={skill} showActions />
            ))}
          </div>
        </div>
      )}

      {/* ── Analytics tab ── */}
      {tab === 'Analytics' && (
        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
              <BarChart3 size={16} className="text-brand-400" />
              Download breakdown by skill
            </h3>
            <div className="space-y-4">
              {MY_SKILLS.sort((a, b) => b.downloads - a.downloads).map((skill) => {
                const pct = (skill.downloads / totalDownloads) * 100
                return (
                  <div key={skill.id}>
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="text-slate-300 font-medium">{skill.name}</span>
                      <span className="text-slate-500">
                        {formatNumber(skill.downloads)} ({pct.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-brand-600 to-brand-400 rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {MY_SKILLS.map((skill) => (
              <div key={skill.id} className="card p-4">
                <h4 className="text-sm font-medium text-white mb-3 truncate">{skill.name}</h4>
                <div className="space-y-2 text-xs">
                  {[
                    { label: 'Downloads', value: formatNumber(skill.downloads) },
                    { label: 'Rating', value: `${skill.rating} ★` },
                    { label: 'Reviews', value: skill.reviewCount },
                    { label: 'Stars', value: formatNumber(skill.stars) },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between">
                      <span className="text-slate-500">{label}</span>
                      <span className="text-slate-200 font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Earnings tab ── */}
      {tab === 'Earnings' && (
        <div className="space-y-6">
          {/* Connect Stripe banner */}
          <div className="card p-5 border-amber-500/20 bg-amber-500/5">
            <div className="flex items-start gap-3">
              <AlertCircle size={18} className="text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-amber-300 mb-1">Connect Stripe to receive payouts</h4>
                <p className="text-xs text-amber-300/70 mb-3">
                  You need a Stripe Connect account to earn from paid skills. Setup takes about 5 minutes.
                </p>
                <button className="btn-primary text-sm">Connect Stripe Account</button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: 'This month', value: `$${totalRevenue.toFixed(2)}`, icon: DollarSign },
              { label: 'All time', value: `$${(totalRevenue * 8.3).toFixed(2)}`, icon: TrendingUp },
              { label: 'Pending payout', value: '$0.00', icon: Clock },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="card p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Icon size={14} className="text-brand-400" />
                  <span className="text-xs text-slate-500">{label}</span>
                </div>
                <div className="text-xl font-bold text-white">{value}</div>
              </div>
            ))}
          </div>

          <div className="card p-6">
            <h3 className="text-base font-semibold text-white mb-4">Revenue by skill</h3>
            <p className="text-sm text-slate-500">
              Free skills don&apos;t generate revenue. Publish a paid skill to start earning.
            </p>
            <div className="mt-4 space-y-3">
              {MY_SKILLS.map((skill) => (
                <div key={skill.id} className="flex items-center justify-between text-sm py-2">
                  <span className="text-slate-300">{skill.name}</span>
                  <span className="text-slate-500">
                    {skill.price === 0
                      ? 'Free'
                      : `$${(skill.price * skill.downloads * 0.001 * 0.8).toFixed(2)} earned`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Shared skill row component
function SkillRow({ skill, showActions = false }: { skill: any; showActions?: boolean }) {
  const statusIcon = {
    published: <CheckCircle size={13} className="text-emerald-400" />,
    pending:   <Clock size={13} className="text-amber-400" />,
    rejected:  <XCircle size={13} className="text-red-400" />,
    draft:     <AlertCircle size={13} className="text-slate-500" />,
  }[skill.status as string] ?? null

  const statusLabel = {
    published: 'Live',
    pending:   'In review',
    rejected:  'Rejected',
    draft:     'Draft',
  }[skill.status as string] ?? skill.status

  return (
    <div className="flex items-center gap-4 p-4 hover:bg-slate-800/30 transition-colors">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <Link
            href={`/skills/${skill.slug}`}
            className="text-sm font-medium text-white hover:text-brand-300 transition-colors truncate"
          >
            {skill.name}
          </Link>
          <span className={cn('badge', categoryColor(skill.category))}>
            {skill.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-slate-500">
            {statusIcon}
            {statusLabel}
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-0.5 truncate">{skill.shortDescription}</p>
      </div>

      <div className="hidden sm:flex items-center gap-6 shrink-0">
        <div className="text-right">
          <div className="text-sm font-medium text-white">{formatNumber(skill.downloads)}</div>
          <div className="text-xs text-slate-600">installs</div>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-white flex items-center gap-1">
            <Star size={12} className="text-yellow-400 fill-yellow-400" />
            {skill.rating > 0 ? skill.rating.toFixed(1) : '—'}
          </div>
          <div className="text-xs text-slate-600">{skill.reviewCount} reviews</div>
        </div>
        <div className="text-right w-16">
          <div className="text-sm font-medium text-white">{formatPrice(skill.price)}</div>
          <div className="text-xs text-slate-600">price</div>
        </div>
      </div>

      {showActions && (
        <div className="flex items-center gap-1 shrink-0">
          <Link href={`/skills/${skill.slug}`} className="p-1.5 rounded-md text-slate-500 hover:text-slate-200 hover:bg-slate-700 transition-colors">
            <Eye size={14} />
          </Link>
          <button className="p-1.5 rounded-md text-slate-500 hover:text-slate-200 hover:bg-slate-700 transition-colors">
            <Settings size={14} />
          </button>
        </div>
      )}
    </div>
  )
}

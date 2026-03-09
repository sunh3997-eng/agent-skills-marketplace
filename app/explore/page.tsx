'use client'

import { useState, useMemo } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { SkillCard } from '@/components/SkillCard'
import { searchSkills, CATEGORIES } from '@/lib/mock-data'
import { cn, categoryColor } from '@/lib/utils'

const SORT_OPTIONS = [
  { value: 'downloads', label: 'Most Downloaded' },
  { value: 'rating',    label: 'Highest Rated' },
  { value: 'newest',    label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
]

const PRICE_FILTERS = [
  { value: 'all',  label: 'All' },
  { value: 'free', label: 'Free' },
  { value: 'paid', label: 'Paid' },
]

export default function ExplorePage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('downloads')
  const [priceFilter, setPriceFilter] = useState('all')

  const results = useMemo(() => {
    let skills = searchSkills(query, category === 'all' ? undefined : category)

    if (priceFilter === 'free') skills = skills.filter((s) => s.price === 0)
    if (priceFilter === 'paid') skills = skills.filter((s) => s.price > 0)

    return [...skills].sort((a, b) => {
      switch (sort) {
        case 'rating':    return b.rating - a.rating
        case 'newest':    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case 'price-asc': return a.price - b.price
        default:          return b.downloads - a.downloads
      }
    })
  }, [query, category, sort, priceFilter])

  const activeFilters = [
    category !== 'all' && { key: 'category', label: CATEGORIES.find(c => c.id === category)?.label ?? category },
    priceFilter !== 'all' && { key: 'price', label: priceFilter === 'free' ? 'Free only' : 'Paid only' },
  ].filter(Boolean) as { key: string; label: string }[]

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Explore Skills</h1>
        <p className="text-slate-400">
          {results.length} skill{results.length !== 1 ? 's' : ''} available
          {query && <> matching &ldquo;<span className="text-white">{query}</span>&rdquo;</>}
        </p>
      </div>

      {/* Search & filters row */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search skills by name, tag, or description..."
            className="input pl-9"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2 shrink-0">
          <SlidersHorizontal size={14} className="text-slate-500" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="input w-auto text-sm"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <aside className="hidden lg:block w-52 shrink-0">
          {/* Category filter */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
              Category
            </h3>
            <ul className="space-y-0.5">
              <li>
                <button
                  onClick={() => setCategory('all')}
                  className={cn(
                    'w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors',
                    category === 'all'
                      ? 'bg-brand-600/20 text-brand-300 font-medium'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  )}
                >
                  All Categories
                </button>
              </li>
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => setCategory(cat.id)}
                    className={cn(
                      'w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors flex items-center justify-between',
                      category === cat.id
                        ? 'bg-brand-600/20 text-brand-300 font-medium'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <span>{cat.icon}</span>
                      {cat.label}
                    </span>
                    <span className="text-xs text-slate-600">{cat.count}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Price filter */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
              Price
            </h3>
            <div className="space-y-1">
              {PRICE_FILTERS.map((p) => (
                <button
                  key={p.value}
                  onClick={() => setPriceFilter(p.value)}
                  className={cn(
                    'w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors',
                    priceFilter === p.value
                      ? 'bg-brand-600/20 text-brand-300 font-medium'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  )}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main grid */}
        <div className="flex-1 min-w-0">
          {/* Mobile category pills */}
          <div className="flex gap-2 overflow-x-auto pb-3 mb-4 lg:hidden scrollbar-none">
            <button
              onClick={() => setCategory('all')}
              className={cn(
                'shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors',
                category === 'all'
                  ? 'bg-brand-600 text-white'
                  : 'bg-slate-800 text-slate-400'
              )}
            >
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={cn(
                  'shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors',
                  category === cat.id
                    ? 'bg-brand-600 text-white'
                    : 'bg-slate-800 text-slate-400'
                )}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>

          {/* Active filter chips */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {activeFilters.map((f) => (
                <span
                  key={f.key}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-600/10 border border-brand-500/20 text-xs text-brand-300"
                >
                  {f.label}
                  <button
                    onClick={() => {
                      if (f.key === 'category') setCategory('all')
                      if (f.key === 'price') setPriceFilter('all')
                    }}
                    className="text-brand-400/60 hover:text-brand-300"
                  >
                    <X size={10} />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Results */}
          {results.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-white mb-2">No skills found</h3>
              <p className="text-slate-400 text-sm">
                Try adjusting your search or clearing filters.
              </p>
              <button
                onClick={() => { setQuery(''); setCategory('all'); setPriceFilter('all') }}
                className="btn-secondary mt-4"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {results.map((skill) => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

import Link from 'next/link'
import Image from 'next/image'
import { Star, Download, ArrowRight } from 'lucide-react'
import type { Skill } from '@/lib/types'
import { formatNumber, formatPrice, categoryColor } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface SkillCardProps {
  skill: Skill
  compact?: boolean
}

export function SkillCard({ skill, compact = false }: SkillCardProps) {
  return (
    <Link
      href={`/skills/${skill.slug}`}
      className={cn(
        'card-hover group flex flex-col p-5 gap-4',
        compact ? 'p-4' : 'p-5'
      )}
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        {/* Author avatar */}
        <div className="shrink-0">
          <Image
            src={skill.author.avatarUrl}
            alt={skill.author.displayName}
            width={40}
            height={40}
            className="rounded-lg border border-slate-700"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-semibold text-white group-hover:text-brand-300 transition-colors truncate">
              {skill.name}
            </h3>
            {skill.featured && (
              <span className="badge bg-brand-500/10 text-brand-300 ring-brand-500/20 text-[10px]">
                Featured
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            by{' '}
            <span className="text-slate-400 hover:text-slate-300">
              {skill.author.displayName}
            </span>
            {' · '}v{skill.version}
          </p>
        </div>

        {/* Price */}
        <div className="shrink-0">
          <span
            className={cn(
              'text-xs font-semibold',
              skill.price === 0 ? 'text-emerald-400' : 'text-white'
            )}
          >
            {formatPrice(skill.price)}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 flex-1">
        {skill.shortDescription}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        <span className={cn('badge text-[10px]', categoryColor(skill.category))}>
          {skill.category}
        </span>
        {skill.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="badge bg-slate-800 text-slate-400 ring-slate-700 text-[10px]"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Stats footer */}
      <div className="flex items-center justify-between pt-1 border-t border-slate-800">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-xs text-slate-500">
            <Download size={11} />
            {formatNumber(skill.downloads)}
          </span>
          <span className="flex items-center gap-1 text-xs text-slate-500">
            <Star size={11} className="text-yellow-400 fill-yellow-400" />
            {skill.rating.toFixed(1)}
            <span className="text-slate-600">({skill.reviewCount})</span>
          </span>
        </div>
        <ArrowRight
          size={14}
          className="text-slate-600 group-hover:text-brand-400 group-hover:translate-x-0.5 transition-all"
        />
      </div>
    </Link>
  )
}

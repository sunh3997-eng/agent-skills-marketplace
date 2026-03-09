import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  Download, Star, ExternalLink, Github, Globe,
  Package, Clock, Tag, ChevronRight, ArrowLeft,
  ShoppingCart, Check,
} from 'lucide-react'
import { InstallCommand } from '@/components/InstallCommand'
import { StarRating } from '@/components/StarRating'
import { getSkillById, getReviewsForSkill, MOCK_SKILLS } from '@/lib/mock-data'
import { formatNumber, formatPrice, categoryColor, timeAgo } from '@/lib/utils'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'

interface Props {
  params: { id: string }
}

export async function generateStaticParams() {
  return MOCK_SKILLS.map((s) => ({ id: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const skill = getSkillById(params.id)
  if (!skill) return { title: 'Skill not found' }
  return {
    title: skill.name,
    description: skill.shortDescription,
  }
}

export default function SkillDetailPage({ params }: Props) {
  const skill = getSkillById(params.id)
  if (!skill) notFound()

  const reviews = getReviewsForSkill(skill.id)
  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
    pct: reviews.length ? (reviews.filter((r) => r.rating === star).length / reviews.length) * 100 : 0,
  }))

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6">
        <Link href="/" className="hover:text-slate-300 transition-colors">Home</Link>
        <ChevronRight size={12} />
        <Link href="/explore" className="hover:text-slate-300 transition-colors">Explore</Link>
        <ChevronRight size={12} />
        <span className="text-slate-300">{skill.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Hero header */}
          <div>
            <div className="flex items-start gap-4">
              <Image
                src={skill.author.avatarUrl}
                alt={skill.author.displayName}
                width={56}
                height={56}
                className="rounded-xl border border-slate-700 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl font-bold text-white">{skill.name}</h1>
                  {skill.featured && (
                    <span className="badge bg-brand-500/10 text-brand-300 ring-brand-500/20">
                      Featured
                    </span>
                  )}
                  <span className={cn('badge', categoryColor(skill.category))}>
                    {skill.category}
                  </span>
                </div>
                <p className="text-slate-400 mt-1.5">{skill.shortDescription}</p>

                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-slate-400">
                  <Link
                    href={`#author`}
                    className="flex items-center gap-1.5 hover:text-slate-200 transition-colors"
                  >
                    <Image
                      src={skill.author.avatarUrl}
                      alt={skill.author.displayName}
                      width={18}
                      height={18}
                      className="rounded-full"
                    />
                    {skill.author.displayName}
                  </Link>
                  <span className="flex items-center gap-1">
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                    {skill.rating.toFixed(1)}
                    <span className="text-slate-600">({skill.reviewCount} reviews)</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Download size={14} />
                    {formatNumber(skill.downloads)} installs
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    Updated {timeAgo(skill.updatedAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs / Long description */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-white mb-4">About this skill</h2>
            <div className="prose-dark" dangerouslySetInnerHTML={{ __html: markdownToHtml(skill.longDescription) }} />
          </div>

          {/* Manifest / technical details */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Package size={18} className="text-brand-400" />
              Package manifest
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
              {[
                { label: 'Name', value: skill.manifest.name },
                { label: 'Version', value: skill.manifest.version },
                { label: 'Runtime', value: skill.manifest.runtime },
                { label: 'Entrypoint', value: skill.manifest.entrypoint },
                { label: 'Permissions', value: skill.manifest.permissions.join(', ') || 'none' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <dt className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">{label}</dt>
                  <dd className="text-sm font-mono text-slate-200">{value}</dd>
                </div>
              ))}
            </div>

            {skill.manifest.dependencies.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-2">Dependencies</h3>
                <div className="flex flex-wrap gap-2">
                  {skill.manifest.dependencies.map((dep) => (
                    <span
                      key={dep.name}
                      className="font-mono text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded border border-slate-700"
                    >
                      {dep.name}@{dep.version}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Reviews */}
          <div className="card p-6" id="reviews">
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <Star size={18} className="text-yellow-400" />
              Reviews
              <span className="text-slate-500 font-normal text-sm">({skill.reviewCount})</span>
            </h2>

            {reviews.length > 0 ? (
              <div>
                {/* Rating summary */}
                <div className="flex items-start gap-8 mb-8">
                  <div className="text-center shrink-0">
                    <div className="text-5xl font-bold text-white mb-1">{skill.rating.toFixed(1)}</div>
                    <StarRating rating={skill.rating} size={16} />
                    <div className="text-xs text-slate-500 mt-1">{skill.reviewCount} reviews</div>
                  </div>
                  <div className="flex-1 space-y-2">
                    {ratingDistribution.map(({ star, count, pct }) => (
                      <div key={star} className="flex items-center gap-3">
                        <span className="text-xs text-slate-500 w-4 shrink-0">{star}</span>
                        <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-400 rounded-full"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-600 w-4 shrink-0">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Review list */}
                <div className="space-y-6 divide-y divide-slate-800">
                  {reviews.map((review) => (
                    <div key={review.id} className="pt-6 first:pt-0">
                      <div className="flex items-start gap-3">
                        <Image
                          src={review.author.avatarUrl}
                          alt={review.author.displayName}
                          width={36}
                          height={36}
                          className="rounded-full border border-slate-700 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm font-medium text-white">
                              {review.author.displayName}
                            </span>
                            <span className="text-xs text-slate-600">
                              {timeAgo(review.createdAt)}
                            </span>
                          </div>
                          <StarRating rating={review.rating} size={12} />
                          <h4 className="text-sm font-semibold text-white mt-2 mb-1">
                            {review.title}
                          </h4>
                          <p className="text-sm text-slate-400 leading-relaxed">{review.body}</p>
                          <button className="mt-2 text-xs text-slate-600 hover:text-slate-400 transition-colors">
                            👍 Helpful ({review.helpful})
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500">
                <Star size={32} className="mx-auto mb-2 opacity-30" />
                <p className="text-sm">No reviews yet. Be the first!</p>
              </div>
            )}
          </div>

          {/* Author card */}
          <div className="card p-6" id="author">
            <h2 className="text-lg font-semibold text-white mb-4">About the author</h2>
            <div className="flex items-start gap-4">
              <Image
                src={skill.author.avatarUrl}
                alt={skill.author.displayName}
                width={48}
                height={48}
                className="rounded-xl border border-slate-700 shrink-0"
              />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-semibold text-white">{skill.author.displayName}</span>
                  <span className="text-xs text-slate-500">@{skill.author.username}</span>
                </div>
                <p className="text-sm text-slate-400 mb-3">{skill.author.bio}</p>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span>{formatNumber(skill.author.totalDownloads)} total installs</span>
                  <span>{skill.author.publishedSkills} skills published</span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  {skill.author.github && (
                    <Link
                      href={`https://github.com/${skill.author.github}`}
                      className="btn-secondary text-xs py-1.5 px-3"
                      target="_blank"
                    >
                      <Github size={12} />
                      GitHub
                    </Link>
                  )}
                  {skill.author.website && (
                    <Link
                      href={skill.author.website}
                      className="btn-ghost text-xs py-1.5 px-3"
                      target="_blank"
                    >
                      <Globe size={12} />
                      Website
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Install / purchase card */}
          <div className="card p-5 sticky top-24">
            {/* Price */}
            <div className="mb-4">
              <div className="text-3xl font-bold text-white mb-0.5">
                {skill.price === 0 ? (
                  <span className="text-emerald-400">Free</span>
                ) : (
                  formatPrice(skill.price)
                )}
              </div>
              {skill.price > 0 && (
                <p className="text-xs text-slate-500">One-time purchase, unlimited installs</p>
              )}
            </div>

            {/* CTA */}
            {skill.price === 0 ? (
              <div className="space-y-3">
                <InstallCommand command={skill.manifest.installCommand} size="sm" label="Install via CLI" />
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Check size={12} className="text-emerald-400" />
                  Free forever
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <button className="btn-primary w-full justify-center text-base py-3">
                  <ShoppingCart size={16} />
                  Buy for {formatPrice(skill.price)}
                </button>
                <p className="text-xs text-slate-500 text-center">
                  After purchase you&apos;ll receive your install command
                </p>
              </div>
            )}

            <div className="mt-5 pt-5 border-t border-slate-800 space-y-3">
              {[
                { icon: Download, label: 'Installs', value: formatNumber(skill.downloads) },
                { icon: Star, label: 'Rating', value: `${skill.rating.toFixed(1)} / 5` },
                { icon: Tag, label: 'Version', value: `v${skill.version}` },
                { icon: Clock, label: 'Updated', value: timeAgo(skill.updatedAt) },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-slate-500">
                    <Icon size={14} />
                    {label}
                  </span>
                  <span className="text-slate-200 font-medium">{value}</span>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="mt-5 pt-5 border-t border-slate-800">
              <p className="text-xs font-medium text-slate-500 mb-2">Tags</p>
              <div className="flex flex-wrap gap-1.5">
                {skill.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/explore?q=${tag}`}
                    className="badge bg-slate-800 text-slate-400 ring-slate-700 text-[10px] hover:ring-slate-600 hover:text-slate-300 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Report link */}
          <div className="text-center">
            <button className="text-xs text-slate-600 hover:text-slate-400 transition-colors">
              Report this skill
            </button>
          </div>
        </div>
      </div>

      {/* Back link */}
      <div className="mt-12">
        <Link href="/explore" className="btn-ghost text-sm">
          <ArrowLeft size={14} />
          Back to Explore
        </Link>
      </div>
    </div>
  )
}

// Minimal markdown → HTML (avoids adding a full markdown library for the scaffold)
function markdownToHtml(md: string): string {
  if (!md) return ''
  return md
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/```([\w]*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul>${m}</ul>`)
    .replace(/\n\n/g, '<br/><br/>')
}

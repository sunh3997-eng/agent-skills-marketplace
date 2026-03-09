import Link from 'next/link'
import { ArrowRight, Zap, Shield, Globe, Download, Star, Package } from 'lucide-react'
import { SkillCard } from '@/components/SkillCard'
import { InstallCommand } from '@/components/InstallCommand'
import { getFeaturedSkills, MOCK_SKILLS, CATEGORIES } from '@/lib/mock-data'
import { formatNumber, categoryColor } from '@/lib/utils'
import { cn } from '@/lib/utils'

export default function HomePage() {
  const featuredSkills = getFeaturedSkills()
  const totalDownloads = MOCK_SKILLS.reduce((sum, s) => sum + s.downloads, 0)
  const totalSkills = MOCK_SKILLS.length

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-800">
        {/* Background */}
        <div className="absolute inset-0 bg-grid-pattern" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-950/20 via-slate-950/60 to-slate-950" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-600/10 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-36 text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-400 animate-pulse" />
            <span className="text-xs font-medium text-brand-300">
              Agent 技能交易所 — Now in public beta
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
            The marketplace for{' '}
            <span className="bg-gradient-to-r from-brand-400 to-purple-400 bg-clip-text text-transparent">
              AI Agent Skills
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Discover, install, and publish modular skill packages for AI agents.
            One command to supercharge any agent with new capabilities.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/explore" className="btn-primary text-base px-6 py-3">
              Browse Skills
              <ArrowRight size={16} />
            </Link>
            <Link href="/publish" className="btn-secondary text-base px-6 py-3">
              <Package size={16} />
              Publish a Skill
            </Link>
          </div>

          {/* Install command demo */}
          <div className="max-w-md mx-auto">
            <InstallCommand command="openclaw install github-assistant" size="lg" />
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mt-12 pt-12 border-t border-slate-800/60">
            {[
              { label: 'Skills published', value: formatNumber(totalSkills) + '+' },
              { label: 'Total installs', value: formatNumber(totalDownloads) },
              { label: 'Avg rating', value: '4.7 ★' },
            ].map(({ label, value }) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-bold text-white">{value}</div>
                <div className="text-xs text-slate-500 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features strip */}
      <section className="border-b border-slate-800 bg-slate-900/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: 'One-click install',
                desc: 'Single CLI command installs any skill with all dependencies resolved automatically.',
              },
              {
                icon: Shield,
                title: 'Reviewed & safe',
                desc: 'Every submission goes through a security review before being published.',
              },
              {
                icon: Globe,
                title: 'Open ecosystem',
                desc: 'Free skills, paid skills, and everything in between. Publish and earn.',
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-600/10 border border-brand-600/20">
                  <Icon size={16} className="text-brand-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1">{title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="section-title">Browse by category</h2>
          <Link href="/explore" className="btn-ghost text-sm">
            All categories <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/explore?category=${cat.id}`}
              className="card-hover flex flex-col items-center gap-2 p-4 text-center"
            >
              <span className="text-2xl">{cat.icon}</span>
              <span className="text-xs font-medium text-slate-300">{cat.label}</span>
              <span className="text-xs text-slate-600">{cat.count}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured skills */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="section-title">Featured skills</h2>
            <p className="text-sm text-slate-500 mt-1">Hand-picked by the team</p>
          </div>
          <Link href="/explore?sort=featured" className="btn-ghost text-sm">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredSkills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      </section>

      {/* Most popular */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="section-title">Most popular</h2>
            <p className="text-sm text-slate-500 mt-1">Ranked by all-time downloads</p>
          </div>
          <Link href="/explore?sort=downloads" className="btn-ghost text-sm">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...MOCK_SKILLS]
            .sort((a, b) => b.downloads - a.downloads)
            .slice(0, 4)
            .map((skill) => (
              <SkillCard key={skill.id} skill={skill} compact />
            ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="relative overflow-hidden rounded-2xl border border-brand-500/20 bg-gradient-to-r from-brand-950 to-slate-900 p-8 md:p-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="relative max-w-xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Share your skills with the world
            </h2>
            <p className="text-slate-400 mb-6">
              Publish your agent skill packages and earn revenue every time someone installs them.
              Free to publish — we only take a cut when you sell.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/publish" className="btn-primary">
                Start publishing
                <ArrowRight size={14} />
              </Link>
              <Link href="#" className="btn-secondary">
                Read the docs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

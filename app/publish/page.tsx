'use client'

import { useState } from 'react'
import {
  Upload, Plus, Minus, Check, AlertCircle,
  Package, Code2, Tag, DollarSign, FileText, Info,
} from 'lucide-react'
import { CATEGORIES } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const RUNTIME_OPTIONS = ['node18', 'node20', 'python311', 'python312', 'deno1']
const PERMISSION_OPTIONS = ['network', 'filesystem:read', 'filesystem:write', 'env', 'subprocess']

const STEPS = [
  { id: 'manifest', label: 'Manifest', icon: Package },
  { id: 'details',  label: 'Details',  icon: FileText },
  { id: 'pricing',  label: 'Pricing',  icon: DollarSign },
  { id: 'review',   label: 'Review',   icon: Check },
]

type Step = 'manifest' | 'details' | 'pricing' | 'review'

interface Dep { name: string; version: string }

export default function PublishPage() {
  const [step, setStep] = useState<Step>('manifest')
  const [submitted, setSubmitted] = useState(false)

  // Manifest fields
  const [name, setName] = useState('')
  const [version, setVersion] = useState('1.0.0')
  const [runtime, setRuntime] = useState('node18')
  const [entrypoint, setEntrypoint] = useState('dist/index.js')
  const [permissions, setPermissions] = useState<string[]>([])
  const [deps, setDeps] = useState<Dep[]>([{ name: '', version: '' }])

  // Details fields
  const [displayName, setDisplayName] = useState('')
  const [shortDesc, setShortDesc] = useState('')
  const [longDesc, setLongDesc] = useState('')
  const [category, setCategory] = useState('')
  const [tags, setTags] = useState('')

  // Pricing
  const [priceType, setPriceType] = useState<'free' | 'paid'>('free')
  const [price, setPrice] = useState('')

  const stepIdx = STEPS.findIndex((s) => s.id === step)

  function togglePermission(p: string) {
    setPermissions((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    )
  }

  function addDep() { setDeps((d) => [...d, { name: '', version: '' }]) }
  function removeDep(i: number) { setDeps((d) => d.filter((_, idx) => idx !== i)) }
  function updateDep(i: number, field: keyof Dep, val: string) {
    setDeps((d) => d.map((dep, idx) => idx === i ? { ...dep, [field]: val } : dep))
  }

  function handleSubmit() {
    // Mock submission — in real app would call API
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 mx-auto mb-6">
          <Check size={28} className="text-emerald-400" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-3">Skill submitted for review!</h1>
        <p className="text-slate-400 mb-2">
          Your skill <strong className="text-white">{displayName || name}</strong> has been submitted.
        </p>
        <p className="text-slate-500 text-sm mb-8">
          Our team will review it within 2–3 business days. You&apos;ll receive an email when it&apos;s approved.
        </p>
        <div className="card p-5 text-left mb-8">
          <p className="text-xs font-medium text-slate-500 mb-2">Your install command will be</p>
          <code className="font-mono text-sm text-brand-300">
            openclaw install {name || 'your-skill'}
          </code>
        </div>
        <div className="flex gap-3 justify-center">
          <a href="/dashboard" className="btn-primary">Go to Dashboard</a>
          <button onClick={() => { setSubmitted(false); setStep('manifest') }} className="btn-secondary">
            Submit another
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Publish a Skill</h1>
        <p className="text-slate-400">
          Submit your skill package to the marketplace. Fill in the manifest, add details, set pricing, then submit for review.
        </p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-0 mb-10">
        {STEPS.map((s, i) => {
          const Icon = s.icon
          const past = i < stepIdx
          const current = i === stepIdx
          return (
            <div key={s.id} className="flex items-center flex-1 last:flex-none">
              <button
                onClick={() => past && setStep(s.id as Step)}
                className={cn(
                  'flex items-center gap-2 shrink-0 transition-all',
                  past && 'cursor-pointer'
                )}
              >
                <div
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all',
                    current && 'border-brand-500 bg-brand-600 text-white',
                    past && 'border-emerald-500 bg-emerald-500/10 text-emerald-400',
                    !current && !past && 'border-slate-700 text-slate-600'
                  )}
                >
                  {past ? <Check size={14} /> : <Icon size={14} />}
                </div>
                <span
                  className={cn(
                    'text-sm font-medium hidden sm:block',
                    current ? 'text-white' : past ? 'text-emerald-400' : 'text-slate-600'
                  )}
                >
                  {s.label}
                </span>
              </button>
              {i < STEPS.length - 1 && (
                <div
                  className={cn(
                    'flex-1 h-px mx-3 transition-colors',
                    i < stepIdx ? 'bg-emerald-500/40' : 'bg-slate-800'
                  )}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Step content */}
      <div className="card p-6">
        {/* ── Step 1: Manifest ── */}
        {step === 'manifest' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <Package size={18} className="text-brand-400" />
              <h2 className="text-lg font-semibold text-white">Package Manifest</h2>
            </div>
            <p className="text-sm text-slate-400 -mt-4">
              The manifest defines how your skill is identified and installed.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label">
                  Package name <span className="text-red-400">*</span>
                </label>
                <input
                  className="input font-mono"
                  placeholder="my-cool-skill"
                  value={name}
                  onChange={(e) => setName(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                />
                <p className="text-xs text-slate-600 mt-1">
                  Lowercase, hyphens only. This becomes <code className="text-brand-300">openclaw install {name || '&lt;name&gt;'}</code>
                </p>
              </div>
              <div>
                <label className="label">Version <span className="text-red-400">*</span></label>
                <input
                  className="input font-mono"
                  placeholder="1.0.0"
                  value={version}
                  onChange={(e) => setVersion(e.target.value)}
                />
              </div>
              <div>
                <label className="label">Runtime <span className="text-red-400">*</span></label>
                <select className="input" value={runtime} onChange={(e) => setRuntime(e.target.value)}>
                  {RUNTIME_OPTIONS.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">Entrypoint</label>
                <input
                  className="input font-mono"
                  placeholder="dist/index.js"
                  value={entrypoint}
                  onChange={(e) => setEntrypoint(e.target.value)}
                />
              </div>
            </div>

            {/* Permissions */}
            <div>
              <label className="label">Required permissions</label>
              <div className="flex flex-wrap gap-2">
                {PERMISSION_OPTIONS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => togglePermission(p)}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-xs font-medium border transition-all',
                      permissions.includes(p)
                        ? 'bg-brand-600/20 border-brand-500/40 text-brand-300'
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
                    )}
                  >
                    {permissions.includes(p) && <Check size={10} className="inline mr-1" />}
                    {p}
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-600 mt-2 flex items-center gap-1">
                <Info size={11} />
                Declare only the permissions your skill actually needs. Fewer permissions = faster approval.
              </p>
            </div>

            {/* Dependencies */}
            <div>
              <label className="label">npm / pip dependencies</label>
              <div className="space-y-2">
                {deps.map((dep, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      className="input font-mono flex-1"
                      placeholder="package-name"
                      value={dep.name}
                      onChange={(e) => updateDep(i, 'name', e.target.value)}
                    />
                    <input
                      className="input font-mono w-32"
                      placeholder="^1.0.0"
                      value={dep.version}
                      onChange={(e) => updateDep(i, 'version', e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => removeDep(i)}
                      disabled={deps.length === 1}
                      className="p-2 rounded-lg border border-slate-700 text-slate-500 hover:text-red-400 hover:border-red-500/30 transition-colors disabled:opacity-30"
                    >
                      <Minus size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <button type="button" onClick={addDep} className="btn-ghost text-xs mt-2">
                <Plus size={12} />
                Add dependency
              </button>
            </div>

            {/* Install command preview */}
            {name && (
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <p className="text-xs text-slate-500 mb-2 font-medium">Install command preview</p>
                <code className="text-sm font-mono text-brand-300">
                  $ openclaw install {name}
                </code>
              </div>
            )}
          </div>
        )}

        {/* ── Step 2: Details ── */}
        {step === 'details' && (
          <div className="space-y-5">
            <div className="flex items-center gap-2 mb-2">
              <FileText size={18} className="text-brand-400" />
              <h2 className="text-lg font-semibold text-white">Skill Details</h2>
            </div>

            <div>
              <label className="label">Display name <span className="text-red-400">*</span></label>
              <input
                className="input"
                placeholder="My Cool Skill"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>

            <div>
              <label className="label">Short description <span className="text-red-400">*</span></label>
              <input
                className="input"
                placeholder="One sentence that captures what your skill does"
                value={shortDesc}
                onChange={(e) => setShortDesc(e.target.value)}
                maxLength={140}
              />
              <p className="text-xs text-slate-600 mt-1">{shortDesc.length}/140 characters</p>
            </div>

            <div>
              <label className="label">Long description (Markdown supported)</label>
              <textarea
                className="input min-h-[200px] resize-y font-mono text-sm"
                placeholder={`## Overview\nDescribe what your skill does in detail.\n\n## Features\n- Feature one\n- Feature two\n\n## Usage\n\`\`\`typescript\nawait skills.mySkill.run({ ... })\n\`\`\``}
                value={longDesc}
                onChange={(e) => setLongDesc(e.target.value)}
              />
            </div>

            <div>
              <label className="label">Category <span className="text-red-400">*</span></label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={cn(
                      'flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm transition-all text-left',
                      category === cat.id
                        ? 'bg-brand-600/20 border-brand-500/40 text-brand-300'
                        : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-600'
                    )}
                  >
                    <span>{cat.icon}</span>
                    <span className="text-xs font-medium">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="label flex items-center gap-1.5">
                <Tag size={13} />
                Tags
              </label>
              <input
                className="input"
                placeholder="web, scraping, automation (comma separated)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
              <p className="text-xs text-slate-600 mt-1">Up to 8 tags. Helps users discover your skill.</p>
            </div>
          </div>
        )}

        {/* ── Step 3: Pricing ── */}
        {step === 'pricing' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign size={18} className="text-brand-400" />
              <h2 className="text-lg font-semibold text-white">Pricing</h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  type: 'free' as const,
                  label: 'Free',
                  desc: 'Anyone can install at no cost. Great for open source skills.',
                  icon: '🎁',
                },
                {
                  type: 'paid' as const,
                  label: 'Paid',
                  desc: 'Set a one-time price. Earn 80% of every sale via Stripe.',
                  icon: '💰',
                },
              ].map(({ type, label, desc, icon }) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setPriceType(type)}
                  className={cn(
                    'text-left p-5 rounded-xl border-2 transition-all',
                    priceType === type
                      ? 'border-brand-500 bg-brand-600/10'
                      : 'border-slate-700 bg-slate-800/30 hover:border-slate-600'
                  )}
                >
                  <div className="text-2xl mb-2">{icon}</div>
                  <div className="font-semibold text-white mb-1">{label}</div>
                  <div className="text-xs text-slate-400 leading-relaxed">{desc}</div>
                  {priceType === type && (
                    <div className="mt-2">
                      <Check size={14} className="text-brand-400" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            {priceType === 'paid' && (
              <div className="card p-5 space-y-4">
                <div>
                  <label className="label">Price (USD)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                    <input
                      type="number"
                      min="0.99"
                      max="999"
                      step="0.01"
                      className="input pl-7"
                      placeholder="9.99"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                </div>
                {price && parseFloat(price) > 0 && (
                  <div className="bg-slate-800/50 rounded-lg p-3 text-sm">
                    <div className="flex justify-between text-slate-400 mb-1">
                      <span>Gross revenue</span>
                      <span>${parseFloat(price).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-400 mb-1">
                      <span>Platform fee (20%)</span>
                      <span>-${(parseFloat(price) * 0.2).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-white font-semibold pt-2 border-t border-slate-700">
                      <span>Your payout</span>
                      <span className="text-emerald-400">${(parseFloat(price) * 0.8).toFixed(2)}</span>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-2 text-xs text-slate-500">
                  <AlertCircle size={13} className="shrink-0 mt-0.5" />
                  <span>
                    Payouts processed via Stripe Connect. You&apos;ll need to connect a Stripe account before
                    your paid skill can go live.
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Step 4: Review ── */}
        {step === 'review' && (
          <div className="space-y-5">
            <div className="flex items-center gap-2 mb-2">
              <Check size={18} className="text-brand-400" />
              <h2 className="text-lg font-semibold text-white">Review & Submit</h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: 'Manifest',
                  items: [
                    ['Package name', name || '—'],
                    ['Version', version],
                    ['Runtime', runtime],
                    ['Entrypoint', entrypoint],
                    ['Permissions', permissions.join(', ') || 'none'],
                    ['Dependencies', deps.filter(d => d.name).map(d => `${d.name}@${d.version}`).join(', ') || 'none'],
                  ],
                },
                {
                  title: 'Details',
                  items: [
                    ['Display name', displayName || '—'],
                    ['Short description', shortDesc || '—'],
                    ['Category', category || '—'],
                    ['Tags', tags || '—'],
                  ],
                },
                {
                  title: 'Pricing',
                  items: [
                    ['Type', priceType],
                    ['Price', priceType === 'free' ? 'Free' : price ? `$${price}` : '—'],
                  ],
                },
              ].map(({ title, items }) => (
                <div key={title} className="card p-4">
                  <h3 className="text-sm font-semibold text-white mb-3">{title}</h3>
                  <dl className="space-y-2">
                    {items.map(([label, value]) => (
                      <div key={label} className="flex justify-between text-sm gap-4">
                        <dt className="text-slate-500 shrink-0">{label}</dt>
                        <dd className="text-slate-200 font-mono text-right truncate">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>

            <div className="card p-4 border-amber-500/20 bg-amber-500/5">
              <div className="flex items-start gap-2">
                <AlertCircle size={16} className="text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-300/80">
                  By submitting, you agree to our{' '}
                  <a href="#" className="underline">publishing guidelines</a> and confirm you have the
                  right to distribute this skill. Review typically takes 2–3 business days.
                </p>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!name || !displayName || !shortDesc || !category}
              className="btn-primary w-full justify-center py-3 text-base"
            >
              <Upload size={16} />
              Submit for Review
            </button>

            {(!name || !displayName || !shortDesc || !category) && (
              <p className="text-xs text-red-400 text-center">
                Please complete all required fields before submitting.
              </p>
            )}
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-800">
          <button
            type="button"
            onClick={() => {
              const prev = STEPS[stepIdx - 1]
              if (prev) setStep(prev.id as Step)
            }}
            disabled={stepIdx === 0}
            className="btn-secondary disabled:opacity-30"
          >
            Back
          </button>

          {stepIdx < STEPS.length - 1 && (
            <button
              type="button"
              onClick={() => {
                const next = STEPS[stepIdx + 1]
                if (next) setStep(next.id as Step)
              }}
              className="btn-primary"
            >
              Continue
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

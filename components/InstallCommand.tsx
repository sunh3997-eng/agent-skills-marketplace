'use client'

import { useState } from 'react'
import { Copy, Check, Terminal } from 'lucide-react'
import { cn } from '@/lib/utils'

interface InstallCommandProps {
  command: string
  label?: string
  size?: 'sm' | 'md' | 'lg'
}

export function InstallCommand({ command, label, size = 'md' }: InstallCommandProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="group">
      {label && (
        <p className="text-xs font-medium text-slate-500 mb-2 flex items-center gap-1.5">
          <Terminal size={12} />
          {label}
        </p>
      )}
      <div
        className={cn(
          'flex items-center justify-between gap-3 rounded-lg border border-slate-700 bg-slate-800/80 font-mono transition-colors group-hover:border-slate-600',
          size === 'sm' && 'px-3 py-2',
          size === 'md' && 'px-4 py-3',
          size === 'lg' && 'px-5 py-4'
        )}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <span
            className={cn(
              'shrink-0 text-brand-400',
              size === 'sm' && 'text-xs',
              size === 'md' && 'text-sm',
              size === 'lg' && 'text-base'
            )}
          >
            $
          </span>
          <code
            className={cn(
              'text-slate-200 truncate',
              size === 'sm' && 'text-xs',
              size === 'md' && 'text-sm',
              size === 'lg' && 'text-base'
            )}
          >
            {command}
          </code>
        </div>

        <button
          onClick={handleCopy}
          className="shrink-0 flex items-center gap-1.5 text-slate-500 hover:text-slate-200 transition-colors"
          title="Copy to clipboard"
        >
          {copied ? (
            <>
              <Check size={14} className="text-emerald-400" />
              <span className="text-xs text-emerald-400 font-sans font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span className="text-xs font-sans sr-only sm:not-sr-only">Copy</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}

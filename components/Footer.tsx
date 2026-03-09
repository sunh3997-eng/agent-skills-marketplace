import Link from 'next/link'
import { Package } from 'lucide-react'

const links = {
  Platform: [
    { label: 'Explore Skills', href: '/explore' },
    { label: 'Publish a Skill', href: '/publish' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Pricing', href: '#' },
  ],
  Resources: [
    { label: 'Documentation', href: '#' },
    { label: 'CLI Reference', href: '#' },
    { label: 'Manifest Schema', href: '#' },
    { label: 'API Reference', href: '#' },
  ],
  Company: [
    { label: 'About', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Changelog', href: '#' },
    { label: 'Status', href: '#' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-600">
                <Package size={14} className="text-white" />
              </div>
              <span className="text-sm font-bold text-white">Skills Marketplace</span>
            </Link>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Agent 技能交易所<br />
              Discover, distribute & trade AI agent skill packages.
            </p>
            <div className="flex items-center gap-2">
              <code className="text-xs font-mono bg-slate-800 text-brand-300 px-2 py-1 rounded border border-slate-700">
                openclaw install &lt;skill&gt;
              </code>
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                {section}
              </h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-slate-400 hover:text-slate-200 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            © 2026 Agent Skills Marketplace. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">Privacy</Link>
            <Link href="#" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">Terms</Link>
            <Link href="#" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

import type { Author, Skill, Review, SkillStats } from './types'

export const MOCK_AUTHORS: Author[] = [
  {
    id: 'author-1',
    username: 'alexchen',
    displayName: 'Alex Chen',
    avatarUrl: 'https://ui-avatars.com/api/?name=Alex+Chen&background=6370f1&color=fff&size=128',
    bio: 'AI engineer building productivity tools. Open source contributor.',
    website: 'https://alexchen.dev',
    github: 'alexchen',
    totalDownloads: 48200,
    publishedSkills: 7,
    joinedAt: '2024-03-15',
  },
  {
    id: 'author-2',
    username: 'sarahkim',
    displayName: 'Sarah Kim',
    avatarUrl: 'https://ui-avatars.com/api/?name=Sarah+Kim&background=10b981&color=fff&size=128',
    bio: 'Full-stack developer & AI researcher. Building the future one skill at a time.',
    github: 'sarahkim',
    totalDownloads: 31500,
    publishedSkills: 4,
    joinedAt: '2024-05-02',
  },
  {
    id: 'author-3',
    username: 'marcobello',
    displayName: 'Marco Bello',
    avatarUrl: 'https://ui-avatars.com/api/?name=Marco+Bello&background=f59e0b&color=fff&size=128',
    bio: 'Data scientist. I turn raw data into actionable agent skills.',
    github: 'marcobello',
    totalDownloads: 22800,
    publishedSkills: 5,
    joinedAt: '2024-06-18',
  },
  {
    id: 'author-4',
    username: 'yuki_tanaka',
    displayName: 'Yuki Tanaka',
    avatarUrl: 'https://ui-avatars.com/api/?name=Yuki+Tanaka&background=ec4899&color=fff&size=128',
    bio: 'Security researcher & automation enthusiast. Japan 🇯🇵',
    github: 'yukitanaka',
    totalDownloads: 15900,
    publishedSkills: 3,
    joinedAt: '2024-08-07',
  },
  {
    id: 'author-5',
    username: 'devbot_labs',
    displayName: 'DevBot Labs',
    avatarUrl: 'https://ui-avatars.com/api/?name=DevBot+Labs&background=8b5cf6&color=fff&size=128',
    bio: 'We build enterprise-grade agent skills for teams.',
    website: 'https://devbotlabs.io',
    totalDownloads: 89300,
    publishedSkills: 12,
    joinedAt: '2024-01-10',
  },
]

export const MOCK_SKILLS: Skill[] = [
  {
    id: 'skill-1',
    slug: 'web-scraper-pro',
    name: 'Web Scraper Pro',
    shortDescription: 'Intelligent web scraping with JS rendering, pagination handling, and structured output.',
    longDescription: `Web Scraper Pro gives your agent the ability to extract structured data from any website — including those that require JavaScript rendering.

## Features
- **JS rendering** via headless browser (Playwright under the hood)
- **Auto-pagination** — crawl multi-page results automatically
- **Schema extraction** — define output schemas and get clean JSON back
- **Rate limiting** — built-in respectful crawling with configurable delays
- **Proxy support** — rotate proxies to avoid blocks

## Usage
\`\`\`typescript
const result = await skills.webScraperPro.scrape({
  url: "https://example.com/products",
  schema: {
    products: [{ name: "string", price: "number", imageUrl: "string" }]
  },
  pagination: { nextSelector: ".next-page", maxPages: 5 }
})
\`\`\``,
    category: 'data',
    tags: ['scraping', 'web', 'data-extraction', 'automation'],
    author: MOCK_AUTHORS[0],
    manifest: {
      name: 'web-scraper-pro',
      version: '2.1.4',
      description: 'Intelligent web scraping with JS rendering',
      installCommand: 'openclaw install web-scraper-pro',
      dependencies: [
        { name: 'playwright', version: '^1.48.0' },
        { name: 'cheerio', version: '^1.0.0' },
      ],
      entrypoint: 'dist/index.js',
      runtime: 'node18',
      permissions: ['network', 'filesystem:read'],
    },
    version: '2.1.4',
    price: 0,
    downloads: 18400,
    stars: 342,
    rating: 4.8,
    reviewCount: 89,
    createdAt: '2024-04-10',
    updatedAt: '2025-11-20',
    status: 'published',
    featured: true,
    screenshots: [],
    readme: '# Web Scraper Pro\n\nIntelligent scraping for AI agents.',
  },
  {
    id: 'skill-2',
    slug: 'code-reviewer',
    name: 'Code Reviewer',
    shortDescription: 'Automated code review with security scanning, style checks, and refactor suggestions.',
    longDescription: `Code Reviewer integrates best-in-class static analysis into a single agent skill. Get actionable feedback on every PR.

## What it checks
- **Security** — OWASP Top 10, dependency vulnerabilities, secret leaks
- **Style** — ESLint, Prettier, language-specific conventions
- **Performance** — N+1 queries, memory leaks, algorithmic complexity
- **Refactoring** — Extract method, reduce duplication, improve readability

## Supported languages
TypeScript, JavaScript, Python, Go, Rust, Java, C#`,
    category: 'coding',
    tags: ['code-review', 'security', 'linting', 'devtools'],
    author: MOCK_AUTHORS[1],
    manifest: {
      name: 'code-reviewer',
      version: '1.3.0',
      description: 'Automated code review skill',
      installCommand: 'openclaw install code-reviewer',
      dependencies: [
        { name: 'semgrep', version: '^1.90.0' },
        { name: 'eslint', version: '^9.0.0' },
      ],
      entrypoint: 'dist/index.js',
      runtime: 'node20',
      permissions: ['filesystem:read'],
    },
    version: '1.3.0',
    price: 9.99,
    downloads: 9200,
    stars: 187,
    rating: 4.6,
    reviewCount: 54,
    createdAt: '2024-06-15',
    updatedAt: '2025-10-05',
    status: 'published',
    featured: true,
    screenshots: [],
    readme: '# Code Reviewer\n\nAutomated code review for agents.',
  },
  {
    id: 'skill-3',
    slug: 'slack-messenger',
    name: 'Slack Messenger',
    shortDescription: 'Send messages, create channels, and manage Slack workspaces from your agent.',
    longDescription: `Give your agent full Slack integration. Send rich messages with blocks, manage channels, and react to events.

## Features
- Send messages with Block Kit formatting
- Create and archive channels
- Manage user memberships
- Upload files and snippets
- Schedule messages`,
    category: 'communication',
    tags: ['slack', 'messaging', 'notifications', 'team'],
    author: MOCK_AUTHORS[4],
    manifest: {
      name: 'slack-messenger',
      version: '3.0.1',
      description: 'Slack integration skill',
      installCommand: 'openclaw install slack-messenger',
      dependencies: [{ name: '@slack/web-api', version: '^7.0.0' }],
      entrypoint: 'dist/index.js',
      runtime: 'node18',
      permissions: ['network'],
    },
    version: '3.0.1',
    price: 0,
    downloads: 27600,
    stars: 521,
    rating: 4.9,
    reviewCount: 142,
    createdAt: '2024-02-20',
    updatedAt: '2025-12-01',
    status: 'published',
    featured: true,
    screenshots: [],
    readme: '# Slack Messenger\n\nSlack integration for agents.',
  },
  {
    id: 'skill-4',
    slug: 'pdf-analyzer',
    name: 'PDF Analyzer',
    shortDescription: 'Extract text, tables, and structured data from PDFs. Supports scanned docs via OCR.',
    longDescription: `PDF Analyzer handles everything from simple text extraction to complex table parsing and OCR on scanned documents.

## Capabilities
- Text extraction (with layout preservation)
- Table detection and CSV export
- Form field reading
- Scanned PDF OCR via Tesseract
- Metadata extraction`,
    category: 'data',
    tags: ['pdf', 'ocr', 'document', 'extraction'],
    author: MOCK_AUTHORS[2],
    manifest: {
      name: 'pdf-analyzer',
      version: '1.5.2',
      description: 'PDF extraction and analysis',
      installCommand: 'openclaw install pdf-analyzer',
      dependencies: [
        { name: 'pdf-parse', version: '^1.1.1' },
        { name: 'tesseract.js', version: '^5.0.0' },
      ],
      entrypoint: 'dist/index.js',
      runtime: 'node18',
      permissions: ['filesystem:read', 'filesystem:write'],
    },
    version: '1.5.2',
    price: 4.99,
    downloads: 11800,
    stars: 203,
    rating: 4.5,
    reviewCount: 67,
    createdAt: '2024-05-08',
    updatedAt: '2025-09-12',
    status: 'published',
    featured: false,
    screenshots: [],
    readme: '# PDF Analyzer\n\nExtract data from PDFs.',
  },
  {
    id: 'skill-5',
    slug: 'github-assistant',
    name: 'GitHub Assistant',
    shortDescription: 'Full GitHub integration: PRs, issues, code search, CI status, and more.',
    longDescription: `GitHub Assistant gives your agent the full power of the GitHub API. Manage repositories, review PRs, create issues, and monitor CI all in one skill.`,
    category: 'coding',
    tags: ['github', 'git', 'devops', 'ci-cd'],
    author: MOCK_AUTHORS[4],
    manifest: {
      name: 'github-assistant',
      version: '4.2.0',
      description: 'GitHub integration skill',
      installCommand: 'openclaw install github-assistant',
      dependencies: [{ name: '@octokit/rest', version: '^21.0.0' }],
      entrypoint: 'dist/index.js',
      runtime: 'node20',
      permissions: ['network'],
    },
    version: '4.2.0',
    price: 0,
    downloads: 34100,
    stars: 678,
    rating: 4.9,
    reviewCount: 198,
    createdAt: '2024-01-25',
    updatedAt: '2025-11-28',
    status: 'published',
    featured: true,
    screenshots: [],
    readme: '# GitHub Assistant\n\nGitHub integration for agents.',
  },
  {
    id: 'skill-6',
    slug: 'calendar-scheduler',
    name: 'Calendar Scheduler',
    shortDescription: 'Schedule meetings, check availability, and manage Google Calendar & Outlook events.',
    longDescription: `Calendar Scheduler integrates with Google Calendar and Microsoft Outlook to let your agent manage meetings, find availability, and send invites.`,
    category: 'productivity',
    tags: ['calendar', 'scheduling', 'google', 'outlook'],
    author: MOCK_AUTHORS[1],
    manifest: {
      name: 'calendar-scheduler',
      version: '2.0.3',
      description: 'Calendar scheduling skill',
      installCommand: 'openclaw install calendar-scheduler',
      dependencies: [
        { name: 'googleapis', version: '^144.0.0' },
        { name: '@microsoft/microsoft-graph-client', version: '^3.0.0' },
      ],
      entrypoint: 'dist/index.js',
      runtime: 'node18',
      permissions: ['network'],
    },
    version: '2.0.3',
    price: 7.99,
    downloads: 8700,
    stars: 156,
    rating: 4.4,
    reviewCount: 43,
    createdAt: '2024-07-12',
    updatedAt: '2025-10-20',
    status: 'published',
    featured: false,
    screenshots: [],
    readme: '# Calendar Scheduler\n\nCalendar management for agents.',
  },
  {
    id: 'skill-7',
    slug: 'arxiv-researcher',
    name: 'arXiv Researcher',
    shortDescription: 'Search and summarize academic papers from arXiv. Get structured paper metadata and AI summaries.',
    longDescription: `arXiv Researcher lets your agent search over 2 million academic papers, fetch full text, and generate structured summaries with key findings.`,
    category: 'research',
    tags: ['research', 'papers', 'academic', 'arxiv', 'science'],
    author: MOCK_AUTHORS[2],
    manifest: {
      name: 'arxiv-researcher',
      version: '1.0.5',
      description: 'Academic paper research skill',
      installCommand: 'openclaw install arxiv-researcher',
      dependencies: [{ name: 'arxiv', version: '^2.1.0' }],
      entrypoint: 'dist/index.js',
      runtime: 'node18',
      permissions: ['network'],
    },
    version: '1.0.5',
    price: 0,
    downloads: 6300,
    stars: 124,
    rating: 4.7,
    reviewCount: 31,
    createdAt: '2024-09-03',
    updatedAt: '2025-08-15',
    status: 'published',
    featured: false,
    screenshots: [],
    readme: '# arXiv Researcher\n\nAcademic research for agents.',
  },
  {
    id: 'skill-8',
    slug: 'sql-query-builder',
    name: 'SQL Query Builder',
    shortDescription: 'Natural language to SQL. Supports PostgreSQL, MySQL, SQLite, and BigQuery.',
    longDescription: `SQL Query Builder translates natural language into production-safe SQL queries. Supports schema introspection, query optimization, and result formatting.`,
    category: 'data',
    tags: ['sql', 'database', 'postgres', 'mysql', 'nl2sql'],
    author: MOCK_AUTHORS[0],
    manifest: {
      name: 'sql-query-builder',
      version: '1.8.0',
      description: 'Natural language to SQL skill',
      installCommand: 'openclaw install sql-query-builder',
      dependencies: [
        { name: 'knex', version: '^3.1.0' },
        { name: 'pg', version: '^8.13.0' },
      ],
      entrypoint: 'dist/index.js',
      runtime: 'node20',
      permissions: ['network'],
    },
    version: '1.8.0',
    price: 14.99,
    downloads: 5900,
    stars: 98,
    rating: 4.3,
    reviewCount: 28,
    createdAt: '2024-08-20',
    updatedAt: '2025-11-05',
    status: 'published',
    featured: false,
    screenshots: [],
    readme: '# SQL Query Builder\n\nNL to SQL for agents.',
  },
  {
    id: 'skill-9',
    slug: 'image-generator',
    name: 'Image Generator',
    shortDescription: 'Generate images with DALL-E 3, Stable Diffusion, and Flux. Includes style presets.',
    longDescription: `Image Generator provides a unified interface to the best image generation models. Switch between providers, apply style presets, and get consistent results.`,
    category: 'creative',
    tags: ['image-generation', 'dalle', 'stable-diffusion', 'creative'],
    author: MOCK_AUTHORS[3],
    manifest: {
      name: 'image-generator',
      version: '2.3.1',
      description: 'Multi-provider image generation skill',
      installCommand: 'openclaw install image-generator',
      dependencies: [{ name: 'openai', version: '^4.68.0' }],
      entrypoint: 'dist/index.js',
      runtime: 'node18',
      permissions: ['network'],
    },
    version: '2.3.1',
    price: 0,
    downloads: 14200,
    stars: 287,
    rating: 4.6,
    reviewCount: 76,
    createdAt: '2024-04-28',
    updatedAt: '2025-10-30',
    status: 'published',
    featured: false,
    screenshots: [],
    readme: '# Image Generator\n\nImage generation for agents.',
  },
  {
    id: 'skill-10',
    slug: 'security-scanner',
    name: 'Security Scanner',
    shortDescription: 'Scan codebases and dependencies for CVEs, secrets, and misconfigurations.',
    longDescription: `Security Scanner runs comprehensive security checks on your code and infrastructure. Catches secrets, CVEs, and config issues before they hit production.`,
    category: 'security',
    tags: ['security', 'cve', 'vulnerability', 'scanning', 'secrets'],
    author: MOCK_AUTHORS[3],
    manifest: {
      name: 'security-scanner',
      version: '1.2.0',
      description: 'Security scanning skill',
      installCommand: 'openclaw install security-scanner',
      dependencies: [
        { name: 'trivy', version: '^0.57.0' },
        { name: 'gitleaks', version: '^8.21.0' },
      ],
      entrypoint: 'dist/index.js',
      runtime: 'node20',
      permissions: ['filesystem:read', 'network'],
    },
    version: '1.2.0',
    price: 19.99,
    downloads: 7100,
    stars: 143,
    rating: 4.8,
    reviewCount: 39,
    createdAt: '2024-07-30',
    updatedAt: '2025-12-02',
    status: 'published',
    featured: false,
    screenshots: [],
    readme: '# Security Scanner\n\nSecurity scanning for agents.',
  },
  {
    id: 'skill-11',
    slug: 'email-composer',
    name: 'Email Composer',
    shortDescription: 'Draft, send, and manage emails via Gmail and Outlook with templating support.',
    longDescription: `Email Composer gives your agent full email capabilities — composing, sending, replying, and organizing messages across Gmail and Outlook.`,
    category: 'communication',
    tags: ['email', 'gmail', 'outlook', 'communication'],
    author: MOCK_AUTHORS[4],
    manifest: {
      name: 'email-composer',
      version: '2.1.0',
      description: 'Email management skill',
      installCommand: 'openclaw install email-composer',
      dependencies: [
        { name: 'googleapis', version: '^144.0.0' },
        { name: 'nodemailer', version: '^6.9.0' },
      ],
      entrypoint: 'dist/index.js',
      runtime: 'node18',
      permissions: ['network'],
    },
    version: '2.1.0',
    price: 0,
    downloads: 21300,
    stars: 412,
    rating: 4.7,
    reviewCount: 118,
    createdAt: '2024-03-05',
    updatedAt: '2025-11-15',
    status: 'published',
    featured: false,
    screenshots: [],
    readme: '# Email Composer\n\nEmail management for agents.',
  },
  {
    id: 'skill-12',
    slug: 'workflow-automator',
    name: 'Workflow Automator',
    shortDescription: 'Build multi-step automations with triggers, conditions, and actions across 50+ integrations.',
    longDescription: `Workflow Automator is the Swiss Army knife of agent automation. Connect any app to any app with a simple declarative config.`,
    category: 'automation',
    tags: ['automation', 'workflow', 'zapier-alternative', 'integration'],
    author: MOCK_AUTHORS[4],
    manifest: {
      name: 'workflow-automator',
      version: '1.0.0',
      description: 'Workflow automation skill',
      installCommand: 'openclaw install workflow-automator',
      dependencies: [],
      entrypoint: 'dist/index.js',
      runtime: 'node20',
      permissions: ['network'],
    },
    version: '1.0.0',
    price: 29.99,
    downloads: 3400,
    stars: 67,
    rating: 4.2,
    reviewCount: 18,
    createdAt: '2025-01-08',
    updatedAt: '2025-12-01',
    status: 'published',
    featured: false,
    screenshots: [],
    readme: '# Workflow Automator\n\nAutomation for agents.',
  },
]

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'review-1',
    skillId: 'skill-1',
    author: MOCK_AUTHORS[1],
    rating: 5,
    title: 'Saved us hours of manual scraping work',
    body: 'We were spending 4 hours/week manually copying data from competitor sites. Web Scraper Pro handles it all automatically. The pagination detection is particularly impressive.',
    createdAt: '2025-10-15',
    helpful: 34,
  },
  {
    id: 'review-2',
    skillId: 'skill-1',
    author: MOCK_AUTHORS[2],
    rating: 5,
    title: 'Best scraping skill by far',
    body: 'Tried 3 other scraping skills before this one. The schema-based extraction is a game changer — no more brittle CSS selectors.',
    createdAt: '2025-09-28',
    helpful: 21,
  },
  {
    id: 'review-3',
    skillId: 'skill-1',
    author: MOCK_AUTHORS[3],
    rating: 4,
    title: 'Great but proxy rotation could be better',
    body: 'Overall excellent. The only thing I wish was better is the proxy rotation — it currently only supports HTTP proxies. SOCKS5 support would be a huge plus.',
    createdAt: '2025-08-12',
    helpful: 15,
  },
  {
    id: 'review-4',
    skillId: 'skill-3',
    author: MOCK_AUTHORS[0],
    rating: 5,
    title: 'Rock solid Slack integration',
    body: 'Block Kit support is fantastic. Our agent builds beautiful Slack reports with charts and summaries. Zero issues in 3 months of production use.',
    createdAt: '2025-11-02',
    helpful: 48,
  },
  {
    id: 'review-5',
    skillId: 'skill-5',
    author: MOCK_AUTHORS[2],
    rating: 5,
    title: 'Essential for any dev agent',
    body: 'GitHub Assistant is the first skill I install in every new agent. The code search functionality alone is worth it.',
    createdAt: '2025-10-20',
    helpful: 72,
  },
]

export const MOCK_STATS: SkillStats[] = [
  {
    skillId: 'skill-1',
    daily: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 86400000).toISOString().split('T')[0],
      downloads: Math.floor(Math.random() * 200 + 400),
    })),
    totalDownloads: 18400,
    totalRevenue: 0,
  },
]

export const CATEGORIES = [
  { id: 'productivity', label: 'Productivity', icon: '⚡', count: 14 },
  { id: 'coding',       label: 'Coding',       icon: '💻', count: 23 },
  { id: 'data',         label: 'Data',         icon: '📊', count: 18 },
  { id: 'communication',label: 'Communication',icon: '💬', count: 11 },
  { id: 'research',     label: 'Research',     icon: '🔬', count: 9  },
  { id: 'creative',     label: 'Creative',     icon: '🎨', count: 7  },
  { id: 'automation',   label: 'Automation',   icon: '🤖', count: 16 },
  { id: 'security',     label: 'Security',     icon: '🔒', count: 8  },
]

export function getSkillById(id: string): Skill | undefined {
  return MOCK_SKILLS.find((s) => s.id === id || s.slug === id)
}

export function getReviewsForSkill(skillId: string): Review[] {
  return MOCK_REVIEWS.filter((r) => r.skillId === skillId)
}

export function getFeaturedSkills(): Skill[] {
  return MOCK_SKILLS.filter((s) => s.featured)
}

export function searchSkills(query: string, category?: string): Skill[] {
  let results = MOCK_SKILLS
  if (category && category !== 'all') {
    results = results.filter((s) => s.category === category)
  }
  if (query) {
    const q = query.toLowerCase()
    results = results.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.shortDescription.toLowerCase().includes(q) ||
        s.tags.some((t) => t.includes(q))
    )
  }
  return results
}

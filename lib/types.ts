export type SkillCategory =
  | 'productivity'
  | 'coding'
  | 'data'
  | 'communication'
  | 'research'
  | 'creative'
  | 'automation'
  | 'security'

export interface Author {
  id: string
  username: string
  displayName: string
  avatarUrl: string
  bio: string
  website?: string
  github?: string
  totalDownloads: number
  publishedSkills: number
  joinedAt: string
}

export interface SkillDependency {
  name: string
  version: string
}

export interface SkillManifest {
  name: string
  version: string
  description: string
  installCommand: string
  dependencies: SkillDependency[]
  entrypoint: string
  runtime: string
  permissions: string[]
}

export interface Skill {
  id: string
  slug: string
  name: string
  shortDescription: string
  longDescription: string
  category: SkillCategory
  tags: string[]
  author: Author
  manifest: SkillManifest
  version: string
  price: number // 0 = free
  downloads: number
  stars: number
  rating: number
  reviewCount: number
  createdAt: string
  updatedAt: string
  status: 'published' | 'pending' | 'rejected'
  featured: boolean
  screenshots: string[]
  readme: string
}

export interface Review {
  id: string
  skillId: string
  author: Author
  rating: number
  title: string
  body: string
  createdAt: string
  helpful: number
}

export interface SkillStats {
  skillId: string
  daily: { date: string; downloads: number }[]
  totalDownloads: number
  totalRevenue: number
}

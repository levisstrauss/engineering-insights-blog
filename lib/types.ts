export interface Author {
  id: string
  name: string
  avatar: string
  role: string
  bio: string
  twitter?: string
  github?: string
  linkedin?: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  color: string
  postCount: number
}

export interface Tag {
  id: string
  name: string
  slug: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  author: Author
  category: Category
  tags: Tag[]
  publishedAt: string
  updatedAt: string
  readTime: number
  views: number
  likes: number
  featured: boolean
  status: "draft" | "published" | "archived"
}

export interface NewsletterSubscriber {
  id: string
  email: string
  subscribedAt: string
  verified: boolean
}

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: "admin" | "editor" | "user"
  createdAt: string
}

export interface ReadingSession {
  articleId: string
  startTime: number
  duration: number
  scrollPercentage: number
  completed: boolean
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  unlockedAt?: string
  progress: number
  target: number
  tier: "bronze" | "silver" | "gold" | "platinum"
}

export interface Bookmark {
  id: string
  articleId: string
  createdAt: string
  note?: string
  highlightedText?: string
  collection: string
}

export interface ReadingStats {
  totalArticlesRead: number
  totalReadingTime: number
  currentStreak: number
  longestStreak: number
  favoriteCategory: string
  articlesThisWeek: number
  achievements: Achievement[]
}

export interface LivePresence {
  odejId: string
  odejName: string
  odejAvatar: string
  articleId: string
  lastSeen: number
}

export interface ArticleReaction {
  type: "mind-blown" | "insightful" | "helpful" | "bookmark" | "share"
  count: number
  reacted: boolean
}

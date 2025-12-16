import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { User, BlogPost, ReadingStats, Achievement, Bookmark, ReadingSession } from "./types"

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

interface AdminState {
  posts: BlogPost[]
  setPosts: (posts: BlogPost[]) => void
  addPost: (post: BlogPost) => void
  updatePost: (id: string, updates: Partial<BlogPost>) => void
  deletePost: (id: string) => void
}

interface ReaderState {
  // Reading stats
  stats: ReadingStats
  sessions: ReadingSession[]
  bookmarks: Bookmark[]
  collections: string[]

  // Focus mode
  focusModeActive: boolean
  ambientSound: string | null

  // Article interactions
  articleReactions: Record<string, Record<string, boolean>>

  // Actions
  startReadingSession: (articleId: string) => void
  endReadingSession: (articleId: string, completed: boolean) => void
  updateScrollProgress: (articleId: string, percentage: number) => void
  toggleFocusMode: () => void
  setAmbientSound: (sound: string | null) => void
  addBookmark: (bookmark: Omit<Bookmark, "id" | "createdAt">) => void
  removeBookmark: (id: string) => void
  addCollection: (name: string) => void
  reactToArticle: (articleId: string, reaction: string) => void
  unlockAchievement: (achievementId: string) => void
}

// Mock admin user
const ADMIN_USER: User = {
  id: "admin-1",
  email: "admin@codecraft.dev",
  name: "Admin User",
  role: "admin",
  createdAt: "2024-01-01T00:00:00Z",
}

const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  {
    id: "first-read",
    name: "First Steps",
    description: "Read your first article",
    icon: "book-open",
    progress: 0,
    target: 1,
    tier: "bronze",
  },
  {
    id: "week-streak",
    name: "Consistent Learner",
    description: "Maintain a 7-day reading streak",
    icon: "flame",
    progress: 0,
    target: 7,
    tier: "silver",
  },
  {
    id: "speed-reader",
    name: "Speed Reader",
    description: "Read 10 articles in one week",
    icon: "zap",
    progress: 0,
    target: 10,
    tier: "gold",
  },
  {
    id: "deep-diver",
    name: "Deep Diver",
    description: "Read articles from all categories",
    icon: "layers",
    progress: 0,
    target: 5,
    tier: "platinum",
  },
  {
    id: "bookworm",
    name: "Bookworm",
    description: "Accumulate 10 hours of reading time",
    icon: "clock",
    progress: 0,
    target: 600,
    tier: "gold",
  },
  {
    id: "curator",
    name: "Knowledge Curator",
    description: "Create 5 bookmark collections",
    icon: "folder",
    progress: 0,
    target: 5,
    tier: "silver",
  },
  {
    id: "explorer",
    name: "Explorer",
    description: "Read 50 articles",
    icon: "compass",
    progress: 0,
    target: 50,
    tier: "platinum",
  },
  {
    id: "night-owl",
    name: "Night Owl",
    description: "Read articles after midnight",
    icon: "moon",
    progress: 0,
    target: 1,
    tier: "bronze",
  },
]

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        // Mock authentication - in production, this would call your Go backend API
        if (email === "admin@codecraft.dev" && password === "admin123") {
          set({ user: ADMIN_USER, isAuthenticated: true })
          return true
        }
        return false
      },
      logout: () => {
        set({ user: null, isAuthenticated: false })
      },
    }),
    {
      name: "auth-storage",
    },
  ),
)

export const useAdminStore = create<AdminState>((set) => ({
  posts: [],
  setPosts: (posts) => set({ posts }),
  addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  updatePost: (id, updates) =>
    set((state) => ({
      posts: state.posts.map((post) => (post.id === id ? { ...post, ...updates } : post)),
    })),
  deletePost: (id) =>
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== id),
    })),
}))

export const useReaderStore = create<ReaderState>()(
  persist(
    (set, get) => ({
      stats: {
        totalArticlesRead: 0,
        totalReadingTime: 0,
        currentStreak: 0,
        longestStreak: 0,
        favoriteCategory: "",
        articlesThisWeek: 0,
        achievements: DEFAULT_ACHIEVEMENTS,
      },
      sessions: [],
      bookmarks: [],
      collections: ["Read Later", "Favorites", "Learning Path"],
      focusModeActive: false,
      ambientSound: null,
      articleReactions: {},

      startReadingSession: (articleId) => {
        const session: ReadingSession = {
          articleId,
          startTime: Date.now(),
          duration: 0,
          scrollPercentage: 0,
          completed: false,
        }
        set((state) => ({ sessions: [...state.sessions, session] }))
      },

      endReadingSession: (articleId, completed) => {
        set((state) => {
          const sessions = state.sessions.map((s) =>
            s.articleId === articleId && s.duration === 0 ? { ...s, duration: Date.now() - s.startTime, completed } : s,
          )
          const completedSessions = sessions.filter((s) => s.completed)
          const totalTime = sessions.reduce((acc, s) => acc + s.duration, 0)

          return {
            sessions,
            stats: {
              ...state.stats,
              totalArticlesRead: completedSessions.length,
              totalReadingTime: Math.floor(totalTime / 60000),
            },
          }
        })
      },

      updateScrollProgress: (articleId, percentage) => {
        set((state) => ({
          sessions: state.sessions.map((s) => (s.articleId === articleId ? { ...s, scrollPercentage: percentage } : s)),
        }))
      },

      toggleFocusMode: () => set((state) => ({ focusModeActive: !state.focusModeActive })),

      setAmbientSound: (sound) => set({ ambientSound: sound }),

      addBookmark: (bookmark) => {
        const newBookmark: Bookmark = {
          ...bookmark,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        }
        set((state) => ({ bookmarks: [...state.bookmarks, newBookmark] }))
      },

      removeBookmark: (id) => {
        set((state) => ({ bookmarks: state.bookmarks.filter((b) => b.id !== id) }))
      },

      addCollection: (name) => {
        set((state) => ({ collections: [...state.collections, name] }))
      },

      reactToArticle: (articleId, reaction) => {
        set((state) => ({
          articleReactions: {
            ...state.articleReactions,
            [articleId]: {
              ...state.articleReactions[articleId],
              [reaction]: !state.articleReactions[articleId]?.[reaction],
            },
          },
        }))
      },

      unlockAchievement: (achievementId) => {
        set((state) => ({
          stats: {
            ...state.stats,
            achievements: state.stats.achievements.map((a) =>
              a.id === achievementId ? { ...a, unlockedAt: new Date().toISOString() } : a,
            ),
          },
        }))
      },
    }),
    { name: "reader-storage" },
  ),
)

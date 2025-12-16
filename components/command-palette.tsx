"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Search, FileText, FolderOpen, User, Settings, Home, ArrowRight, Hash, Sparkles } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { blogPosts, categories, authors, tags } from "@/lib/data"
import { cn } from "@/lib/utils"

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type ResultType = "page" | "article" | "category" | "author" | "tag"

interface SearchResult {
  id: string
  type: ResultType
  title: string
  description?: string
  href: string
  icon: React.ElementType
}

const pages: SearchResult[] = [
  { id: "home", type: "page", title: "Home", href: "/", icon: Home },
  { id: "blog", type: "page", title: "Blog", href: "/blog", icon: FileText },
  { id: "categories", type: "page", title: "Categories", href: "/categories", icon: FolderOpen },
  { id: "about", type: "page", title: "About", href: "/about-page-components", icon: User },
  { id: "admin", type: "page", title: "Admin Dashboard", href: "/admin", icon: Settings },
]

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter()
  const [query, setQuery] = React.useState("")
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const inputRef = React.useRef<HTMLInputElement>(null)

  // Generate search results
  const results = React.useMemo(() => {
    if (!query.trim()) {
      return pages
    }

    const lowerQuery = query.toLowerCase()
    const searchResults: SearchResult[] = []

    // Search pages
    pages.forEach((page) => {
      if (page.title.toLowerCase().includes(lowerQuery)) {
        searchResults.push(page)
      }
    })

    // Search articles
    blogPosts
      .filter(
        (post) =>
          post.status === "published" &&
          (post.title.toLowerCase().includes(lowerQuery) || post.excerpt.toLowerCase().includes(lowerQuery)),
      )
      .slice(0, 5)
      .forEach((post) => {
        searchResults.push({
          id: `article-${post.id}`,
          type: "article",
          title: post.title,
          description: post.category.name,
          href: `/blog/${post.slug}`,
          icon: FileText,
        })
      })

    // Search categories
    categories
      .filter((cat) => cat.name.toLowerCase().includes(lowerQuery))
      .forEach((cat) => {
        searchResults.push({
          id: `category-${cat.id}`,
          type: "category",
          title: cat.name,
          description: `${cat.postCount} articles`,
          href: `/categories/${cat.slug}`,
          icon: FolderOpen,
        })
      })

    // Search authors
    authors
      .filter((author) => author.name.toLowerCase().includes(lowerQuery))
      .forEach((author) => {
        searchResults.push({
          id: `author-${author.id}`,
          type: "author",
          title: author.name,
          description: author.role,
          href: `/authors/${author.id}`,
          icon: User,
        })
      })

    // Search tags
    tags
      .filter((tag) => tag.name.toLowerCase().includes(lowerQuery))
      .slice(0, 5)
      .forEach((tag) => {
        searchResults.push({
          id: `tag-${tag.id}`,
          type: "tag",
          title: tag.name,
          href: `/tags/${tag.slug}`,
          icon: Hash,
        })
      })

    return searchResults
  }, [query])

  // Reset selected index when results change
  React.useEffect(() => {
    setSelectedIndex(0)
  }, [results])

  // Focus input when opening
  React.useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 0)
    } else {
      setQuery("")
      setSelectedIndex(0)
    }
  }, [open])

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault()
          setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1))
          break
        case "ArrowUp":
          e.preventDefault()
          setSelectedIndex((prev) => Math.max(prev - 1, 0))
          break
        case "Enter":
          e.preventDefault()
          if (results[selectedIndex]) {
            router.push(results[selectedIndex].href)
            onOpenChange(false)
          }
          break
        case "Escape":
          onOpenChange(false)
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [open, results, selectedIndex, router, onOpenChange])

  const handleSelect = (result: SearchResult) => {
    router.push(result.href)
    onOpenChange(false)
  }

  const getTypeLabel = (type: ResultType) => {
    switch (type) {
      case "page":
        return "Page"
      case "article":
        return "Article"
      case "category":
        return "Category"
      case "author":
        return "Author"
      case "tag":
        return "Tag"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 gap-0 bg-card border-border overflow-hidden">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 border-b border-border">
          <Search className="h-5 w-5 text-muted-foreground" />
          <Input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles, categories, authors..."
            className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 h-14 text-base"
          />
          <kbd className="hidden sm:flex h-6 items-center gap-1 rounded border border-border bg-muted px-2 font-mono text-xs text-muted-foreground">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[400px] overflow-y-auto p-2">
          {results.length === 0 ? (
            <div className="py-12 text-center">
              <Sparkles className="mx-auto h-10 w-10 text-muted-foreground/50" />
              <p className="mt-4 text-sm text-muted-foreground">No results found for "{query}"</p>
            </div>
          ) : (
            <div className="space-y-1">
              {results.map((result, index) => (
                <motion.button
                  key={result.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.02 }}
                  onClick={() => handleSelect(result)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors",
                    selectedIndex === index ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted",
                  )}
                >
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-lg",
                      selectedIndex === index ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                    )}
                  >
                    <result.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{result.title}</p>
                    {result.description && (
                      <p className="text-sm text-muted-foreground truncate">{result.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{getTypeLabel(result.type)}</span>
                    <ArrowRight
                      className={cn(
                        "h-4 w-4 transition-opacity",
                        selectedIndex === index ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-muted/30">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border">↓</kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border">↵</kbd>
              Select
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-xs text-muted-foreground">CodeCraft</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

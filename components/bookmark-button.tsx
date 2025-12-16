"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bookmark, BookmarkCheck } from "lucide-react"
import type { BlogPost } from "@/lib/types"

interface BookmarkButtonProps {
  post: BlogPost
  variant?: "icon" | "full"
}

const BOOKMARKS_KEY = "codecraft-bookmarks"

export function BookmarkButton({ post, variant = "icon" }: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem(BOOKMARKS_KEY) || "[]")
    setIsBookmarked(bookmarks.some((b: BlogPost) => b.id === post.id))
  }, [post.id])

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem(BOOKMARKS_KEY) || "[]")

    if (isBookmarked) {
      const updated = bookmarks.filter((b: BlogPost) => b.id !== post.id)
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated))
      setIsBookmarked(false)
    } else {
      const bookmarkData = {
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        coverImage: post.coverImage,
        author: { name: post.author.name, avatar: post.author.avatar },
        category: { name: post.category.name, slug: post.category.slug },
        readTime: post.readTime,
        savedAt: new Date().toISOString(),
      }
      bookmarks.push(bookmarkData)
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks))
      setIsBookmarked(true)
    }

    setShowToast(true)
    setTimeout(() => setShowToast(false), 2000)
  }

  if (variant === "full") {
    return (
      <div className="relative">
        <motion.button
          onClick={toggleBookmark}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
            isBookmarked
              ? "bg-primary/10 border-primary text-primary"
              : "bg-background/50 border-border hover:border-primary/50 text-muted-foreground hover:text-foreground"
          }`}
        >
          <AnimatePresence mode="wait">
            {isBookmarked ? (
              <motion.div key="bookmarked" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <BookmarkCheck className="w-4 h-4" />
              </motion.div>
            ) : (
              <motion.div key="bookmark" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <Bookmark className="w-4 h-4" />
              </motion.div>
            )}
          </AnimatePresence>
          <span className="text-sm font-medium">{isBookmarked ? "Saved" : "Save for Later"}</span>
        </motion.button>

        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 mt-2 px-3 py-1.5 rounded-lg bg-foreground text-background text-xs font-medium whitespace-nowrap z-50"
            >
              {isBookmarked ? "Article saved!" : "Article removed"}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <div className="relative">
      <motion.button
        onClick={toggleBookmark}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`p-2 rounded-full transition-all duration-200 ${
          isBookmarked
            ? "bg-primary/20 text-primary"
            : "bg-background/50 backdrop-blur-sm text-muted-foreground hover:text-primary hover:bg-primary/10"
        }`}
        aria-label={isBookmarked ? "Remove bookmark" : "Bookmark article"}
      >
        <AnimatePresence mode="wait">
          {isBookmarked ? (
            <motion.div
              key="bookmarked"
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 45 }}
            >
              <BookmarkCheck className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div key="bookmark" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              <Bookmark className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}

"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Sparkles, Lightbulb, ThumbsUp, Share2, Check, Copy, Twitter, Linkedin } from "lucide-react"
import { cn } from "@/lib/utils"

const REACTIONS = [
  {
    id: "mind-blown",
    icon: Sparkles,
    label: "Mind Blown",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "insightful",
    icon: Lightbulb,
    label: "Insightful",
    color: "from-yellow-500 to-orange-500",
  },
  {
    id: "helpful",
    icon: ThumbsUp,
    label: "Helpful",
    color: "from-green-500 to-emerald-500",
  },
]

const REACTIONS_KEY = "codecraft-reactions"

export function ArticleReactions({ articleId, articleTitle }: { articleId: string; articleTitle: string }) {
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [copied, setCopied] = useState(false)
  const [reactionCounts, setReactionCounts] = useState<Record<string, number>>({
    "mind-blown": 42,
    insightful: 128,
    helpful: 89,
  })
  const [userReactions, setUserReactions] = useState<Record<string, boolean>>(() => {
    if (typeof window === "undefined") return {}
    const stored = localStorage.getItem(REACTIONS_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      return parsed[articleId] || {}
    }
    return {}
  })

  const handleReaction = (reactionId: string) => {
    const isActive = userReactions[reactionId]
    const newUserReactions = {
      ...userReactions,
      [reactionId]: !isActive,
    }
    setUserReactions(newUserReactions)

    // Save to localStorage
    const stored = JSON.parse(localStorage.getItem(REACTIONS_KEY) || "{}")
    stored[articleId] = newUserReactions
    localStorage.setItem(REACTIONS_KEY, JSON.stringify(stored))

    setReactionCounts((prev) => ({
      ...prev,
      [reactionId]: isActive ? prev[reactionId] - 1 : prev[reactionId] + 1,
    }))
  }

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl border border-primary/20 p-6"
    >
      <h3 className="font-serif text-lg font-semibold mb-4 text-center text-foreground">What did you think?</h3>

      {/* Reaction Buttons */}
      <div className="flex items-center justify-center gap-4 mb-6">
        {REACTIONS.map((reaction) => {
          const isActive = userReactions[reaction.id]
          return (
            <motion.button
              key={reaction.id}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleReaction(reaction.id)}
              className="relative group"
            >
              {/* Burst animation on click */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className={cn("absolute inset-0 rounded-full", `bg-gradient-to-br ${reaction.color}`)}
                  />
                )}
              </AnimatePresence>

              <div
                className={cn(
                  "relative w-16 h-16 rounded-2xl flex flex-col items-center justify-center transition-all",
                  isActive
                    ? `bg-gradient-to-br ${reaction.color} text-white shadow-lg`
                    : "bg-muted/50 hover:bg-muted text-foreground",
                )}
              >
                <reaction.icon className="w-6 h-6 mb-0.5" />
                <span className="text-xs font-medium">{reactionCounts[reaction.id]}</span>
              </div>

              {/* Tooltip */}
              <motion.span
                initial={{ opacity: 0, y: 5 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap bg-foreground text-background px-2 py-1 rounded-lg"
              >
                {reaction.label}
              </motion.span>
            </motion.button>
          )
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-3">
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted hover:bg-muted/80 transition-all text-foreground"
          >
            <Share2 className="w-4 h-4" />
            <span className="text-sm font-medium">Share</span>
          </motion.button>

          {/* Share Menu */}
          <AnimatePresence>
            {showShareMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 glass rounded-xl border border-border/50 min-w-[180px]"
              >
                <button
                  onClick={handleCopyLink}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm text-foreground"
                >
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied!" : "Copy Link"}
                </button>
                <button
                  onClick={() =>
                    window.open(
                      `https://twitter.com/intent/tweet?text=${encodeURIComponent(articleTitle)}&url=${encodeURIComponent(window.location.href)}`,
                      "_blank",
                    )
                  }
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm text-foreground"
                >
                  <Twitter className="w-4 h-4" />
                  Share on X
                </button>
                <button
                  onClick={() =>
                    window.open(
                      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
                      "_blank",
                    )
                  }
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm text-foreground"
                >
                  <Linkedin className="w-4 h-4" />
                  Share on LinkedIn
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

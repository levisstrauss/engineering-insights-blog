"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ArticleCard } from "@/components/blog/article-card"
import { Button } from "@/components/ui/button"
import { blogPosts } from "@/lib/data"
import { Loader2 } from "lucide-react"

export function BlogGrid() {
  const [displayCount, setDisplayCount] = React.useState(9)
  const [isLoading, setIsLoading] = React.useState(false)

  const publishedPosts = blogPosts.filter((post) => post.status === "published")
  const displayedPosts = publishedPosts.slice(0, displayCount)
  const hasMore = displayCount < publishedPosts.length

  const loadMore = () => {
    setIsLoading(true)
    setTimeout(() => {
      setDisplayCount((prev) => Math.min(prev + 6, publishedPosts.length))
      setIsLoading(false)
    }, 500)
  }

  return (
    <div>
      {/* Posts Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {displayedPosts.map((post, index) => (
          <ArticleCard key={post.id} post={post} variant="default" index={index} />
        ))}
      </div>

      {/* Empty State */}
      {displayedPosts.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
          <p className="text-lg text-muted-foreground">No articles found matching your criteria.</p>
        </motion.div>
      )}

      {/* Load More */}
      {hasMore && (
        <div className="mt-12 text-center">
          <Button
            variant="outline"
            size="lg"
            onClick={loadMore}
            disabled={isLoading}
            className="border-border hover:bg-muted bg-transparent"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              `Load More (${publishedPosts.length - displayCount} remaining)`
            )}
          </Button>
        </div>
      )}

      {/* Results Count */}
      <div className="mt-8 text-center text-sm text-muted-foreground">
        Showing {displayedPosts.length} of {publishedPosts.length} articles
      </div>
    </div>
  )
}

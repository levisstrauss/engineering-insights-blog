"use client"
import { motion } from "framer-motion"
import { ArticleCard } from "@/components/blog/article-card"
import type { BlogPost } from "@/lib/types"

interface RelatedPostsProps {
  posts: BlogPost[]
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null

  return (
    <section className="py-16 bg-card/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
            Related <span className="text-gradient-gold">Articles</span>
          </h2>
          <p className="mt-2 text-muted-foreground">Continue exploring similar topics</p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <ArticleCard key={post.id} post={post} variant="compact" index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

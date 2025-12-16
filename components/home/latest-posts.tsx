"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ArticleCard } from "@/components/blog/article-card"
import { getLatestPosts } from "@/lib/data"

export function LatestPosts() {
  const latestPosts = getLatestPosts(6)

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <div className="flex items-center gap-2 text-primary mb-2">
              <Clock className="h-5 w-5" />
              <span className="text-sm font-medium uppercase tracking-wider">Latest</span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
              Fresh <span className="text-gradient-gold">Content</span>
            </h2>
            <p className="mt-2 text-muted-foreground max-w-lg">
              Stay updated with our newest articles on cutting-edge technology.
            </p>
          </div>
          <Link href="/blog" className="hidden sm:block">
            <Button variant="ghost" className="text-primary hover:text-primary/80">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>

        {/* Latest Posts Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post, index) => (
            <ArticleCard key={post.id} post={post} variant="default" index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link href="/blog">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Explore All Articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

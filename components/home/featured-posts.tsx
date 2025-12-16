"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ArticleCard } from "@/components/blog/article-card"
import { getFeaturedPosts } from "@/lib/data"

export function FeaturedPosts() {
  const featuredPosts = getFeaturedPosts()

  return (
    <section className="pt-12 md:pt-16 pb-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <div className="flex items-center gap-2 text-primary mb-2">
              <Flame className="h-5 w-5" />
              <span className="text-sm font-medium uppercase tracking-wider">Featured</span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
              Trending <span className="text-gradient-gold">Articles</span>
            </h2>
            <p className="mt-2 text-muted-foreground max-w-lg">
              Hand-picked articles showcasing the best of engineering, AI, and modern development.
            </p>
          </div>
          <Link href="/blog" className="hidden sm:block">
            <Button variant="ghost" className="text-primary hover:text-primary/80">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>

        {/* Featured Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredPosts.map((post, index) => (
            <ArticleCard key={post.id} post={post} variant={index === 0 ? "featured" : "default"} index={index} />
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 text-center sm:hidden">
          <Link href="/blog">
            <Button className="bg-primary text-primary-foreground">
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

"use client"
import { motion } from "framer-motion"
import { FileText, TrendingUp, Clock } from "lucide-react"

export function BlogListingHero() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/4 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h1 className="font-serif text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
            All <span className="text-gradient-gold">Articles</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover in-depth tutorials, insights, and best practices from industry experts.
          </p>

          {/* Quick Stats */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 md:gap-12">
            <div className="flex items-center gap-2 text-muted-foreground">
              <FileText className="h-5 w-5 text-primary" />
              <span>150+ Articles</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span>5 Categories</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-5 w-5 text-primary" />
              <span>Updated Weekly</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

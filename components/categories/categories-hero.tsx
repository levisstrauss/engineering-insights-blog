"use client"

import { motion } from "framer-motion"
import { Layers } from "lucide-react"

export function CategoriesHero() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/4 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary mb-6">
            <Layers className="h-4 w-4" />
            <span>Browse by Topic</span>
          </div>
          <h1 className="font-serif text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
            Explore <span className="text-gradient-gold">Categories</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Dive into specialized topics across AI, data science, software engineering, and more.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

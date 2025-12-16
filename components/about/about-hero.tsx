"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

export function AboutHero() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary mb-6">
            <Sparkles className="h-4 w-4" />
            <span>Our Story</span>
          </div>
          <h1 className="font-serif text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
            Building the Future of <span className="text-gradient-gold">Engineering Content</span>
          </h1>
          <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            CodeCraft was founded with a simple mission: to create the most comprehensive, high-quality resource for
            engineers who want to stay at the cutting edge of technology.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

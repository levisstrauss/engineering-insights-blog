"use client"

import type * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Brain, BarChart3, Code2, Globe, Server, ArrowUpRight } from "lucide-react"
import { categories } from "@/lib/data"
import { cn } from "@/lib/utils"

const iconMap: Record<string, React.ElementType> = {
  Brain,
  BarChart3,
  Code2,
  Globe,
  Server,
}

export function CategoriesSection() {
  return (
    <section className="pt-12 md:pt-16 pb-20 bg-card/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
            Explore by <span className="text-gradient-gold">Category</span>
          </h2>
          <p className="mt-2 text-muted-foreground max-w-lg mx-auto">
            Dive into specialized topics across AI, data science, and software engineering.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {categories.map((category, index) => {
            const Icon = iconMap[category.icon] || Code2

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/categories/${category.slug}`}>
                  <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                    {/* Gradient Background */}
                    <div
                      className={cn(
                        "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br",
                        category.color,
                      )}
                    />

                    <div className="relative">
                      {/* Icon */}
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Icon className="h-6 w-6" />
                      </div>

                      {/* Content */}
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{category.description}</p>

                      {/* Post Count & Arrow */}
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{category.postCount} articles</span>
                        <motion.div
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                          whileHover={{ scale: 1.1 }}
                        >
                          <ArrowUpRight className="h-3 w-3" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

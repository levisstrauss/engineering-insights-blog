"use client"

import type * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Brain, BarChart3, Code2, Globe, Server, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Category } from "@/lib/types"

const iconMap: Record<string, React.ElementType> = {
  Brain,
  BarChart3,
  Code2,
  Globe,
  Server,
}

interface CategoryCardProps {
  category: Category
  index: number
}

export function CategoryCard({ category, index }: CategoryCardProps) {
  const Icon = iconMap[category.icon] || Code2

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/categories/${category.slug}`}>
        <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
          {/* Gradient Background */}
          <div
            className={cn(
              "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br",
              category.color,
            )}
          />

          <div className="relative">
            {/* Icon */}
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Icon className="h-8 w-8" />
            </div>

            {/* Content */}
            <h3 className="font-serif text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              {category.name}
            </h3>
            <p className="mt-2 text-muted-foreground">{category.description}</p>

            {/* Footer */}
            <div className="mt-6 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{category.postCount} articles</span>
              <motion.div
                className="flex items-center gap-1 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                whileHover={{ x: 5 }}
              >
                Explore
                <ArrowRight className="h-4 w-4" />
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

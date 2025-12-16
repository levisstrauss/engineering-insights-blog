"use client"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Clock, Eye, Heart, ArrowUpRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn, formatDate, formatNumber } from "@/lib/utils"
import type { BlogPost } from "@/lib/types"

interface ArticleCardProps {
  post: BlogPost
  variant?: "default" | "featured" | "compact"
  index?: number
}

export function ArticleCard({ post, variant = "default", index = 0 }: ArticleCardProps) {
  const isFeatured = variant === "featured"
  const isCompact = variant === "compact"

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <Link href={`/blog/${post.slug}`}>
        <div
          className={cn(
            "relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300",
            "hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5",
            isFeatured ? "h-full" : isCompact ? "h-auto" : "h-full",
          )}
        >
          {/* Cover Image */}
          <div
            className={cn(
              "relative overflow-hidden",
              isFeatured ? "aspect-[16/9]" : isCompact ? "aspect-[16/9]" : "aspect-[16/9]",
            )}
          >
            <Image
              src={post.coverImage || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />

            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <Badge variant="secondary" className="glass text-xs font-medium">
                {post.category.name}
              </Badge>
            </div>

            {/* Featured Badge */}
            {post.featured && (
              <div className="absolute top-4 right-4">
                <Badge className="bg-primary text-primary-foreground text-xs font-medium">Featured</Badge>
              </div>
            )}
          </div>

          {/* Content */}
          <div className={cn("p-4", isFeatured && "md:p-5")}>
            {/* Meta Info */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {post.readTime} min read
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {formatNumber(post.views)}
              </span>
              <span className="flex items-center gap-1">
                <Heart className="h-3 w-3" />
                {formatNumber(post.likes)}
              </span>
            </div>

            {/* Title */}
            <h3
              className={cn(
                "font-serif font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors",
                isFeatured ? "text-xl md:text-2xl" : "text-lg",
              )}
            >
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className={cn("mt-2 text-muted-foreground line-clamp-2", "text-sm")}>{post.excerpt}</p>

            {/* Tags */}
            {!isCompact && (
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <span key={tag.id} className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">
                    #{tag.name}
                  </span>
                ))}
              </div>
            )}

            {/* Author & Date */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8 border border-border">
                  <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="font-medium text-foreground">{post.author.name}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(post.publishedAt)}</p>
                </div>
              </div>
              <motion.div
                className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <ArrowUpRight className="h-4 w-4" />
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

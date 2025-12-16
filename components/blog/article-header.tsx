"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Clock, Eye, Heart, Calendar, Share2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatDate, formatNumber } from "@/lib/utils"
import type { BlogPost } from "@/lib/types"

interface ArticleHeaderProps {
  post: BlogPost
}

export function ArticleHeader({ post }: ArticleHeaderProps) {
  const [liked, setLiked] = React.useState(false)

  return (
    <section className="relative">
      {/* Cover Image */}
      <div className="relative h-[40vh] md:h-[50vh] lg:h-[60vh] overflow-hidden">
        <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      {/* Content Overlay */}
      <div className="relative -mt-48 md:-mt-64 pb-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {/* Back Link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to articles
            </Link>

            {/* Category Badge */}
            <div className="mb-4">
              <Badge className="bg-primary text-primary-foreground">{post.category.name}</Badge>
            </div>

            {/* Title */}
            <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl lg:text-5xl text-balance leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl">{post.excerpt}</p>

            {/* Meta Info */}
            <div className="mt-8 flex flex-wrap items-center gap-6">
              {/* Author */}
              <Link href={`/authors/${post.author.id}`} className="flex items-center gap-3 group">
                <Avatar className="h-12 w-12 border-2 border-primary/20 group-hover:border-primary transition-colors">
                  <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {post.author.name}
                  </p>
                  <p className="text-sm text-muted-foreground">{post.author.role}</p>
                </div>
              </Link>

              {/* Divider */}
              <div className="hidden sm:block h-8 w-px bg-border" />

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.publishedAt)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.readTime} min read
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {formatNumber(post.views)} views
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 ml-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setLiked(!liked)}
                  className={liked ? "text-red-500 border-red-500/30" : "border-border"}
                >
                  <Heart className={`h-4 w-4 mr-1 ${liked ? "fill-current" : ""}`} />
                  {formatNumber(post.likes + (liked ? 1 : 0))}
                </Button>
                <Button variant="outline" size="sm" className="border-border bg-transparent">
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link key={tag.id} href={`/tags/${tag.slug}`}>
                  <Badge
                    variant="outline"
                    className="border-border hover:border-primary hover:text-primary transition-colors cursor-pointer"
                  >
                    #{tag.name}
                  </Badge>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

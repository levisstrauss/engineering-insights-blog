"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Twitter, Github, Linkedin, BookOpen } from "lucide-react"
import type { BlogPost } from "@/lib/types"

interface ArticleSidebarProps {
  post: BlogPost
}

export function ArticleSidebar({ post }: ArticleSidebarProps) {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight - windowHeight
      const scrollTop = window.scrollY
      const scrollProgress = (scrollTop / documentHeight) * 100
      setProgress(Math.min(scrollProgress, 100))
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
      {/* Reading Progress */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" />
              Reading Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="absolute left-0 top-0 h-full bg-primary rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">{Math.round(progress)}% complete</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Author Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-sm font-medium">About the Author</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-20 w-20 border-2 border-primary/20">
                <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h3 className="mt-4 font-semibold text-foreground">{post.author.name}</h3>
              <p className="text-sm text-primary">{post.author.role}</p>
              <p className="mt-2 text-sm text-muted-foreground">{post.author.bio}</p>
              {/* Social Links */}
              <div className="mt-4 flex items-center gap-2">
                {post.author.twitter && (
                  <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                    <a href={`https://twitter.com/${post.author.twitter}`} target="_blank" rel="noopener noreferrer">
                      <Twitter className="h-4 w-4" />
                    </a>
                  </Button>
                )}
                {post.author.github && (
                  <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                    <a href={`https://github.com/${post.author.github}`} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                    </a>
                  </Button>
                )}
                {post.author.linkedin && (
                  <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                    <a
                      href={`https://linkedin.com/in/${post.author.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Table of Contents */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Table of Contents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {["Introduction", "Why This Matters", "Getting Started", "Deep Dive", "Best Practices", "Conclusion"].map(
              (item, index) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                >
                  {index + 1}. {item}
                </a>
              ),
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Tags */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link key={tag.id} href={`/tags/${tag.slug}`}>
                  <Badge
                    variant="outline"
                    className="border-border hover:border-primary hover:text-primary transition-colors cursor-pointer"
                  >
                    {tag.name}
                  </Badge>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </aside>
  )
}

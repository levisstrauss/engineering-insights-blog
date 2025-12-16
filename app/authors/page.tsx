"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Twitter, Github, Linkedin, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { authors, blogPosts } from "@/lib/data"
import {Header} from "@/components/header";
import {Footer} from "@/components/footer";

export default function AuthorsPage() {
  const getPostCount = (authorId: string) => {
    return blogPosts.filter((post) => post.author.id === authorId).length
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              Meet Our <span className="text-primary">Authors</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Industry experts sharing their knowledge and experience. Learn from the best in AI, engineering, and
              software development.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Authors Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {authors.map((author, index) => (
              <motion.article
                key={author.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <div className="relative h-24 w-24 rounded-2xl overflow-hidden ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all">
                      <Image
                        src={author.avatar || "/placeholder.svg"}
                        alt={author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                      {getPostCount(author.id)}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h2 className="font-serif text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {author.name}
                    </h2>
                    <p className="text-primary font-medium">{author.role}</p>
                    <p className="mt-3 text-sm text-muted-foreground">{author.bio}</p>

                    {/* Social Links */}
                    <div className="mt-4 flex items-center gap-3">
                      {author.twitter && (
                        <Link
                          href={`https://twitter.com/${author.twitter}`}
                          target="_blank"
                          className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          <Twitter className="h-4 w-4" />
                        </Link>
                      )}
                      {author.github && (
                        <Link
                          href={`https://github.com/${author.github}`}
                          target="_blank"
                          className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          <Github className="h-4 w-4" />
                        </Link>
                      )}
                      {author.linkedin && (
                        <Link
                          href={`https://linkedin.com/in/${author.linkedin}`}
                          target="_blank"
                          className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          <Linkedin className="h-4 w-4" />
                        </Link>
                      )}
                      <Button variant="outline" size="sm" asChild className="ml-auto bg-transparent">
                        <Link href={`/authors/${author.id}`}>
                          <FileText className="h-4 w-4 mr-2" />
                          View Posts
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-16 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-4">Become an Author</h2>
            <p className="text-muted-foreground mb-6">
              Share your expertise with our growing community of developers and engineers.
            </p>
            <Button>Apply to Write</Button>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}

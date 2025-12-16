"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import { Twitter, Github, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { authors } from "@/lib/data"

export function AboutTeam() {
  return (
    <section className="py-20 bg-card/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
            Meet Our <span className="text-gradient-gold">Authors</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Industry experts sharing their knowledge and experience
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {authors.map((author, index) => (
            <motion.div
              key={author.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 text-center transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full border-2 border-primary/20 group-hover:border-primary transition-colors">
                  <Image src={author.avatar || "/placeholder.svg"} alt={author.name} fill className="object-cover" />
                </div>
                <h3 className="mt-4 font-semibold text-foreground">{author.name}</h3>
                <p className="text-sm text-primary">{author.role}</p>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{author.bio}</p>
                <div className="mt-4 flex items-center justify-center gap-2">
                  {author.twitter && (
                    <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                      <a href={`https://twitter.com/${author.twitter}`} target="_blank" rel="noopener noreferrer">
                        <Twitter className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  {author.github && (
                    <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                      <a href={`https://github.com/${author.github}`} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  {author.linkedin && (
                    <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                      <a href={`https://linkedin.com/in/${author.linkedin}`} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

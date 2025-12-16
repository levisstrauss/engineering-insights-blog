"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"
import { Mail, Check, Sparkles, Zap, BookOpen, Code2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const features = [
  {
    icon: Zap,
    title: "Weekly Insights",
    description: "Curated articles on AI, engineering, and development trends",
  },
  {
    icon: BookOpen,
    title: "Exclusive Content",
    description: "Early access to tutorials and in-depth technical guides",
  },
  {
    icon: Code2,
    title: "Code Snippets",
    description: "Practical code examples you can use in your projects",
  },
]

const pastIssues = [
  { title: "The Future of Web Development with AI", date: "Nov 20, 2024" },
  { title: "Mastering Go Concurrency Patterns", date: "Nov 13, 2024" },
  { title: "Next.js 15: What's New and Exciting", date: "Nov 6, 2024" },
  { title: "Building Scalable Microservices", date: "Oct 30, 2024" },
]

export default function NewsletterPage() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Join 10,000+ subscribers</span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              Stay Ahead of the <span className="text-primary">Curve</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Get weekly insights on engineering, AI, and modern development. No spam, unsubscribe anytime.
            </p>

            {/* Subscription Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-10"
            >
              {subscribed ? (
                <div className="flex items-center justify-center gap-3 p-6 rounded-2xl bg-primary/10 border border-primary/30">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-foreground">You're subscribed!</p>
                    <p className="text-sm text-muted-foreground">Check your inbox for confirmation.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <div className="relative flex-1">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-12 h-14 bg-card border-border text-lg"
                      required
                    />
                  </div>
                  <Button type="submit" size="lg" className="h-14 px-8">
                    Subscribe
                  </Button>
                </form>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Issues */}
      <section className="py-16 bg-card/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-foreground">Past Issues</h2>
            <p className="mt-2 text-muted-foreground">Preview what you'll receive</p>
          </div>

          <div className="max-w-2xl mx-auto space-y-4">
            {pastIssues.map((issue, index) => (
              <motion.div
                key={issue.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-xl bg-background border border-border hover:border-primary/50 transition-colors cursor-pointer"
              >
                <span className="font-medium text-foreground">{issue.title}</span>
                <span className="text-sm text-muted-foreground">{issue.date}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

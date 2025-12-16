"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Mail, CheckCircle2, ArrowRight, Zap, BookOpen, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const benefits = [
  { icon: Zap, text: "Weekly curated insights" },
  { icon: BookOpen, text: "Exclusive tutorials" },
  { icon: Users, text: "Join 12,000+ developers" },
]

export function NewsletterSection() {
  const [email, setEmail] = React.useState("")
  const [isSubmitted, setIsSubmitted] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      setTimeout(() => setIsSubmitted(false), 3000)
      setEmail("")
    }
  }

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-border bg-card/80 backdrop-blur-sm p-8 md:p-12 lg:p-16"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-primary/5 blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary mb-6">
                <Mail className="h-4 w-4" />
                <span>Newsletter</span>
              </div>

              <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
                Level up your <span className="text-gradient-gold">engineering skills</span>
              </h2>

              <p className="mt-4 text-muted-foreground text-lg">
                Get weekly insights on AI, system design, and modern development practices. No spam, just high-quality
                content.
              </p>

              {/* Benefits */}
              <div className="mt-8 space-y-3">
                {benefits.map((benefit) => (
                  <div key={benefit.text} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <benefit.icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm text-foreground">{benefit.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="relative">
              <div className="rounded-2xl border border-border bg-background/50 p-6 md:p-8">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 text-green-500 mb-4">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">You're subscribed!</h3>
                    <p className="mt-2 text-muted-foreground">Check your inbox to confirm your subscription.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-muted/50 border-border focus:border-primary h-12"
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-gold h-12"
                    >
                      Subscribe Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      By subscribing, you agree to our{" "}
                      <a href="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </a>
                      .
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

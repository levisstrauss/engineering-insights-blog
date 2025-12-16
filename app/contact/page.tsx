"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Mail, MapPin, Send, Clock, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {Header} from "@/components/header";
import {Footer} from "@/components/footer";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "zcoulibalyeng@gmail.com",
    href: "mailto:zcoulibalyeng@gmail.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Philadelphia, PA",
    href: null,
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Within 24 hours",
    href: null,
  },
]

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSubmitted, setIsSubmitted] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
        <main className="min-h-screen">
          <Header />
          {/* Hero Section */}
          <section className="relative py-20 lg:py-32 overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-b from-primary/5 via-transparent to-transparent" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-3xl mx-auto"
              >
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
                  Let's Start a <span className="text-gradient-gold">Conversation</span>
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Have a question, suggestion, or just want to say hello? I'd love to hear from you. Fill out the form below
                  and I'll get back to you as soon as possible.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="pb-20 lg:pb-32">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="space-y-8"
                >
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Get in Touch</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Whether you have a technical question or want to collaborate, I'm always open to new conversations.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {contactInfo.map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                        className="flex items-center gap-4 p-4 rounded-xl glass"
                      >
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                          <item.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm text-muted-foreground">{item.label}</p>
                          {item.href ? (
                            <a
                              href={item.href}
                              className="font-medium text-foreground hover:text-primary transition-colors truncate block"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <p className="font-medium text-foreground truncate">{item.value}</p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Decorative Element */}
                  <div className="hidden lg:block relative">
                    <div className="absolute -left-4 top-0 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
                    <div className="relative p-6 rounded-xl glass">
                      <MessageSquare className="h-8 w-8 text-primary mb-4" />
                      <p className="text-sm text-muted-foreground italic">
                        "The best way to predict the future is to create it. Let's build something amazing together."
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="space-y-8"
                >
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Send a Message</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Fill out the form below with your details and I'll get back to you within 24 hours.
                    </p>
                  </div>

                  <div className="p-8 rounded-2xl glass">
                    {isSubmitted ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-12"
                      >
                        <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                          <Send className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="font-serif text-2xl font-bold text-foreground mb-3">Message Sent!</h3>
                        <p className="text-muted-foreground mb-6">
                          Thank you for reaching out. I'll get back to you within 24 hours.
                        </p>
                        <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                          Send Another Message
                        </Button>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid sm:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" placeholder="John Doe" required className="bg-background/50" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="john@example.com"
                              required
                              className="bg-background/50"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject</Label>
                          <Input id="subject" placeholder="What's this about?" required className="bg-background/50" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message">Message</Label>
                          <Textarea
                            id="message"
                            placeholder="Tell me more about your question or project..."
                            rows={6}
                            required
                            className="bg-background/50 resize-none"
                          />
                        </div>

                        <Button
                          type="submit"
                          size="lg"
                          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-gold"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <span className="animate-pulse">Sending...</span>
                          ) : (
                            <>
                              <Send className="mr-2 h-4 w-4" />
                              Send Message
                            </>
                          )}
                        </Button>
                      </form>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
          <Footer />
        </main>
  )
}

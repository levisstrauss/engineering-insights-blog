"use client"

import { motion } from "framer-motion"
import { Code2, Copy, Check, ChevronRight, Lock, Zap, Globe } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const endpoints = [
  {
    method: "GET",
    path: "/api/v1/posts",
    description: "Retrieve a list of all published blog posts",
    auth: false,
  },
  {
    method: "GET",
    path: "/api/v1/posts/:slug",
    description: "Get a single post by its slug",
    auth: false,
  },
  {
    method: "POST",
    path: "/api/v1/posts",
    description: "Create a new blog post",
    auth: true,
  },
  {
    method: "PUT",
    path: "/api/v1/posts/:id",
    description: "Update an existing blog post",
    auth: true,
  },
  {
    method: "DELETE",
    path: "/api/v1/posts/:id",
    description: "Delete a blog post",
    auth: true,
  },
  {
    method: "GET",
    path: "/api/v1/categories",
    description: "List all categories",
    auth: false,
  },
  {
    method: "GET",
    path: "/api/v1/authors",
    description: "List all authors",
    auth: false,
  },
  {
    method: "POST",
    path: "/api/v1/auth/login",
    description: "Authenticate and receive JWT token",
    auth: false,
  },
]

const codeExample = `// Example: Fetching posts
const response = await fetch('https://api.codecraft.dev/v1/posts', {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  }
});

const posts = await response.json();`

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative rounded-xl bg-[#0d0d0d] border border-border overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/30">
        <span className="text-sm text-muted-foreground">JavaScript</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-8 px-2 text-muted-foreground hover:text-foreground"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm text-muted-foreground">{code}</code>
      </pre>
    </div>
  )
}

function MethodBadge({ method }: { method: string }) {
  const colors: Record<string, string> = {
    GET: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30",
    POST: "bg-blue-500/10 text-blue-500 border-blue-500/30",
    PUT: "bg-amber-500/10 text-amber-500 border-amber-500/30",
    DELETE: "bg-red-500/10 text-red-500 border-red-500/30",
  }

  return (
    <Badge variant="outline" className={`font-mono text-xs ${colors[method]}`}>
      {method}
    </Badge>
  )
}

export default function APIReferencePage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Code2 className="h-6 w-6" />
              </div>
              <Badge variant="outline" className="text-primary border-primary">
                v1.0
              </Badge>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">API Reference</h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Complete reference for the CodeCraft REST API. Build integrations, automate workflows, and access all our
              content programmatically.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 border-y border-border bg-card/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Fast & Reliable", desc: "99.9% uptime with global CDN" },
              { icon: Lock, title: "Secure", desc: "JWT authentication & rate limiting" },
              { icon: Globe, title: "RESTful", desc: "Standard REST conventions" },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Endpoints */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Endpoints</h2>
              <div className="space-y-3">
                {endpoints.map((endpoint, index) => (
                  <motion.div
                    key={endpoint.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <MethodBadge method={endpoint.method} />
                      <code className="text-sm font-mono text-foreground">{endpoint.path}</code>
                    </div>
                    <div className="flex items-center gap-3">
                      {endpoint.auth && <Lock className="h-4 w-4 text-muted-foreground" />}
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Quick Example</h2>
              <CodeBlock code={codeExample} />

              <div className="mt-8 p-6 rounded-xl border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-4">Authentication</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  All authenticated endpoints require a Bearer token in the Authorization header. Obtain your API key
                  from the dashboard.
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  Get Your API Key
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

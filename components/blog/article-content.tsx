"use client"
import { motion } from "framer-motion"
import type { BlogPost } from "@/lib/types"
import { CopyCodeButton } from "@/components/ui/copy-code-button"

interface ArticleContentProps {
  post: BlogPost
}

export function ArticleContent({ post }: ArticleContentProps) {
  // Sample article content - in production this would come from a CMS or markdown
  const sampleContent = `
## Introduction

In today's rapidly evolving tech landscape, understanding ${post.category.name.toLowerCase()} has become essential for developers who want to stay competitive. This comprehensive guide will walk you through everything you need to know.

## Why This Matters

The demand for expertise in ${post.tags[0]?.name || "modern technologies"} continues to grow exponentially. Companies are actively seeking developers who can navigate these complex domains with confidence.

### Key Concepts

Before diving deeper, let's establish a foundation with these core concepts:

1. **Architecture Design** - Understanding how to structure your applications for scalability and maintainability
2. **Best Practices** - Following industry standards that have been battle-tested in production
3. **Performance Optimization** - Ensuring your solutions run efficiently at scale
4. **Security Considerations** - Building with security as a first-class concern

## Getting Started

The first step in mastering ${post.category.name.toLowerCase()} is setting up your development environment correctly. This ensures a smooth workflow and helps avoid common pitfalls.

\`\`\`typescript
// Example configuration
const config = {
  environment: 'development',
  debug: true,
  optimization: {
    enabled: true,
    level: 'aggressive'
  }
};

export default config;
\`\`\`

## Deep Dive into Implementation

Now that we have our foundation, let's explore the implementation details. We'll cover the most important aspects that will help you build robust solutions.

### Step 1: Project Structure

A well-organized project structure is crucial for maintainability. Here's a recommended approach:

- Keep related files close together
- Use clear naming conventions
- Separate concerns appropriately
- Document your decisions

### Step 2: Core Implementation

The core implementation follows a modular approach that allows for easy testing and extension. Each module handles a specific responsibility, making the codebase easier to understand and modify.

\`\`\`go
package main

import (
    "fmt"
    "net/http"
)

func main() {
    http.HandleFunc("/api/health", healthHandler)
    http.HandleFunc("/api/users", usersHandler)
    
    fmt.Println("Server starting on :8080")
    http.ListenAndServe(":8080", nil)
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
    w.WriteHeader(http.StatusOK)
    w.Write([]byte("OK"))
}
\`\`\`

## Best Practices

Here are some best practices gathered from years of industry experience:

> "The best code is no code at all. Every new line of code you add to an application adds complexity and potential for bugs."

### Code Quality

Maintaining high code quality involves:

- Writing comprehensive tests
- Following consistent coding standards
- Conducting regular code reviews
- Refactoring when necessary

### Performance

Performance should be considered from the start:

- Profile before optimizing
- Focus on the critical path
- Cache strategically
- Monitor in production

## Conclusion

Mastering ${post.category.name.toLowerCase()} requires dedication and continuous learning. The concepts covered in this article provide a solid foundation, but remember that the field is constantly evolving.

Keep experimenting, stay curious, and never stop learning. The journey of a developer is one of perpetual growth.

---

*Thank you for reading! If you found this article helpful, consider sharing it with your network.*
  `

  const renderCodeBlock = (code: string, language: string, key: number) => {
    return (
      <div key={key} className="relative group my-6">
        <div className="absolute top-3 left-4 text-xs font-mono text-muted-foreground uppercase">{language}</div>
        <CopyCodeButton code={code} />
        <pre className="bg-muted/50 border border-border rounded-xl pt-10 pb-4 px-4 overflow-x-auto">
          <code className="text-sm font-mono text-foreground">{code}</code>
        </pre>
      </div>
    )
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="prose prose-lg prose-invert max-w-none"
    >
      {/* Render markdown-like content */}
      <div className="space-y-6">
        {sampleContent.split("\n\n").map((block, index) => {
          // Headers
          if (block.startsWith("## ")) {
            return (
              <h2 key={index} className="font-serif text-2xl font-bold text-foreground mt-12 mb-4">
                {block.replace("## ", "")}
              </h2>
            )
          }
          if (block.startsWith("### ")) {
            return (
              <h3 key={index} className="font-serif text-xl font-semibold text-foreground mt-8 mb-3">
                {block.replace("### ", "")}
              </h3>
            )
          }
          // Code blocks with copy button
          if (block.includes("```")) {
            const codeMatch = block.match(/```(\w+)?\n([\s\S]*?)```/)
            if (codeMatch) {
              const language = codeMatch[1] || "text"
              const code = codeMatch[2].trim()
              return renderCodeBlock(code, language, index)
            }
          }
          // Blockquotes
          if (block.startsWith(">")) {
            return (
              <blockquote key={index} className="border-l-4 border-primary pl-4 italic text-muted-foreground my-6">
                {block.replace("> ", "")}
              </blockquote>
            )
          }
          // Lists
          if (block.match(/^[0-9]+\.|^-/m)) {
            const items = block.split("\n").filter((item) => item.trim())
            const isOrdered = items[0].match(/^[0-9]+\./)
            const ListTag = isOrdered ? "ol" : "ul"
            return (
              <ListTag
                key={index}
                className={`my-4 space-y-2 ${isOrdered ? "list-decimal" : "list-disc"} list-inside text-foreground/90`}
              >
                {items.map((item, i) => (
                  <li key={i} className="text-foreground/90">
                    {item.replace(/^[0-9]+\.\s*|\*\*|^-\s*/g, "").replace(/\*\*/g, "")}
                  </li>
                ))}
              </ListTag>
            )
          }
          // Horizontal rules
          if (block.trim() === "---") {
            return <hr key={index} className="border-border my-8" />
          }
          // Regular paragraphs
          if (block.trim()) {
            return (
              <p key={index} className="text-foreground/90 leading-relaxed">
                {block.replace(/\*\*(.*?)\*\*/g, "$1")}
              </p>
            )
          }
          return null
        })}
      </div>
    </motion.article>
  )
}

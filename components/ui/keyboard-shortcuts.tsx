"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Keyboard, Search, Moon, ArrowUp, BookOpen, Command } from "lucide-react"

interface ShortcutItem {
  keys: string[]
  description: string
  icon: React.ReactNode
}

const shortcuts: ShortcutItem[] = [
  {
    keys: ["⌘", "K"],
    description: "Open command palette / search",
    icon: <Search className="w-4 h-4" />,
  },
  {
    keys: ["D"],
    description: "Toggle dark/light theme",
    icon: <Moon className="w-4 h-4" />,
  },
  {
    keys: ["G", "H"],
    description: "Go to homepage",
    icon: <ArrowUp className="w-4 h-4" />,
  },
  {
    keys: ["G", "B"],
    description: "Go to blog",
    icon: <BookOpen className="w-4 h-4" />,
  },
  {
    keys: ["?"],
    description: "Show keyboard shortcuts",
    icon: <Keyboard className="w-4 h-4" />,
  },
  {
    keys: ["Esc"],
    description: "Close dialogs",
    icon: <X className="w-4 h-4" />,
  },
]

export function KeyboardShortcuts() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open shortcuts modal with ?
      if (e.key === "?" && !e.metaKey && !e.ctrlKey) {
        e.preventDefault()
        setIsOpen(true)
      }

      // Close with Escape
      if (e.key === "Escape") {
        setIsOpen(false)
      }

      // Toggle theme with D
      if (e.key === "d" && !e.metaKey && !e.ctrlKey && document.activeElement?.tagName !== "INPUT") {
        const html = document.documentElement
        const isDark = html.classList.contains("dark")
        html.classList.toggle("dark", !isDark)
        localStorage.setItem("theme", isDark ? "light" : "dark")
      }

      // Navigation shortcuts
      if (e.key === "g" && !e.metaKey && !e.ctrlKey) {
        const handleNextKey = (nextE: KeyboardEvent) => {
          if (nextE.key === "h") {
            window.location.href = "/"
          } else if (nextE.key === "b") {
            window.location.href = "/blog"
          }
          document.removeEventListener("keydown", handleNextKey)
        }
        document.addEventListener("keydown", handleNextKey, { once: true })
        setTimeout(() => document.removeEventListener("keydown", handleNextKey), 1000)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <>
      {/* Floating trigger button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-24 left-6 z-40 p-3 rounded-full bg-card/80 backdrop-blur-md border border-border shadow-lg hover:border-primary/50 transition-colors group hidden lg:flex"
        aria-label="Keyboard shortcuts"
      >
        <Keyboard className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
      </motion.button>

      {/* Shortcuts Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg"
            >
              <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Command className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="font-serif text-xl font-bold text-foreground">Keyboard Shortcuts</h2>
                      <p className="text-sm text-muted-foreground">Navigate faster with these shortcuts</p>
                    </div>
                  </div>
                  <button onClick={() => setIsOpen(false)} className="p-2 rounded-lg hover:bg-muted transition-colors">
                    <X className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>

                {/* Shortcuts List */}
                <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
                  {shortcuts.map((shortcut, index) => (
                    <motion.div
                      key={shortcut.description}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-muted-foreground">{shortcut.icon}</span>
                        <span className="text-foreground">{shortcut.description}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {shortcut.keys.map((key, i) => (
                          <span key={i}>
                            <kbd className="px-2 py-1 text-xs font-mono font-medium bg-muted border border-border rounded-md text-foreground">
                              {key}
                            </kbd>
                            {i < shortcut.keys.length - 1 && (
                              <span className="mx-1 text-muted-foreground text-xs">+</span>
                            )}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-border bg-muted/30">
                  <p className="text-xs text-center text-muted-foreground">
                    Press <kbd className="px-1.5 py-0.5 text-xs font-mono bg-muted border border-border rounded">?</kbd>{" "}
                    anytime to show this dialog
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

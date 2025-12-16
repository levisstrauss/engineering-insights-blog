"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 100)

    // Complete loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          <motion.div className="relative mb-12">
            {/* Rotating outer rings with different speeds */}
            <motion.div
              className="absolute -inset-8 rounded-full border-2 border-primary/20"
              animate={{ rotate: 360, scale: [1, 1.1, 1] }}
              transition={{
                rotate: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                scale: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
              }}
            />
            <motion.div
              className="absolute -inset-4 rounded-full border border-primary/40"
              animate={{ rotate: -360, scale: [1, 0.95, 1] }}
              transition={{
                rotate: { duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                scale: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
              }}
            />

            {/* Bouncing particles */}
            {[...Array(8)].map((_, i) => {
              const angle = (i * 360) / 8
              const radius = 50
              return (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-primary"
                  style={{
                    left: "50%",
                    top: "50%",
                    marginLeft: "-4px",
                    marginTop: "-4px",
                  }}
                  animate={{
                    x: [0, Math.cos((angle * Math.PI) / 180) * radius, 0],
                    y: [0, Math.sin((angle * Math.PI) / 180) * radius, 0],
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.25,
                    ease: "easeInOut",
                  }}
                />
              )
            })}

            {/* Logo letters with wave effect */}
            <div className="relative flex items-center justify-center w-24 h-24">
              <motion.span
                className="font-serif text-5xl font-bold text-gradient-gold"
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                C
              </motion.span>
              <motion.span
                className="font-serif text-5xl font-bold text-gradient-gold"
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, -5, 0, 5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: 0.2,
                  ease: "easeInOut",
                }}
              >
                C
              </motion.span>
            </div>

            {/* Enhanced glowing effect with color pulse */}
            <motion.div
              className="absolute inset-0 rounded-full blur-xl"
              style={{
                background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
              }}
              animate={{
                opacity: [0.2, 0.6, 0.2],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Brand name */}
          <motion.h1
            className="font-serif text-2xl font-bold text-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Code<span className="text-gradient-gold">Craft</span>
          </motion.h1>

          <div className="w-48 h-1.5 bg-muted rounded-full overflow-hidden relative">
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: "linear-gradient(90deg, hsl(var(--primary)), hsl(45, 100%, 60%))",
              }}
              initial={{ x: "-100%" }}
              animate={{ x: `${Math.min(progress, 100) - 100}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
            {/* Shimmer effect on progress bar */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
              }}
              animate={{ x: ["-100%", "200%"] }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          </div>

          {/* Loading text with typing effect */}
          <motion.p
            className="mt-4 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            Loading excellence...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

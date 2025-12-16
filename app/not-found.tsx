"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft, Search, Compass } from "lucide-react"

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-hidden">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 relative">
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-primary/20"
              initial={{
                x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
                y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
              }}
              animate={{
                x: [null, Math.random() * 1000, Math.random() * 1000],
                y: [null, Math.random() * 800, Math.random() * 800],
              }}
              transition={{
                duration: 20 + Math.random() * 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Spotlight effect following cursor */}
        <div
          className="absolute w-96 h-96 rounded-full pointer-events-none opacity-20 blur-3xl transition-all duration-300"
          style={{
            background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />

        <div className="text-center z-10">
          {/* Glitching 404 */}
          <motion.div
            className="relative mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <motion.span
                className="text-[120px] md:text-[180px] lg:text-[220px] font-serif font-bold text-gradient-gold block leading-none"
                animate={{
                  textShadow: [
                    "0 0 20px hsl(var(--primary))",
                    "0 0 60px hsl(var(--primary))",
                    "0 0 20px hsl(var(--primary))",
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                404
              </motion.span>

              {/* Glitch layers */}
              <motion.span
                className="absolute inset-0 text-[120px] md:text-[180px] lg:text-[220px] font-serif font-bold text-primary/30 block leading-none"
                animate={{ x: [-2, 2, -2], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
              >
                404
              </motion.span>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">
              Lost in the <span className="text-gradient-gold">Code</span>
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto text-lg mb-8">
              The page you're seeking has vanished into the digital void. Perhaps it was refactored, or maybe it never
              existed.
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link href="/">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 min-w-[160px]">
                  <Home className="mr-2 h-5 w-5" />
                  Go Home
                </Button>
              </Link>
              <Button size="lg" variant="outline" onClick={() => window.history.back()}>
                <ArrowLeft className="mr-2 h-5 w-5" />
                Go Back
              </Button>
              <Link href="/blog">
                <Button size="lg" variant="ghost" className="text-primary hover:text-primary/80">
                  <Compass className="mr-2 h-5 w-5" />
                  Explore Blog
                </Button>
              </Link>
            </div>

            {/* Search suggestion */}
            <motion.div
              className="glass-effect rounded-2xl p-6 max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="flex items-center gap-3 text-muted-foreground">
                <Search className="h-5 w-5 text-primary" />
                <span className="text-sm">
                  Try pressing <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Ctrl</kbd> +{" "}
                  <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">K</kbd> to search
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

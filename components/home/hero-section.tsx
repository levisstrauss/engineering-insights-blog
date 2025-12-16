"use client"
import { motion,  Variants } from "framer-motion"
import { ArrowRight, Sparkles, TrendingUp, Users, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const stats = [
  { label: "Articles", value: "150+", icon: FileText },
  { label: "Readers", value: "50K+", icon: Users },
  { label: "This Month", value: "+23%", icon: TrendingUp },
]

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0, 0, 0.2, 1], // TypeScript now knows this is valid
      },
    },
  }

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(212, 175, 55, 0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(212, 175, 55, 0.1) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col items-center text-center">
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
              <Sparkles className="h-4 w-4" />
              <span>Latest insights from industry experts</span>
            </div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="mt-8 max-w-4xl font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <span className="text-balance">
              <span className="text-gradient-gold">Engineering Insights</span> for Modern Developers
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Stay ahead of the curve with cutting-edge insights on AI/ML, Data Science, and Software Engineering. Learn
            from industry experts and level up your technical skills.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-10 flex flex-col items-center gap-3">
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-14 w-full text-base bg-muted/50 border-border focus:border-primary px-5"
              />
              <Button
                size="lg"
                className="h-14 px-8 w-full sm:w-auto bg-yellow-500 hover:bg-yellow-400 text-black font-semibold text-base"
              >
                Subscribe
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              12,000+ developers getting weekly insights. No spam, unsubscribe anytime.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants} className="mt-16 grid grid-cols-3 gap-8 md:gap-16">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <div className="flex items-center gap-2">
                  <stat.icon className="h-5 w-5 text-primary" />
                  <span className="text-2xl font-bold text-foreground md:text-3xl">{stat.value}</span>
                </div>
                <span className="mt-1 text-sm text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

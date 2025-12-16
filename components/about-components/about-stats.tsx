"use client"

import { motion } from "framer-motion"

const stats = [
  { value: "150+", label: "Articles Published" },
  { value: "50K+", label: "Monthly Readers" },
  { value: "12K+", label: "Newsletter Subscribers" },
  { value: "4", label: "Expert Authors" },
]

export function AboutStats() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-gradient-gold md:text-5xl">{stat.value}</div>
              <div className="mt-2 text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

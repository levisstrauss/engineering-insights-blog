"use client"

import { motion } from "framer-motion"
import { Target, Lightbulb, Users, Rocket } from "lucide-react"

const values = [
  {
    icon: Target,
    title: "Excellence",
    description: "We strive for the highest quality in every article, tutorial, and resource we create.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We stay ahead of the curve, covering emerging technologies and methodologies.",
  },
  {
    icon: Users,
    title: "Community",
    description: "We foster a supportive community where engineers can learn and grow together.",
  },
  {
    icon: Rocket,
    title: "Impact",
    description: "We measure our success by the careers we help accelerate and problems we help solve.",
  },
]

export function AboutMission() {
  return (
    <section className="py-20 bg-card/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
            Our <span className="text-gradient-gold">Values</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <value.icon className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-foreground text-lg">{value.title}</h3>
              <p className="mt-2 text-muted-foreground">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

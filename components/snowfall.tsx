"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Snowflake {
  id: number
  x: number
  size: number
  duration: number
  delay: number
  opacity: number
  blur: number
}

export function Snowfall() {
  // 1. Initialize with an empty array so server & client match initially
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([])

  useEffect(() => {
    // 2. Generate the random values ONLY on the client side
    const flakes: Snowflake[] = []
    const snowflakeCount = 50

    for (let i = 0; i < snowflakeCount; i++) {
      flakes.push({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.6 + 0.3,
        blur: Math.random() * 2,
      })
    }

    setSnowflakes(flakes)
  }, [])

  return (
      <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
        {snowflakes.map((flake) => (
            <motion.div
                key={flake.id}
                className="absolute -top-2 rounded-full bg-white"
                style={{
                  left: `${flake.x}%`,
                  width: flake.size,
                  height: flake.size,
                  opacity: flake.opacity,
                  filter: `blur(${flake.blur}px)`,
                  boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
                }}
                animate={{
                  y: ["0vh", "100vh"],
                  x: [0, Math.sin(flake.id) * 50, 0],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: flake.duration,
                  delay: flake.delay,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
            />
        ))}
      </div>
  )
}

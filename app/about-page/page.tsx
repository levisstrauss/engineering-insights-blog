import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

import { AboutHero } from "@/components/about-components/about-hero"
import { AboutMission } from "@/components/about-components/about-mission"
import { AboutTeam } from "@/components/about-components/about-team"
import { AboutStats } from "@/components/about-components/about-stats"



export const metadata: Metadata = {
  title: "About",
  description: "Learn about-page-components EngineeringInsight - our mission, team, and commitment to engineering excellence.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
          <AboutHero />
          <AboutMission />
          <AboutStats />
          <AboutTeam />
      </main>
      <Footer />
    </div>
  )
}

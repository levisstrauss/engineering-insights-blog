import type { Metadata } from "next"
import { Header } from "@/components/header"


export const metadata: Metadata = {
  title: "About",
  description: "Learn about EngineeringInsight - our mission, team, and commitment to engineering excellence.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>

      </main>

    </div>
  )
}

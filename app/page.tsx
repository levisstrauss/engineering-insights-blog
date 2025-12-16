import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/home/hero-section"
import { FeaturedPosts } from "@/components/home/featured-posts"


export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
        <Header />
        <main>
            <HeroSection />
            <FeaturedPosts />

        </main>
        <Footer />
    </div>
  )
}

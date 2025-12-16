import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/home/hero-section"
import { FeaturedPosts } from "@/components/home/featured-posts"
import { CategoriesSection } from "@/components/home/categories-section"
import { LatestPosts } from "@/components/home/latest-posts"
import { NewsletterSection } from "@/components/home/newsletter-section"


export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
        <Header />
        <main>
            <HeroSection />
            <FeaturedPosts />
            <CategoriesSection />
            <LatestPosts />
            <NewsletterSection />
        </main>
        <Footer />
    </div>
  )
}

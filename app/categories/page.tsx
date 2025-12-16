import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoriesHero } from "@/components/categories/categories-hero"
import { CategoryCard } from "@/components/categories/category-card"
import { categories } from "@/lib/data"

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse articles by category - AI/ML, Data Science, Software Engineering, Web Development, and more.",
}

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <CategoriesHero />
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {categories.map((category, index) => (
                <CategoryCard key={category.id} category={category} index={index} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

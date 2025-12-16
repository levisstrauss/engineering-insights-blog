// import type { Metadata } from "next"
// import { Header } from "@/components/header"
// import { Footer } from "@/components/footer"
// import { BlogListingHero } from "@/components/blog/blog-listing-hero"
// import { BlogFilters } from "@/components/blog/blog-filters"
// import { BlogGrid } from "@/components/blog/blog-grid"
//
// export const metadata: Metadata = {
//   title: "Blog",
//   description: "Explore our latest articles on AI, Machine Learning, Data Science, and Software Engineering.",
// }
//
// export default function BlogPage() {
//   return (
//     <div className="min-h-screen bg-background">
//       <Header />
//       <main>
//         <BlogListingHero />
//         <section className="py-12">
//           <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//             <BlogFilters />
//             <BlogGrid />
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </div>
//   )
// }


import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogListingHero } from "@/components/blog/blog-listing-hero"
import { BlogContent } from "@/components/blog/blog-content" // Import the new component

export const metadata: Metadata = {
    title: "Blog",
    description: "Explore our latest articles on AI, Machine Learning, Data Science, and Software Engineering.",
}

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main>
                <BlogListingHero />
                <section className="py-12">
                    {/* Use the new orchestrator component */}
                    <BlogContent />
                </section>
            </main>
            <Footer />
        </div>
    )
}

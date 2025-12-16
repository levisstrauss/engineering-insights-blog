"use client"

import * as React from "react"
import { BlogFilters, type FilterState } from "@/components/blog/blog-filters"
import { BlogGrid } from "@/components/blog/blog-grid"
import { blogPosts } from "@/lib/data"

export function BlogContent() {
    // 1. Shared State
    const [filters, setFilters] = React.useState<FilterState>({
        searchQuery: "",
        selectedCategory: "all",
        selectedTags: [],
        sortBy: "latest",
    })

    // 2. The Logic to Filter Posts
    const filteredPosts = React.useMemo(() => {
        return blogPosts
            .filter((post) => {
                // Filter by Status
                if (post.status !== "published") return false

                // Filter by Category
                if (filters.selectedCategory !== "all" && post.category.slug !== filters.selectedCategory) {
                    return false
                }

                // Filter by Search Query (Title or Excerpt)
                if (filters.searchQuery) {
                    const query = filters.searchQuery.toLowerCase()
                    const matchesTitle = post.title.toLowerCase().includes(query)
                    const matchesExcerpt = post.excerpt.toLowerCase().includes(query)
                    if (!matchesTitle && !matchesExcerpt) return false
                }

                // Filter by Tags (Checks if post contains ANY of the selected tags)
                if (filters.selectedTags.length > 0) {
                    const postTagSlugs = post.tags.map((t) => t.slug)
                    const hasMatchingTag = filters.selectedTags.some((tag) => postTagSlugs.includes(tag))
                    if (!hasMatchingTag) return false
                }

                return true
            })
            .sort((a, b) => {
                // Sort Logic
                switch (filters.sortBy) {
                    case "oldest":
                        return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
                    case "popular":
                        return b.views - a.views
                    case "trending":
                        return b.likes - a.likes // Assuming likes = trending
                    case "latest":
                    default:
                        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
                }
            })
    }, [filters])

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* 3. Pass state to filters */}
            <BlogFilters filters={filters} setFilters={setFilters} />

            {/* 4. Pass filtered data to grid */}
            <BlogGrid posts={filteredPosts} />
        </div>
    )
}

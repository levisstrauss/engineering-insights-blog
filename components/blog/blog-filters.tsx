// "use client"
//
// import * as React from "react"
// import { motion } from "framer-motion"
// import { Search, SlidersHorizontal, X } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { categories, tags } from "@/lib/data"
// import { cn } from "@/lib/utils"
//
// export function BlogFilters() {
//   const [searchQuery, setSearchQuery] = React.useState("")
//   const [selectedCategory, setSelectedCategory] = React.useState<string>("all")
//   const [selectedTags, setSelectedTags] = React.useState<string[]>([])
//   const [sortBy, setSortBy] = React.useState("latest")
//   const [showFilters, setShowFilters] = React.useState(false)
//
//   const toggleTag = (tagSlug: string) => {
//     setSelectedTags((prev) => (prev.includes(tagSlug) ? prev.filter((t) => t !== tagSlug) : [...prev, tagSlug]))
//   }
//
//   const clearFilters = () => {
//     setSearchQuery("")
//     setSelectedCategory("all")
//     setSelectedTags([])
//     setSortBy("latest")
//   }
//
//   const hasActiveFilters = searchQuery || selectedCategory !== "all" || selectedTags.length > 0
//
//   return (
//     <div className="mb-8 space-y-4">
//       {/* Main Filter Bar */}
//       <div className="flex flex-col sm:flex-row gap-4">
//         {/* Search */}
//         <div className="relative flex-1">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//           <Input
//             type="search"
//             placeholder="Search articles..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="pl-10 bg-muted/50 border-border focus:border-primary"
//           />
//         </div>
//
//         {/* Category Select */}
//         <Select value={selectedCategory} onValueChange={setSelectedCategory}>
//           <SelectTrigger className="w-full sm:w-48 bg-muted/50 border-border">
//             <SelectValue placeholder="Category" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Categories</SelectItem>
//             {categories.map((category) => (
//               <SelectItem key={category.id} value={category.slug}>
//                 {category.name}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//
//         {/* Sort Select */}
//         <Select value={sortBy} onValueChange={setSortBy}>
//           <SelectTrigger className="w-full sm:w-40 bg-muted/50 border-border">
//             <SelectValue placeholder="Sort by" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="latest">Latest</SelectItem>
//             <SelectItem value="oldest">Oldest</SelectItem>
//             <SelectItem value="popular">Most Popular</SelectItem>
//             <SelectItem value="trending">Trending</SelectItem>
//           </SelectContent>
//         </Select>
//
//         {/* Toggle Filters Button */}
//         <Button
//           variant="outline"
//           onClick={() => setShowFilters(!showFilters)}
//           className={cn("border-border", showFilters && "bg-primary/10 border-primary text-primary")}
//         >
//           <SlidersHorizontal className="h-4 w-4 mr-2" />
//           Filters
//         </Button>
//       </div>
//
//       {/* Expanded Filters */}
//       {showFilters && (
//         <motion.div
//           initial={{ opacity: 0, height: 0 }}
//           animate={{ opacity: 1, height: "auto" }}
//           exit={{ opacity: 0, height: 0 }}
//           className="p-4 rounded-xl border border-border bg-card"
//         >
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-sm font-medium text-foreground">Filter by Tags</h3>
//             {hasActiveFilters && (
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={clearFilters}
//                 className="text-muted-foreground hover:text-foreground"
//               >
//                 <X className="h-3 w-3 mr-1" />
//                 Clear all
//               </Button>
//             )}
//           </div>
//           <div className="flex flex-wrap gap-2">
//             {tags.map((tag) => (
//               <Badge
//                 key={tag.id}
//                 variant={selectedTags.includes(tag.slug) ? "default" : "outline"}
//                 className={cn(
//                   "cursor-pointer transition-colors",
//                   selectedTags.includes(tag.slug) ? "bg-primary text-primary-foreground" : "hover:bg-muted",
//                 )}
//                 onClick={() => toggleTag(tag.slug)}
//               >
//                 {tag.name}
//               </Badge>
//             ))}
//           </div>
//         </motion.div>
//       )}
//
//       {/* Active Filters Display */}
//       {hasActiveFilters && (
//         <div className="flex flex-wrap items-center gap-2">
//           <span className="text-sm text-muted-foreground">Active filters:</span>
//           {searchQuery && (
//             <Badge variant="secondary" className="gap-1">
//               Search: {searchQuery}
//               <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchQuery("")} />
//             </Badge>
//           )}
//           {selectedCategory !== "all" && (
//             <Badge variant="secondary" className="gap-1">
//               {categories.find((c) => c.slug === selectedCategory)?.name}
//               <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedCategory("all")} />
//             </Badge>
//           )}
//           {selectedTags.map((tagSlug) => (
//             <Badge key={tagSlug} variant="secondary" className="gap-1">
//               {tags.find((t) => t.slug === tagSlug)?.name}
//               <X className="h-3 w-3 cursor-pointer" onClick={() => toggleTag(tagSlug)} />
//             </Badge>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }


"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { categories, tags } from "@/lib/data"
import { cn } from "@/lib/utils"

// 1. Define the props structure
export interface FilterState {
  searchQuery: string
  selectedCategory: string
  selectedTags: string[]
  sortBy: string
}

interface BlogFiltersProps {
  filters: FilterState
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>
}

// 2. Accept props
export function BlogFilters({ filters, setFilters }: BlogFiltersProps) {
  const [showFilters, setShowFilters] = React.useState(false)

  // Helper to update specific fields
  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const toggleTag = (tagSlug: string) => {
    const currentTags = filters.selectedTags
    const newTags = currentTags.includes(tagSlug)
        ? currentTags.filter((t) => t !== tagSlug)
        : [...currentTags, tagSlug]
    updateFilter("selectedTags", newTags)
  }

  const clearFilters = () => {
    setFilters({
      searchQuery: "",
      selectedCategory: "all",
      selectedTags: [],
      sortBy: "latest"
    })
  }

  const hasActiveFilters = filters.searchQuery || filters.selectedCategory !== "all" || filters.selectedTags.length > 0

  return (
      <div className="mb-8 space-y-4">
        {/* Main Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                placeholder="Search articles..."
                value={filters.searchQuery}
                onChange={(e) => updateFilter("searchQuery", e.target.value)}
                className="pl-10 bg-muted/50 border-border focus:border-primary"
            />
          </div>

          {/* Category Select */}
          <Select
              value={filters.selectedCategory}
              onValueChange={(val) => updateFilter("selectedCategory", val)}
          >
            <SelectTrigger className="w-full sm:w-48 bg-muted/50 border-border">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                  <SelectItem key={category.id} value={category.slug}>
                    {category.name}
                  </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort Select */}
          <Select
              value={filters.sortBy}
              onValueChange={(val) => updateFilter("sortBy", val)}
          >
            <SelectTrigger className="w-full sm:w-40 bg-muted/50 border-border">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="trending">Trending</SelectItem>
            </SelectContent>
          </Select>

          {/* Toggle Filters Button */}
          <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className={cn("border-border", showFilters && "bg-primary/10 border-primary text-primary")}
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Expanded Filters (Tags) */}
        {showFilters && (
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="p-4 rounded-xl border border-border bg-card"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-foreground">Filter by Tags</h3>
                {hasActiveFilters && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3 w-3 mr-1" />
                      Clear all
                    </Button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <Badge
                        key={tag.id}
                        variant={filters.selectedTags.includes(tag.slug) ? "default" : "outline"}
                        className={cn(
                            "cursor-pointer transition-colors",
                            filters.selectedTags.includes(tag.slug) ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                        )}
                        onClick={() => toggleTag(tag.slug)}
                    >
                      {tag.name}
                    </Badge>
                ))}
              </div>
            </motion.div>
        )}

        {/* Active Filters Display */}
        {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {filters.searchQuery && (
                  <Badge variant="secondary" className="gap-1">
                    Search: {filters.searchQuery}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilter("searchQuery", "")} />
                  </Badge>
              )}
              {filters.selectedCategory !== "all" && (
                  <Badge variant="secondary" className="gap-1">
                    {categories.find((c) => c.slug === filters.selectedCategory)?.name}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilter("selectedCategory", "all")} />
                  </Badge>
              )}
              {filters.selectedTags.map((tagSlug) => (
                  <Badge key={tagSlug} variant="secondary" className="gap-1">
                    {tags.find((t) => t.slug === tagSlug)?.name}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => toggleTag(tagSlug)} />
                  </Badge>
              ))}
            </div>
        )}
      </div>
  )
}

"use client"

import dynamic from "next/dynamic"
import type { BlogPost } from "@/lib/types"

const ArticleReactions = dynamic(
  () => import("@/components/innovative/article-reactions").then((mod) => ({ default: mod.ArticleReactions })),
  { ssr: false },
)

const BookmarkButton = dynamic(
  () => import("@/components/bookmark-button").then((mod) => ({ default: mod.BookmarkButton })),
  { ssr: false },
)

interface ClientFeaturesProps {
  post: BlogPost
}

export function ClientFeatures({ post }: ClientFeaturesProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end">
        <BookmarkButton post={post} variant="full" />
      </div>
      <ArticleReactions articleId={post.id} articleTitle={post.title} />
    </div>
  )
}

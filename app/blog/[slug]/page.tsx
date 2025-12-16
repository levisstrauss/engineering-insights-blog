import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArticleHeader } from "@/components/blog/article-header"
import { ArticleContent } from "@/components/blog/article-content"
import { ArticleSidebar } from "@/components/blog/article-sidebar"
import { RelatedPosts } from "@/components/blog/related-posts"
import { getPostBySlug, getRelatedPosts, blogPosts } from "@/lib/data"
import { ClientFeatures } from "@/components/blog/client-features"

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

interface Tag {
  name: string;
}

interface BlogPost {
  title: string;
  excerpt: string;
  publishedAt: string;
  updatedAt: string;
  author: { name: string; twitter?: string };
  category: { name: string };
  tags: Tag[];
  coverImage: string;
  slug: string;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug) as BlogPost | undefined


  if (!post) {
    return { title: "Article Not Found" }
  }

  const siteUrl = "https://engineeringinsights.dev"

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      section: post.category.name,
      tags: post.tags.map((t) => t.name),
      images: [
        {
          url: post.coverImage.startsWith("http") ? post.coverImage : `${siteUrl}${post.coverImage}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      url: `${siteUrl}/blog/${post.slug}`,
      siteName: "CodeCraft",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage.startsWith("http") ? post.coverImage : `${siteUrl}${post.coverImage}`],
      creator: post.author.twitter ? `@${post.author.twitter}` : "@engineeringinsights_dev",
    },
    alternates: {
      canonical: `${siteUrl}/blog/${post.slug}`,
    },
  }
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(post.id, 3)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ArticleHeader post={post} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
            <div className="space-y-8">
              <ArticleContent post={post} />
              <ClientFeatures post={post} />
            </div>
            <ArticleSidebar post={post} />
          </div>
        </div>
        <RelatedPosts posts={relatedPosts} />
      </main>
      <Footer />
    </div>
  )
}

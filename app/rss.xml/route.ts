import { blogPosts } from "@/lib/data"


interface Tag {
  name: string;
}

interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  status: string;
  author: { name: string };
  category: { name: string };
  tags: Tag[]; // This fixes the error by explicitly typing the array
}

export async function GET() {
  const siteUrl = "https://engineeringinsights.dev"

  const posts: BlogPost[] = blogPosts as BlogPost[];

  const rssItems = posts
    .filter((post) => post.status === "published")
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <author>${post.author.name}</author>
      <category>${post.category.name}</category>
      ${post.tags.map((tag) => `<category>${tag.name}</category>`).join("\n      ")}
    </item>`,
    )
    .join("\n")

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>CodeCraft Engineering Blog</title>
    <link>${siteUrl}</link>
    <description>Cutting-edge insights on AI/ML, Data Science, and Software Engineering. Learn from industry experts.</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${siteUrl}/og-image.jpg</url>
      <title>CodeCraft Engineering Blog</title>
      <link>${siteUrl}</link>
    </image>
    ${rssItems}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  })
}

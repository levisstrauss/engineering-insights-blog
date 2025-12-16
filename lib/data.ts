import type { Author, Category, BlogPost, Tag } from "./types"

export const authors: Author[] = [
  {
    id: "1",
    name: "Alexandra Chen",
    avatar: "/professional-woman-developer-portrait.jpg",
    role: "Senior AI Engineer",
    bio: "Leading AI research at top tech companies. Passionate about making ML accessible to everyone.",
    twitter: "alexchen_ai",
    github: "alexchen",
    linkedin: "alexandra-chen",
  },
  {
    id: "2",
    name: "Marcus Williams",
    avatar: "/professional-man-software-engineer-portrait.jpg",
    role: "Principal Software Architect",
    bio: "Building scalable systems for 15+ years. Go enthusiast and distributed systems expert.",
    twitter: "marcusw_dev",
    github: "marcuswilliams",
    linkedin: "marcus-williams-dev",
  },
  {
    id: "3",
    name: "Sarah Nakamura",
    avatar: "/professional-asian-woman-data-scientist-portrait.jpg",
    role: "Data Science Lead",
    bio: "Transforming data into actionable insights. Former Google and Meta data scientist.",
    twitter: "sarah_data",
    github: "sarahnakamura",
    linkedin: "sarah-nakamura",
  },
  {
    id: "4",
    name: "David Rodriguez",
    avatar: "/professional-hispanic-man-developer-portrait.jpg",
    role: "Full Stack Developer",
    bio: "Crafting beautiful web experiences. Next.js contributor and open source advocate.",
    twitter: "davidr_web",
    github: "davidrodriguez",
    linkedin: "david-rodriguez-dev",
  },
]

export const categories: Category[] = [
  {
    id: "1",
    name: "AI & Machine Learning",
    slug: "ai-ml",
    description: "Explore the cutting edge of artificial intelligence and machine learning",
    icon: "Brain",
    color: "from-amber-500 to-orange-600",
    postCount: 24,
  },
  {
    id: "2",
    name: "Data Science",
    slug: "data-science",
    description: "Master data analysis, visualization, and statistical modeling",
    icon: "BarChart3",
    color: "from-emerald-500 to-teal-600",
    postCount: 18,
  },
  {
    id: "3",
    name: "Software Engineering",
    slug: "software-engineering",
    description: "Best practices in architecture, design patterns, and system design",
    icon: "Code2",
    color: "from-blue-500 to-indigo-600",
    postCount: 32,
  },
  {
    id: "4",
    name: "Web Development",
    slug: "web-development",
    description: "Modern frontend and backend development techniques",
    icon: "Globe",
    color: "from-pink-500 to-rose-600",
    postCount: 28,
  },
  {
    id: "5",
    name: "Backend & APIs",
    slug: "backend-apis",
    description: "API design, Go development, database optimization, and security",
    icon: "Server",
    color: "from-violet-500 to-purple-600",
    postCount: 21,
  },
]

export const tags: Tag[] = [
  { id: "1", name: "Go", slug: "go" },
  { id: "2", name: "TypeScript", slug: "typescript" },
  { id: "3", name: "React", slug: "react" },
  { id: "4", name: "Next.js", slug: "nextjs" },
  { id: "5", name: "PostgreSQL", slug: "postgresql" },
  { id: "6", name: "Python", slug: "python" },
  { id: "7", name: "TensorFlow", slug: "tensorflow" },
  { id: "8", name: "PyTorch", slug: "pytorch" },
  { id: "9", name: "Docker", slug: "docker" },
  { id: "10", name: "Kubernetes", slug: "kubernetes" },
  { id: "11", name: "REST API", slug: "rest-api" },
  { id: "12", name: "GraphQL", slug: "graphql" },
  { id: "13", name: "JWT", slug: "jwt" },
  { id: "14", name: "RBAC", slug: "rbac" },
  { id: "15", name: "Microservices", slug: "microservices" },
]

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building Production-Ready REST APIs with Go: A Complete Guide",
    slug: "building-production-ready-rest-apis-with-go",
    excerpt:
      "Learn how to design, implement, and deploy robust REST APIs using Go. From project structure to authentication and deployment.",
    content: "",
    coverImage: "/modern-api-architecture-diagram-dark-theme-gold-ac.jpg",
    author: authors[1],
    category: categories[4],
    tags: [tags[0], tags[10], tags[4], tags[12]],
    publishedAt: "2024-11-25T10:00:00Z",
    updatedAt: "2024-11-25T10:00:00Z",
    readTime: 15,
    views: 12450,
    likes: 892,
    featured: true,
    status: "published",
  },
  {
    id: "2",
    title: "Implementing Role-Based Access Control (RBAC) in Modern Applications",
    slug: "implementing-rbac-modern-applications",
    excerpt:
      "A deep dive into RBAC patterns, JWT authentication, and secure authorization strategies for enterprise applications.",
    content: "",
    coverImage: "/security-authentication-lock-shield-dark-theme.jpg",
    author: authors[1],
    category: categories[4],
    tags: [tags[0], tags[13], tags[12], tags[14]],
    publishedAt: "2024-11-22T08:00:00Z",
    updatedAt: "2024-11-22T08:00:00Z",
    readTime: 12,
    views: 8920,
    likes: 654,
    featured: true,
    status: "published",
  },
  {
    id: "3",
    title: "Transformers Architecture Explained: From Attention to GPT-4",
    slug: "transformers-architecture-explained",
    excerpt:
      "Understand the revolutionary architecture behind modern language models. Complete walkthrough with code examples.",
    content: "",
    coverImage: "/neural-network-transformer-architecture-visualizat.jpg",
    author: authors[0],
    category: categories[0],
    tags: [tags[5], tags[7], tags[6]],
    publishedAt: "2024-11-20T12:00:00Z",
    updatedAt: "2024-11-21T09:00:00Z",
    readTime: 20,
    views: 15680,
    likes: 1243,
    featured: true,
    status: "published",
  },
  {
    id: "4",
    title: "PostgreSQL Performance Optimization: Advanced Techniques",
    slug: "postgresql-performance-optimization",
    excerpt:
      "Master query optimization, indexing strategies, and performance tuning for PostgreSQL databases at scale.",
    content: "",
    coverImage: "/database-optimization-performance-chart-dark-theme.jpg",
    author: authors[2],
    category: categories[1],
    tags: [tags[4], tags[0]],
    publishedAt: "2024-11-18T14:00:00Z",
    updatedAt: "2024-11-18T14:00:00Z",
    readTime: 18,
    views: 9340,
    likes: 712,
    featured: false,
    status: "published",
  },
  {
    id: "5",
    title: "Next.js 14 Server Actions: The Complete Guide",
    slug: "nextjs-14-server-actions-complete-guide",
    excerpt:
      "Leverage Server Actions for seamless full-stack development. Build forms, handle mutations, and optimize data flow.",
    content: "",
    coverImage: "/nextjs-react-server-components-diagram-dark.jpg",
    author: authors[3],
    category: categories[3],
    tags: [tags[3], tags[2], tags[1]],
    publishedAt: "2024-11-15T09:00:00Z",
    updatedAt: "2024-11-16T11:00:00Z",
    readTime: 14,
    views: 18920,
    likes: 1567,
    featured: true,
    status: "published",
  },
  {
    id: "6",
    title: "Database Migrations Done Right: Strategies and Tools",
    slug: "database-migrations-strategies-tools",
    excerpt: "Learn battle-tested migration strategies for zero-downtime deployments and safe schema evolution.",
    content: "",
    coverImage: "/database-migration-version-control-dark-theme.jpg",
    author: authors[1],
    category: categories[4],
    tags: [tags[4], tags[0], tags[8]],
    publishedAt: "2024-11-12T16:00:00Z",
    updatedAt: "2024-11-12T16:00:00Z",
    readTime: 11,
    views: 6780,
    likes: 489,
    featured: false,
    status: "published",
  },
  {
    id: "7",
    title: "Fine-Tuning Large Language Models: A Practical Approach",
    slug: "fine-tuning-large-language-models",
    excerpt:
      "Step-by-step guide to fine-tuning LLMs for domain-specific tasks. Covers LoRA, QLoRA, and full fine-tuning.",
    content: "",
    coverImage: "/ai-machine-learning-training-process-visualization.jpg",
    author: authors[0],
    category: categories[0],
    tags: [tags[5], tags[7], tags[6]],
    publishedAt: "2024-11-10T11:00:00Z",
    updatedAt: "2024-11-11T08:00:00Z",
    readTime: 22,
    views: 21340,
    likes: 1890,
    featured: false,
    status: "published",
  },
  {
    id: "8",
    title: "Building Microservices with Go: Patterns and Best Practices",
    slug: "building-microservices-go-patterns",
    excerpt:
      "Design resilient microservices architecture with Go. Event-driven patterns, service mesh, and observability.",
    content: "",
    coverImage: "/microservices-architecture-diagram-cloud-dark.jpg",
    author: authors[1],
    category: categories[2],
    tags: [tags[0], tags[14], tags[8], tags[9]],
    publishedAt: "2024-11-08T13:00:00Z",
    updatedAt: "2024-11-08T13:00:00Z",
    readTime: 19,
    views: 11250,
    likes: 934,
    featured: false,
    status: "published",
  },
  {
    id: "9",
    title: "Advanced Data Visualization with Python and D3.js",
    slug: "advanced-data-visualization-python-d3",
    excerpt: "Create stunning interactive visualizations combining Python data processing with D3.js rendering.",
    content: "",
    coverImage: "/data-visualization-charts-graphs-colorful-dark-the.jpg",
    author: authors[2],
    category: categories[1],
    tags: [tags[5], tags[1]],
    publishedAt: "2024-11-05T10:00:00Z",
    updatedAt: "2024-11-05T10:00:00Z",
    readTime: 16,
    views: 8670,
    likes: 623,
    featured: false,
    status: "published",
  },
  {
    id: "10",
    title: "TypeScript Design Patterns for React Applications",
    slug: "typescript-design-patterns-react",
    excerpt: "Master advanced TypeScript patterns for building type-safe, maintainable React applications.",
    content: "",
    coverImage: "/typescript-code-editor-clean-design-dark.jpg",
    author: authors[3],
    category: categories[3],
    tags: [tags[1], tags[2], tags[3]],
    publishedAt: "2024-11-02T15:00:00Z",
    updatedAt: "2024-11-03T09:00:00Z",
    readTime: 13,
    views: 14560,
    likes: 1102,
    featured: false,
    status: "published",
  },
  {
    id: "11",
    title: "Securing APIs with JWT and OAuth 2.0",
    slug: "securing-apis-jwt-oauth",
    excerpt: "Comprehensive guide to API security. Implement JWT authentication and OAuth 2.0 authorization flows.",
    content: "",
    coverImage: "/api-security-authentication-oauth-dark.jpg",
    author: authors[1],
    category: categories[4],
    tags: [tags[0], tags[12], tags[10]],
    publishedAt: "2024-10-30T08:00:00Z",
    updatedAt: "2024-10-30T08:00:00Z",
    readTime: 17,
    views: 10890,
    likes: 845,
    featured: false,
    status: "published",
  },
  {
    id: "12",
    title: "Building Real-Time Features with WebSockets and Go",
    slug: "real-time-websockets-go",
    excerpt:
      "Implement real-time communication in Go applications. Chat systems, live updates, and scaling strategies.",
    content: "",
    coverImage: "/websocket-real-time-communication-diagram-dark.jpg",
    author: authors[1],
    category: categories[2],
    tags: [tags[0], tags[14]],
    publishedAt: "2024-10-27T12:00:00Z",
    updatedAt: "2024-10-27T12:00:00Z",
    readTime: 15,
    views: 7890,
    likes: 578,
    featured: false,
    status: "published",
  },
  {
    id: "13",
    title: "Machine Learning Model Deployment: From Notebook to Production",
    slug: "ml-model-deployment-production",
    excerpt:
      "Bridge the gap between ML experimentation and production. MLOps best practices and deployment strategies.",
    content: "",
    coverImage: "/mlops-pipeline-deployment-diagram-dark.jpg",
    author: authors[0],
    category: categories[0],
    tags: [tags[5], tags[8], tags[9]],
    publishedAt: "2024-10-24T14:00:00Z",
    updatedAt: "2024-10-25T10:00:00Z",
    readTime: 21,
    views: 13450,
    likes: 1078,
    featured: false,
    status: "published",
  },
  {
    id: "14",
    title: "GraphQL vs REST: Making the Right Choice for Your API",
    slug: "graphql-vs-rest-api-choice",
    excerpt: "Detailed comparison of GraphQL and REST architectures. When to use each and migration strategies.",
    content: "",
    coverImage: "/placeholder.svg?height=600&width=1200",
    author: authors[3],
    category: categories[4],
    tags: [tags[11], tags[10], tags[1]],
    publishedAt: "2024-10-21T09:00:00Z",
    updatedAt: "2024-10-21T09:00:00Z",
    readTime: 12,
    views: 9560,
    likes: 723,
    featured: false,
    status: "published",
  },
  {
    id: "15",
    title: "Statistical Analysis for Data Scientists: Beyond the Basics",
    slug: "statistical-analysis-data-scientists",
    excerpt:
      "Advanced statistical methods for real-world data analysis. Hypothesis testing, regression, and Bayesian inference.",
    content: "",
    coverImage: "/placeholder.svg?height=600&width=1200",
    author: authors[2],
    category: categories[1],
    tags: [tags[5]],
    publishedAt: "2024-10-18T11:00:00Z",
    updatedAt: "2024-10-18T11:00:00Z",
    readTime: 19,
    views: 6780,
    likes: 512,
    featured: false,
    status: "published",
  },
  {
    id: "16",
    title: "Kubernetes for Developers: Essential Concepts and Workflows",
    slug: "kubernetes-developers-essential-concepts",
    excerpt:
      "Everything developers need to know about Kubernetes. Deployments, services, and local development workflows.",
    content: "",
    coverImage: "/placeholder.svg?height=600&width=1200",
    author: authors[1],
    category: categories[2],
    tags: [tags[9], tags[8]],
    publishedAt: "2024-10-15T16:00:00Z",
    updatedAt: "2024-10-16T08:00:00Z",
    readTime: 18,
    views: 11230,
    likes: 867,
    featured: false,
    status: "published",
  },
]

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter((post) => post.featured && post.status === "published").slice(0, 4)
}

export function getLatestPosts(limit = 6): BlogPost[] {
  return blogPosts
    .filter((post) => post.status === "published")
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit)
}

export function getPostsByCategory(categorySlug: string): BlogPost[] {
  return blogPosts.filter((post) => post.category.slug === categorySlug && post.status === "published")
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getRelatedPosts(postId: string, limit = 3): BlogPost[] {
  const currentPost = blogPosts.find((post) => post.id === postId)
  if (!currentPost) return []

  return blogPosts
    .filter(
      (post) =>
        post.id !== postId &&
        post.status === "published" &&
        (post.category.id === currentPost.category.id ||
          post.tags.some((tag) => currentPost.tags.some((t) => t.id === tag.id))),
    )
    .slice(0, limit)
}

export function searchPosts(query: string): BlogPost[] {
  const lowerQuery = query.toLowerCase()
  return blogPosts.filter(
    (post) =>
      post.status === "published" &&
      (post.title.toLowerCase().includes(lowerQuery) ||
        post.excerpt.toLowerCase().includes(lowerQuery) ||
        post.tags.some((tag) => tag.name.toLowerCase().includes(lowerQuery)) ||
        post.category.name.toLowerCase().includes(lowerQuery)),
  )
}

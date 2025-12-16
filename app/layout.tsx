import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "EngineeringInsight | Engineering Excellence Blog",
    template: "%s | EngineeringInsight",
  },
  description:
    "Dive deep into AI/ML, Data Science, & Software Engineering. Expert insights for modern developers.",
  keywords: [
    "engineering",
    "AI",
    "machine learning",
    "data science",
    "software development",
    "web development",
    "programming",
    "Go",
    "TypeScript",
  ],
  authors: [{ name: "EngineeringInsight Team" }],
  creator: "EngineeringInsight",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://engineeringinsight.dev",
    siteName: "EngineeringInsight",
    title: "EngineeringInsight | Engineering Excellence Blog",
    description: "Dive deep into AI/ML, Data Science, Software Engineering, and Web Development.",
  },
  twitter: {
    card: "summary_large_image",
    title: "EngineeringInsight | Engineering Excellence Blog",
    description: "Dive deep into AI/ML, Data Science, Software Engineering, and Web Development.",
  },
  robots: {
    index: true,
    follow: true,
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1a1a2e" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f1a" },
  ],
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} ${geistMono.variable} font-sans antialiased`}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange={false}>
        {children}
      </ThemeProvider>
      </body>
    </html>
  )
}

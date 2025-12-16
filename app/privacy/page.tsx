"use client"

import { motion } from "framer-motion"

const sections = [
  {
    title: "Information We Collect",
    content: `We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us for support. This may include your name, email address, and any other information you choose to provide.

We automatically collect certain information when you use our platform, including your IP address, browser type, operating system, referring URLs, and information about how you interact with our content.`,
  },
  {
    title: "How We Use Your Information",
    content: `We use the information we collect to provide, maintain, and improve our services, including to personalize your experience and recommend content that may interest you.

We also use your information to communicate with you about products, services, and events offered by CodeCraft, and to provide customer support and respond to your inquiries.`,
  },
  {
    title: "Information Sharing",
    content: `We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy or as required by law.

We may share your information with service providers who assist us in operating our platform, conducting our business, or servicing you, provided they agree to keep this information confidential.`,
  },
  {
    title: "Data Security",
    content: `We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.

While we strive to protect your personal information, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security of your data.`,
  },
  {
    title: "Your Rights",
    content: `You have the right to access, correct, or delete your personal information at any time. You may also opt out of receiving promotional communications from us.

If you are a resident of the European Economic Area, you have additional rights under the GDPR, including the right to data portability and the right to lodge a complaint with a supervisory authority.`,
  },
  {
    title: "Cookies",
    content: `We use cookies and similar tracking technologies to track activity on our platform and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.

We use both session cookies (which expire when you close your browser) and persistent cookies (which remain on your device until deleted) to provide you with a more personalized experience.`,
  },
  {
    title: "Changes to This Policy",
    content: `We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.

We encourage you to review this policy periodically for any changes. Your continued use of the platform after any modifications constitutes your acceptance of the updated policy.`,
  },
  {
    title: "Contact Us",
    content: `If you have any questions about this Privacy Policy or our data practices, please contact us at privacy@codecraft.dev.

You may also write to us at: CodeCraft Inc., 123 Tech Street, San Francisco, CA 94102, United States.`,
  },
]

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground">Privacy Policy</h1>
            <p className="mt-4 text-muted-foreground">Last updated: November 27, 2024</p>
            <p className="mt-6 text-lg text-muted-foreground">
              Your privacy is important to us. This policy explains how we collect, use, and protect your personal
              information when you use CodeCraft.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">{section.title}</h2>
                <div className="prose prose-muted max-w-none">
                  {section.content.split("\n\n").map((paragraph, i) => (
                    <p key={i} className="text-muted-foreground leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

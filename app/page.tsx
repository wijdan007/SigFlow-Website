import { Suspense } from 'react'
import type { Metadata } from 'next'
import Navbar from '@/components/ui/Navbar'
import Hero from '@/components/sections/Hero'
import WhatWeDo from '@/components/sections/WhatWeDo'
import HowItWorks from '@/components/sections/HowItWorks'
import Results from '@/components/sections/Results'
import Founder from '@/components/sections/Founder'
import SignalFeed from '@/components/sections/SignalFeed'
import FAQ from '@/components/sections/FAQ'
import BookACall from '@/components/sections/BookACall'
import Footer from '@/components/sections/Footer'
import Clients from '@/components/sections/Clients'
import TechStack from '@/components/sections/TechStack'

export const metadata: Metadata = {
  title: 'Sigflow GTM – Signal-Driven Go-To-Market for B2B Teams',
  description:
    'Sigflow GTM builds your outbound engine using 40+ buying signals. Cold email infrastructure, Clay-powered targeting, and full GTM systems that deliver qualified meetings in 20-30 days.',
  alternates: { canonical: 'https://sigflowgtm.com' },
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* JSON-LD WebPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Sigflow GTM',
            url: 'https://sigflowgtm.com',
            description: 'Signal-driven go-to-market systems for B2B teams.',
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sigflowgtm.com' }],
            },
          }),
        }}
      />
      <Navbar />
      <Suspense fallback={<div className="h-screen bg-[#0A0A0A]" />}>
        <Hero />
      </Suspense>
      <Clients />
      <WhatWeDo />
      <TechStack />
      <HowItWorks />
      <Results />
      <Founder />
      <SignalFeed />
      <FAQ />
      <BookACall />
      <Footer />
    </main>
  )
}

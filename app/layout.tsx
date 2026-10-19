import type { Metadata } from 'next'
import ClientLayout from './ClientLayout'
import './globals.css'

const BASE_URL = 'https://sigflowgtm.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: '%s | Sigflow GTM',
    default: 'Sigflow GTM – Signal-Driven Go-To-Market for B2B Teams',
  },
  description:
    'Sigflow GTM builds your entire outbound system using 40+ buying signals. Signal-based targeting, cold email infrastructure, and GTM engineering that fills your pipeline in weeks — not months.',
  keywords: [
    'GTM agency', 'signal-based outbound', 'B2B pipeline', 'cold email agency',
    'Clay GTM', 'outbound systems', 'sales pipeline', 'ICP targeting', 'GTM engineering',
  ],
  authors: [{ name: 'Sigflow GTM', url: BASE_URL }],
  creator: 'Sigflow GTM',
  openGraph: {
    type: 'website',
    url: BASE_URL,
    siteName: 'Sigflow GTM',
    title: 'Sigflow GTM – Signal-Driven Go-To-Market',
    description: 'We build outbound systems using 40+ buying signals to fill your B2B pipeline with qualified meetings — results in 20-30 days.',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sigflow GTM – Signal-Driven Go-To-Market',
    description: 'We build outbound systems using 40+ buying signals to fill your B2B pipeline with qualified meetings — results in 20-30 days.',
    creator: '@sigflowgtm',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: {
    canonical: BASE_URL,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo-blue.png" type="image/png" />
        <link rel="icon" href="/logo-blue.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/logo-blue.png" sizes="192x192" type="image/png" />
        <link rel="apple-touch-icon" href="/logo-blue.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* JSON-LD: Organization */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Sigflow GTM',
          url: BASE_URL,
          logo: BASE_URL + '/logo-blue.png',
          email: 'ceo@sigflowgtm.com',
          address: { '@type': 'PostalAddress', addressLocality: 'Dubai', addressCountry: 'AE' },
          contactPoint: { '@type': 'ContactPoint', email: 'ceo@sigflowgtm.com', contactType: 'customer service', availableLanguage: 'English' },
          sameAs: ['https://www.linkedin.com/company/sigflow-gtm/', 'https://x.com/SigFlowGTM'],
        }) }} />

        {/* JSON-LD: WebSite with SearchAction */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Sigflow GTM',
          url: BASE_URL,
          description: 'Signal-driven go-to-market systems for B2B teams.',
        }) }} />

        {/* JSON-LD: ProfessionalService */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          name: 'Sigflow GTM',
          url: BASE_URL,
          description: 'We build signal-driven outbound systems, GTM engineering, and ICP targeting for B2B companies.',
          areaServed: 'Worldwide',
          priceRange: '$$',
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'GTM Services',
            itemListElement: [
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Outbound Systems', description: 'Full cold outbound infrastructure: sequences, mailboxes, copywriting, precision targeting.' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'GTM Engineering', description: 'Clay, signal enrichment, ICP scoring, and CRM sync.' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Signal-Based Targeting', description: '40+ buying signals to identify and prioritize leads most likely to convert.' } },
            ],
          },
        }) }} />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}

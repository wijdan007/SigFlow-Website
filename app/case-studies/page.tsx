import type { Metadata } from 'next'
import CaseStudiesContent from './CaseStudiesContent'

export const metadata: Metadata = {
  title: 'Case Studies',
  description:
    'Real GTM transformations. See how Sigflow builds pipeline for B2B companies using signal-based outbound — verified numbers, straight from client dashboards.',
  alternates: { canonical: 'https://sigflowgtm.com/case-studies' },
  openGraph: {
    title: 'Case Studies | Sigflow GTM',
    description: 'Real GTM transformations with verified numbers, straight from client dashboards.',
    url: 'https://sigflowgtm.com/case-studies',
    // Overriding openGraph in a child route drops the inherited image, so point at it explicitly
    images: ['/opengraph-image'],
  },
}

export default function CaseStudiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Case Studies | Sigflow GTM',
            url: 'https://sigflowgtm.com/case-studies',
    // Overriding openGraph in a child route drops the inherited image, so point at it explicitly
    images: ['/opengraph-image'],
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sigflowgtm.com' },
                { '@type': 'ListItem', position: 2, name: 'Case Studies', item: 'https://sigflowgtm.com/case-studies' },
              ],
            },
          }),
        }}
      />
      <CaseStudiesContent />
    </>
  )
}

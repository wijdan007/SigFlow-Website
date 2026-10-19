import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Don't block /_next/: Google needs the CSS/JS to render pages
        disallow: ['/api/', '/studio', '/thank-you'],
      },
    ],
    sitemap: 'https://sigflowgtm.com/sitemap.xml',
    host: 'https://sigflowgtm.com',
  }
}

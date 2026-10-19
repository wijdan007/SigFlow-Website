import { MetadataRoute } from 'next'
import { client, isSanityConfigured } from '@/lib/sanity'
import { postSlugsQuery } from '@/lib/sanity.queries'

const BASE_URL = 'https://sigflowgtm.com'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/case-studies`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  ]

  let posts: { slug: string }[] = []
  if (isSanityConfigured) {
    try {
      posts = await client.fetch(postSlugsQuery)
    } catch {
      // Sitemap should still build if Sanity is unreachable
    }
  }

  return [
    ...pages,
    ...posts.map((p) => ({
      url: `${BASE_URL}/blog/${p.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}

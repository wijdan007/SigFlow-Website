import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PortableText } from 'next-sanity'
import { client, isSanityConfigured } from '@/lib/sanity'
import { postBySlugQuery, postSlugsQuery } from '@/lib/sanity.queries'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/sections/Footer'

interface Post {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  excerpt?: string
  tags?: string[]
  mainImage?: { asset: { url: string }; alt?: string }
  body?: unknown[]
}

export async function generateStaticParams() {
  if (!isSanityConfigured) return []
  const slugs: { slug: string }[] = await client.fetch(postSlugsQuery)
  return slugs.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  if (!isSanityConfigured) return {}
  const post: Post | null = await client.fetch(postBySlugQuery, { slug: params.slug })
  if (!post) return {}
  const url = `https://sigflowgtm.com/blog/${params.slug}`
  // Without a cover image, fall back to the site-wide share image
  const images = post.mainImage?.asset?.url ? [post.mainImage.asset.url] : undefined
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url,
      publishedTime: post.publishedAt,
      images: images ?? ['/opengraph-image'],
    },
    // Only override when there's a cover image; otherwise keep the inherited site twitter-image
    ...(images && { twitter: { card: 'summary_large_image', images } }),
  }
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  if (!isSanityConfigured) notFound()
  const post: Post | null = await client.fetch(
    postBySlugQuery,
    { slug: params.slug },
    { next: { revalidate: 60 } },
  )
  if (!post) notFound()

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    image: post.mainImage?.asset?.url,
    url: `https://sigflowgtm.com/blog/${params.slug}`,
    mainEntityOfPage: `https://sigflowgtm.com/blog/${params.slug}`,
    author: { '@type': 'Organization', name: 'Sigflow GTM', url: 'https://sigflowgtm.com' },
    publisher: {
      '@type': 'Organization',
      name: 'Sigflow GTM',
      logo: { '@type': 'ImageObject', url: 'https://sigflowgtm.com/icon-512.png' },
    },
  }

  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
    <Navbar />
    <main className="min-h-screen pt-32 pb-28 px-6" style={{ background: '#0A0A0A' }}>
      <div className="max-w-2xl mx-auto">

        {/* Back */}
        <a
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm mb-10 hover:text-white transition-colors"
          style={{ color: '#3B82F6', textDecoration: 'none' }}
        >
          ← Back to Blog
        </a>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags?.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(59,130,246,0.12)', color: '#3B82F6' }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4" style={{ color: '#F8FAFC' }}>
          {post.title}
        </h1>

        {/* Date */}
        <p className="text-sm mb-8" style={{ color: '#94A3B8' }}>
          {new Date(post.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric',
          })}
        </p>

        {/* Cover image */}
        {post.mainImage?.asset?.url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.mainImage.asset.url}
            alt={post.mainImage.alt ?? post.title}
            className="w-full rounded-2xl mb-10 object-cover"
            style={{ maxHeight: 400 }}
          />
        )}

        {/* Body */}
        <div className="prose-blog">
          {post.body && <PortableText value={post.body as any} />}
        </div>

        {/* CTA */}
        <div
          className="mt-16 rounded-2xl p-8 text-center"
          style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)' }}
        >
          <p className="font-semibold mb-4" style={{ color: '#F8FAFC' }}>
            Ready to build your GTM system?
          </p>
          <a
            href="https://calendly.com/book-strategycall-sigflow-wijdan"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow px-7 py-3 w-full sm:w-auto"
          >
            Book a Free Call
          </a>
        </div>
      </div>

      <style>{`
        .prose-blog { color: #94A3B8; line-height: 1.85; font-size: 1.0625rem; }
        .prose-blog p { margin-bottom: 1.4em; }
        .prose-blog h2 { color: #F8FAFC; font-size: 1.5rem; font-weight: 700; margin: 2em 0 0.6em; }
        .prose-blog h3 { color: #F8FAFC; font-size: 1.2rem; font-weight: 600; margin: 1.6em 0 0.5em; }
        .prose-blog strong { color: #F8FAFC; font-weight: 600; }
        .prose-blog a { color: #3B82F6; text-decoration: underline; text-underline-offset: 3px; }
        .prose-blog ul, .prose-blog ol { padding-left: 1.5em; margin-bottom: 1.4em; }
        .prose-blog li { margin-bottom: 0.4em; }
        .prose-blog blockquote { border-left: 3px solid #3B82F6; padding-left: 1.2em; margin: 1.6em 0; color: #64748B; font-style: italic; }
        .prose-blog img { border-radius: 12px; margin: 1.6em 0; max-width: 100%; }
        .prose-blog code { background: rgba(59,130,246,0.1); color: #93C5FD; padding: 0.15em 0.4em; border-radius: 4px; font-size: 0.9em; }
      `}</style>
    </main>
    <Footer />
    </>
  )
}

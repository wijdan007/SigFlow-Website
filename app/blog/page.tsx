import type { Metadata } from 'next'
import Link from 'next/link'
import { client, isSanityConfigured } from '@/lib/sanity'
import { postsQuery } from '@/lib/sanity.queries'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/sections/Footer'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'GTM insights, outbound strategy, and signal-based growth from the Sigflow team.',
  alternates: { canonical: 'https://sigflowgtm.com/blog' },
  openGraph: {
    title: 'The Sigflow Blog',
    description: 'GTM insights, outbound strategy, and signal-based growth from the Sigflow team.',
    url: 'https://sigflowgtm.com/blog',
    // Overriding openGraph in a child route drops the inherited image, so point at it explicitly
    images: ['/opengraph-image'],
  },
}

interface Post {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  excerpt?: string
  tags?: string[]
  mainImage?: { asset: { url: string }; alt?: string }
}

export default async function BlogPage() {
  const posts: Post[] = isSanityConfigured
    ? await client.fetch(postsQuery, {}, { next: { revalidate: 60 } })
    : []

  return (
    <>
    <Navbar />
    <main className="min-h-screen pt-32 pb-28 px-6" style={{ background: '#0A0A0A' }}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <span className="section-label">Insights</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-4" style={{ color: '#F8FAFC' }}>
            The Sigflow Blog
          </h1>
          <p className="text-lg" style={{ color: '#94A3B8' }}>
            GTM strategy, outbound playbooks, and signal-based growth.
          </p>
        </div>

        {posts.length === 0 ? (
          <p style={{ color: '#94A3B8' }}>No posts yet — check back soon.</p>
        ) : (
          <div className="flex flex-col gap-8">
            {posts.map((post) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug.current}`}
                style={{ textDecoration: 'none' }}
              >
                {/* Hover via CSS: event handlers are not allowed in server components */}
                <article className="rounded-2xl p-7 transition-colors duration-200 group border border-white/[0.07] bg-white/[0.03] hover:border-[#3B82F6]/30 hover:bg-[#3B82F6]/[0.04]">
                  {post.mainImage?.asset?.url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.mainImage.asset.url}
                      alt={post.mainImage.alt ?? post.title}
                      className="w-full rounded-xl mb-5 object-cover"
                      style={{ maxHeight: 280 }}
                    />
                  )}
                  <div className="flex flex-wrap gap-2 mb-3">
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
                  <h2
                    className="text-xl font-bold mb-2 group-hover:text-[#3B82F6] transition-colors"
                    style={{ color: '#F8FAFC' }}
                  >
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-sm leading-relaxed mb-4" style={{ color: '#64748B' }}>
                      {post.excerpt}
                    </p>
                  )}
                  <p className="text-xs" style={{ color: '#64748B' }}>
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric',
                    })}
                  </p>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
    <Footer />
    </>
  )
}

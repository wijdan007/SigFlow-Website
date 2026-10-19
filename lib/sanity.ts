import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const configured = !!(projectId && /^[a-z0-9-]+$/.test(projectId))

export const client = createClient({
  projectId: configured ? projectId! : 'placeholder',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

export const isSanityConfigured = configured

const builder = imageUrlBuilder(client)
export const urlFor = (source: SanityImageSource) => builder.image(source)

import { getThoughts } from 'app/thoughts/utils'

export const baseUrl = 'https://bytode.dev'

export default async function sitemap() {
  let thoughts = getThoughts().map((post) => ({
    url: `${baseUrl}/thoughts/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }))

  let routes = ['', '/thoughts'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...thoughts]
}

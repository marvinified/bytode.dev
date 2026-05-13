import { getCommits } from 'app/commits/utils'

const defaultBaseUrl = 'https://bytode.dev'

function normalizeBaseUrl(url: string) {
  return url.endsWith('/') ? url.slice(0, -1) : url
}

export const baseUrl = normalizeBaseUrl(
  process.env.BASE_URL || process.env.NEXT_PUBLIC_BASE_URL || defaultBaseUrl
)

export default async function sitemap() {
  let commits = getCommits().map((post) => ({
    url: `${baseUrl}/commits/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }))

  let routes = ['', '/commits'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...commits]
}

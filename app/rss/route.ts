import { baseUrl } from 'app/sitemap'
import { getCommits } from 'app/commits/utils'

export async function GET() {
  let allCommits = await getCommits()

  const itemsXml = allCommits
    .sort((a, b) => {
      if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
        return -1
      }
      return 1
    })
    .map(
      (post) =>
        `<item>
          <title>${post.metadata.title}</title>
          <link>${baseUrl}/commits/${post.slug}</link>
          <description>${post.metadata.summary || ''}</description>
          <pubDate>${new Date(
            post.metadata.publishedAt
          ).toUTCString()}</pubDate>
        </item>`
    )
    .join('\n')

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
        <title>Hi, I'm Marvin</title>
        <link>${baseUrl}</link>
        <description>I build software mostly around AI, automation, and agents. Currently building Stagerun. I randomly share my written commits here: notes from the trenches... what I’m learning, what I’m building,  what broke, without leaving out the times I over-engineered a simple solution.</description>
        ${itemsXml}
    </channel>
  </rss>`

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'text/xml',
    },
  })
}

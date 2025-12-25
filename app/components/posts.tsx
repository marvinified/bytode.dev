import Link from 'next/link'
import { formatDate, getThoughts } from 'app/thoughts/utils'

interface ThoughtsPostsProps {
  showAll?: boolean
}

export function ThoughtsPosts({ showAll = false }: ThoughtsPostsProps) {
  const allThoughts = getThoughts()
  const MAX_POSTS = Math.min(3, allThoughts.length -1)
  return (
    <div>
        {allThoughts
          .sort((a, b) => {
            if (
              new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
            ) {
              return -1
            }
            return 1
          }).slice(0, showAll ? undefined : MAX_POSTS)
          .map((post) => (
            <Link
              key={post.slug}
              className="flex flex-col space-y-1 mb-2"
              href={`/thoughts/${post.slug}`}
            >
              <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
                
                <p className="text-neutral-400 w-[100px] whitespace-nowrap shrink-0">
                  {formatDate(post.metadata.publishedAt, false)}
                </p>
                <p className="text-neutral-600 text-ellipsis overflow-hidden whitespace-nowrap">
                  {post.metadata.title}
                </p>
              </div>
            </Link>
          ))}
          {
            !showAll && allThoughts.length > MAX_POSTS && (
              <Link href="/thoughts" className="text-neutral-900 underline">Older thoughts</Link>
            )
          }
    </div>
  )
}

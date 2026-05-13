import { formatDate, getCommits } from 'app/commits/utils'
import { HashIcon } from 'lucide-react';
import { HoverPreviewLink } from './hover-preview-link'

interface CommitsPostsProps {
  showAll?: boolean
}

export function CommitsPosts({ showAll = false }: CommitsPostsProps) {
  const allCommits = getCommits()
  const MAX_POSTS = Math.min(3, allCommits.length)
  return (
    <div className="space-y-4">
      <div className="space-y-2">

        {allCommits
          .sort((a, b) => {
            if (
              new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
            ) {
              return -1
            }
            return 1
          }).slice(0, showAll ? undefined : MAX_POSTS)
          .map((post) => (
            <HoverPreviewLink
              key={post.slug}
              className="flex flex-col space-y-1 mb-2 w-fit max-w-full"
              href={`/commits/${post.slug}`}
            >
              <div className="flex flex-col md:flex-row md:items-center space-x-0 md:space-x-2">
                <div className="flex items-center space-x-2 text-sm">
                  <HashIcon className="w-4 h-4 text-neutral-900" />
                  <p className="text-neutral-400 w-[80px] whitespace-nowrap shrink-0">
                    {formatDate(post.metadata.publishedAt, false)}
                  </p>
                </div>
                <p className="text-neutral-600 text-ellipsis overflow-hidden whitespace-nowrap">
                  {post.metadata.title}
                </p>
              </div>
            </HoverPreviewLink>
          ))}
        {
          !showAll && allCommits.length > MAX_POSTS && (
            <HoverPreviewLink href="/commits" className="text-neutral-900 underline text-sm">More</HoverPreviewLink>
          )
        }
      </div>
    </div>
  )
}

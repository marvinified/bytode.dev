import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import { formatDate, getCommits } from 'app/commits/utils'
import { baseUrl } from 'app/sitemap'
import { ArrowLeftIcon, Link } from 'lucide-react';
import { HoverPreviewLink } from 'app/components/hover-preview-link';

function resolveOgImageUrl(title: string, description?: string) {
  return `/og?title=${encodeURIComponent(title)}${description ? `&description=${encodeURIComponent(description)}` : ''}`
}

export async function generateStaticParams() {
  let posts = getCommits()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  let post = getCommits().find((post) => post.slug === slug)
  if (!post) {
    return
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image: _image,
    author,
  } = post.metadata
  let ogImage = resolveOgImageUrl(title, description)

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/commits/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function Blog({ params }) {
  const { slug } = await params
  let post = getCommits().find((post) => post.slug === slug)

  if (!post) {
    notFound()
  }

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: resolveOgImageUrl(post.metadata.title, post.metadata.summary),
            url: `${baseUrl}/commits/${post.slug}`,
            author: {
              '@type': 'Person',
              name: 'My Portfolio',
            },
          }),
        }}
      />
      <div className="flex justify-between items-center my-4 text-sm">
        <p className="text-sm text-neutral-600">
          {formatDate(post.metadata.publishedAt)}
        </p>
      </div>
      <h1 className="title font-semibold text-3xl">
        {post.metadata.title}
      </h1>
      <p className="text-sm text-neutral-600 py-2">
        {post.metadata.summary}
      </p>

      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
      <p className="text-sm text-neutral-600 py-2 flex items-center space-x-2">
        <ArrowLeftIcon className="w-4 h-4" /> <HoverPreviewLink href="/commits">Back to all commits</HoverPreviewLink>
      </p>
    </section>
  )
}

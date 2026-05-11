import { ThoughtsPosts } from 'app/components/posts'
import { baseUrl } from 'app/sitemap'

export const metadata = {
  title: 'Thoughts',
  description: 'Explore my written thoughts.',
  openGraph: {
    title: 'Thoughts',
    description: 'Explore my written thoughts.',
    url: `${baseUrl}/thoughts`,
    images: [
      {
        url: '/og?title=Thoughts&description=Explore%20my%20written%20thoughts.',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thoughts',
    description: 'Explore my written thoughts.',
    images: ['/og?title=Thoughts&description=Explore%20my%20written%20thoughts.'],
  },
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-3xl mb-8">My Thoughts</h1>
      <ThoughtsPosts showAll />
    </section>
  )
}

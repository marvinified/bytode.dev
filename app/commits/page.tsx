import { CommitsPosts } from 'app/components/posts'
import { baseUrl } from 'app/sitemap'

export const metadata = {
  title: 'Commits',
  description: 'Explore my written commits.',
  openGraph: {
    title: 'Commits',
    description: 'Explore my written commits.',
    url: `${baseUrl}/commits`,
    images: [
      {
        url: '/og?title=Commits&description=Explore%20my%20written%20commits.',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Commits',
    description: 'Explore my written commits.',
    images: ['/og?title=Commits&description=Explore%20my%20written%20commits.'],
  },
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-3xl mb-8">Commits</h1>
      <CommitsPosts showAll />
    </section>
  )
}

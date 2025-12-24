import { ThoughtsPosts } from 'app/components/posts'

export const metadata = {
  title: 'Thoughts',
  description: 'Explore my written thoughts.',
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-3xl mb-8">My Thoughts</h1>
      <ThoughtsPosts showAll />
    </section>
  )
}

import { ThoughtsPosts } from 'app/components/posts'
import { TimeBasedGreeting } from 'app/components/easter-eggs'
import { HoverPreviewLink } from 'app/components/hover-preview-link'

export default function Page() {
  return (
    <section>
      <div className="prose">
        <h2>
          <TimeBasedGreeting />
        </h2>
        <p>
          I'm <strong>Marvin</strong>, wrote my first many lines of code at 13, Interestingly it wasn't "Hello World" but a crappy calculator in Java. <i>(Java didn't stick though)</i>
        </p>

        <p>
          Today, I build software with <HoverPreviewLink href="https://www.typescriptlang.org/">TypeScript</HoverPreviewLink>, <HoverPreviewLink href="https://www.python.org/">Python</HoverPreviewLink> & really any language that gets the job done. Primarily around AI, automations and agents.
        </p>

        <p>
          Currently building <HoverPreviewLink href="https://stagerun.ai">Stagerun</HoverPreviewLink>.
          {/* and <HoverPreviewLink href="https://atlascopilot.com">Atlas</HoverPreviewLink>. */}
        </p>

        <p>
          I share my written <HoverPreviewLink href="/thoughts">thoughts</HoverPreviewLink> here. Notes from the trenches... what I’m learning, what I’m building,  what broke, without leaving out the times I over-engineered a simple solution.
        </p>

        <p>
          You can read my most recent thoughts below.
        </p>
      </div>
      <div className="my-6">
        <ThoughtsPosts />
      </div>
    </section>
  )
}

import { ThoughtsPosts } from 'app/components/posts'
import { NotARobotText, TimeBasedGreeting } from 'app/components/easter-eggs'

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

        </p>

        <p>
          Today, I build software with <a href="https://www.typescriptlang.org/">TypeScript</a>, <a href="https://www.python.org/">Python</a> & really any language that gets the job done. Mostly around AI, automation, and agents. Currently building <a href="https://stagerun.ai">Stagerun</a>.
        </p>

        <p>
          I share my written <a href="/thoughts">thoughts</a> here. Notes from the trenches... what I’m learning, what I’m building,  what broke, without leaving out the times I over-engineered a simple solution.
        </p>
      </div>
      <div className="my-12">
        <ThoughtsPosts />
      </div>
    </section>
  )
}

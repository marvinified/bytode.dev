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
          I'm <strong>Marvin</strong>, <NotARobotText />.
        </p>
        <p>
          I build software mostly around AI, automation, and agents. Currently building <a href="https://stagerun.ai">Stagerun</a>.
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

import { ThoughtsPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <div className="prose">
        <h2>
          Hello human! or bot?
        </h2>
        <p>
          I'm <strong>Marvin</strong>, definitely not a robot.
        </p>
        <p>
          I build software mostly around AI, automation, and agents. Currently building <a href="https://stagerun.ai">Stagerun</a>.
        </p>

        <p>
          I randomly share my written <a href="/thoughts">thoughts</a> here: notes from the trenches... what I’m learning, what I’m building,  what broke, without leaving out the times I over-engineered a simple solution.
        </p>
      </div>
      <div className="my-12">
        <ThoughtsPosts />
      </div>
    </section>
  )
}

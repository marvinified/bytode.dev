import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Answer',
  description: 'You found it.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function TheAnswerPage() {
  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center text-center">
      <div className="space-y-8">
        <p className="text-sm text-neutral-400 font-mono tracking-widest uppercase">
          The Answer to Life, the Universe, and Everything
        </p>
        
        <div className="answer-42">
          42
        </div>
        
        <div className="space-y-4 max-w-md mx-auto">
          <p className="text-neutral-600 italic">
            &quot;I checked it very thoroughly,&quot; said the computer, &quot;and that quite 
            definitely is the answer. I think the problem, to be quite honest 
            with you, is that you&apos;ve never actually known what the question is.&quot;
          </p>
          
          <p className="text-xs text-neutral-400">
            — Deep Thought, The Hitchhiker&apos;s Guide to the Galaxy
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-200">
          <p className="text-xs text-neutral-400 font-mono">
            Congratulations, fellow hitchhiker! 🚀
          </p>
          <p className="text-xs text-neutral-300 mt-2">
            Don&apos;t forget your towel.
          </p>
        </div>

        <div className="mt-8">
          <details className="text-left">
            <summary className="text-xs text-neutral-400 cursor-pointer hover:text-neutral-600 transition-colors">
              Wait, there&apos;s more hidden on this site...
            </summary>
            <div className="mt-4 p-4 bg-neutral-50 rounded-lg text-xs text-neutral-500 font-mono space-y-2">
              <p>🎮 Try the Konami code: ↑ ↑ ↓ ↓ ← → ← → B A</p>
              <p>🤖 Type &quot;robot&quot; anywhere on the site</p>
              <p>👆 Click on &quot;definitely not a robot&quot; on the homepage. A lot.</p>
              <p>🌙 Visit late at night (12am-5am) for a different greeting</p>
              <p>🔧 Open the browser console for a secret message</p>
              <p>🛸 Type &quot;barrel&quot; for a spin</p>
              <p>💊 Type &quot;matrix&quot; to see how deep the rabbit hole goes</p>
              <p>🍎 Type &quot;gravity&quot; to watch everything fall</p>
              <p>🪩 Type &quot;disco&quot; to party</p>
              <p>📖 View the page source for another hint...</p>
            </div>
          </details>
        </div>
      </div>
    </section>
  )
}


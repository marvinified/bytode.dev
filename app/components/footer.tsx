import { ExternalLink, Rss, Github } from 'lucide-react'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="mb-16">
      <ul className="font-sm mt-8 flex flex-col space-x-0 space-y-2 text-neutral-600 md:flex-row md:space-x-4 md:space-y-0">
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 underline"
            rel="noopener noreferrer"
            target="_blank"
            href="/rss"
          >
            <Rss className="w-4 h-4" />
            <p className="ml-2">rss</p>
          </a>
        </li>
        <li >
          <a
            className="flex items-center transition-all hover:text-neutral-800 underline"
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/marvinified"
          >
            <Github className="w-4 h-4" />
            <p className="ml-2">github</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 underline"
            rel="noopener noreferrer"
            target="_blank"
            href="https://x.com/bytode"
          >
            <Image src="/images/x.png" alt="X (Twitter)" width={10} height={10} />
            <p className="ml-2">X (Twitter)</p>
          </a>
        </li>
      </ul>
    </footer>
  )
}

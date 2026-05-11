import { HashIcon } from 'lucide-react';
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export function GET(request: Request) {
  let url = new URL(request.url)
  let title = url.searchParams.get('title') || 'Hi, I\'m Marvin ✌🏾'
  let description = url.searchParams.get('description') || 'I build and rant about software'

  return new ImageResponse(
    (
      <div tw="flex w-full h-full items-center justify-center bg-white text-black">
        <div tw="flex w-full flex-col justify-between px-16 py-12">
          <h1 tw="flex items-center gap-2 text-3xl"># Bytes & Code</h1>
          <h2 tw="text-6xl font-bold leading-tight">
            {title}
          </h2>
          <p tw="mt-2 text-3xl text-neutral-900">
            {description}
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}

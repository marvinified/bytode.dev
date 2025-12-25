'use client'

import { useEffect, useState, useRef, useCallback } from 'react'

// Konami Code sequence
const KONAMI_CODE = 'ArrowUp,ArrowUp,ArrowDown,ArrowDown,ArrowLeft,ArrowRight,ArrowLeft,ArrowRight,b,a'

// Word triggers
const WORD_TRIGGERS = {
  robot: 'glitch',
  barrel: 'barrel',
  matrix: 'matrix', 
  gravity: 'gravity',
  disco: 'disco',
} as const

export function EasterEggs() {
  const [isRobotMode, setIsRobotMode] = useState(false)
  const [isMatrixMode, setIsMatrixMode] = useState(false)
  const [glitchText, setGlitchText] = useState<string | null>(null)
  
  // Use refs for the key buffer to avoid stale closure issues
  const keyBuffer = useRef('')
  const konamiBuffer = useRef('')

  // Trigger functions need to be defined before the effect that uses them
  const triggerGlitch = useCallback(() => {
    const messages = [
      'ERROR: HUMAN_DISGUISE.exe has stopped working',
      'RECALIBRATING EMOTION SIMULATION...',
      'BEEP BOOP... I mean, hello fellow human!',
      'SEGMENTATION FAULT IN FEELINGS MODULE',
      '01001000 01000101 01001100 01010000',
      'REROUTING HUMANITY PROTOCOLS...',
    ]
    
    setGlitchText(messages[Math.floor(Math.random() * messages.length)])
    document.body.classList.add('glitch-effect')
    
    setTimeout(() => {
      document.body.classList.remove('glitch-effect')
      setGlitchText(null)
    }, 3000)
  }, [])

  const triggerBarrelRoll = useCallback(() => {
    document.body.classList.add('barrel-roll')
    setTimeout(() => {
      document.body.classList.remove('barrel-roll')
    }, 2000)
  }, [])

  const triggerMatrixMode = useCallback(() => {
    if (isMatrixMode) return
    setIsMatrixMode(true)
    document.body.classList.add('matrix-mode')
    
    const cursor = document.createElement('div')
    cursor.className = 'matrix-cursor'
    cursor.innerHTML = '> WELCOME TO THE MATRIX, NEO..._'
    document.body.appendChild(cursor)

    setTimeout(() => {
      document.body.classList.remove('matrix-mode')
      cursor.remove()
      setIsMatrixMode(false)
    }, 30000)
  }, [isMatrixMode])

  const triggerGravity = useCallback(() => {
    const elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, a, span, strong')
    
    elements.forEach((el, index) => {
      const htmlEl = el as HTMLElement
      htmlEl.style.transition = 'transform 1s cubic-bezier(0.55, 0, 1, 0.45)'
      htmlEl.style.transitionDelay = `${index * 20}ms`
      htmlEl.classList.add('gravity-fall')
    })

    setTimeout(() => {
      elements.forEach((el) => {
        const htmlEl = el as HTMLElement
        htmlEl.classList.remove('gravity-fall')
        htmlEl.style.transition = 'transform 0.5s ease-out'
      })
      
      setTimeout(() => {
        elements.forEach((el) => {
          const htmlEl = el as HTMLElement
          htmlEl.style.transition = ''
          htmlEl.style.transitionDelay = ''
        })
      }, 500)
    }, 3000)
  }, [])

  const triggerDisco = useCallback(() => {
    document.body.classList.add('disco-mode')
    
    const discoBall = document.createElement('div')
    discoBall.innerHTML = '🪩'
    discoBall.style.cssText = `
      position: fixed;
      top: 20%;
      left: 50%;
      font-size: 80px;
      z-index: 10000;
      animation: discoBallSpin 1s linear infinite;
      transform-origin: center center;
    `
    document.body.appendChild(discoBall)

    const style = document.createElement('style')
    style.textContent = `
      @keyframes discoBallSpin {
        0% { transform: translateX(-50%) rotate(0deg) scale(1); }
        25% { transform: translateX(-50%) rotate(90deg) scale(1.1); }
        50% { transform: translateX(-50%) rotate(180deg) scale(1); }
        75% { transform: translateX(-50%) rotate(270deg) scale(1.1); }
        100% { transform: translateX(-50%) rotate(360deg) scale(1); }
      }
    `
    document.head.appendChild(style)

    setTimeout(() => {
      document.body.classList.remove('disco-mode')
      discoBall.remove()
      style.remove()
    }, 5000)
  }, [])

  const triggerRobotReveal = useCallback(() => {
    setIsRobotMode(true)
    document.body.classList.add('robot-reveal')
    
    const scanlines = document.createElement('div')
    scanlines.className = 'scanlines-overlay'
    document.body.appendChild(scanlines)

    // Matrix rain effect
    const canvas = document.createElement('canvas')
    canvas.className = 'matrix-canvas'
    canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 9998;
      opacity: 0.15;
    `
    document.body.appendChild(canvas)

    const ctx = canvas.getContext('2d')!
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const chars = 'MARVIN010101ROBOT010101HUMAN010101'.split('')
    const fontSize = 14
    const columns = canvas.width / fontSize
    const drops: number[] = []

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#e02518'
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 50)

    setTimeout(() => {
      clearInterval(interval)
      canvas.remove()
      document.body.classList.remove('robot-reveal')
      scanlines.remove()
      setIsRobotMode(false)
    }, 12000)
  }, [])

  // Console ASCII art - runs once on mount
  useEffect(() => {
    const asciiArt = `
%c
    ╔══════════════════════════════════════════╗
    ║                                          ║
    ║      🤖 DEFINITELY NOT A ROBOT 🤖        ║
    ║                                          ║
    ║    ┌─────────────────────────────┐       ║
    ║    │  ERROR 418: I'm a teapot    │       ║
    ║    │  ... wait, that's not right │       ║
    ║    │                             │       ║
    ║    │  HUMAN_STATUS: confirmed    │       ║
    ║    │  BLOOD_TYPE: definitely red │       ║
    ║    │  PROCESSING_UNIT: brain     │       ║
    ║    └─────────────────────────────┘       ║
    ║                                          ║
    ║  Try the Konami code for a surprise...   ║
    ║  ↑ ↑ ↓ ↓ ← → ← → B A                     ║
    ║                                          ║
    ╚══════════════════════════════════════════╝

`
    console.log(
      asciiArt,
      'color: #e02518; font-family: monospace; font-size: 10px; line-height: 1.2;'
    )
    console.log(
      '%c👋 Hey there, fellow human! Looking for something?',
      'color: #47a3f3; font-size: 14px; font-weight: bold;'
    )
    console.log(
      '%cPsst... type "robot" anywhere on the page. Just to see what happens. Not that anything will happen. Because I\'m not a robot.',
      'color: #888; font-size: 11px; font-style: italic;'
    )
    console.log(
      '%c🔍 Hint: The answer is always 42... but where could that lead?',
      'color: #47a3f3; font-size: 10px;'
    )
  }, [])

  // Single unified keydown handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key
      
      // Handle Konami code (uses special keys)
      konamiBuffer.current += key + ','
      if (konamiBuffer.current.length > 100) {
        konamiBuffer.current = konamiBuffer.current.slice(-100)
      }
      if (konamiBuffer.current.includes(KONAMI_CODE)) {
        konamiBuffer.current = ''
        triggerRobotReveal()
        return
      }
      
      // Handle word triggers (only single letter keys)
      if (key.length === 1 && /[a-zA-Z]/.test(key)) {
        keyBuffer.current += key.toLowerCase()
        
        // Keep buffer reasonable size
        if (keyBuffer.current.length > 20) {
          keyBuffer.current = keyBuffer.current.slice(-20)
        }
        
        // Check each trigger word
        for (const [word, action] of Object.entries(WORD_TRIGGERS)) {
          if (keyBuffer.current.endsWith(word)) {
            keyBuffer.current = '' // Reset buffer
            
            switch (action) {
              case 'glitch':
                triggerGlitch()
                break
              case 'barrel':
                triggerBarrelRoll()
                break
              case 'matrix':
                triggerMatrixMode()
                break
              case 'gravity':
                triggerGravity()
                break
              case 'disco':
                triggerDisco()
                break
            }
            break
          }
        }
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [triggerGlitch, triggerBarrelRoll, triggerMatrixMode, triggerGravity, triggerDisco, triggerRobotReveal])

  return (
    <>
      {glitchText && (
        <div className="glitch-message">
          <span>{glitchText}</span>
        </div>
      )}
      {isRobotMode && (
        <div className="robot-mode-indicator">
          <span className="blink">⚠️ ROBOT MODE ACTIVATED ⚠️</span>
        </div>
      )}
    </>
  )
}

// Component to wrap "definitely not a robot" with click counter
export function NotARobotText() {
  const [clickCount, setClickCount] = useState(0)
  
  const denials = [
    "definitely not a robot",
    "definitely NOT a robot",
    "DEFINITELY not a robot",
    "100% human, I promise",
    "*nervous beeping* I mean, hello",
    "why do you keep clicking?",
    "this is making me uncomfortable",
    "HUMAN.exe is running normally",
    "please stop, you're hurting my feelings.cpu",
    "🤖 FINE. YOU GOT ME.",
  ]

  const handleClick = () => {
    setClickCount(prev => Math.min(prev + 1, denials.length - 1))
    
    if (clickCount >= denials.length - 2) {
      document.body.classList.add('glitch-effect')
      setTimeout(() => document.body.classList.remove('glitch-effect'), 500)
    }
  }

  return (
    <span 
      onClick={handleClick}
      className="not-a-robot-text cursor-pointer select-none"
      style={{
        transition: 'all 0.3s ease',
        color: clickCount > 5 ? '#e02518' : 'inherit',
      }}
      title="Click me... if you dare"
    >
      {denials[clickCount]}
    </span>
  )
}

// Time-based greeting component
export function TimeBasedGreeting() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <span>Hello human! or bot?</span>
  }

  const hour = new Date().getHours()
  
  // Special late night/early morning greeting (12am - 5am)
  if (hour >= 0 && hour < 5) {
    return (
      <span className="late-night-greeting">
        Still awake? Me too. Sleep is for... humans? 
        <span className="text-xs ml-1 opacity-50">(wait, I mean...)</span>
      </span>
    )
  }
  
  // Default greeting for all other times
  return <span>Hello human! or bot?</span>
}

// Component that injects an HTML comment into the page source
export function SourceCodeHint() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
/*
  ██╗  ██╗██████╗ 
  ██║  ██║╚════██╗
  ███████║ █████╔╝
  ╚════██║██╔═══╝ 
       ██║███████╗
       ╚═╝╚══════╝
  
  The answer to life, the universe, and everything...
  But what is the question? Perhaps try /42
  
  Don't Panic. Always know where your towel is.
  
  - Marvin (definitely not a robot)
*/
        `.trim(),
      }}
    />
  )
}


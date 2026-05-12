'use client'

import Link from 'next/link'
import type { AnchorHTMLAttributes, FocusEvent, MouseEvent } from 'react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

type HoverPreviewLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
}

const PREVIEW_WIDTH = 240
const PREVIEW_HEIGHT = 340
const PREVIEW_SCALE = 0.6
const HOVER_DELAY_MS = 250
const PREVIEW_GAP = 12
const VIEWPORT_MARGIN = 12

function isInternalHref(href: string) {
  return href.startsWith('/')
}

function canPreviewHref(href: string) {
  return !(
    href.startsWith('#') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.startsWith('javascript:')
  )
}

export function HoverPreviewLink({
  href,
  children,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  target,
  rel,
  ...props
}: HoverPreviewLinkProps) {
  const linkRef = useRef<HTMLAnchorElement | null>(null)
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })

  const previewSrc = useMemo(() => {
    if (!canPreviewHref(href)) return null
    if (isInternalHref(href)) {
      if (typeof window === 'undefined') return null
      return `${window.location.origin}${href}`
    }
    return href
  }, [href])

  const updatePosition = useCallback(() => {
    if (!linkRef.current) return

    const rect = linkRef.current.getBoundingClientRect()
    const centeredLeft = rect.left + rect.width / 2 - PREVIEW_WIDTH / 2
    const maxLeft = window.innerWidth - PREVIEW_WIDTH - VIEWPORT_MARGIN
    const minLeft = VIEWPORT_MARGIN
    const left = Math.min(Math.max(centeredLeft, minLeft), maxLeft)

    const preferredTop = rect.top - PREVIEW_HEIGHT - PREVIEW_GAP
    const preferredBottom = rect.bottom + PREVIEW_GAP
    const canPlaceAbove = preferredTop >= VIEWPORT_MARGIN
    const canPlaceBelow = preferredBottom + PREVIEW_HEIGHT <= window.innerHeight - VIEWPORT_MARGIN

    let top = preferredTop

    if (canPlaceAbove) {
      top = preferredTop
    } else if (canPlaceBelow) {
      top = preferredBottom
    } else {
      const availableAbove = rect.top - VIEWPORT_MARGIN - PREVIEW_GAP
      const availableBelow = window.innerHeight - rect.bottom - VIEWPORT_MARGIN - PREVIEW_GAP
      top = availableBelow > availableAbove
        ? Math.max(preferredBottom, VIEWPORT_MARGIN)
        : Math.max(VIEWPORT_MARGIN, window.innerHeight - PREVIEW_HEIGHT - VIEWPORT_MARGIN)
    }

    const minTop = VIEWPORT_MARGIN
    const maxTop = Math.max(VIEWPORT_MARGIN, window.innerHeight - PREVIEW_HEIGHT - VIEWPORT_MARGIN)
    top = Math.min(Math.max(top, minTop), maxTop)

    setPosition({
      top,
      left,
    })
  }, [])

  useEffect(() => {
    if (!isOpen) return

    updatePosition()
    window.addEventListener('scroll', updatePosition, true)
    window.addEventListener('resize', updatePosition)

    return () => {
      window.removeEventListener('scroll', updatePosition, true)
      window.removeEventListener('resize', updatePosition)
    }
  }, [isOpen, updatePosition])

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [])

  const openPreview = useCallback(() => {
    if (!previewSrc) return
    updatePosition()
    hoverTimeoutRef.current = setTimeout(() => setIsOpen(true), HOVER_DELAY_MS)
  }, [previewSrc, updatePosition])

  const closePreview = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
    setIsOpen(false)
  }, [])

  const sharedProps = {
    ref: linkRef,
    href,
    onMouseEnter: (event: MouseEvent<HTMLAnchorElement>) => {
      openPreview()
      onMouseEnter?.(event)
    },
    onMouseLeave: (event: MouseEvent<HTMLAnchorElement>) => {
      closePreview()
      onMouseLeave?.(event)
    },
    onFocus: (event: FocusEvent<HTMLAnchorElement>) => {
      openPreview()
      onFocus?.(event)
    },
    onBlur: (event: FocusEvent<HTMLAnchorElement>) => {
      closePreview()
      onBlur?.(event)
    },
    ...props,
  }

  const preview = isOpen && previewSrc && (
    <div
      aria-hidden
      className="pointer-events-none fixed z-[120] overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl"
      style={{
        width: `${PREVIEW_WIDTH}px`,
        height: `${PREVIEW_HEIGHT}px`,
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      <iframe
        title={`Preview of ${href}`}
        src={previewSrc}
        className="origin-top-left border-0"
        style={{
          width: `${Math.round(PREVIEW_WIDTH / PREVIEW_SCALE)}px`,
          height: `${Math.round(PREVIEW_HEIGHT / PREVIEW_SCALE)}px`,
          transform: `scale(${PREVIEW_SCALE})`,
        }}
        loading="lazy"
      />
    </div>
  )

  if (isInternalHref(href)) {
    return (
      <>
        <Link {...sharedProps}>{children}</Link>
        {preview}
      </>
    )
  }

  return (
    <>
      <a
        {...sharedProps}
        target={target ?? '_blank'}
        rel={rel ?? 'noopener noreferrer'}
      >
        {children}
      </a>
      {preview}
    </>
  )
}

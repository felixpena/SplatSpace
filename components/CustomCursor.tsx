'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const haloRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    let haloX = 0
    let haloY = 0
    let dotX  = 0
    let dotY  = 0
    let raf: number

    const onMove = (e: MouseEvent) => {
      dotX = e.clientX
      dotY = e.clientY
    }
    window.addEventListener('mousemove', onMove)

    const tick = () => {
      // Dot follows instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`
      }
      // Halo lags slightly for smooth feel
      haloX += (dotX - haloX) * 0.12
      haloY += (dotY - haloY) * 0.12
      if (haloRef.current) {
        haloRef.current.style.transform = `translate(${haloX - 20}px, ${haloY - 20}px)`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      {/* Cyan dot */}
      <div
        ref={dotRef}
        className="hidden md:block fixed top-0 left-0 w-2 h-2 rounded-full bg-splat-cyan pointer-events-none z-[9999]"
        style={{ willChange: 'transform' }}
      />
      {/* Halo circle */}
      <div
        ref={haloRef}
        className="hidden md:block fixed top-0 left-0 w-10 h-10 rounded-full border border-splat-cyan/40 pointer-events-none z-[9999]"
        style={{ willChange: 'transform' }}
      />
    </>
  )
}

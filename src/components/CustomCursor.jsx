import { useEffect, useRef } from 'react'

/**
 * Electric-blue glow cursor with trailing dot — desktop only.
 * Rendered with two divs: the glow ring (lags slightly) and the dot (instant).
 */
export default function CustomCursor() {
  const ringRef = useRef(null)
  const dotRef  = useRef(null)

  useEffect(() => {
    // Only activate on pointer:fine (mouse) devices
    if (!window.matchMedia('(pointer: fine)').matches) return

    let ring = { x: 0, y: 0 }
    let dot  = { x: 0, y: 0 }
    let mouse = { x: 0, y: 0 }
    let rafId

    const onMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const animate = () => {
      // Dot snaps instantly
      dot.x = mouse.x
      dot.y = mouse.y

      // Ring trails with lerp
      ring.x += (mouse.x - ring.x) * 0.12
      ring.y += (mouse.y - ring.y) * 0.12

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.x - 20}px, ${ring.y - 20}px)`
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dot.x - 4}px, ${dot.y - 4}px)`
      }

      rafId = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMouseMove)
    rafId = requestAnimationFrame(animate)

    // Show cursor on hover over clickable elements
    const showPointer = () => {
      if (ringRef.current) ringRef.current.style.scale = '1.6'
    }
    const hidePointer = () => {
      if (ringRef.current) ringRef.current.style.scale = '1'
    }

    document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
      el.addEventListener('mouseenter', showPointer)
      el.addEventListener('mouseleave', hidePointer)
    })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      {/* Glow ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[99999] h-10 w-10 rounded-full transition-[scale] duration-150"
        style={{
          border: '1.5px solid rgba(0, 240, 255, 0.6)',
          boxShadow: '0 0 12px rgba(0, 102, 255, 0.5), 0 0 24px rgba(0, 240, 255, 0.2)',
          willChange: 'transform',
        }}
      />
      {/* Center dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[99999] h-2 w-2 rounded-full"
        style={{
          background: 'var(--cyan-neon)',
          boxShadow: '0 0 8px var(--cyan-neon)',
          willChange: 'transform',
        }}
      />
    </>
  )
}

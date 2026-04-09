import { useEffect, useRef, useState } from 'react'

export default function LifestyleSection() {
  const sectionRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const handleScroll = () => {
      const rect = el.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const sectionHeight = el.offsetHeight

      const start = windowHeight
      const end = -sectionHeight
      const scrolled = start - rect.top
      const progress = Math.max(0, Math.min(1, scrolled / (start - end)))
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const textOpacity = Math.min(1, scrollProgress * 4) * Math.min(1, (1 - scrollProgress) * 4)

  return (
    <section ref={sectionRef} className="lifestyle-section" id="lifestyle">
      {/* Background image with parallax */}
      <div
        className="lifestyle-bg"
        style={{
          transform: `translateY(${scrollProgress * 30}px) scale(1.1)`,
        }}
      />

      {/* Gradient overlay */}
      <div className="lifestyle-overlay" />

      <div className="lifestyle-content">
        {/* Text content */}
        <div
          className="lifestyle-text"
          style={{
            opacity: textOpacity,
            transform: `translateY(${(1 - textOpacity) * 40}px)`,
          }}
        >
          <span className="lifestyle-section-number">03</span>
          <h2 className="lifestyle-title">
            PURE
            <span className="text-red">SOUND</span>
          </h2>
          <p className="lifestyle-description">
            Nothing Ear and Phone — designed as one ecosystem.
            Transparent design, powerful audio, seamless connection.
          </p>
          <div className="lifestyle-features">
            <div className="feature-item">
              <span className="feature-icon">◉</span>
              <span className="feature-label">Active Noise Cancellation</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">◉</span>
              <span className="feature-label">Transparent Design</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">◉</span>
              <span className="feature-label">Hi-Res Audio</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="lifestyle-deco">
        <div className="deco-circle deco-circle-1" />
        <div className="deco-line" />
      </div>
    </section>
  )
}

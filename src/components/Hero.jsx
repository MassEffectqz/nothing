import { useEffect, useRef, useState } from 'react'
import RecIndicator from './RecIndicator'
import { useLanguage } from '../hooks/useLanguage.jsx'

export default function Hero() {
  const videoRef = useRef(null)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768)
  const { t } = useLanguage()

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768
      setIsMobile(mobile)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(video.parentElement)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="hero" id="hero">
      <RecIndicator />
      <div className="hero-video-bg">
        <video
          ref={videoRef}
          src="/hero-bg.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className={isMobile ? 'mobile-video' : ''}
        />
        <div className="hero-gradient-overlay" />
        <div className="hero-scanlines" />
      </div>

      <div className="hero-grid">
        <div className="hero-content">
          <div className="hero-tag">
            <span className="tag-line" />
            <span>{t.availableForProjects}</span>
          </div>

          <h1 className="hero-title">
            <span className="title-line title-line-1">{t.designer}</span>
            <span className="title-line title-line-2">&</span>
            <span className="title-line title-line-3">{t.developer}</span>
          </h1>

          <p className="hero-description">
            {t.heroDesc}{' '}
            <span className="text-red">{t.heroDescHighlight}</span>
          </p>

          <div className="hero-cta">
            <a href="#work" className="btn-primary">
              <span>{t.viewWork}</span>
              <span className="btn-arrow">→</span>
            </a>
            <a href="#contact" className="btn-secondary">
              <span>{t.getInTouch}</span>
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-container">
            <div className="nothing-desktop">
              <div className="nothing-vertical">
                {t.nothingLetters.map((letter, i) => (
                  <span
                    key={i}
                    className="nothing-letter"
                    style={{ animationDelay: `${0.8 + i * 0.08}s` }}
                  >
                    {letter}
                  </span>
                ))}
              </div>
              <div className="nothing-deco-dots">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="nothing-deco-dot" style={{ animationDelay: `${1.2 + i * 0.1}s` }} />
                ))}
              </div>
            </div>

            <div className="nothing-mobile">
              <span className="nothing-mobile-label">NOTHING</span>
              <div className="nothing-mobile-dots">
                {[...Array(3)].map((_, i) => (
                  <span key={i} className="nothing-mobile-dot" style={{ animationDelay: `${1.0 + i * 0.15}s` }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll">
        <div className="scroll-indicator">
          <div className="scroll-line" />
          <span>{t.scroll}</span>
        </div>
      </div>

      <div className="hero-stats">
        <div className="stat">
          <span className="stat-number text-red">47</span>
          <span className="stat-label">{t.projects}</span>
        </div>
        <div className="stat-divider" />
        <div className="stat">
          <span className="stat-number text-red">8+</span>
          <span className="stat-label">{t.years}</span>
        </div>
        <div className="stat-divider" />
        <div className="stat">
          <span className="stat-number text-red">∞</span>
          <span className="stat-label">{t.curiosity}</span>
        </div>
      </div>
    </section>
  )
}

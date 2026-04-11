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
    <section className="hero" id="hero" aria-label="Главный экран портфолио">
      <RecIndicator />
      <div className="hero-video-bg" aria-hidden="true">
        <video
          ref={videoRef}
          src="/hero-bg.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/hero-poster.jpg"
          className={isMobile ? 'mobile-video' : ''}
          aria-label="Фоновое видео"
        >
          <track kind="captions" src="/captions/hero-en.vtt" srcLang="en" label="English" />
          <track kind="captions" src="/captions/hero-ru.vtt" srcLang="ru" label="Русский" />
        </video>
        <div className="hero-gradient-overlay" />
        <div className="hero-scanlines" />
      </div>

      <div className="hero-grid">
        <div className="hero-content" role="region" aria-label="Информация о дизайнере">
          <div className="hero-tag">
            <span className="tag-line" aria-hidden="true" />
            <span>{t.availableForProjects}</span>
          </div>

          <h1 className="hero-title" aria-label="Дизайнер и разработчик">
            <span className="title-line title-line-1">{t.designer}</span>
            <span className="title-line title-line-2" aria-hidden="true">&</span>
            <span className="title-line title-line-3">{t.developer}</span>
          </h1>

          <p className="hero-description">
            {t.heroDesc}{' '}
            <span className="text-red">{t.heroDescHighlight}</span>
          </p>

          <div className="hero-cta" role="group" aria-label="Основные действия">
            <a href="#work" className="btn-primary" role="button" aria-label="Посмотреть работы">
              <span>{t.viewWork}</span>
              <span className="btn-arrow" aria-hidden="true">→</span>
            </a>
            <a href="#contact" className="btn-secondary" role="button" aria-label="Связаться">
              <span>{t.getInTouch}</span>
            </a>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="visual-container">
            <div className="nothing-desktop">
              <div className="nothing-vertical">
                {t.nothingLetters.map((letter, i) => (
                  <span
                    key={i}
                    className="nothing-letter"
                    style={{ animationDelay: `${0.8 + i * 0.08}s` }}
                    aria-hidden="true"
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

      <div className="hero-scroll" aria-hidden="true">
        <div className="scroll-indicator">
          <div className="scroll-line" />
          <span>{t.scroll}</span>
        </div>
      </div>

      <div className="hero-stats" role="region" aria-label="Статистика">
        <div className="stat" role="group" aria-label="Проекты">
          <span className="stat-number text-red">47</span>
          <span className="stat-label">{t.projects}</span>
        </div>
        <div className="stat-divider" aria-hidden="true" />
        <div className="stat" role="group" aria-label="Опыт">
          <span className="stat-number text-red">8+</span>
          <span className="stat-label">{t.years}</span>
        </div>
        <div className="stat-divider" aria-hidden="true" />
        <div className="stat" role="group" aria-label="Любопытство">
          <span className="stat-number text-red">∞</span>
          <span className="stat-label">{t.curiosity}</span>
        </div>
      </div>
    </section>
  )
}

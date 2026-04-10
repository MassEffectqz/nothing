import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../hooks/useLanguage.jsx'

export default function AboutSection() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const [visibleWord, setVisibleWord] = useState(0)
  const [animatedItems, setAnimatedItems] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleWord((p) => (p + 1) % t.aboutWords.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [t.aboutWords.length])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animatedItems) {
          setTimeout(() => setAnimatedItems(true), 300)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [animatedItems])

  return (
    <section ref={sectionRef} className="about-section" id="about">
      {/* Cycling background word */}
      <div className="about-bg-word">
        {t.aboutWords.map((word, i) => (
          <span
            key={word}
            className={`about-bg-word-item ${i === visibleWord ? 'active' : ''}`}
          >
            {word}
          </span>
        ))}
      </div>

      {/* Left: visual column */}
      <div className="about-image-col" />

      {/* Right: content column */}
      <div className="about-content">
        {/* Dot grid background */}
        <div className="about-content-grid">
          {[...Array(400)].map((_, i) => (
            <div key={i} className="content-grid-dot" />
          ))}
        </div>

        {/* Content */}
        <div className="about-content-inner">
          <span className="about-number">{t.aboutNum}</span>
          <h2 className="about-title">{t.aboutTitle}</h2>
          <div className="about-accent-line" />

          {/* Bio */}
          <div className={`about-bio ${animatedItems ? 'visible' : ''}`}>
            <p className="about-bio-line">
              {t.aboutBio1Before} <span className="text-red">{t.aboutBio1Designer}</span>{' '}{t.aboutBio1And}{' '}
              <span className="text-red">{t.aboutBio1Developer}</span>{' '}{t.aboutBio1After}
            </p>
            <p className="about-bio-line">
              {t.aboutBio2}
            </p>
          </div>

          {/* Design philosophy */}
          <div className={`about-philosophy ${animatedItems ? 'visible' : ''}`}>
            <span className="philosophy-label">{t.philosophy}</span>
            <div className="philosophy-grid">
              {[
                { title: t.transparency, desc: t.transparencyDesc },
                { title: t.essentialism, desc: t.essentialismDesc },
                { title: t.craft, desc: t.craftDesc },
              ].map((p, i) => (
                <div key={p.title} className="philosophy-item" style={{ '--delay': `${i * 0.1}s` }}>
                  <h4 className="philosophy-title">{p.title}</h4>
                  <p className="philosophy-desc">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div className={`about-tools ${animatedItems ? 'visible' : ''}`}>
            <span className="tools-label">{t.toolkit}</span>
            <div className="tools-list">
              {t.tools.map((tool) => (
                <span key={tool} className="tool-badge">{tool}</span>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className={`about-timeline ${animatedItems ? 'visible' : ''}`}>
            <span className="timeline-section-label">{t.journey}</span>
            {t.milestones.map((ms, i) => (
              <div key={ms.year} className="timeline-item" style={{ '--delay': `${i * 0.15}s` }}>
                <span className="timeline-year">{ms.year}</span>
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <h4 className="timeline-title">{ms.title}</h4>
                  <p className="timeline-desc">{ms.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className={`about-stats ${animatedItems ? 'visible' : ''}`}>
            <div className="about-stat">
              <span className="about-stat-number text-red">47</span>
              <span className="about-stat-label">{t.projects}</span>
            </div>
            <div className="about-stat-divider" />
            <div className="about-stat">
              <span className="about-stat-number text-red">8+</span>
              <span className="about-stat-label">{t.years}</span>
            </div>
            <div className="about-stat-divider" />
            <div className="about-stat">
              <span className="about-stat-number text-red">∞</span>
              <span className="about-stat-label">{t.curiosity}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="about-grid">
        <div className="grid-line" />
        <div className="grid-circle" />
      </div>
    </section>
  )
}

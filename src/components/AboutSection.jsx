import { useEffect, useRef, useState } from 'react'

const WORDS = ['TRANSPARENT', 'RADICAL', 'ESSENTIAL', 'BOLD', 'MINIMAL', 'PURE']

const MILESTONES = [
  { year: '2018', title: 'Started Design Journey', desc: 'First freelance projects in UI/UX' },
  { year: '2020', title: 'Joined Nothing', desc: 'Lead designer for Nothing OS' },
  { year: '2022', title: 'Phone (1) Launch', desc: 'Glyph interface design system' },
  { year: '2024', title: 'Creative Director', desc: 'Leading brand identity team' },
]

const TOOLS = ['Figma', 'React', 'TypeScript', 'Framer', 'Blender', 'After Effects']

export default function AboutSection() {
  const sectionRef = useRef(null)
  const [visibleWord, setVisibleWord] = useState(0)
  const [animatedItems, setAnimatedItems] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleWord((p) => (p + 1) % WORDS.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animatedItems) {
          setTimeout(() => setAnimatedItems(true), 300)
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [animatedItems])

  return (
    <section ref={sectionRef} className="about-section" id="about">
      {/* Cycling background word */}
      <div className="about-bg-word">
        {WORDS.map((word, i) => (
          <span
            key={word}
            className={`about-bg-word-item ${i === visibleWord ? 'active' : ''}`}
          >
            {word}
          </span>
        ))}
      </div>

      {/* Profile image */}
      <div className="about-image-col">
        <div className={`about-image ${animatedItems ? 'visible' : ''}`}>
          <img src="/media/devices/nothing-phone-4a-pro-white.png" alt="Designer portrait" />
          <div className="about-image-badge">
            <span className="badge-dot" />
            <span className="badge-text">Available for work</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="about-content">
        <span className="about-number">04</span>
        <h2 className="about-title">ABOUT</h2>
        <div className="about-accent-line" />

        <div className="about-bio">
          <p className="about-bio-line">
            Multi-disciplinary <span className="text-red">designer</span> and{' '}
            <span className="text-red">developer</span> crafting digital experiences
            with a focus on transparency, simplicity, and purpose.
          </p>
          <p className="about-bio-line">
            Currently leading creative direction at Nothing, where we strip away
            the unnecessary to reveal what truly matters.
          </p>
        </div>

        {/* Tools grid */}
        <div className={`about-tools ${animatedItems ? 'visible' : ''}`}>
          <span className="tools-label">Toolkit</span>
          <div className="tools-list">
            {TOOLS.map((tool) => (
              <span key={tool} className="tool-badge">{tool}</span>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className={`about-timeline ${animatedItems ? 'visible' : ''}`}>
          {MILESTONES.map((ms, i) => (
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
        <div className="about-stats">
          <div className="about-stat">
            <span className="about-stat-number text-red">47</span>
            <span className="about-stat-label">Projects</span>
          </div>
          <div className="about-stat-divider" />
          <div className="about-stat">
            <span className="about-stat-number text-red">8+</span>
            <span className="about-stat-label">Years</span>
          </div>
          <div className="about-stat-divider" />
          <div className="about-stat">
            <span className="about-stat-number text-red">∞</span>
            <span className="about-stat-label">Curiosity</span>
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

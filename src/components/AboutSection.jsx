import { useEffect, useRef, useState } from 'react'

const WORDS = ['TRANSPARENT', 'RADICAL', 'ESSENTIAL', 'BOLD', 'MINIMAL', 'PURE']

const MILESTONES = [
  { year: '2018', title: 'Started Design Journey', desc: 'First freelance projects in UI/UX' },
  { year: '2020', title: 'Joined Nothing', desc: 'Lead designer for Nothing OS' },
  { year: '2022', title: 'Phone (1) Launch', desc: 'Glyph interface design system' },
  { year: '2024', title: 'Creative Director', desc: 'Leading brand identity team' },
]

const TOOLS = ['Figma', 'React', 'TypeScript', 'Framer', 'Blender', 'After Effects', 'Next.js', 'Tailwind']

const PHILOSOPHY = [
  { title: 'Transparency', desc: 'Design that reveals its nature. No hidden complexity, no unnecessary decoration.' },
  { title: 'Essentialism', desc: 'Every element must earn its place. If it doesn\'t serve a purpose, it doesn\'t exist.' },
  { title: 'Craft', desc: 'Attention to the smallest detail. Pixels, timing, motion — everything matters.' },
]

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
      { threshold: 0.1 }
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

      {/* Left: visual column */}
      <div className="about-image-col">
        {/* Large number */}
        <div className="about-col-number">04</div>

        {/* Product showcase */}
        <div className={`about-visual-stack ${animatedItems ? 'visible' : ''}`}>
          <div className="visual-item visual-earbuds">
            <img src="/media/accessories/nothing-ear-3-white.png" alt="Nothing Ear" />
          </div>
          <div className="visual-item visual-phone">
            <img src="/media/devices/nothing-phone-4a-white.png" alt="Nothing Phone" />
          </div>
        </div>

        {/* Stats */}
        <div className={`about-side-stats ${animatedItems ? 'visible' : ''}`}>
          <div className="side-stat">
            <span className="side-stat-value">47</span>
            <span className="side-stat-label">Projects</span>
          </div>
          <div className="side-stat">
            <span className="side-stat-value">12</span>
            <span className="side-stat-label">Awards</span>
          </div>
          <div className="side-stat">
            <span className="side-stat-value">8+</span>
            <span className="side-stat-label">Years</span>
          </div>
        </div>

        {/* Decorative line */}
        <div className="about-col-line" />
        <div className="about-red-accent" />
      </div>

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
          <span className="about-number">04</span>
          <h2 className="about-title">ABOUT</h2>
          <div className="about-accent-line" />

          {/* Bio */}
          <div className={`about-bio ${animatedItems ? 'visible' : ''}`}>
            <p className="about-bio-line">
              Multi-disciplinary <span className="text-red">designer</span> and{' '}
              <span className="text-red">developer</span> crafting digital experiences
              with a focus on transparency, simplicity, and purpose.
            </p>
            <p className="about-bio-line">
              Currently leading creative direction at Nothing, where we strip away
              the unnecessary to reveal what truly matters. Every pixel intentional,
              every interaction purposeful.
            </p>
          </div>

          {/* Design philosophy */}
          <div className={`about-philosophy ${animatedItems ? 'visible' : ''}`}>
            <span className="philosophy-label">Philosophy</span>
            <div className="philosophy-grid">
              {PHILOSOPHY.map((p, i) => (
                <div key={p.title} className="philosophy-item" style={{ '--delay': `${i * 0.1}s` }}>
                  <h4 className="philosophy-title">{p.title}</h4>
                  <p className="philosophy-desc">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tools */}
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
            <span className="timeline-section-label">Journey</span>
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
          <div className={`about-stats ${animatedItems ? 'visible' : ''}`}>
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
      </div>

      {/* Decorative elements */}
      <div className="about-grid">
        <div className="grid-line" />
        <div className="grid-circle" />
      </div>
    </section>
  )
}

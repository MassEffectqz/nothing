import { useEffect, useRef, useState } from 'react'

const WORDS = ['TRANSPARENT', 'RADICAL', 'ESSENTIAL', 'BOLD', 'MINIMAL', 'PURE']
const SKILLS = [
  { label: 'UI/UX Design', level: 95 },
  { label: 'Frontend Dev', level: 90 },
  { label: 'Brand Identity', level: 85 },
  { label: 'Motion Design', level: 80 },
]

export default function AboutSection() {
  const sectionRef = useRef(null)
  const [visibleWord, setVisibleWord] = useState(0)
  const [barsAnimated, setBarsAnimated] = useState(false)

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
        if (entry.isIntersecting && !barsAnimated) {
          setTimeout(() => setBarsAnimated(true), 300)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [barsAnimated])

  return (
    <section ref={sectionRef} className="about-section" id="about">
      {/* Large background word cycling */}
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

      <div className="about-content">
        {/* Section number */}
        <span className="about-number">04</span>

        {/* Large ABOUT title */}
        <h2 className="about-title">ABOUT</h2>

        {/* Red accent line */}
        <div className="about-accent-line" />

        {/* Bio text */}
        <div className="about-bio">
          <p className="about-bio-line">
            Multi-disciplinary <span className="text-red">designer</span> and{' '}
            <span className="text-red">developer</span> crafting digital
            experiences with a focus on transparency, simplicity, and purpose.
          </p>
          <p className="about-bio-line">
            Stripping away the unnecessary to reveal what truly matters.
          </p>
        </div>

        {/* Skills bars */}
        <div className="about-skills">
          {SKILLS.map((skill, i) => (
            <div key={skill.label} className="skill-row">
              <span className="skill-label">{skill.label}</span>
              <div className="skill-bar-track">
                <div
                  className="skill-bar-fill"
                  style={{
                    width: barsAnimated ? `${skill.level}%` : '0%',
                    transitionDelay: `${i * 0.15}s`,
                  }}
                />
              </div>
              <span className="skill-value">{skill.level}%</span>
            </div>
          ))}
        </div>

        {/* Stats row */}
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

      {/* Decorative grid */}
      <div className="about-grid">
        <div className="grid-dot" />
        <div className="grid-dot" />
        <div className="grid-dot" />
        <div className="grid-line" />
        <div className="grid-circle" />
      </div>
    </section>
  )
}

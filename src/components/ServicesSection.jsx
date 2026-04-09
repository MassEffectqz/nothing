import { useEffect, useRef, useState } from 'react'

const SERVICES = [
  {
    id: 1,
    number: '01',
    title: 'UI/UX Design',
    description: 'Interfaces stripped to their essence. Every pixel purposeful, every interaction intentional.',
    image: '/media/wallpapers/nothing-lifestyle-02.jpg',
  },
  {
    id: 2,
    number: '02',
    title: 'Frontend Development',
    description: 'Clean, performant code. React, Next.js, TypeScript — built to last, designed to delight.',
    image: '/media/wallpapers/nothing-lifestyle-06.jpg',
  },
  {
    id: 3,
    number: '03',
    title: 'Brand Identity',
    description: 'Visual systems that speak without shouting. Logos, typography, color — a complete language.',
    image: '/media/wallpapers/nothing-lifestyle-10.jpg',
  },
  {
    id: 4,
    number: '04',
    title: 'Motion Design',
    description: 'Animation as communication. Micro-interactions, transitions, and moments of delight.',
    image: '/media/wallpapers/nothing-lifestyle-15.jpg',
  },
]

const STATS = [
  { value: '47', label: 'Projects Delivered' },
  { value: '12', label: 'Awards Won' },
  { value: '38', label: 'Happy Clients' },
  { value: '8+', label: 'Years Active' },
]

export default function ServicesSection() {
  const sectionRef = useRef(null)
  const [hoveredService, setHoveredService] = useState(null)
  const [animatedStats, setAnimatedStats] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animatedStats) {
          setTimeout(() => setAnimatedStats(true), 200)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [animatedStats])

  return (
    <section ref={sectionRef} className="services-section" id="services">
      {/* Large background text */}
      <div className="services-bg-text">
        <span>SERVICES</span>
      </div>

      <div className="services-content">
        {/* Section header */}
        <div className="services-header">
          <span className="services-number">05</span>
          <h2 className="services-title">SERVICES</h2>
          <p className="services-subtitle">
            Everything needed to bring a vision to life — from concept to code.
          </p>
        </div>

        {/* Service cards grid */}
        <div className="services-grid">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className={`service-card ${hoveredService === service.id ? 'active' : ''}`}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <div className="service-card-image">
                <img src={service.image} alt={service.title} loading="lazy" />
                <div className="service-card-overlay" />
              </div>
              <div className="service-card-content">
                <span className="service-card-number">{service.number}</span>
                <h3 className="service-card-title">{service.title}</h3>
                <p className="service-card-desc">{service.description}</p>
                <div className="service-card-arrow">
                  <span className="arrow-line" />
                  <span className="arrow-head">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div className="services-stats">
          {STATS.map((stat, i) => (
            <div key={stat.label} className="service-stat">
              <span
                className="service-stat-value"
                style={{
                  opacity: animatedStats ? 1 : 0,
                  transform: animatedStats ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: `${i * 0.1}s`,
                }}
              >
                {stat.value}
              </span>
              <span className="service-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

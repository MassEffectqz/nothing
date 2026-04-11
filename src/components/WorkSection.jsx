import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage.jsx'

const slugMap = {
  1: 'phone-3',
  2: 'phone-3a',
  3: 'phone-3a-lite',
  4: 'phone-4a-pro',
  5: 'phone-4a',
  6: 'ear-3',
}

const projects = [
  {
    id: 1,
    number: '01',
    name: 'Phone (3)',
    category: 'Smartphone · Flagship',
    year: '2025',
    image: '/media/devices/nothing-phone-3-white.png',
  },
  {
    id: 2,
    number: '02',
    name: 'Phone (3a)',
    category: 'Smartphone · New',
    year: '2025',
    image: '/media/devices/nothing-phone-3a.png',
  },
  {
    id: 3,
    number: '03',
    name: 'Phone (3a lite)',
    category: 'Smartphone · Lite',
    year: '2025',
    image: '/media/devices/nothing-phone-3a-lite.png',
  },
  {
    id: 4,
    number: '04',
    name: 'Phone (4a Pro)',
    category: 'Smartphone · Pro',
    year: '2026',
    image: '/media/devices/nothing-phone-4a-pro-white.png',
  },
  {
    id: 5,
    number: '05',
    name: 'Phone (4a)',
    category: 'Smartphone · Standard',
    year: '2026',
    image: '/media/devices/nothing-phone-4a-white.png',
  },
  {
    id: 6,
    number: '06',
    name: 'Ear (3)',
    category: 'Audio · Earbuds',
    year: '2025',
    image: '/media/accessories/nothing-ear-3-white.png',
  },
]

function ProjectCard({ project, index }) {
  const cardRef = useRef(null)

  return (
    <article
      to={`/product/${slugMap[project.id]}`}
      as={Link}
      className="project-card"
      ref={cardRef}
      style={{ '--delay': `${index * 0.1}s` }}
      aria-label={`Проект: ${project.name}`}
    >
      <div className="project-card-image">
        <img
          src={project.image}
          alt={project.name}
          loading="lazy"
          decoding="async"
          width="400"
          height="300"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="project-card-overlay" />
        <div className="project-card-reveal">
          <span className="project-card-number" aria-hidden="true">{project.number}</span>
          <h3 className="project-card-name">{project.name}</h3>
          <p className="project-card-category">{project.category}</p>
        </div>
      </div>
      <div className="project-card-year" aria-label={`Год выпуска: ${project.year}`}>{project.year}</div>
    </article>
  )
}

export default function WorkSection() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const [titleVisible, setTitleVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTitleVisible(true)
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="work" id="work">
      <div className="work-header">
        <span className="work-section-number">{t.workNum}</span>
        <div className="work-header-title">
          <h2 className="work-title">{t.workTitle}</h2>
          <p className="work-subtitle">{t.workSubtitle}</p>
        </div>
        <div className={`work-accent-line ${titleVisible ? 'visible' : ''}`} />
      </div>

      <div className="work-grid">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>

      <div className="work-footer">
        <div className="work-dot-row">
          <span className="work-dot" />
          <span className="work-dot" />
          <span className="work-dot" />
          <span className="work-dot" />
          <span className="work-dot" />
        </div>
        <a href="#" className="work-link">
          <span>{t.allProjects}</span>
          <span className="work-link-count">{t.projectsCount}</span>
        </a>
      </div>
    </section>
  )
}

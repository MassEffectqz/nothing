const projects = [
  {
    id: 1,
    index: '01',
    name: 'Brand Identity',
    highlight: 'System',
    category: 'Branding · Visual Identity',
    year: '2024',
    image: '/media/wallpapers/nothing-lifestyle-01.jpg',
  },
  {
    id: 2,
    index: '02',
    name: 'E-Commerce',
    highlight: 'Platform',
    category: 'Development · UI/UX',
    year: '2024',
    image: '/media/wallpapers/nothing-lifestyle-03.jpg',
  },
  {
    id: 3,
    index: '03',
    name: 'Mobile App',
    highlight: 'Experience',
    category: 'Mobile · Cross-platform',
    year: '2023',
    image: '/media/wallpapers/nothing-lifestyle-05.jpg',
  },
  {
    id: 4,
    index: '04',
    name: 'Design System',
    highlight: 'Framework',
    category: 'Components · Documentation',
    year: '2023',
    image: '/media/wallpapers/nothing-lifestyle-08.jpg',
  },
  {
    id: 5,
    index: '05',
    name: 'Creative Direction',
    highlight: 'Vision',
    category: 'Art Direction · Strategy',
    year: '2023',
    image: '/media/wallpapers/nothing-lifestyle-12.jpg',
  },
]

function WorkItem({ project, index }) {
  return (
    <a href="#" className="work-item" style={{ '--delay': index * 0.1 }}>
      <div className="work-item-image">
        <img src={project.image} alt={project.name} loading="lazy" />
        <div className="work-item-overlay" />
      </div>
      <div className="work-item-content">
        <div className="work-item-index">
          <span>{project.index}</span>
        </div>
        <div className="work-item-info">
          <h3 className="work-item-name">
            {project.name} <span className="text-red">{project.highlight}</span>
          </h3>
          <p className="work-item-category">{project.category}</p>
        </div>
        <div className="work-item-year">{project.year}</div>
        <div className="work-item-arrow">→</div>
      </div>
    </a>
  )
}

export default function WorkSection() {
  return (
    <section className="work" id="work">
      <div className="work-header">
        <div className="work-header-left">
          <span className="work-section-number">05</span>
        </div>
        <div className="work-header-title">
          <h2 className="work-title">WORK</h2>
          <p className="work-subtitle">Selected projects from 2023–2026</p>
        </div>
      </div>

      <div className="work-list">
        {projects.map((p, i) => (
          <WorkItem key={p.id} project={p} index={i} />
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
          <span>ALL PROJECTS</span>
          <span className="work-link-count">(47)</span>
        </a>
      </div>
    </section>
  )
}

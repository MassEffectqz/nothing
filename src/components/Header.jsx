import { useState, useEffect } from 'react'

export default function Header() {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const sections = ['hero', 'colors', 'work']
    const ids = ['hero', 'colors', 'work']
    const labels = ['Home', 'Colors', 'Work']

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sections.indexOf(entry.target.id)
            if (idx !== -1) setActiveSection(labels[idx])
          }
        })
      },
      { threshold: 0.35 }
    )

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const navItems = [
    { label: 'Home', href: '#hero' },
    { label: 'Colors', href: '#colors' },
    { label: 'Work', href: '#work' },
  ]

  return (
    <header className="corner-header">
      <nav className="corner-nav">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={`corner-nav-link ${activeSection === item.label ? 'active' : ''}`}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  )
}

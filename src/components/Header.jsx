import { useState, useEffect, useRef } from 'react'

export default function Header() {
  const [activeSection, setActiveSection] = useState('hero')
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 })
  const navRef = useRef(null)

  useEffect(() => {
    const sections = ['hero', 'colors', 'work']
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

  // Update pill position when active section changes or on resize
  useEffect(() => {
    const updatePill = () => {
      const nav = navRef.current
      if (!nav) return

      const activeLink = nav.querySelector(`.corner-nav-link.active`)
      if (!activeLink) return

      const navRect = nav.getBoundingClientRect()
      const linkRect = activeLink.getBoundingClientRect()

      setPillStyle({
        left: linkRect.left - navRect.left,
        width: linkRect.width,
      })
    }

    // Initial position with small delay for DOM layout
    const timer = setTimeout(updatePill, 50)

    window.addEventListener('resize', updatePill)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', updatePill)
    }
  }, [activeSection])

  const navItems = [
    { label: 'Home', href: '#hero' },
    { label: 'Colors', href: '#colors' },
    { label: 'Work', href: '#work' },
  ]

  return (
    <header className="corner-header">
      <nav className="corner-nav" ref={navRef}>
        {/* Animated pill indicator */}
        <span
          className="nav-pill"
          style={{
            transform: `translateX(${pillStyle.left}px)`,
            width: `${pillStyle.width}px`,
          }}
        />
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

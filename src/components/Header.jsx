import { useState, useEffect, useRef, useCallback } from 'react'
import LanguageSwitcher from './LanguageSwitcher'
import { useLanguage } from '../hooks/useLanguage.jsx'

export default function Header() {
  const [activeSection, setActiveSection] = useState('hero')
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 })
  const navRef = useRef(null)
  const pillTimeoutRef = useRef(null)

  // Scroll active link into view on mobile
  const scrollToActive = useCallback(() => {
    const nav = navRef.current
    if (!nav) return
    const activeLink = nav.querySelector('.corner-nav-link.active')
    if (!activeLink) return
    activeLink.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    })
  }, [])

  const { t, lang } = useLanguage()

  useEffect(() => {
    const sections = ['hero', 'colors', 'lifestyle', 'about', 'work', 'contact']

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sectionKeys.indexOf(entry.target.id)
            if (idx !== -1) {
              setActiveSection(sectionKeys[idx])
            }
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

  const updatePill = useCallback(() => {
    const nav = navRef.current
    if (!nav) return

    const activeLink = nav.querySelector(`.corner-nav-link.active`)
    if (!activeLink) return

    const navRect = nav.getBoundingClientRect()
    const linkRect = activeLink.getBoundingClientRect()
    const scrollLeft = nav.scrollLeft

    setPillStyle({
      left: linkRect.left - navRect.left + scrollLeft,
      width: linkRect.width,
    })
  }, [])

  // Scroll to active when it changes
  useEffect(() => {
    const timer = setTimeout(scrollToActive, 300)
    // Update pill position after scroll animation completes
    const pillTimer = setTimeout(updatePill, 700)
    return () => {
      clearTimeout(timer)
      clearTimeout(pillTimer)
    }
  }, [activeSection, scrollToActive, updatePill])

  // Update pill when active section changes
  useEffect(() => {
    if (pillTimeoutRef.current) cancelAnimationFrame(pillTimeoutRef.current)
    pillTimeoutRef.current = requestAnimationFrame(updatePill)
    return () => {
      if (pillTimeoutRef.current) cancelAnimationFrame(pillTimeoutRef.current)
    }
  }, [activeSection, updatePill])

  // Update pill on resize
  useEffect(() => {
    window.addEventListener('resize', updatePill)
    return () => window.removeEventListener('resize', updatePill)
  }, [updatePill])

  // Update pill when language changes (nav item widths change)
  useEffect(() => {
    const timer = setTimeout(updatePill, 50)
    return () => clearTimeout(timer)
  }, [lang, updatePill])

  // Update pill on nav scroll (mobile horizontal scroll)
  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    nav.addEventListener('scroll', updatePill, { passive: true })
    return () => nav.removeEventListener('scroll', updatePill)
  }, [updatePill])

  // Initial position
  useEffect(() => {
    const timer = setTimeout(updatePill, 100)
    return () => clearTimeout(timer)
  }, [updatePill])

  const sectionKeys = ['hero', 'colors', 'lifestyle', 'about', 'work', 'contact']

  const navItems = [
    { label: t.navHome, key: 'hero', href: '#hero' },
    { label: t.navColors, key: 'colors', href: '#colors' },
    { label: t.navPureSound, key: 'lifestyle', href: '#lifestyle' },
    { label: t.navAbout, key: 'about', href: '#about' },
    { label: t.navWork, key: 'work', href: '#work' },
    { label: t.navContact, key: 'contact', href: '#contact' },
  ]

  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <>
      {/* Mobile language switcher (top-right) */}
      <div className="lang-switcher-mobile">
        <LanguageSwitcher />
      </div>

      <header className="corner-header">
        <div className="header-group">
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
                className={`corner-nav-link ${activeSection === item.key ? 'active' : ''}`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <LanguageSwitcher />
        </div>
      </header>
    </>
  )
}

import { useState, useEffect, useRef, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import LanguageSwitcher from './LanguageSwitcher'
import { useLanguage } from '../hooks/useLanguage.jsx'

export default function Header() {
  const [activeSection, setActiveSection] = useState('')
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 })
  const navRef = useRef(null)
  const pillTimeoutRef = useRef(null)
  const location = useLocation()
  const onHome = location.pathname === '/'

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

  const sectionKeys = ['hero', 'colors', 'lifestyle', 'about', 'work', 'contact']

  // Observe sections — re-observe when returning to home page
  useEffect(() => {
    if (!onHome) {
      setActiveSection('')
      return
    }

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
  }, [onHome])

  const updatePill = useCallback(() => {
    const nav = navRef.current
    if (!nav) return

    const activeLink = nav.querySelector('.corner-nav-link.active')
    if (!activeLink) {
      // Fallback: hide pill if no active link
      setPillStyle({ left: 0, width: 0 })
      return
    }

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

  // Reposition pill after DOM settles
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(updatePill)
    })
    return () => cancelAnimationFrame(frame)
  }, [updatePill])

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
      <div className="lang-switcher-mobile" role="region" aria-label="Выбор языка">
        <LanguageSwitcher />
      </div>

      <header className="corner-header" role="banner" aria-label="Главная навигация">
        <div className="header-group">
          <nav className="corner-nav" ref={navRef} role="navigation" aria-label="Навигация по разделам" aria-expanded="true">
            {/* Animated pill indicator */}
            <span
              className="nav-pill"
              style={{
                transform: `translateX(${pillStyle.left}px)`,
                width: `${pillStyle.width}px`,
              }}
              aria-hidden="true"
            />
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`corner-nav-link ${activeSection === item.key ? 'active' : ''}`}
                aria-current={activeSection === item.key ? 'location' : undefined}
                aria-label={item.label}
              >
                {item.label}
              </a>
            ))}
          </nav>
          {/* Mobile menu toggle button */}
          <button
            className="header-mobile-toggle"
            aria-label="Открыть меню навигации"
            aria-expanded="false"
            aria-controls="mobile-nav-menu"
          >
            <span className="hamburger-icon" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
          <LanguageSwitcher />
        </div>
      </header>
    </>
  )
}

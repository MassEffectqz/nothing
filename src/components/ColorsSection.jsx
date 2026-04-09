import { useEffect, useRef, useState, useCallback } from 'react'

const PHONE_CONFIGS = [
  { color: 'black', speed: 0.4, rotation: -30, hex: '#1a1a1a', flyFrom: 'top-left', finalTop: '18%', finalLeft: '28%' },
  { color: 'white', speed: 0.6, rotation: 25, hex: '#e8e8e6', flyFrom: 'top-right', finalTop: '22%', finalLeft: '52%' },
  { color: 'pink', speed: 0.5, rotation: -20, hex: '#f0c4c4', flyFrom: 'bottom-left', finalTop: '48%', finalLeft: '25%' },
  { color: 'blue', speed: 0.7, rotation: 15, hex: '#7eb8d4', flyFrom: 'bottom-right', finalTop: '52%', finalLeft: '48%' },
]

function PhoneItem({ config, style }) {
  return (
    <div className={`phone-item phone-${config.color}`} data-color={config.color} style={style}>
      <img src={`/phones/${config.color}.webp`} alt={`Nothing Phone ${config.color}`} />
    </div>
  )
}

function ColorIndicatorItem({ config, isHovered, onHover, onLeave }) {
  return (
    <div
      className={`color-indicator ${isHovered ? 'active' : ''}`}
      data-color={config.color}
      onMouseEnter={() => onHover(config.color)}
      onMouseLeave={onLeave}
    >
      <span
        className="color-dot-indicator"
        style={{
          background: config.hex,
          ...(config.color === 'white' ? { border: '1px solid var(--color-border)' } : {}),
        }}
      />
      <span className="color-name">{config.color}</span>
    </div>
  )
}

export default function ColorsSection() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const [hoverColor, setHoverColor] = useState(null)
  const [indicatorsOpacity, setIndicatorsOpacity] = useState(0)
  const [titleVisible, setTitleVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const [phoneStates, setPhoneStates] = useState([
    { opacity: 0, offsetX: -200, offsetY: -250, rotation: -30, blur: 10 },
    { opacity: 0, offsetX: 200, offsetY: -250, rotation: 25, blur: 10 },
    { opacity: 0, offsetX: -200, offsetY: 250, rotation: -20, blur: 10 },
    { opacity: 0, offsetX: 200, offsetY: 250, rotation: 15, blur: 10 },
  ])

  const handleHover = useCallback((color) => setHoverColor(color), [])
  const handleLeave = useCallback(() => setHoverColor(null), [])

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const flyOffsetsDesktop = {
      'top-left': { offsetX: -200, offsetY: -250 },
      'top-right': { offsetX: 200, offsetY: -250 },
      'bottom-left': { offsetX: -200, offsetY: 250 },
      'bottom-right': { offsetX: 200, offsetY: 250 },
    }

    const flyOffsetsMobile = {
      'top-left': { offsetX: -100, offsetY: -150 },
      'top-right': { offsetX: 100, offsetY: -150 },
      'bottom-left': { offsetX: -100, offsetY: 150 },
      'bottom-right': { offsetX: 100, offsetY: 150 },
    }

    const computeAnimations = () => {
      const rect = el.getBoundingClientRect()
      const sectionHeight = el.offsetHeight
      const windowHeight = window.innerHeight

      // Progress 0->1 as section enters viewport
      const startThreshold = windowHeight * 0.8
      const endThreshold = -sectionHeight * 0.3
      const rawProgress = (startThreshold - rect.top) / (startThreshold - endThreshold)
      const progress = Math.max(0, Math.min(1, rawProgress))

      // Title appears early
      setTitleVisible(progress > 0.05)

      // Indicators fade in when hero is fully gone
      const heroSection = document.querySelector('.hero')
      const heroRect = heroSection ? heroSection.getBoundingClientRect() : { bottom: 0 }
      const heroFullyHidden = heroRect.bottom <= 0
      setIndicatorsOpacity(heroFullyHidden ? Math.min(1, (progress - 0.1) * 3) : 0)

      // Phone animations
      const flyOffsets = isMobile ? flyOffsetsMobile : flyOffsetsDesktop

      const newPhoneStates = PHONE_CONFIGS.map((config, i) => {
        const appearStart = 0.05 + (i * 0.08)
        const appearEnd = appearStart + 0.5

        const initialOffsetX = flyOffsets[config.flyFrom].offsetX
        const initialOffsetY = flyOffsets[config.flyFrom].offsetY

        if (progress < appearStart) {
          // Before animation - phones off-screen
          return {
            opacity: 0,
            offsetX: initialOffsetX,
            offsetY: initialOffsetY,
            rotation: config.rotation,
            blur: 10,
          }
        }

        if (progress > appearEnd) {
          // After animation - phones in final position with slight float
          const floatT = (progress - appearEnd) / (1 - appearEnd)
          const floatY = Math.sin(floatT * Math.PI * 2) * 8
          return {
            opacity: 1,
            offsetX: 0,
            offsetY: floatY,
            rotation: config.rotation,
            blur: 0,
          }
        }

        // During animation - smooth easing
        const t = (progress - appearStart) / (appearEnd - appearStart)
        const eased = 1 - Math.pow(1 - t, 3) // easeOutCubic

        return {
          opacity: eased,
          offsetX: initialOffsetX * (1 - eased),
          offsetY: initialOffsetY * (1 - eased),
          rotation: config.rotation,
          blur: 10 * (1 - eased),
        }
      })

      setPhoneStates(newPhoneStates)
    }

    const handleScroll = () => requestAnimationFrame(computeAnimations)

    computeAnimations()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [hoverColor, isMobile])

  return (
    <section ref={sectionRef} className="phones-showcase">
      <div className="phones-showcase-content">
        <div className={`phones-header ${titleVisible ? 'visible' : ''}`}>
          <span className="phones-section-number">02</span>
          <h2 className="phones-title">COLORS</h2>
        </div>

        <div 
          className="color-indicators"
          style={{ 
            opacity: indicatorsOpacity,
            visibility: indicatorsOpacity > 0 ? 'visible' : 'hidden',
          }}
        >
          {PHONE_CONFIGS.map((config) => (
            <ColorIndicatorItem
              key={config.color}
              config={config}
              isHovered={hoverColor === config.color}
              onHover={handleHover}
              onLeave={handleLeave}
            />
          ))}
        </div>

        <div className="phones-stage">
          {PHONE_CONFIGS.map((config, i) => {
            const posStyle = {}
            if (config.finalTop) posStyle.top = config.finalTop
            if (config.finalBottom) posStyle.bottom = config.finalBottom
            if (config.finalLeft) posStyle.left = config.finalLeft
            if (config.finalRight) posStyle.right = config.finalRight

            const state = phoneStates[i] || { opacity: 0, offsetX: 0, offsetY: 0, rotation: config.rotation, blur: 0 }
            const isHovered = hoverColor === config.color

            return (
              <PhoneItem
                key={config.color}
                config={config}
                style={{
                  ...posStyle,
                  opacity: isHovered ? Math.max(state.opacity, 0.8) : state.opacity,
                  transform: `translate(${state.offsetX}px, ${state.offsetY}px) rotate(${state.rotation}deg)`,
                  filter: state.blur > 0
                    ? `blur(${state.blur}px)`
                    : (hoverColor && !isHovered ? 'grayscale(80%) brightness(0.7)' : 'none'),
                  transition: 'none',
                  zIndex: isHovered ? 5 : 1,
                }}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

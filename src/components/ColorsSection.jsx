import { useEffect, useRef, useState, useCallback } from 'react'

const PHONE_CONFIGS = [
  { color: 'black', rotation: -30, hex: '#1a1a1a', flyFrom: { x: -200, y: -250 }, finalTop: '10%', finalLeft: '15%' },
  { color: 'white', rotation: 25, hex: '#e8e8e6', flyFrom: { x: 200, y: -250 }, finalTop: '15%', finalLeft: '55%' },
  { color: 'pink', rotation: -20, hex: '#f0c4c4', flyFrom: { x: -200, y: 250 }, finalTop: '55%', finalLeft: '12%' },
  { color: 'blue', rotation: 15, hex: '#7eb8d4', flyFrom: { x: 200, y: 250 }, finalTop: '60%', finalLeft: '50%' },
]

const FLOAT_PARAMS = [
  { amplitude: 14, speed: 0.4 },
  { amplitude: 18, speed: 0.5 },
  { amplitude: 12, speed: 0.45 },
  { amplitude: 20, speed: 0.55 },
]

const INDICATOR_OFFSET_TOP = 96 // 6rem in px

function PhoneItem({ config, style }) {
  return (
    <div className={`phone-item phone-${config.color}`} data-color={config.color} style={style}>
      <img src={`/phones/${config.color}.webp`} alt={`Nothing Phone ${config.color}`} />
    </div>
  )
}

function ColorIndicatorItem({ config, isHovered, isActive, onHover, onLeave }) {
  return (
    <button
      className={`color-indicator ${isActive ? 'active' : ''}`}
      data-color={config.color}
      onMouseEnter={() => onHover(config.color)}
      onMouseLeave={onLeave}
      onClick={() => onHover(config.color)}
      aria-label={`${config.color} phone`}
    >
      <span
        className="color-dot-indicator"
        style={{
          background: config.hex,
          ...(config.color === 'white' ? { border: '1px solid var(--color-border)' } : {}),
        }}
      />
      <span className="color-name">{config.color}</span>
      <span className={`color-active-line ${isHovered ? 'visible' : ''}`} />
    </button>
  )
}

export default function ColorsSection() {
  const sectionRef = useRef(null)
  const [hoverColor, setHoverColor] = useState(null)
  const [titleVisible, setTitleVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768)
  const [phoneStates, setPhoneStates] = useState(() =>
    PHONE_CONFIGS.map((cfg, i) => ({
      opacity: 0,
      offsetX: cfg.flyFrom.x,
      offsetY: cfg.flyFrom.y,
      rotation: cfg.rotation,
      blur: 10,
    }))
  )

  const animRef = useRef({
    frameId: null,
    startTime: null,
    finishedTime: [null, null, null, null],
  })

  const handleHover = useCallback((color) => setHoverColor(color), [])
  const handleLeave = useCallback(() => setHoverColor(null), [])

  // Responsive detection
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Main animation loop
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const anim = animRef.current
    const MOBILE_OFFSETS = { x: 100, y: 150 }
    const DESKTOP_OFFSETS = { x: 200, y: 250 }

    const tick = (now) => {
      if (!anim.startTime) anim.startTime = now
      const elapsed = (now - anim.startTime) / 1000

      const rect = el.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const sectionHeight = el.offsetHeight

      // Scroll progress for phones
      const startThreshold = windowHeight * 0.8
      const endThreshold = -sectionHeight * 0.3
      const progress = Math.max(0, Math.min(1, (startThreshold - rect.top) / (startThreshold - endThreshold)))

      // Title visibility
      setTitleVisible(progress > 0.05)

      // Phone states
      const offsets = isMobile ? MOBILE_OFFSETS : DESKTOP_OFFSETS

      const newStates = PHONE_CONFIGS.map((cfg, i) => {
        const appearStart = 0.05 + i * 0.08
        const appearEnd = appearStart + 0.5
        const { amplitude, speed } = FLOAT_PARAMS[i]

        const initX = cfg.flyFrom.x > 0 ? offsets.x : -offsets.x
        const initY = cfg.flyFrom.y > 0 ? offsets.y : -offsets.y

        if (progress < appearStart) {
          anim.finishedTime[i] = null
          return { opacity: 0, offsetX: initX, offsetY: initY, rotation: cfg.rotation, blur: 10 }
        }

        if (progress > appearEnd) {
          if (anim.finishedTime[i] === null) anim.finishedTime[i] = elapsed
          const floatTime = elapsed - anim.finishedTime[i]
          const floatY = Math.sin(floatTime * speed * Math.PI * 2) * amplitude
          return { opacity: 1, offsetX: 0, offsetY: floatY, rotation: cfg.rotation, blur: 0 }
        }

        const t = (progress - appearStart) / (appearEnd - appearStart)
        const eased = 1 - (1 - t) ** 3
        return {
          opacity: eased,
          offsetX: initX * (1 - eased),
          offsetY: initY * (1 - eased),
          rotation: cfg.rotation,
          blur: 10 * (1 - eased),
        }
      })

      setPhoneStates(newStates)
      anim.frameId = requestAnimationFrame(tick)
    }

    anim.frameId = requestAnimationFrame(tick)
    return () => {
      if (anim.frameId) cancelAnimationFrame(anim.frameId)
    }
  }, [isMobile])

  return (
    <section ref={sectionRef} className="phones-showcase" id="colors">
      <div className="phones-showcase-content">
        <div className={`phones-header ${titleVisible ? 'visible' : ''}`}>
          <span className="phones-section-number">02</span>
          <div className="phones-header-text">
            <h2 className="phones-title">COLORS Nothing Phone 4a</h2>
            <p className="phones-subtitle">
              Iconic transparent design, available in four essential colours.
              Choose yours.
            </p>
            <a href="#" className="phones-cta">
              <span>SHOP NOW</span>
              <span className="phones-cta-arrow">→</span>
            </a>
          </div>
        </div>

        <div className="color-indicators">
          {PHONE_CONFIGS.map((cfg, i) => (
            <ColorIndicatorItem
              key={cfg.color}
              config={cfg}
              isHovered={hoverColor === cfg.color}
              isActive={hoverColor !== null}
              onHover={handleHover}
              onLeave={handleLeave}
            />
          ))}
        </div>

        <div className="phones-stage">
          {PHONE_CONFIGS.map((cfg, i) => {
            const pos = {}
            if (cfg.finalTop) pos.top = cfg.finalTop
            if (cfg.finalLeft) pos.left = cfg.finalLeft
            const s = phoneStates[i]
            const isHovered = hoverColor === cfg.color

            let finalOpacity = s.opacity
            let finalFilter = s.blur > 0 ? `blur(${s.blur}px)` : 'none'

            if (hoverColor !== null) {
              if (isHovered) {
                finalOpacity = Math.max(s.opacity, 1)
                finalFilter = 'none'
              } else {
                finalOpacity = Math.max(s.opacity * 0.15, 0)
                finalFilter = 'grayscale(60%) brightness(0.6)'
              }
            }

            return (
              <PhoneItem
                key={cfg.color}
                config={cfg}
                style={{
                  ...pos,
                  opacity: finalOpacity,
                  transform: `translate(${s.offsetX}px, ${s.offsetY}px) rotate(${s.rotation}deg)`,
                  filter: finalFilter,
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

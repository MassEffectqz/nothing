import { useEffect, useRef, useState, useCallback, useMemo } from 'react'

const PHONE_CONFIGS = [
  { color: 'black', speed: 0.4, rotation: -30, hex: '#1a1a1a', flyFrom: 'top-left', finalTop: '10%', finalLeft: '15%' },
  { color: 'white', speed: 0.6, rotation: 25, hex: '#e8e8e6', flyFrom: 'top-right', finalTop: '15%', finalLeft: '55%' },
  { color: 'pink', speed: 0.5, rotation: -20, hex: '#f0c4c4', flyFrom: 'bottom-left', finalTop: '55%', finalLeft: '12%' },
  { color: 'blue', speed: 0.7, rotation: 15, hex: '#7eb8d4', flyFrom: 'bottom-right', finalTop: '60%', finalLeft: '50%' },
]

// Dot grid background
function DotGrid({ hoverColor }) {
  const cols = 30
  const rows = 40
  const dotSpacing = 32
  const totalWidth = cols * dotSpacing
  const totalHeight = rows * dotSpacing

  const dots = useMemo(() => {
    const arr = []
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        arr.push({ x: c * dotSpacing, y: r * dotSpacing, row: r, col: c })
      }
    }
    return arr
  }, [])

  const getDotColor = useCallback((dot) => {
    // Always visible black dots with alternating pattern
    const isAlt = (dot.row + dot.col) % 3 === 0

    if (hoverColor) {
      // When hovering, make alt dots darker based on phone color
      const isLightColor = ['white', 'pink', 'blue'].includes(hoverColor)
      if (isLightColor) {
        return isAlt ? 'rgba(26,26,26,0.4)' : 'rgba(26,26,26,0.1)'
      } else {
        return isAlt ? 'rgba(26,26,26,0.5)' : 'rgba(26,26,26,0.1)'
      }
    }

    // Default: clearly visible dots
    return isAlt ? 'rgba(0,0,0,0.35)' : 'rgba(0,0,0,0.1)'
  }, [hoverColor])

  return (
    <div
      className="dot-grid"
      style={{
        width: totalWidth + 'px',
        height: totalHeight + 'px',
      }}
    >
      <svg
        width={totalWidth}
        height={totalHeight}
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        {dots.map((dot, i) => (
          <circle
            key={i}
            cx={dot.x}
            cy={dot.y}
            r={1.8}
            fill={getDotColor(dot)}
            style={{
              transition: 'fill 0.4s ease',
            }}
          />
        ))}
      </svg>
    </div>
  )
}

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

  // Refs for animation state that must persist across re-renders
  const animStateRef = useRef({
    animFrameId: null,
    startTime: null,
    phoneFinishedTime: [null, null, null, null],
    isMobile: window.innerWidth <= 768,
    progress: 0,
  })

  useEffect(() => {
    const checkMobile = () => {
      animStateRef.current.isMobile = window.innerWidth <= 768
      setIsMobile(animStateRef.current.isMobile)
    }
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

    const FLOAT_AMPLITUDES = [14, 18, 12, 20]
    const FLOAT_SPEEDS = [0.4, 0.5, 0.45, 0.55]

    const computeAnimations = (timestamp) => {
      const state = animStateRef.current
      if (!state.startTime) state.startTime = timestamp
      const elapsed = (timestamp - state.startTime) / 1000

      const rect = el.getBoundingClientRect()
      const sectionHeight = el.offsetHeight
      const windowHeight = window.innerHeight

      const startThreshold = windowHeight * 0.8
      const endThreshold = -sectionHeight * 0.3
      const rawProgress = (startThreshold - rect.top) / (startThreshold - endThreshold)
      const progress = Math.max(0, Math.min(1, rawProgress))
      state.progress = progress

      setTitleVisible(progress > 0.05)

      const heroSection = document.querySelector('.hero')
      const heroRect = heroSection ? heroSection.getBoundingClientRect() : { bottom: 0 }

      let indicatorsTarget = 0
      if (state.isMobile) {
        const sectionVisibleRatio = Math.max(0, Math.min(1, (windowHeight - rect.top) / sectionHeight))
        indicatorsTarget = Math.max(0, (sectionVisibleRatio - 0.2) * 2)
      } else {
        const heroFullyHidden = heroRect.bottom <= 0
        indicatorsTarget = heroFullyHidden ? Math.min(1, (progress - 0.1) * 3) : 0
      }

      setIndicatorsOpacity(Math.min(1, indicatorsTarget))

      const flyOffsets = state.isMobile ? flyOffsetsMobile : flyOffsetsDesktop

      const newPhoneStates = PHONE_CONFIGS.map((config, i) => {
        const appearStart = 0.05 + (i * 0.08)
        const appearEnd = appearStart + 0.5

        const initialOffsetX = flyOffsets[config.flyFrom].offsetX
        const initialOffsetY = flyOffsets[config.flyFrom].offsetY

        if (progress < appearStart) {
          state.phoneFinishedTime[i] = null
          return {
            opacity: 0,
            offsetX: initialOffsetX,
            offsetY: initialOffsetY,
            rotation: config.rotation,
            blur: 10,
          }
        }

        if (progress > appearEnd) {
          if (state.phoneFinishedTime[i] === null) {
            state.phoneFinishedTime[i] = elapsed
          }
          const floatTime = elapsed - state.phoneFinishedTime[i]
          const floatY = Math.sin(floatTime * FLOAT_SPEEDS[i] * Math.PI * 2) * FLOAT_AMPLITUDES[i]

          return {
            opacity: 1,
            offsetX: 0,
            offsetY: floatY,
            rotation: config.rotation,
            blur: 0,
          }
        }

        const t = (progress - appearStart) / (appearEnd - appearStart)
        const eased = 1 - Math.pow(1 - t, 3)

        return {
          opacity: eased,
          offsetX: initialOffsetX * (1 - eased),
          offsetY: initialOffsetY * (1 - eased),
          rotation: config.rotation,
          blur: 10 * (1 - eased),
        }
      })

      setPhoneStates(newPhoneStates)
      animStateRef.current.animFrameId = requestAnimationFrame(computeAnimations)
    }

    animStateRef.current.animFrameId = requestAnimationFrame(computeAnimations)

    return () => {
      if (animStateRef.current.animFrameId) cancelAnimationFrame(animStateRef.current.animFrameId)
      animStateRef.current.animFrameId = null
    }
  }, [])

  return (
    <section ref={sectionRef} className="phones-showcase">
      <div className="phones-showcase-content">
        {/* Dot grid covering entire section */}
        <div className="dot-grid-wrapper">
          <DotGrid hoverColor={hoverColor} />
        </div>

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

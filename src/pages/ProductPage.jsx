import { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { useLanguage } from '../hooks/useLanguage.jsx'

// Wallpaper pool for background breaks
const WALLPAPERS = [
  '/media/wallpapers/nothing-lifestyle-01.jpg',
  '/media/wallpapers/nothing-lifestyle-12.jpg',
  '/media/wallpapers/nothing-lifestyle-13.jpg',
  '/media/wallpapers/nothing-lifestyle-14.jpg',
  '/media/wallpapers/nothing-lifestyle-15.jpg',
  '/media/wallpapers/nothing-lifestyle-16.jpg',
  '/media/wallpapers/nothing-lifestyle-17.jpg',
  '/media/wallpapers/nothing-lifestyle-18.jpg',
  '/media/wallpapers/nothing-lifestyle-19.jpg',
  '/media/wallpapers/nothing-lifestyle-20.jpg',
  '/media/wallpapers/nothing-lifestyle-21.jpg',
  '/media/wallpapers/nothing-lifestyle-22.jpg',
  '/media/wallpapers/nothing-lifestyle-23.jpg',
  '/media/wallpapers/nothing-lifestyle-24.jpg',
  '/media/wallpapers/nothing-lifestyle-25.jpg',
  '/media/wallpapers/nothing-lifestyle-26.jpg',
  '/media/wallpapers/nothing-lifestyle-27.jpg',
  '/media/wallpapers/nothing-lifestyle-28.jpg',
  '/media/wallpapers/nothing-lifestyle-29.jpg',
  '/media/wallpapers/nothing-lifestyle-30.jpg',
  '/media/wallpapers/nothing-lifestyle-31.jpg',
  '/media/wallpapers/nothing-lifestyle-32.jpg',
  '/media/wallpapers/nothing-lifestyle-33.jpg',
  '/media/wallpapers/nothing-lifestyle-34.jpg',
  '/media/wallpapers/nothing-lifestyle-35.jpg',
  '/media/wallpapers/nothing-lifestyle-36.jpg',
  '/media/wallpapers/nothing-lifestyle-37.jpg',
  '/media/wallpapers/nothing-phone-lifestyle-1.jpg',
  '/media/wallpapers/nothing-phone-lifestyle-2.jpg',
  '/media/wallpapers/nothing-phone-lifestyle-3.jpg',
  '/media/wallpapers/nothing-phone-lifestyle-4.jpg',
  '/media/wallpapers/nothing-phone-lifestyle-5.jpg',
  '/media/wallpapers/nothing-phone-lifestyle-6.jpg',
  '/media/wallpapers/nothing-phones-collection.jpg',
  '/media/wallpapers/nothing-wallpaper-japan-pagoda.jpg',
  '/media/wallpapers/nothing-wallpaper-ski-mountains.jpg',
]

const products = {
  'phone-3': {
    number: '01',
    name: 'Phone (3)',
    category: 'Smartphone · Flagship',
    year: '2025',
    price: '$799',
    hero: '/media/products/phone-3/hero.jpg',
    images: {
      detail: '/media/products/phone-3/detail.jpg',
      detail1: '/media/products/phone-3/detail-1.jpg',
      detail2: '/media/products/phone-3/detail-2.jpg',
      thumb: '/media/products/phone-3/thumb-1.jpg',
      white: '/media/products/phone-3/white.png',
    },
    gallery: ['/media/products/phone-3/detail-1.jpg', '/media/products/phone-3/detail-2.jpg', '/media/products/phone-3/detail.jpg'],
    description: 'The pinnacle of Nothing design and technology. Phone (3) redefines the flagship experience with its transparent aesthetic, Glyph Interface, and uncompromising performance.',
    longDescription: 'Every detail has been meticulously refined — from the precision-machined aluminum frame to the hand-polished glass back that reveals the intricate circuitry within.',
    highlight: 'Transparent design meets raw power.',
    metrics: [
      { value: '50', unit: 'MP', label: 'Main Camera' },
      { value: '5000', unit: 'mAh', label: 'Battery' },
      { value: '120', unit: 'Hz', label: 'Refresh Rate' },
      { value: '2000', unit: 'nits', label: 'Peak Brightness' },
    ],
    inTheBox: ['Phone (3)', 'USB-C Cable (1m)', 'SIM Tool', 'Quick Start Guide', 'Clear Case'],
    reviewsKey: 'reviewsPhone3',
    faq: [
      { q: 'Does it support 5G?', a: 'Yes, with global 5G band support including mmWave and Sub-6.' },
      { q: 'Is the Glyph Interface customizable?', a: 'Yes, create custom light patterns for contacts, apps, and notifications.' },
      { q: 'Does it have a headphone jack?', a: 'No, use USB-C or Bluetooth audio devices.' },
      { q: 'Water resistance rating?', a: 'IP68 — up to 1.5m for 30 minutes.' },
    ],
    compare: [
      { name: 'Phone (3)', value: '50MP', active: true },
      { name: 'Phone (3a)', value: '50MP', active: false },
      { name: 'Phone (4a)', value: '50MP', active: false },
    ],
    specs: [
      { label: 'Display', value: '6.7" LTPO OLED\n1-120Hz · 2000 nits' },
      { label: 'Processor', value: 'Snapdragon 8 Gen 3\nOcta-core 3.3GHz' },
      { label: 'Camera', value: '50MP Main + 50MP UW\nOIS · 4K 60fps' },
      { label: 'Battery', value: '5000 mAh\n45W wired · 15W wireless' },
      { label: 'Storage', value: '256GB / 512GB\nUFS 4.0' },
      { label: 'OS', value: 'Nothing OS 3.0\nAndroid 15' },
    ],
    features: ['Glyph Interface 2.0', 'IP68 Water Resistance', 'Wireless Charging', 'Ultra-Wideband'],
  },
  'phone-3a': {
    number: '02',
    name: 'Phone (3a)',
    category: 'Smartphone · New',
    year: '2025',
    price: '$399',
    hero: '/media/products/phone-3a/hero.jpg',
    images: {
      gallery1: '/media/products/phone-3a/gallery-1.jpg',
      gallery2: '/media/products/phone-3a/gallery-2.jpg',
      gallery3: '/media/products/phone-3a/gallery-3.jpg',
      detail: '/media/products/phone-3a/detail.jpg',
      background: '/media/products/phone-3a/background.jpg',
    },
    gallery: ['/media/products/phone-3a/gallery.jpg', '/media/products/phone-3a/detail.jpg'],
    description: 'Essential Nothing experience at an accessible price. Phone (3a) brings the iconic design language and Glyph Interface to a broader audience.',
    longDescription: 'Proof that great design shouldn\'t come with a premium price tag. Same DNA, more approachable package.',
    highlight: 'Nothing less than what you need.',
    metrics: [
      { value: '50', unit: 'MP', label: 'Main Camera' },
      { value: '4800', unit: 'mAh', label: 'Battery' },
      { value: '90', unit: 'Hz', label: 'Refresh Rate' },
      { value: '1300', unit: 'nits', label: 'Peak Brightness' },
    ],
    inTheBox: ['Phone (3a)', 'USB-C Cable (1m)', 'SIM Tool', 'Quick Start Guide'],
    reviewsKey: 'reviewsPhone3a',
    faq: [
      { q: 'Does it have wireless charging?', a: 'No, but it supports 33W wired fast charging.' },
      { q: 'Water resistance?', a: 'IP54 — splash and dust resistant.' },
      { q: 'Expandable storage?', a: 'No, choose between 128GB or 256GB at purchase.' },
    ],
    compare: [
      { name: 'Phone (3)', value: '50MP', active: false },
      { name: 'Phone (3a)', value: '50MP', active: true },
      { name: 'Phone (4a)', value: '50MP', active: false },
    ],
    specs: [
      { label: 'Display', value: '6.55" AMOLED\n90Hz · 1300 nits' },
      { label: 'Processor', value: 'Snapdragon 7s Gen 3\nOcta-core 2.5GHz' },
      { label: 'Camera', value: '50MP Main + 8MP UW\nOIS · 4K 30fps' },
      { label: 'Battery', value: '4800 mAh\n33W wired' },
      { label: 'Storage', value: '128GB / 256GB\nUFS 2.2' },
      { label: 'OS', value: 'Nothing OS 3.0\nAndroid 15' },
    ],
    features: ['Glyph Interface', 'IP54 Splash Resistant', 'Dual SIM', 'NFC'],
  },
  'phone-3a-lite': {
    number: '03',
    name: 'Phone (3a lite)',
    category: 'Smartphone · Lite',
    year: '2025',
    price: '$199',
    hero: '/media/products/phone-3a-lite/hero.jpg',
    images: {
      hero2: '/media/products/phone-3a-lite/hero-2.jpg',
      hero3: '/media/products/phone-3a-lite/hero-3.jpg',
      gallery1: '/media/products/phone-3a-lite/gallery-1.jpg',
      gallery2: '/media/products/phone-3a-lite/gallery-2.jpg',
      gallery3: '/media/products/phone-3a-lite/gallery-3.jpg',
      detail1: '/media/products/phone-3a-lite/detail-1.jpg',
      detail2: '/media/products/phone-3a-lite/detail-2.jpg',
      detail3: '/media/products/phone-3a-lite/detail-3.jpg',
      thumb1: '/media/products/phone-3a-lite/thumb-1.jpg',
      thumb2: '/media/products/phone-3a-lite/thumb-2.jpg',
      thumb3: '/media/products/phone-3a-lite/thumb-3.jpg',
      background: '/media/products/phone-3a-lite/background.jpg',
    },
    gallery: ['/media/products/phone-3a-lite/gallery-1.jpg', '/media/products/phone-3a-lite/gallery-2.jpg', '/media/products/phone-3a-lite/detail-1.jpg'],
    description: 'The most accessible entry point into the Nothing ecosystem. Compact, everyday companion that proves great design is for everyone.',
    longDescription: 'Small in size, not in ambition. Nothing design philosophy in its purest form.',
    highlight: 'Great design is for everyone.',
    metrics: [
      { value: '48', unit: 'MP', label: 'Main Camera' },
      { value: '4500', unit: 'mAh', label: 'Battery' },
      { value: '90', unit: 'Hz', label: 'Refresh Rate' },
      { value: '6.3', unit: '"', label: 'Display' },
    ],
    inTheBox: ['Phone (3a lite)', 'USB-C Cable (1m)', 'SIM Tool', 'Quick Start Guide'],
    reviewsKey: 'reviewsPhone3aLite',
    faq: [
      { q: 'Does it have a headphone jack?', a: 'Yes, 3.5mm headphone jack included.' },
      { q: 'Expandable storage?', a: 'Yes, microSD slot supports up to 1TB.' },
      { q: '5G support?', a: 'Yes, dual-mode 5G.' },
    ],
    compare: [
      { name: 'Phone (3a)', value: '50MP', active: false },
      { name: 'Phone (3a lite)', value: '48MP', active: true },
      { name: 'Phone (4a)', value: '50MP', active: false },
    ],
    specs: [
      { label: 'Display', value: '6.3" IPS LCD\n90Hz · 800 nits' },
      { label: 'Processor', value: 'Snapdragon 7s Gen 3\nOcta-core 2.2GHz' },
      { label: 'Camera', value: '48MP Main\n1080p 60fps' },
      { label: 'Battery', value: '4500 mAh\n18W wired' },
      { label: 'Storage', value: '64GB / 128GB\neMMC 5.1' },
      { label: 'OS', value: 'Nothing OS 3.0\nAndroid 15' },
    ],
    features: ['Nothing Design', 'Dual SIM', '3.5mm Jack', 'Expandable Storage'],
  },
  'phone-4a-pro': {
    number: '04',
    name: 'Phone (4a Pro)',
    category: 'Smartphone · Pro',
    year: '2026',
    price: '$599',
    hero: '/media/products/phone-4a-pro/hero.jpg',
    images: {
      hero2: '/media/products/phone-4a-pro/hero-2.jpg',
      hero3: '/media/products/phone-4a-pro/hero-3.jpg',
      gallery1: '/media/products/phone-4a-pro/gallery-1.jpg',
      gallery2: '/media/products/phone-4a-pro/gallery-2.jpg',
      gallery3: '/media/products/phone-4a-pro/gallery-3.jpg',
      detail1: '/media/products/phone-4a-pro/detail-1.jpg',
      detail2: '/media/products/phone-4a-pro/detail-2.jpg',
      detail3: '/media/products/phone-4a-pro/detail-3.jpg',
      detail4: '/media/products/phone-4a-pro/detail-4.jpg',
      white: '/media/products/phone-4a-pro/white.png',
      background: '/media/products/phone-4a-pro/background.jpg',
    },
    gallery: ['/media/products/phone-4a-pro/gallery-1.jpg', '/media/products/phone-4a-pro/gallery-2.jpg', '/media/products/phone-4a-pro/detail-1.jpg'],
    description: 'Professional-grade Nothing. Bridges the gap between flagship and mid-range, offering premium features in a refined package.',
    longDescription: 'The Pro designation isn\'t given lightly. Every aspect elevated, every compromise eliminated.',
    highlight: 'Beyond mid-range. Below flagship.',
    metrics: [
      { value: '50', unit: 'MP', label: 'Main Camera' },
      { value: '5200', unit: 'mAh', label: 'Battery' },
      { value: '120', unit: 'Hz', label: 'Refresh Rate' },
      { value: '1800', unit: 'nits', label: 'Peak Brightness' },
    ],
    inTheBox: ['Phone (4a Pro)', 'USB-C Cable (1m)', 'SIM Tool', 'Quick Start Guide', 'Clear Case', 'Screen Protector (pre-applied)'],
    reviewsKey: 'reviewsPhone4aPro',
    faq: [
      { q: 'What\'s new vs Phone (3)?', a: 'Updated processor, larger battery, Glyph Interface 3.0 with more zones.' },
      { q: 'Wireless charging?', a: 'Yes, 15W Qi wireless charging.' },
      { q: 'Always-On Display?', a: 'Yes, customizable AOD with Glyph patterns.' },
    ],
    compare: [
      { name: 'Phone (3)', value: '45W', active: false },
      { name: 'Phone (4a Pro)', value: '50W', active: true },
      { name: 'Phone (4a)', value: '33W', active: false },
    ],
    specs: [
      { label: 'Display', value: '6.67" LTPO OLED\n1-120Hz · 1800 nits' },
      { label: 'Processor', value: 'Snapdragon 7+ Gen 4\nOcta-core 2.8GHz' },
      { label: 'Camera', value: '50MP Main + 50MP UW\nOIS · 4K 60fps' },
      { label: 'Battery', value: '5200 mAh\n50W wired · 15W wireless' },
      { label: 'Storage', value: '256GB / 512GB\nUFS 3.1' },
      { label: 'OS', value: 'Nothing OS 3.5\nAndroid 16' },
    ],
    features: ['Glyph Interface 3.0', 'IP65 Water Resistance', 'Wireless Charging', 'Always-On Display'],
  },
  'phone-4a': {
    number: '05',
    name: 'Phone (4a)',
    category: 'Smartphone · Standard',
    year: '2026',
    price: '$349',
    hero: '/media/products/phone-4a/hero.jpg',
    images: {
      hero2: '/media/products/phone-4a/hero-2.jpg',
      hero3: '/media/products/phone-4a/hero-3.jpg',
      gallery1: '/media/products/phone-4a/gallery-1.jpg',
      gallery2: '/media/products/phone-4a/gallery-2.jpg',
      detail1: '/media/products/phone-4a/detail-1.jpg',
      detail2: '/media/products/phone-4a/detail-2.jpg',
      white: '/media/products/phone-4a/white.png',
      background: '/media/products/phone-4a/background.jpg',
    },
    gallery: ['/media/products/phone-4a/gallery-1.jpg', '/media/products/phone-4a/hero-2.jpg', '/media/products/phone-4a/detail-2.jpg'],
    description: 'The new standard. Flagship design language, reliable performance, and a price that makes sense.',
    longDescription: 'Sometimes the best choice is the balanced one. Complete Nothing experience, no compromises.',
    highlight: 'Nothing more, nothing less.',
    metrics: [
      { value: '50', unit: 'MP', label: 'Main Camera' },
      { value: '5000', unit: 'mAh', label: 'Battery' },
      { value: '120', unit: 'Hz', label: 'Refresh Rate' },
      { value: '1500', unit: 'nits', label: 'Peak Brightness' },
    ],
    inTheBox: ['Phone (4a)', 'USB-C Cable (1m)', 'SIM Tool', 'Quick Start Guide'],
    reviewsKey: 'reviewsPhone4a',
    faq: [
      { q: '5G support?', a: 'Yes, global 5G bands.' },
      { q: 'Water resistance?', a: 'IP54 — splash and dust resistant.' },
      { q: 'NFC?', a: 'Yes, for contactless payments.' },
    ],
    compare: [
      { name: 'Phone (3a)', value: '33W', active: false },
      { name: 'Phone (4a)', value: '33W', active: true },
      { name: 'Phone (4a Pro)', value: '50W', active: false },
    ],
    specs: [
      { label: 'Display', value: '6.5" AMOLED\n120Hz · 1500 nits' },
      { label: 'Processor', value: 'Snapdragon 7s Gen 3\nOcta-core 2.85GHz' },
      { label: 'Camera', value: '50MP Main + 12MP UW\nOIS · 4K 30fps' },
      { label: 'Battery', value: '5000 mAh\n33W wired' },
      { label: 'Storage', value: '128GB / 256GB\nUFS 3.1' },
      { label: 'OS', value: 'Nothing OS 3.5\nAndroid 16' },
    ],
    features: ['Glyph Interface Mini', 'IP54 Splash Resistant', 'Dual SIM 5G', 'NFC'],
  },
  'ear-3': {
    number: '06',
    name: 'Ear (3)',
    category: 'Audio · Earbuds',
    year: '2025',
    price: '$149',
    hero: '/media/products/ear-3/hero.jpg',
    images: {
      hero2: '/media/products/ear-3/hero-2.jpg',
      hero3: '/media/products/ear-3/hero-3.jpg',
      gallery1: '/media/products/ear-3/gallery-1.jpg',
      gallery2: '/media/products/ear-3/gallery-2.jpg',
      gallery3: '/media/products/ear-3/gallery-3.jpg',
      detail1: '/media/products/ear-3/detail-1.jpg',
      detail2: '/media/products/ear-3/detail-2.jpg',
      thumb1: '/media/products/ear-3/thumb-1.jpg',
      background: '/media/products/ear-3/background.jpg',
    },
    gallery: ['/media/products/ear-3/gallery-1.jpg', '/media/products/ear-3/gallery-2.jpg', '/media/products/ear-3/gallery-3.jpg'],
    description: 'Pure sound, pure design. Audiophile-grade audio in a form factor that\'s unmistakably Nothing.',
    longDescription: 'Custom 11.4mm drivers behind a translucent shell. ANC that adapts. 36 hours of battery.',
    highlight: 'Sound you can see.',
    metrics: [
      { value: '11.4', unit: 'mm', label: 'Drivers' },
      { value: '45', unit: 'dB', label: 'ANC Reduction' },
      { value: '36', unit: 'hrs', label: 'Total Battery' },
      { value: '4.8', unit: 'g', label: 'Per Bud' },
    ],
    inTheBox: ['Ear (3)', 'Charging Case', 'Ear Tips (S, M, L)', 'USB-C Cable', 'Quick Start Guide'],
    reviewsKey: 'reviewsEar3',
    faq: [
      { q: 'Do they support multipoint?', a: 'Yes, connect to two devices simultaneously.' },
      { q: 'Wireless charging?', a: 'Yes, Qi-compatible case.' },
      { q: 'Water resistance?', a: 'IP55 — sweat and splash resistant.' },
      { q: 'Codec support?', a: 'LC3, LDAC, aptX, AAC, SBC.' },
    ],
    compare: [
      { name: 'Ear (3)', value: '11.4mm', active: true },
      { name: 'Ear (2)', value: '11mm', active: false },
      { name: 'Ear (1)', value: '11.6mm', active: false },
    ],
    specs: [
      { label: 'Drivers', value: '11.4mm Custom\nDynamic · Titanium' },
      { label: 'ANC', value: 'Hybrid ANC\n-45dB reduction' },
      { label: 'Battery', value: '9h + 27h case\nUSB-C · Qi wireless' },
      { label: 'Connectivity', value: 'Bluetooth 5.4\nLC3 · LDAC · aptX' },
      { label: 'Weight', value: '4.8g per bud\n56g case' },
      { label: 'Features', value: 'Multipoint\nIP55 · Find My Earbuds' },
    ],
    features: ['Active Noise Cancellation', 'Transparency Mode', 'Wireless Charging', 'Multipoint Connection'],
  },
}

// ========== ANIMATED HOOKS ==========

function useScrollAnimation(options = {}) {
  const { threshold = 0.1, rootMargin = '0px 0px -50px 0px', direction = 'up' } = options
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold, rootMargin }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return { ref, isVisible, direction }
}

function useParallax(offset = 0.3) {
  const ref = useRef(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { ref, scrollY, offset }
}

// ========== COMPONENTS ==========

function AnimatedSection({ children, className = '', delay = 0, direction = 'up' }) {
  const { ref, isVisible } = useScrollAnimation()

  const transforms = {
    up: isVisible ? 'translateY(0)' : 'translateY(60px)',
    left: isVisible ? 'translateX(0)' : 'translateX(-80px)',
    right: isVisible ? 'translateX(0)' : 'translateX(80px)',
    scale: isVisible ? 'scale(1)' : 'scale(0.9)',
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        '--delay': `${delay}s`,
        opacity: isVisible ? 1 : 0,
        transform: transforms[direction] || transforms.up,
        transition: 'opacity 0.8s ease, transform 0.8s ease',
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

function HeroParallax({ image, number, name, category }) {
  const { ref, scrollY, offset } = useParallax(0.3)

  return (
    <div className="product-hero">
      <div
        className="product-hero-image"
        ref={ref}
        style={{ transform: `translateY(${scrollY * offset}px) scale(1.1)` }}
      >
        <img src={image} alt={name} />
      </div>
      <div className="product-hero-overlay" />
      <div className="product-hero-content">
        <div className="product-hero-number">{number}</div>
        <h1 className="product-hero-title font-ru">{name}</h1>
        <p className="product-hero-category">{category}</p>
      </div>
    </div>
  )
}

function MarqueeDivider({ text }) {
  return (
    <div className="product-marquee">
      <div className="product-marquee-track">
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
      </div>
    </div>
  )
}

function SpecHighlight({ label, value, delay }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })
  return (
    <div
      ref={ref}
      className="product-spec-highlight"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: `all 0.6s ease ${delay}s`,
      }}
    >
      <span className="spec-highlight-label">{label}</span>
      <span className="spec-highlight-value">{value}</span>
    </div>
  )
}

function BackButton() {
  const { t } = useLanguage()
  return (
    <Link to="/#work" className="product-back">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>{t.backToWork}</span>
    </Link>
  )
}

function HorizontalScroll({ images, title }) {
  const scrollRef = useRef(null)

  return (
    <section className="product-horizontal-scroll">
      <h3 className="product-h-scroll-title">{title}</h3>
      <div className="product-h-scroll-track" ref={scrollRef}>
        {images.map((img, i) => (
          <div key={i} className="product-h-scroll-item">
            <img src={img} alt={`Slide ${i + 1}`} />
          </div>
        ))}
      </div>
    </section>
  )
}

function SplitImageSection({ left, right, reverse }) {
  return (
    <section className={`product-split-section ${reverse ? 'reverse' : ''}`}>
      <div className="product-split-image">
        <img src={left} alt="Detail" />
      </div>
      <div className="product-split-content">
        <div className="product-split-number">{right.number}</div>
        <h3 className="product-split-title">{right.title}</h3>
        <p className="product-split-desc">{right.desc}</p>
      </div>
    </section>
  )
}

function FeaturesList({ features }) {
  return (
    <div className="product-features">
      {features.map((feature, i) => (
        <div className="product-feature-item" key={i}>
          <span className="product-feature-dot" />
          <span className="product-feature-text">{feature}</span>
        </div>
      ))}
    </div>
  )
}

function BigNumberSection({ number, label, image }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 })
  return (
    <section className={`product-big-number ${isVisible ? 'visible' : ''}`} ref={ref}>
      <div className="product-big-number-bg">
        {image && <img src={image} alt="" />}
      </div>
      <div className="product-big-number-content">
        <span className="product-big-num">{number}</span>
        <span className="product-big-label">{label}</span>
      </div>
    </section>
  )
}

function WallpaperBreak({ index, quote }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })
  const wp = WALLPAPERS[index % WALLPAPERS.length]
  return (
    <section
      ref={ref}
      className="product-wallpaper-break"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 1s ease',
      }}
    >
      <div className="product-wallpaper-break-bg">
        <img src={wp} alt="" />
      </div>
      <div className="product-wallpaper-break-overlay" />
      <div className="product-wallpaper-break-content">
        {quote && <p className="product-wallpaper-break-quote">{quote}</p>}
      </div>
    </section>
  )
}

function KeyMetrics({ metrics, theme = 'dark', label }) {
  return (
    <section className={`product-section product-section--${theme}`}>
      <div className="product-content">
        <span className="product-section-label">{label}</span>
        <div className="product-key-metrics">
          {metrics.map((m, i) => (
            <MetricCard key={i} metric={m} delay={i * 0.1} theme={theme} />
          ))}
        </div>
      </div>
    </section>
  )
}

function MetricCard({ metric, delay, theme = 'dark' }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })
  const isWhite = theme === 'white'
  return (
    <div
      ref={ref}
      className={`product-metric-card product-metric-card--${theme}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
        transition: `all 0.6s ease ${delay}s`,
      }}
    >
      <span className="metric-value">{metric.value}</span>
      <span className="metric-unit">{metric.unit}</span>
      <span className="metric-label">{metric.label}</span>
    </div>
  )
}

function InTheBox({ items, theme = 'white', label }) {
  const { ref, isVisible } = useScrollAnimation()
  return (
    <section className={`product-section product-section--${theme}`}>
      <div className="product-content">
        <div
          ref={ref}
          className="product-in-the-box"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.8s ease 0.1s',
          }}
        >
          <span className="product-section-label">{label}</span>
          <div className="product-box-items">
            {items.map((item, i) => (
              <div key={i} className="product-box-item">
                <span className="box-item-num">0{i + 1}</span>
                <span className="box-item-name">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Reviews({ reviews, theme = 'dark', label }) {
  if (!reviews || reviews.length === 0) return null
  return (
    <div className={`product-reviews product-reviews--${theme}`}>
      <span className="product-section-label">{label}</span>
      <div className="product-reviews-grid">
        {reviews.map((r, i) => (
          <ReviewCard key={i} review={r} theme={theme} />
        ))}
      </div>
    </div>
  )
}

function ReviewCard({ review, theme = 'dark' }) {
  const { ref, isVisible } = useScrollAnimation()
  const stars = Math.round(review.rating)
  return (
    <div
      ref={ref}
      className="product-review-card"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.6s ease',
      }}
    >
      <div className="review-source">{review.name}</div>
      <div className="review-stars">
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} className={`star ${i < stars ? 'filled' : ''}`}>★</span>
        ))}
      </div>
      <p className="review-quote">"{review.quote}"</p>
    </div>
  )
}

function CompareBar({ compare, label, thisModel }) {
  return (
    <section className="product-section product-section--dark">
      <div className="product-content">
        <span className="product-section-label">{label}</span>
        <div className="product-compare-bar">
          {compare.map((c, i) => (
            <div key={i} className={`compare-col ${c.active ? 'active' : ''}`}>
              <span className="compare-name">{c.name}</span>
              <span className="compare-value">{c.value}</span>
              {c.active && <span className="compare-badge">{thisModel}</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQ({ faq, theme = 'dark', label }) {
  const [openIndex, setOpenIndex] = useState(null)
  return (
    <div className={`product-faq product-faq--${theme}`}>
      <span className="product-section-label">{label}</span>
      {faq.map((item, i) => (
        <div key={i} className={`faq-item ${openIndex === i ? 'open' : ''}`}>
          <button className="faq-question" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
            <span>{item.q}</span>
            <span className="faq-toggle">{openIndex === i ? '−' : '+'}</span>
          </button>
          <div className="faq-answer">
            <p>{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

// ========== MAIN PAGE ==========

export default function ProductPage() {
  const { slug } = useParams()
  const product = products[slug]
  const { lang, t } = useLanguage()

  if (!product) {
    return (
      <div className="product-not-found">
        <BackButton />
        <h1>{t.productNotFound}</h1>
        <p>{t.productNotFoundDesc}</p>
        <Link to="/" className="product-go-home">{t.goHome}</Link>
      </div>
    )
  }

  const imgKeys = Object.keys(product.images)
  const allImages = imgKeys.map(k => product.images[k])
  const productNum = parseInt(product.number) || 1

  // Wallpaper break indices — unique per product
  const wp1 = productNum * 3
  const wp2 = productNum * 3 + 7
  const wp3 = productNum * 3 + 14
  const pd = t[slug] || t['phone-3']
  const faqKey = `faq${slug.replace('-', '').replace('3a-lite', 'Phone3aLite').replace('3a', 'Phone3a').replace('4a-pro', 'Phone4aPro').replace('4a', 'Phone4a').replace('ear-3', 'Ear3').replace('phone-3', 'Phone3')}`
  const faqData = t[faqKey] || []

  // Map slug to faq key
  const faqMap = {
    'phone-3': 'faqPhone3',
    'phone-3a': 'faqPhone3a',
    'phone-3a-lite': 'faqPhone3aLite',
    'phone-4a-pro': 'faqPhone4aPro',
    'phone-4a': 'faqPhone4a',
    'ear-3': 'faqEar3',
  }
  const productFaq = t[faqMap[slug]] || []

  return (
    <div className="product-page">
      <BackButton />

      {/* Hero */}
      <HeroParallax
        image={product.hero}
        number={product.number}
        name={product.name}
        category={product.category}
      />

      {/* Marquee */}
      <MarqueeDivider text={`${product.name}  ·  ${product.category}  ·  ${product.year}  ·  `} />

      {/* Description — dark */}
      <section className="product-section product-section--dark">
        <div className="product-content">
          <AnimatedSection className="product-description" delay={0.1}>
            <div className="product-description-dot" />
            <p className="product-description-text">{pd.description}</p>
            <p className="product-description-long">{pd.longDescription}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Key Metrics — white */}
      <KeyMetrics metrics={product.metrics} theme="white" label={t.keyMetrics} />

      {/* Compare Bar — dark */}
      <section className="product-section product-section--dark">
        <div className="product-content">
          <CompareBar compare={product.compare} label={t.compare} thisModel={t.thisModel} />
        </div>
      </section>

      {/* Marquee */}
      <MarqueeDivider text={product.features.join('  ·  ')} />

      {/* Visual Story — white */}
      <section className="product-section product-section--white">
        <div className="product-content">
          <div className="product-visual-story">
            <div className="product-story-main">
              <img src={product.images[imgKeys[0]]} alt={product.name} />
            </div>
            <div className="product-story-side">
              <div className="product-story-highlight">
                <p className="product-story-quote">{pd.highlight}</p>
              </div>
              {imgKeys[1] && (
                <div className="product-story-secondary">
                  <img src={product.images[imgKeys[1]]} alt="" />
                </div>
              )}
              {imgKeys[2] && (
                <div className="product-story-tertiary">
                  <img src={product.images[imgKeys[2]]} alt="" />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Wallpaper Break 1 */}
      <WallpaperBreak index={wp1} quote={pd.highlight} />

      {/* Specs — dark */}
      <section className="product-section product-section--dark">
        <div className="product-content">
          <AnimatedSection className="product-specs-section" delay={0.1}>
            <span className="product-section-label">{t.specifications}</span>
            <div className="product-specs-grid">
              {product.specs.map((spec, i) => (
                <SpecHighlight key={i} label={spec.label} value={spec.value} delay={i * 0.08} />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* BigNumber — dark */}
      <BigNumberSection
        number={product.number}
        label={product.name}
        image={product.images.hero2 || product.images.gallery1}
      />

      {/* Features — white */}
      <section className="product-section product-section--white">
        <div className="product-content">
          <AnimatedSection className="product-features-section" delay={0.1}>
            <span className="product-section-label">{t.features}</span>
            <FeaturesList features={product.features} />
          </AnimatedSection>
        </div>
      </section>

      {/* Wallpaper Break 2 */}
      <WallpaperBreak index={wp2} />

      {/* Split Section — dark (full image) */}
      {product.images.detail1 && product.images.detail2 && (
        <section className="product-section product-section--dark" style={{ padding: 0 }}>
          <SplitImageSection
            left={product.images.detail1}
            right={{
              number: product.number,
              title: t.engineeredInside,
              desc: t.engineeredDesc,
            }}
          />
        </section>
      )}

      {/* Reviews — white */}
      <section className="product-section product-section--white">
        <div className="product-content">
          <Reviews reviews={t[product.reviewsKey] || []} theme="white" label={t.reviews} />
        </div>
      </section>

      {/* In the Box — dark */}
      <section className="product-section product-section--dark">
        <div className="product-content">
          <InTheBox items={product.inTheBox} theme="dark" label={t.inTheBox} />
        </div>
      </section>

      {/* Wallpaper Break 3 */}
      <WallpaperBreak index={wp3} />

      {/* Gallery — dark */}
      <section className="product-section product-section--dark">
        <div className="product-content">
          <AnimatedSection className="product-gallery-section" delay={0.1}>
            <span className="product-section-label">{t.gallery}</span>
            <div className="product-asym-gallery">
              <div className="product-asym-gallery-grid">
                {product.gallery.map((img, i) => (
                  <div key={i} className={`product-asym-gallery-item item-${i}`}>
                    <img src={img} alt={`Gallery ${i + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ — white */}
      <section className="product-section product-section--white">
        <div className="product-content">
          <FAQ faq={productFaq} theme="white" label={t.faq} />
        </div>
      </section>

      {/* Horizontal Scroll — dark */}
      {allImages.length >= 3 && (
        <HorizontalScroll images={allImages.slice(0, 6)} title={t.details} />
      )}

      {/* Final image */}
      {product.images.hero3 && (
        <section className="product-section">
          <div className="product-full-image">
            <img src={product.images.hero3} alt={product.name} />
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="product-cta-final">
        <div className="product-cta-final-inner">
          <div className="product-cta-left">
            <span className="product-cta-num">{product.number}</span>
            <h2 className="product-cta-name">{product.name}</h2>
          </div>
          <div className="product-cta-right">
            <p className="product-cta-quote">{pd.highlight}</p>
            <div className="product-cta-price">
              <span className="price-label">{t.startingFrom}</span>
              <span className="price-value">{product.price}</span>
            </div>
            <a href="#" className="product-cta-final-btn">
              <span>{t.buyNow}</span>
            </a>
            <div className="product-cta-perks">
              <span>{t.freeShipping}</span>
              <span>{t.warranty}</span>
              <span>{t.returns}</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

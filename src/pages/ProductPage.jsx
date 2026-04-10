import { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Footer from '../components/Footer'

const products = {
  'phone-3': {
    number: '01',
    name: 'Phone (3)',
    category: 'Smartphone · Flagship',
    year: '2025',
    hero: '/media/products/phone-3-hero.jpg',
    gallery: ['/media/products/phone-3-gallery-1.jpg', '/media/products/phone-3-detail.jpg'],
    description: 'The pinnacle of Nothing design and technology. Phone (3) redefines the flagship experience with its transparent aesthetic, Glyph Interface, and uncompromising performance. Crafted for those who see technology as an extension of their identity.',
    longDescription: 'Every detail has been meticulously refined — from the precision-machined aluminum frame to the hand-polished glass back that reveals the intricate circuitry within. The Glyph Interface pulses with life, transforming notifications into a visual symphony of light.',
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
    hero: '/media/products/phone-3a-hero.jpg',
    gallery: ['/media/products/phone-3a-gallery-1.jpg'],
    description: 'Essential Nothing experience at an accessible price. Phone (3a) brings the iconic design language and Glyph Interface to a broader audience without compromise on style or substance.',
    longDescription: 'Proof that great design shouldn\'t come with a premium price tag. Phone (3a) carries the same DNA as its flagship sibling — transparent back, Glyph Interface, clean Nothing OS — in a more approachable package that doesn\'t ask you to settle.',
    specs: [
      { label: 'Display', value: '6.55" AMOLED\n90Hz · 1300 nits' },
      { label: 'Processor', value: 'Dimensity 7300\nOcta-core 2.5GHz' },
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
    hero: '/media/products/phone-3a-lite-hero.jpg',
    gallery: ['/media/products/phone-3a-lite-gallery-1.jpg'],
    description: 'The most accessible entry point into the Nothing ecosystem. Phone (3a lite) distills the essence of Nothing design into a compact, everyday companion that proves great design is for everyone.',
    longDescription: 'Small in size, not in ambition. Phone (3a lite) takes everything that makes Nothing special — the design philosophy, the attention to detail, the clean software experience — and packages it in the most accessible form yet. This is nothing less than what you need.',
    specs: [
      { label: 'Display', value: '6.3" IPS LCD\n90Hz · 800 nits' },
      { label: 'Processor', value: 'Dimensity 6100+\nOcta-core 2.2GHz' },
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
    hero: '/media/products/phone-4a-pro-hero.jpg',
    gallery: ['/media/products/phone-4a-pro-gallery-1.jpg'],
    description: 'Professional-grade Nothing. Phone (4a Pro) bridges the gap between flagship and mid-range, offering premium features in a refined package that demands attention.',
    longDescription: 'The Pro designation isn\'t given lightly. Phone (4a Pro) takes the proven 4a foundation and elevates every aspect — faster processor, improved cameras, refined Glyph Interface with more zones, and a display that rivals phones twice the price. For those who want the best without the flagship premium.',
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
    hero: '/media/products/phone-4a-hero.jpg',
    gallery: ['/media/products/phone-4a-gallery-1.jpg'],
    description: 'The new standard. Phone (4a) represents the sweet spot in the Nothing lineup — flagship design language, reliable performance, and a price that makes sense. Nothing more, nothing less.',
    longDescription: 'Sometimes the best choice is the balanced one. Phone (4a) delivers the complete Nothing experience: transparent design aesthetic, clean Nothing OS, dependable cameras, and all-day battery life. It\'s the phone that asks no compromises in the places that matter most.',
    specs: [
      { label: 'Display', value: '6.5" AMOLED\n120Hz · 1500 nits' },
      { label: 'Processor', value: 'Dimensity 8400\nOcta-core 2.85GHz' },
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
    hero: '/media/products/ear-3-hero.jpg',
    gallery: ['/media/products/ear-3-gallery-1.jpg', '/media/products/ear-3-gallery-2.jpg'],
    description: 'Pure sound, pure design. Ear (3) delivers audiophile-grade audio in a form factor that\'s unmistakably Nothing. Active noise cancellation meets transparent aesthetics in perfect harmony.',
    longDescription: 'Sound you can see and feel. Ear (3) houses custom 11.4mm dynamic drivers behind a translucent shell that reveals the engineering inside. With active noise cancellation that adapts to your environment and up to 36 hours of total battery life, these earbuds disappear in your ears while the music takes center stage.',
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

function useScrollAnimation() {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, isVisible }
}

function AnimatedSection({ children, className = '', delay = 0 }) {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <div
      ref={ref}
      className={`animate-on-scroll ${className}`}
      style={{
        '--delay': `${delay}s`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

function HeroParallax({ image, number, name, category }) {
  const heroRef = useRef(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="product-hero">
      <div
        className="product-hero-image"
        ref={heroRef}
        style={{ transform: `translateY(${scrollY * 0.3}px) scale(1.1)` }}
      >
        <img src={image} alt={name} />
      </div>
      <div className="product-hero-overlay" />
      <div className="product-hero-content">
        <div className="product-hero-number">{number}</div>
        <h1 className="product-hero-title">{name}</h1>
        <p className="product-hero-category">{category}</p>
      </div>
    </div>
  )
}

function BackButton() {
  return (
    <Link to="/#work" className="product-back">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>Back to Work</span>
    </Link>
  )
}

function SpecsGrid({ specs }) {
  return (
    <div className="product-specs-grid">
      {specs.map((spec, i) => (
        <div className="product-spec-card" key={i}>
          <div className="product-spec-label">{spec.label}</div>
          <div className="product-spec-value">{spec.value}</div>
        </div>
      ))}
    </div>
  )
}

function Gallery({ images }) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (images.length === 0) return null

  return (
    <div className="product-gallery">
      <h2 className="product-gallery-title">Gallery</h2>
      {images.length > 1 && (
        <div className="product-gallery-thumbs">
          {images.map((img, i) => (
            <button
              key={i}
              className={`product-gallery-thumb ${i === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(i)}
            >
              <img src={img} alt={`Gallery ${i + 1}`} />
            </button>
          ))}
        </div>
      )}
      <div className="product-gallery-main">
        <img src={images[activeIndex]} alt={`Product gallery ${activeIndex + 1}`} />
      </div>
    </div>
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

export default function ProductPage() {
  const { slug } = useParams()
  const product = products[slug]

  if (!product) {
    return (
      <div className="product-not-found">
        <BackButton />
        <h1>Product not found</h1>
        <p>The product you're looking for doesn't exist.</p>
        <Link to="/" className="product-go-home">Go home</Link>
      </div>
    )
  }

  return (
    <div className="product-page">
      <BackButton />

      <HeroParallax
        image={product.hero}
        number={product.number}
        name={product.name}
        category={product.category}
      />

      <div className="product-content">
        {/* Description Section */}
        <AnimatedSection className="product-description">
          <div className="product-description-dot" />
          <p className="product-description-text">{product.description}</p>
          <p className="product-description-long">{product.longDescription}</p>
        </AnimatedSection>

        {/* Features Section */}
        <AnimatedSection className="product-features-section" delay={0.15}>
          <span className="product-section-label">0{parseInt(product.number)} · Features</span>
          <FeaturesList features={product.features} />
        </AnimatedSection>

        {/* Specs Section */}
        <AnimatedSection className="product-specs-section" delay={0.2}>
          <span className="product-section-label">0{parseInt(product.number)} · Specifications</span>
          <SpecsGrid specs={product.specs} />
        </AnimatedSection>

        {/* Gallery Section */}
        <AnimatedSection className="product-gallery-section" delay={0.25}>
          <span className="product-section-label">0{parseInt(product.number)} · Gallery</span>
          <Gallery images={product.gallery} />
        </AnimatedSection>

        {/* CTA Section */}
        <AnimatedSection className="product-cta" delay={0.3}>
          <div className="product-cta-content">
            <h2 className="product-cta-title">Ready to experience {product.name}?</h2>
            <p className="product-cta-subtitle">Starting from your selection</p>
            <a href="#" className="product-cta-button">
              Buy Now
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </AnimatedSection>
      </div>

      <Footer />
    </div>
  )
}

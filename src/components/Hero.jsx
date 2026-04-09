export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-video-bg">
        <video src="/hero-bg.mp4" autoPlay muted loop playsInline />
        <div className="video-overlay" />
      </div>

      <div className="hero-grid">
        <div className="hero-content">
          <div className="hero-tag">
            <span className="tag-line" />
            <span>AVAILABLE FOR PROJECTS</span>
          </div>

          <h1 className="hero-title">
            <span className="title-line title-line-1">DESIGNER</span>
            <span className="title-line title-line-2">&</span>
            <span className="title-line title-line-3">DEVELOPER</span>
          </h1>

          <p className="hero-description">
            Crafting digital experiences through the lens of radical
            simplicity. Code and design,{' '}
            <span className="text-red">stripped to their essence</span>.
          </p>

          <div className="hero-cta">
            <a href="#work" className="btn-primary">
              <span>VIEW WORK</span>
              <span className="btn-arrow">→</span>
            </a>
            <a href="#contact" className="btn-secondary">
              <span>GET IN TOUCH</span>
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-container">
            <div className="vertical-text">
              <span>N</span>
              <span>O</span>
              <span>T</span>
              <span>H</span>
              <span>I</span>
              <span>N</span>
              <span>G</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll">
        <div className="scroll-indicator">
          <div className="scroll-line" />
          <span>SCROLL</span>
        </div>
      </div>

      <div className="hero-stats">
        <div className="stat">
          <span className="stat-number text-red">47</span>
          <span className="stat-label">Projects</span>
        </div>
        <div className="stat-divider" />
        <div className="stat">
          <span className="stat-number text-red">8+</span>
          <span className="stat-label">Years</span>
        </div>
        <div className="stat-divider" />
        <div className="stat">
          <span className="stat-number text-red">∞</span>
          <span className="stat-label">Curiosity</span>
        </div>
      </div>
    </section>
  )
}

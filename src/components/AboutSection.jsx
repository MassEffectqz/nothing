export default function AboutSection() {
  return (
    <section className="about-section" id="about">
      <div className="about-content">
        <span className="about-number">04</span>
        <h2 className="about-title">ABOUT</h2>
        <div className="about-divider" />
        <p className="about-text">
          A multi-disciplinary designer and developer crafting digital experiences
          with a focus on simplicity, transparency, and purpose. Based in the
          intersection of code and design, stripping away the unnecessary to
          reveal what truly matters.
        </p>
        <div className="about-stats">
          <div className="about-stat">
            <span className="about-stat-number">47</span>
            <span className="about-stat-label">Projects Delivered</span>
          </div>
          <div className="about-stat">
            <span className="about-stat-number">8+</span>
            <span className="about-stat-label">Years Experience</span>
          </div>
          <div className="about-stat">
            <span className="about-stat-number">∞</span>
            <span className="about-stat-label">Curiosity</span>
          </div>
        </div>
      </div>

      {/* Decorative grid */}
      <div className="about-grid">
        <div className="grid-dot" />
        <div className="grid-dot" />
        <div className="grid-dot" />
        <div className="grid-line" />
        <div className="grid-circle" />
      </div>
    </section>
  )
}

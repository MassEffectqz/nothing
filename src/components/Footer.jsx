export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-content">
        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-logo">
            NOTHING <span className="text-red">.</span>
          </div>
          <p className="footer-tagline">
            Stripping away the unnecessary to reveal what truly matters. Design
            and code, reduced to their essence.
          </p>
        </div>

        {/* Links */}
        <div className="footer-links">
          <span className="footer-links-title">Navigation</span>
          <a href="#hero" className="footer-link">Home</a>
          <a href="#colors" className="footer-link">Colors</a>
          <a href="#lifestyle" className="footer-link">PureSound</a>
          <a href="#about" className="footer-link">About</a>
          <a href="#work" className="footer-link">Work</a>
        </div>

        {/* Contact */}
        <div className="footer-contact">
          <span className="footer-links-title">Get in Touch</span>
          <a
            href="https://t.me/Aezqsm"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-email"
          >
            @Aezqsm
          </a>
          <div className="footer-socials">
            <a
              href="https://t.me/Aezqsm"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social"
              aria-label="Telegram"
            >
              TG
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <span className="footer-copyright">
          © 2026 Nothing. All rights reserved.
        </span>
        <a href="#hero" className="footer-back-top">
          <span>Back to top</span>
          <span className="footer-back-top-arrow">↑</span>
        </a>
      </div>

      {/* Axiom branding */}
      <div className="footer-axiom">
        <img src="/axiom-logo.png" alt="Axiom" />
        <span>made by Axiom developer</span>
      </div>
    </footer>
  )
}

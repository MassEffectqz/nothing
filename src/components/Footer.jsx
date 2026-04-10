import { useLanguage } from '../hooks/useLanguage.jsx'

export default function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="footer" id="contact">
      <div className="footer-content">
        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-logo">
            {t.footerBrand} <span className="text-red">.</span>
          </div>
          <p className="footer-tagline">
            {t.footerDesc}
          </p>
        </div>

        {/* Links */}
        <div className="footer-links">
          <span className="footer-links-title">{t.footerNav}</span>
          <a href="#hero" className="footer-link">{t.navHome}</a>
          <a href="#colors" className="footer-link">{t.navColors}</a>
          <a href="#lifestyle" className="footer-link">{t.navPureSound}</a>
          <a href="#about" className="footer-link">{t.navAbout}</a>
          <a href="#work" className="footer-link">{t.navWork}</a>
        </div>

        {/* Contact */}
        <div className="footer-contact">
          <span className="footer-links-title">{t.footerContact}</span>
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
          {t.footerCopyright}
        </span>
        <a href="#hero" className="footer-back-top">
          <span>{t.backToTop}</span>
          <span className="footer-back-top-arrow">↑</span>
        </a>
      </div>

      {/* Axiom branding */}
      <div className="footer-axiom">
        <img src="/axiom-logo.png" alt="Axiom" />
        <span>{t.madeBy} Axiom developer</span>
      </div>
    </footer>
  )
}

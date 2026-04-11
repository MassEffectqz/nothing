import { useLanguage } from '../hooks/useLanguage.jsx'

export default function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="footer" id="contact" role="contentinfo" aria-label="Контактная информация">
      <div className="footer-content">
        {/* Brand */}
        <div className="footer-brand" role="banner" aria-label="Бренд">
          <div className="footer-logo">
            {t.footerBrand} <span className="text-red">.</span>
          </div>
          <p className="footer-tagline">
            {t.footerDesc}
          </p>
        </div>

        {/* Links */}
        <nav className="footer-links" aria-label="Навигация в футере">
          <span className="footer-links-title" id="footer-nav-title">{t.footerNav}</span>
          <a href="#hero" className="footer-link" aria-labelledby="footer-nav-link1 footer-nav-title">
            {t.navHome}
          </a>
          <a href="#colors" className="footer-link">{t.navColors}</a>
          <a href="#lifestyle" className="footer-link">{t.navPureSound}</a>
          <a href="#about" className="footer-link">{t.navAbout}</a>
          <a href="#work" className="footer-link">{t.navWork}</a>
        </nav>

        {/* Contact */}
        <div className="footer-contact" role="region" aria-label="Контакты">
          <span className="footer-links-title">{t.footerContact}</span>
          <a
            href="https://t.me/Aezqsm"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-email"
            aria-label="Связаться через Telegram"
          >
            @Aezqsm
          </a>
          <div className="footer-socials" role="list" aria-label="Социальные сети">
            <a
              href="https://t.me/Aezqsm"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social"
              role="listitem"
              aria-label="Telegram (откроется в новой вкладке)"
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
        <a href="#hero" className="footer-back-top" aria-label="Вернуться наверх">
          <span>{t.backToTop}</span>
          <span className="footer-back-top-arrow" aria-hidden="true">↑</span>
        </a>
      </div>

      {/* Axiom branding */}
      <div className="footer-axiom">
        <img src="/axiom-logo.png" alt="Axiom logo" loading="lazy" decoding="async" />
        <span>{t.madeBy} Axiom developer</span>
      </div>
    </footer>
  )
}

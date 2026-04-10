import { useLanguage } from '../hooks/useLanguage.jsx'

export default function LanguageSwitcher() {
  const { lang, toggleLang } = useLanguage()

  return (
    <button className="lang-switcher" onClick={toggleLang} aria-label="Switch language">
      <span className={`lang-opt ${lang === 'en' ? 'active' : ''}`}>EN</span>
      <span className="lang-sep">/</span>
      <span className={`lang-opt ${lang === 'ru' ? 'active' : ''}`}>RU</span>
    </button>
  )
}

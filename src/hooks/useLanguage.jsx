import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { translations } from '../i18n'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('lang')
    if (saved && (saved === 'en' || saved === 'ru')) return saved
    return navigator.language.startsWith('ru') ? 'ru' : 'en'
  })

  useEffect(() => {
    localStorage.setItem('lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  const toggleLang = useCallback(() => {
    setLang(prev => prev === 'en' ? 'ru' : 'en')
  }, [])

  const t = translations[lang] || translations.en

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}

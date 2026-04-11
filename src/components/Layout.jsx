import { Outlet } from 'react-router-dom'
import Header from './Header'

export default function Layout() {
  return (
    <div className="site-wrapper" role="document">
      <a href="#main-content" className="skip-link" aria-label="Перейти к основному контенту">
        Перейти к содержимому
      </a>
      <Header />
      <main id="main-content" role="main" className="site-main" aria-label="Основной контент">
        <Outlet />
      </main>
    </div>
  )
}

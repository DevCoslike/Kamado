import {Toast} from 'primereact/toast'
import {useRef} from 'react'
import {NavLink, Outlet, Route, Routes} from 'react-router-dom'

import {ToastProvider} from './contexts/ToastContext'
import {HomePage} from './pages/HomePage'
import {RequestCertificatePage} from './pages/RequestCertificatePage'
import {RequestsListPage} from './pages/RequestsListPage'

const navLinkClass = ({isActive}: {isActive: boolean}) =>
  `flex align-items-center justify-content-center p-2 border-round transition-colors transition-duration-150 ${isActive ? 'surface-200' : 'hover:surface-200'}`

function AppLayout() {
  return (
    <>
      <header className="flex align-items-center justify-content-between px-3 py-2 surface-100 border-bottom-1 surface-border">
        <div className="flex align-items-center gap-2">
          <i className="pi pi-id-card" style={{fontSize: '1.75rem', color: 'var(--primary-color)'}} aria-hidden />
          <span className="sr-only">Kamado</span>
        </div>
        <nav className="flex align-items-center gap-1" aria-label="Main">
          <NavLink
            to="/"
            className={({isActive}) => `${navLinkClass({isActive})} tap-target`}
            title="Home"
            aria-label="Home"
          >
            <i className="pi pi-home" style={{fontSize: '1.25rem'}} aria-hidden />
          </NavLink>
          <NavLink
            to="/request-certificate"
            className={({isActive}) => `${navLinkClass({isActive})} tap-target`}
            title="Request Certificate"
            aria-label="Request Certificate"
          >
            <i className="pi pi-file-plus" style={{fontSize: '1.25rem'}} aria-hidden />
          </NavLink>
          <NavLink
            to="/requests"
            className={({isActive}) => `${navLinkClass({isActive})} tap-target`}
            title="Requests List"
            aria-label="Requests List"
          >
            <i className="pi pi-list" style={{fontSize: '1.25rem'}} aria-hidden />
          </NavLink>
        </nav>
      </header>
      <main className="p-3">
        <Outlet />
      </main>
    </>
  )
}

function App() {
  const toastRef = useRef<Toast>(null)
  return (
    <ToastProvider toastRef={toastRef}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="request-certificate" element={<RequestCertificatePage />} />
          <Route path="requests" element={<RequestsListPage />} />
        </Route>
      </Routes>
      <Toast ref={toastRef} position="bottom-right" />
    </ToastProvider>
  )
}

export default App

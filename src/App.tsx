import {Toast} from 'primereact/toast'
import {useRef, useState} from 'react'

import {ApiError, getRequestList} from './api'
import {ToastProvider} from './contexts/ToastContext'

function App() {
  const toastRef = useRef<Toast>(null)
  const [testing, setTesting] = useState(false)

  async function handleTestApi() {
    setTesting(true)
    try {
      const list = await getRequestList()
      console.log('list', list)
      toastRef.current?.show({
        severity: 'success',
        summary: 'API OK',
        detail: `Loaded ${list.length} request(s).`,
      })
    } catch (err) {
      const message = err instanceof ApiError ? err.message : String(err)
      toastRef.current?.show({
        severity: 'error',
        summary: 'API Error',
        detail: message,
      })
    } finally {
      setTesting(false)
    }
  }

  return (
    <ToastProvider toastRef={toastRef}>
      <header className="flex align-items-center justify-content-between px-3 py-2 surface-100 border-bottom-1 surface-border">
        <div className="flex align-items-center gap-2">
          <i className="pi pi-id-card" style={{fontSize: '1.75rem', color: 'var(--primary-color)'}} aria-hidden />
          <span className="sr-only">Kamado</span>
        </div>
        <nav className="flex align-items-center gap-1" aria-label="Main">
          <a
            href="/"
            className="flex align-items-center justify-content-center p-2 border-round hover:surface-200 transition-colors transition-duration-150"
            title="Home"
            aria-label="Home"
          >
            <i className="pi pi-home" style={{fontSize: '1.25rem'}} aria-hidden />
          </a>
          <a
            href="/request-certificate"
            className="flex align-items-center justify-content-center p-2 border-round hover:surface-200 transition-colors transition-duration-150"
            title="Request Certificate"
            aria-label="Request Certificate"
          >
            <i className="pi pi-file-plus" style={{fontSize: '1.25rem'}} aria-hidden />
          </a>
          <a
            href="/requests"
            className="flex align-items-center justify-content-center p-2 border-round hover:surface-200 transition-colors transition-duration-150"
            title="Requests List"
            aria-label="Requests List"
          >
            <i className="pi pi-list" style={{fontSize: '1.25rem'}} aria-hidden />
          </a>
        </nav>
      </header>
      <main className="p-3">
        <button type="button" className="p-button p-button-outlined" disabled={testing} onClick={handleTestApi}>
          {testing ? 'Testing…' : 'Test API (GET request-list)'}
        </button>
      </main>
      <Toast ref={toastRef} position="bottom-right" />
    </ToastProvider>
  )
}

export default App

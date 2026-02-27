import { useRef } from 'react'
import { Toast } from 'primereact/toast'

import { ToastProvider } from './contexts/ToastContext'

function App() {
  const toastRef = useRef<Toast>(null)

  return (
    <ToastProvider toastRef={toastRef}>
      <Toast ref={toastRef} position="bottom-right" />
      <h1>Kamado</h1>
    </ToastProvider>
  )
}

export default App

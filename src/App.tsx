import {Toast} from 'primereact/toast'
import {useRef} from 'react'

import {ToastProvider} from './contexts/ToastContext'

function App() {
  const toastRef = useRef<Toast>(null)
  return (
    <ToastProvider toastRef={toastRef}>
      <button
        className=""
        onClick={() =>
          toastRef.current?.show({
            severity: 'success',
            summary: 'Success',
            detail: 'This is a success message',
          })
        }
      >
        Show success
      </button>
      <h1 className="col-6 font-bold">Kamado</h1>
      <Toast ref={toastRef} position="bottom-right" />
    </ToastProvider>
  )
}

export default App

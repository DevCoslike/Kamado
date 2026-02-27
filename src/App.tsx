import {Toast} from 'primereact/toast'
import {useRef} from 'react'

import {ToastProvider} from './contexts/ToastContext'

function App() {
  const toastRef = useRef<Toast>(null)
  return (
    <ToastProvider toastRef={toastRef}>
      <div className="row">
        <h1 className="col-12 text-2xl font-bold">Kamado</h1>
        <button
          className="bg-blue-500 text-white p-2 rounded-md"
          onClick={() =>
            toastRef.current?.show({
              severity: 'success',
              summary: 'Success',
              detail: 'This is a success message',
            })
          }
        >
          Show Success
        </button>
      </div>
      <Toast ref={toastRef} position="bottom-right" />
    </ToastProvider>
  )
}

export default App

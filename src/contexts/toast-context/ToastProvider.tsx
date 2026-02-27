import type {ToastMessage} from 'primereact/toast'
import {type ReactNode, useCallback} from 'react'

import {ToastContext, type ToastContextValue, type ToastSeverity} from './toastContext'

type ToastProviderProps = {
  toastRef: ToastContextValue['toastRef']
  children: ReactNode
}

export function ToastProvider({toastRef, children}: ToastProviderProps) {
  const show = useCallback(
    (options: {severity?: ToastSeverity; summary?: string; detail?: string}) => {
      toastRef.current?.show(options as ToastMessage)
    },
    [toastRef],
  )

  return <ToastContext.Provider value={{toastRef, show}}>{children}</ToastContext.Provider>
}

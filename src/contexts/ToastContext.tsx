import type {ToastMessage} from 'primereact/toast'
import {createContext, type ReactNode, type RefObject, useCallback, useContext} from 'react'

type ToastSeverity = 'success' | 'info' | 'warn' | 'error'

type ToastContextValue = {
  toastRef: RefObject<import('primereact/toast').Toast | null>
  show: (options: {severity?: ToastSeverity; summary?: string; detail?: string}) => void
}

export const ToastContext = createContext<ToastContextValue | null>(null)

type ToastProviderProps = {
  toastRef: RefObject<import('primereact/toast').Toast | null>
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

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

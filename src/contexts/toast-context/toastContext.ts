import {createContext, type RefObject, useContext} from 'react'

export type ToastSeverity = 'success' | 'info' | 'warn' | 'error'

export type ToastContextValue = {
  toastRef: RefObject<import('primereact/toast').Toast | null>
  show: (options: {severity?: ToastSeverity; summary?: string; detail?: string}) => void
}

export const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

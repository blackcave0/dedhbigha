'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, AlertCircle, CheckCircle2, Info, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

type ToastVariant = 'success' | 'error' | 'info' | 'warning'

interface Toast {
  id: string
  title: string
  description?: string
  variant: ToastVariant
  duration: number
}

interface ToastContextType {
  toasts: Toast[]
  toast: (params: Omit<Toast, 'id'> & { duration?: number }) => string
  dismiss: (id: string) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

const variantConfig: Record<
  ToastVariant,
  { icon: ReactNode; containerClass: string }
> = {
  success: {
    icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
    containerClass: 'border-green-200 bg-green-50',
  },
  error: {
    icon: <AlertCircle className="h-5 w-5 text-red-500" />,
    containerClass: 'border-red-200 bg-red-50',
  },
  info: {
    icon: <Info className="h-5 w-5 text-blue-500" />,
    containerClass: 'border-blue-200 bg-blue-50',
  },
  warning: {
    icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
    containerClass: 'border-yellow-200 bg-yellow-50',
  },
}

const toastVariants = {
  hidden: { opacity: 0, y: -20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, x: 100, scale: 0.95 },
}

let toastCounter = 0

function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map())

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
    const timer = timersRef.current.get(id)
    if (timer) {
      clearTimeout(timer)
      timersRef.current.delete(id)
    }
  }, [])

  const toast = useCallback(
    ({
      title,
      description,
      variant = 'info',
      duration = 5000,
    }: Omit<Toast, 'id'> & { duration?: number }): string => {
      const id = `toast-${++toastCounter}`
      const newToast: Toast = { id, title, description, variant, duration }

      setToasts((prev) => [...prev, newToast])

      if (duration > 0) {
        const timer = setTimeout(() => dismiss(id), duration)
        timersRef.current.set(id, timer)
      }

      return id
    },
    [dismiss],
  )

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}

      <div className="fixed right-4 top-4 z-[100] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence mode="popLayout">
          {toasts.map((t) => {
            const config = variantConfig[t.variant]
            return (
              <motion.div
                key={t.id}
                layout
                variants={toastVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className={cn(
                  'pointer-events-auto flex w-80 items-start gap-3 rounded-lg border p-4 shadow-lg',
                  config.containerClass,
                )}
              >
                <span className="mt-0.5 shrink-0">{config.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-navy-900">{t.title}</p>
                  {t.description && (
                    <p className="mt-1 text-xs text-navy-600">
                      {t.description}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => dismiss(t.id)}
                  className="shrink-0 rounded p-0.5 text-navy-400 hover:text-navy-600 transition-colors"
                  aria-label="Dismiss"
                >
                  <X className="h-4 w-4" />
                </button>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

function useToast(): ToastContextType {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

export { ToastProvider, useToast }
export type { Toast, ToastVariant }

'use client'

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast'
import { useToast } from '@/hooks/use-toast'
import { CheckCircle2, XCircle } from 'lucide-react'

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, variant, ...props }) => {
        const Icon =
          variant === 'success'
            ? CheckCircle2
            : variant === 'destructive'
              ? XCircle
              : null

        return (
          <Toast key={id} variant={variant} {...props}>
            {Icon && (
              <Icon className="h-7 w-7 flex-shrink-0 mr-2 animate-in fade-in zoom-in duration-300 ease-out" />
            )}
            <div className="grid gap-1 flex-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}

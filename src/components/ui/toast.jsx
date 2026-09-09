import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertTriangle, AlertOctagon, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ title, description, variant = 'default', duration = 4000 }) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, description, variant }]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast: addToast, dismiss: removeToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex max-h-screen w-full max-w-sm flex-col space-y-2 pointer-events-none p-4">
        {toasts.map((t) => {
          const icons = {
            default: <Info className="h-4 w-4 text-emerald-400 shrink-0" />,
            operational: <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />,
            warning: <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />,
            critical: <AlertOctagon className="h-4 w-4 text-rose-400 shrink-0" />,
          };

          return (
            <div
              key={t.id}
              className={cn(
                'pointer-events-auto flex items-start gap-3 rounded-lg border p-4 shadow-lg backdrop-blur-md transition-all animate-in slide-in-from-bottom-5',
                t.variant === 'critical' && 'border-rose-500/40 bg-card text-foreground',
                t.variant === 'warning' && 'border-amber-500/40 bg-card text-foreground',
                t.variant === 'operational' && 'border-emerald-500/40 bg-card text-foreground',
                (!t.variant || t.variant === 'default') && 'border-border bg-card text-card-foreground'
              )}
            >
              {icons[t.variant] || icons.default}
              <div className="flex-1">
                {t.title && <div className="text-sm font-semibold">{t.title}</div>}
                {t.description && <div className="text-xs text-muted-foreground mt-0.5">{t.description}</div>}
              </div>
              <button
                onClick={() => removeToast(t.id)}
                className="text-muted-foreground hover:text-foreground p-0.5 rounded transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

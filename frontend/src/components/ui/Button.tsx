import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading = false, disabled, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors select-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-40';

    const variants = {
      primary: 'bg-primary text-primary-foreground shadow-sm hover:bg-emerald-600 active:bg-emerald-700',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-surface-hover active:bg-surface-elevated',
      outline: 'border border-border bg-transparent hover:bg-secondary text-foreground hover:text-white',
      ghost: 'hover:bg-secondary/70 text-muted-foreground hover:text-foreground',
      danger: 'bg-rose-600/90 text-white hover:bg-rose-600 active:bg-rose-700',
      success: 'bg-emerald-600/90 text-white hover:bg-emerald-600 active:bg-emerald-700',
    };

    const sizes = {
      sm: 'h-8 px-2.5 text-xs gap-1.5',
      md: 'h-9 px-4 py-2 text-sm gap-2',
      lg: 'h-10 px-6 text-base gap-2.5',
      icon: 'h-9 w-9 p-0',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {loading && <Loader2 className="h-3.5 w-3.5 animate-spin shrink-0" />}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

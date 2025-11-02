import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'base' | 'lg';
  loading?: boolean;
  className?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      children,
      variant = 'primary',
      size = 'base',
      loading = false,
      className = '',
      disabled,
      ...props
    },
    ref
  ) {
    const baseClasses = clsx(
      // Base styles
      'relative inline-flex items-center justify-center gap-2 rounded-button font-sans font-medium transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary',
      // Disabled state
      'disabled:opacity-50 disabled:cursor-not-allowed',
      className
    );

    const sizeClasses = {
      sm: 'px-4 py-2 text-sm',
      base: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    const variantClasses = {
      primary: clsx(
        'bg-primary text-white shadow-button',
        'hover:bg-primary-dark hover:shadow-md',
        'active:bg-primary-dark active:scale-[0.98]'
      ),
      secondary: clsx(
        'bg-surface text-primary-dark border border-primary-light shadow-sm',
        'hover:bg-primary-light hover:border-primary',
        'active:bg-primary-light active:scale-[0.98]'
      ),
      ghost: clsx(
        'bg-transparent text-primary',
        'hover:bg-primary-light/50',
        'active:bg-primary-light active:scale-[0.98]'
      ),
      danger: clsx(
        'bg-error text-white shadow-button',
        'hover:bg-red-600 hover:shadow-md',
        'active:bg-red-700 active:scale-[0.98]'
      ),
    };

    return (
      <button
        ref={ref}
        className={clsx(
          baseClasses,
          sizeClasses[size],
          variantClasses[variant]
        )}
        disabled={loading || disabled}
        {...props}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        )}
        <span className={clsx({ invisible: loading })}>{children}</span>
      </button>
    );
  }
);

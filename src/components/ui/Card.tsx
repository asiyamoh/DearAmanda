import { ReactNode, HTMLAttributes } from 'react';
import clsx from 'clsx';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'base' | 'lg';
  className?: string;
}

export function Card({
  children,
  variant = 'default',
  padding = 'base',
  className = '',
  ...props
}: CardProps) {
  const baseClasses = clsx('rounded-lg bg-pureWhite', className);

  const variantClasses = {
    default: 'shadow-sm border border-mintGreen/20',
    elevated: 'shadow-button',
    outlined: 'border-2 border-mintGreen',
  };

  const paddingClasses = {
    none: '',
    sm: 'p-3',
    base: 'p-4',
    lg: 'p-6',
  };

  return (
    <div
      className={clsx(
        baseClasses,
        variantClasses[variant],
        paddingClasses[padding]
      )}
      {...props}
    >
      {children}
    </div>
  );
}

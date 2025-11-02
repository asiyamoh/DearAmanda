import { InputHTMLAttributes, forwardRef, useId } from 'react';
import clsx from 'clsx';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  className?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  function FormInput(
    { label, error, helperText, className = '', id, required, ...props },
    ref
  ) {
    const generatedId = useId();
    const inputId = id || generatedId;
    const hasError = !!error;

    return (
      <div className={clsx('w-full', className)}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-primary-dark mb-1.5"
          >
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            className={clsx(
              // Base styles
              'w-full px-4 py-2.5 rounded-lg border font-sans text-base',
              'bg-surface text-text-primary placeholder:text-text-secondary/60',
              // Border states
              'border-primary-light focus:border-primary focus:ring-2 focus:ring-primary/20',
              // Error state
              hasError && 'border-error focus:border-error focus:ring-error/20',
              // Disabled state
              'disabled:bg-background disabled:text-text-secondary disabled:cursor-not-allowed',
              // Transition
              'transition-colors duration-200',
              // Remove default focus outline
              'outline-none'
            )}
            aria-invalid={hasError}
            aria-describedby={
              error
                ? `${inputId}-error`
                : helperText
                  ? `${inputId}-helper`
                  : undefined
            }
            {...props}
          />
        </div>

        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-1.5 text-sm text-error"
            role="alert"
          >
            {error}
          </p>
        )}

        {helperText && !error && (
          <p
            id={`${inputId}-helper`}
            className="mt-1.5 text-sm text-text-secondary"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

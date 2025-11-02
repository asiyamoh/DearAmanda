import { TextareaHTMLAttributes, forwardRef, useId } from 'react';
import clsx from 'clsx';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  className?: string;
  rows?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    {
      label,
      error,
      helperText,
      className = '',
      id,
      required,
      rows = 4,
      ...props
    },
    ref
  ) {
    const generatedId = useId();
    const textareaId = id || generatedId;
    const hasError = !!error;

    return (
      <div className={clsx('w-full', className)}>
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-primary-dark mb-1.5"
          >
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          <textarea
            ref={ref}
            id={textareaId}
            rows={rows}
            className={clsx(
              // Base styles
              'w-full px-4 py-2.5 rounded-lg border font-sans text-base resize-y',
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
                ? `${textareaId}-error`
                : helperText
                  ? `${textareaId}-helper`
                  : undefined
            }
            {...props}
          />
        </div>

        {error && (
          <p
            id={`${textareaId}-error`}
            className="mt-1.5 text-sm text-error"
            role="alert"
          >
            {error}
          </p>
        )}

        {helperText && !error && (
          <p
            id={`${textareaId}-helper`}
            className="mt-1.5 text-sm text-text-secondary"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

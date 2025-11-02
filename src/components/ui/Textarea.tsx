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
            className="block text-sm font-medium text-forestGreen mb-1.5"
          >
            {label}
            {required && <span className="text-softRed ml-1">*</span>}
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
              'bg-pureWhite text-charcoal placeholder:text-slateGray/60',
              // Border states
              'border-mintGreen focus:border-sageGreen focus:ring-2 focus:ring-sageGreen/20',
              // Error state
              hasError &&
                'border-softRed focus:border-softRed focus:ring-softRed/20',
              // Disabled state
              'disabled:bg-offWhite disabled:text-slateGray disabled:cursor-not-allowed',
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
            className="mt-1.5 text-sm text-softRed"
            role="alert"
          >
            {error}
          </p>
        )}

        {helperText && !error && (
          <p
            id={`${textareaId}-helper`}
            className="mt-1.5 text-sm text-slateGray"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

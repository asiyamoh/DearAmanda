import { InputHTMLAttributes, forwardRef, useId } from 'react';
import clsx from 'clsx';

interface NumberInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  helperText?: string;
  className?: string;
  min?: number;
  max?: number;
  step?: number;
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  function NumberInput(
    {
      label,
      error,
      helperText,
      className = '',
      id,
      required,
      min,
      max,
      step,
      ...props
    },
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
            className="block text-sm font-medium text-forestGreen mb-1.5"
          >
            {label}
            {required && <span className="text-softRed ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            type="number"
            min={min}
            max={max}
            step={step}
            className={clsx(
              // Base styles
              'w-full px-4 py-2.5 rounded-lg border font-sans text-base',
              'bg-pureWhite text-charcoal placeholder:text-slateGray/60',
              // Border states
              'border-mintGreen focus:border-sageGreen focus:ring-2 focus:ring-sageGreen/20',
              // Error state
              hasError &&
                'border-softRed focus:border-softRed focus:ring-softRed/20',
              // Disabled state
              'disabled:bg-offWhite disabled:text-slateGray disabled:cursor-not-allowed',
              // Number input specific styles
              '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
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
            className="mt-1.5 text-sm text-softRed"
            role="alert"
          >
            {error}
          </p>
        )}

        {helperText && !error && (
          <p id={`${inputId}-helper`} className="mt-1.5 text-sm text-slateGray">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

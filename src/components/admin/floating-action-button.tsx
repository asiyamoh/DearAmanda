import { HTMLAttributes } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

interface FloatingActionButtonProps extends HTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  label?: string;
  className?: string;
}

export function FloatingActionButton({
  onClick,
  label = 'Add new topic',
  className = '',
  ...props
}: FloatingActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'fixed bottom-6 right-6 z-50',
        'w-14 h-14 rounded-full',
        'bg-forestGreen text-white',
        'shadow-button hover:shadow-lg',
        'flex items-center justify-center',
        'transition-all duration-200',
        'hover:bg-sageGreen hover:scale-110',
        'active:scale-95',
        'focus:outline-none focus:ring-4 focus:ring-sageGreen/30',
        className
      )}
      aria-label={label}
      {...props}
    >
      <PlusIcon className="w-6 h-6" />
    </button>
  );
}

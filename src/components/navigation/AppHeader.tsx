import { ReactNode } from 'react';
import clsx from 'clsx';

interface AppHeaderProps {
  title?: string;
  leftAction?: ReactNode;
  rightAction?: ReactNode;
  showBackButton?: boolean;
  onBack?: () => void;
  className?: string;
}

export function AppHeader({
  title = 'Dear Amanda',
  leftAction,
  rightAction,
  showBackButton = false,
  onBack,
  className = '',
}: AppHeaderProps) {
  return (
    <header
      className={clsx(
        'w-full px-4 py-3 bg-surface border-b border-primary-light/30 shadow-sm',
        className
      )}
    >
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center gap-3 flex-1">
          {showBackButton && (
            <button
              onClick={onBack}
              className="p-1.5 rounded-lg hover:bg-primary-light/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
              aria-label="Go back"
            >
              <svg
                className="w-6 h-6 text-primary-dark"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          {leftAction && <div>{leftAction}</div>}
        </div>

        {/* Center - Title */}
        <div className="flex-1 flex justify-center">
          <h1 className="text-xl font-serif font-semibold text-primary-dark">
            {title}
          </h1>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 flex-1 justify-end">
          {rightAction && <div>{rightAction}</div>}
        </div>
      </div>
    </header>
  );
}

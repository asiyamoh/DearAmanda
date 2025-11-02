import { ReactNode } from 'react';
import clsx from 'clsx';

interface AppHeaderProps {
  title?: string;
  leftAction?: ReactNode;
  rightAction?: ReactNode;
  showBackButton?: boolean;
  onBack?: () => void;
  onLogoClick?: () => void;
  className?: string;
}

export function AppHeader({
  title = 'Dear Amanda',
  leftAction,
  rightAction,
  showBackButton = false,
  onBack,
  onLogoClick,
  className = '',
}: AppHeaderProps) {
  return (
    <header
      className={clsx(
        'w-full px-4 py-3 bg-pureWhite border-b border-mintGreen/30 shadow-sm',
        className
      )}
    >
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center gap-3 flex-1">
          {showBackButton && (
            <button
              onClick={onBack}
              className="p-1.5 rounded-lg hover:bg-mintGreen/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sageGreen/20"
              aria-label="Go back"
            >
              <svg
                className="w-6 h-6 text-forestGreen"
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

        {/* Center - Title (clickable if onLogoClick provided) */}
        <div className="flex-1 flex justify-center">
          {onLogoClick ? (
            <button
              onClick={onLogoClick}
              className="text-xl font-serif font-semibold text-forestGreen hover:opacity-80 transition-opacity cursor-pointer"
              aria-label="Logo"
            >
              {title}
            </button>
          ) : (
            <h1 className="text-xl font-serif font-semibold text-forestGreen">
              {title}
            </h1>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 flex-1 justify-end">
          {rightAction && <div>{rightAction}</div>}
        </div>
      </div>
    </header>
  );
}

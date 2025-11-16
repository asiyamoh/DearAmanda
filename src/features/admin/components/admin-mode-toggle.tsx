import { useEffect } from 'react';
import { useAdminMode } from '../../../contexts/admin-provider';
import { useToggleReveal } from '../../../contexts/toggle-reveal-provider';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import clsx from 'clsx';

interface AdminModeToggleProps {
  alwaysVisible?: boolean; // Always show on admin dashboard
}

export function AdminModeToggle({
  alwaysVisible = false,
}: AdminModeToggleProps) {
  const { isAdminMode, toggleAdminMode, setAdminMode } = useAdminMode();
  const navigate = useNavigate();
  const routerState = useRouterState();

  // Get current route path
  const currentPath = routerState.location.pathname;
  const isOnAdminRoute = currentPath === '/admin-dashboard';

  // Sync context based on route
  useEffect(() => {
    if (isOnAdminRoute && !isAdminMode) {
      // On admin route but context is false -> set to true
      setAdminMode(true);
    } else if (!isOnAdminRoute && isAdminMode) {
      // On user route but context is true -> set to false
      setAdminMode(false);
    }
  }, [isOnAdminRoute, isAdminMode, setAdminMode]);

  // Get reveal state (will be undefined if not in provider)
  let isRevealed = false;
  let onToggleClick: (() => void) | undefined;

  try {
    const revealContext = useToggleReveal();
    isRevealed = revealContext.isRevealed;
    onToggleClick = revealContext.onToggleClick;
  } catch {
    // Not in reveal provider context - that's okay for admin dashboard
  }

  // Determine if toggle should be visible
  const shouldShow = alwaysVisible || isRevealed;

  const handleToggle = () => {
    const newMode = !isAdminMode;
    toggleAdminMode();

    // Reset revocation timer if in reveal context
    if (onToggleClick) {
      onToggleClick();
    }

    // Navigate based on mode
    if (newMode) {
      // Switching to admin mode -> go to admin dashboard
      navigate({ to: '/admin-dashboard' });
    } else {
      // Switching to user mode -> go to topic selection (user mode)
      navigate({ to: '/topic-selection' });
    }
  };

  if (!shouldShow) {
    return null;
  }

  // Route-aware display: Always show "Admin" when on admin-dashboard route
  const displayMode = isOnAdminRoute ? 'Admin' : isAdminMode ? 'Admin' : 'User';
  const displayIsAdminMode = isOnAdminRoute || isAdminMode;

  return (
    <button
      onClick={handleToggle}
      className={clsx(
        'px-4 py-2 rounded-button font-sans font-medium text-sm',
        'transition-all duration-300',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sageGreen',
        // Fade animation
        alwaysVisible
          ? 'opacity-100'
          : isRevealed
            ? 'opacity-100'
            : 'opacity-0 pointer-events-none',
        displayIsAdminMode
          ? 'bg-sageGreen text-white shadow-button hover:bg-forestGreen'
          : 'bg-pureWhite text-forestGreen border border-mintGreen shadow-sm hover:bg-mintGreen'
      )}
      aria-label={
        displayIsAdminMode ? 'Switch to User Mode' : 'Switch to Admin Mode'
      }
    >
      Mode: {displayMode}
    </button>
  );
}

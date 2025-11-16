import { useEffect } from 'react';

interface UseComplimentKeyboardNavigationProps {
  onNext: () => void;
  onPrevious: () => void;
}

export function useComplimentKeyboardNavigation({
  onNext,
  onPrevious,
}: UseComplimentKeyboardNavigationProps) {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === 'ArrowRight') {
        e.preventDefault();
        onNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        onPrevious();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onNext, onPrevious]);
}

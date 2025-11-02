import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  ReactNode,
} from 'react';

interface ToggleRevealContextType {
  isRevealed: boolean;
  handleLogoClick: () => void;
  resetReveal: () => void;
  onToggleClick: () => void; // Called when toggle is clicked to reset revocation timer
}

const ToggleRevealContext = createContext<ToggleRevealContextType | undefined>(
  undefined
);

interface ToggleRevealProviderProps {
  children: ReactNode;
  enableReveal?: boolean; // Only enable on specific pages
}

export function ToggleRevealProvider({
  children,
  enableReveal = false,
}: ToggleRevealProviderProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const clickCountRef = useRef(0);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const revocationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const CLICK_RESET_TIME = 4000; // 4 seconds between clicks before reset
  const REVOCATION_TIME = 15000; // 15 seconds before hiding toggle if not clicked

  // Handle logo click
  const handleLogoClick = () => {
    if (!enableReveal) return;

    // Clear existing timeout
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }

    clickCountRef.current += 1;

    // If we hit 4 clicks, reveal the toggle
    if (clickCountRef.current >= 4) {
      revealToggle();
      clickCountRef.current = 0; // Reset counter
    } else {
      // Set timeout to reset counter if no more clicks
      clickTimeoutRef.current = setTimeout(() => {
        clickCountRef.current = 0;
      }, CLICK_RESET_TIME);
    }
  };

  const revealToggle = () => {
    setIsRevealed(true);

    // Clear any existing revocation timer
    if (revocationTimeoutRef.current) {
      clearTimeout(revocationTimeoutRef.current);
    }

    // Set timer to revoke if toggle not clicked
    revocationTimeoutRef.current = setTimeout(() => {
      resetReveal();
    }, REVOCATION_TIME);
  };

  const resetReveal = () => {
    setIsRevealed(false);
    clickCountRef.current = 0;
    if (revocationTimeoutRef.current) {
      clearTimeout(revocationTimeoutRef.current);
      revocationTimeoutRef.current = null;
    }
  };

  // Called when toggle is clicked - reset revocation timer
  const onToggleClick = () => {
    if (isRevealed && revocationTimeoutRef.current) {
      clearTimeout(revocationTimeoutRef.current);
      // Restart revocation timer
      revocationTimeoutRef.current = setTimeout(() => {
        resetReveal();
      }, REVOCATION_TIME);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
      if (revocationTimeoutRef.current) {
        clearTimeout(revocationTimeoutRef.current);
      }
    };
  }, []);

  // Reset counter on unmount (page navigation)
  useEffect(() => {
    return () => {
      clickCountRef.current = 0;
    };
  }, []);

  return (
    <ToggleRevealContext.Provider
      value={{
        isRevealed,
        handleLogoClick,
        resetReveal,
        onToggleClick,
      }}
    >
      {children}
    </ToggleRevealContext.Provider>
  );
}

export function useToggleReveal() {
  const context = useContext(ToggleRevealContext);
  if (context === undefined) {
    throw new Error(
      'useToggleReveal must be used within a ToggleRevealProvider'
    );
  }
  return context;
}

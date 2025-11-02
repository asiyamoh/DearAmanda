import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

interface AdminContextType {
  isAdminMode: boolean;
  toggleAdminMode: () => void;
  setAdminMode: (value: boolean) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const ADMIN_MODE_KEY = 'dear-amanda-admin-mode';

interface AdminProviderProps {
  children: ReactNode;
}

export function AdminProvider({ children }: AdminProviderProps) {
  const [isAdminMode, setIsAdminMode] = useState<boolean>(() => {
    // Initialize from localStorage on mount
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(ADMIN_MODE_KEY);
      return saved === 'true';
    }
    return false;
  });

  // Sync to localStorage whenever admin mode changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(ADMIN_MODE_KEY, String(isAdminMode));
    }
  }, [isAdminMode]);

  const toggleAdminMode = () => {
    setIsAdminMode(prev => !prev);
  };

  const setAdminMode = (value: boolean) => {
    setIsAdminMode(value);
  };

  return (
    <AdminContext.Provider
      value={{ isAdminMode, toggleAdminMode, setAdminMode }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdminMode() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdminMode must be used within an AdminProvider');
  }
  return context;
}

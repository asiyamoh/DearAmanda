import { ReactNode } from 'react';
import { AppHeader } from '../navigation/AppHeader';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-offWhite flex flex-col">
      {/* Header */}
      <AppHeader title="Dear Amanda" />

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="w-full py-6 px-6">
        <p className="text-center text-slateGray font-sans text-sm">
          You are loved and doing amazing things.
        </p>
      </footer>
    </div>
  );
}

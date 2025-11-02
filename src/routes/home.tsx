import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/components/ui/Button';

export const Route = createFileRoute('/home')({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden">
      {/* Floating hearts decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-3 h-3 text-accent opacity-40 animate-heart-float">
          💚
        </div>
        <div
          className="absolute top-2/4 right-1/3 w-3 h-3 text-accent opacity-30 animate-heart-float"
          style={{ animationDelay: '1s' }}
        >
          💚
        </div>
        <div
          className="absolute bottom-1/4 left-1/3 w-3 h-3 text-accent opacity-35 animate-heart-float"
          style={{ animationDelay: '2s' }}
        >
          💚
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6">
        {/* Optional centered illustration/motif */}
        <div className="mb-8 flex justify-center">
          <div className="text-6xl text-accent animate-pulse">💚</div>
        </div>

        {/* App Name */}
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-primary-dark mb-6 tracking-tight">
          Dear Amanda
        </h1>

        {/* Tagline */}
        <p className="text-xl md:text-2xl text-text-secondary font-sans font-light max-w-2xl mx-auto leading-relaxed">
          For when your heart speaks louder than your words.
        </p>

        {/* Call-to-action button */}
        <div className="mt-12">
          <Button>Get Started</Button>
        </div>
      </div>
    </div>
  );
}

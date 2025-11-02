import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/home')({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden">
      {/* Floating hearts decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-3 h-3 text-primary-light opacity-40 animate-heart-float">
          💚
        </div>
        <div className="absolute top-2/4 right-1/3 w-3 h-3 text-primary-light opacity-30 animate-heart-float" style={{ animationDelay: '1s' }}>
          💚
        </div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 text-primary-light opacity-35 animate-heart-float" style={{ animationDelay: '2s' }}>
          💚
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6">
        {/* Optional centered illustration/motif */}
        <div className="mb-8 flex justify-center">
          <div className="text-6xl text-primary animate-pulse">
            💚
          </div>
        </div>

        {/* App Name */}
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-primary-dark mb-6 tracking-tight">
          Dear Amanda
        </h1>

        {/* Tagline */}
        <p className="text-xl md:text-2xl text-text-secondary font-sans font-light max-w-2xl mx-auto leading-relaxed">
          For when your heart speaks louder than your words.
        </p>

        {/* Subtle glow effect on a button area (if you add a button later) */}
        <div className="mt-12">
          <button className="px-8 py-4 bg-primary text-white rounded-lg shadow-lg hover:bg-primary-dark transition-colors duration-300 font-serif font-semibold text-lg">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}


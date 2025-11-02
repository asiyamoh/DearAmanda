import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { topics } from '../../features/topic-selection/topic-selection.data';
import { getComplimentsForTopic } from './compliments.data';
import { Button } from '../../components/ui/Button';
import { Footer } from '../../components/ui/Footer';
import { AppHeader } from '../../components/navigation/AppHeader';
import { AdminModeToggle } from '../../components/admin/admin-mode-toggle';
import { useToggleReveal } from '../../contexts/toggle-reveal-provider';
import { Route } from '../../routes/compliments.$topicSlug';
import clsx from 'clsx';

export function ComplimentDisplayContent() {
  const { topicSlug } = Route.useParams();
  const navigate = useNavigate();
  const { handleLogoClick } = useToggleReveal();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Get topic name from slug
  const topic = topics.find(t => t.slug === topicSlug);
  const topicName = topic?.name || 'Compliments';

  // Get compliments for this topic
  const compliments = getComplimentsForTopic(topicSlug);
  const currentCompliment = compliments[currentIndex];
  const isLastCompliment = currentIndex === compliments.length - 1;
  const isFirstCompliment = currentIndex === 0;

  // Handle next compliment with transition
  const handleNext = useCallback(() => {
    if (!isLastCompliment) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        setIsTransitioning(false);
      }, 150);
    }
  }, [isLastCompliment]);

  // Handle previous compliment with transition
  const handlePrevious = useCallback(() => {
    if (!isFirstCompliment) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(prev => prev - 1);
        setIsTransitioning(false);
      }, 150);
    }
  }, [isFirstCompliment]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevious();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleNext, handlePrevious]);

  const handleBack = () => {
    navigate({ to: '/topic-selection' });
  };

  if (!currentCompliment) {
    return (
      <div className="min-h-screen bg-offWhite flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif text-forestGreen mb-4">
            No compliments found
          </h1>
          <Button onClick={handleBack}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-offWhite flex flex-col">
      {/* Header */}
      <AppHeader
        title={topicName}
        showBackButton
        onBack={handleBack}
        onLogoClick={handleLogoClick}
        rightAction={<AdminModeToggle />}
      />

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 md:py-12">
        <div className="w-full max-w-2xl">
          {/* Compliment Card */}
          <div className="relative mb-8">
            <div
              className={clsx(
                'bg-pureWhite rounded-xl shadow-button p-8 md:p-12 transition-opacity duration-300',
                isTransitioning ? 'opacity-0' : 'opacity-100'
              )}
            >
              {/* Decorative Heart/Quote */}
              <div className="flex justify-center mb-4">
                <svg
                  className="w-6 h-6 text-sageGreen/60"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>

              {/* Compliment Text */}
              <p className="text-center text-lg md:text-xl font-serif text-charcoal leading-relaxed">
                {currentCompliment.text}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mb-8">
            {/* Previous Button (only show if not first) */}
            {!isFirstCompliment && (
              <Button
                variant="secondary"
                onClick={handlePrevious}
                disabled={isTransitioning}
              >
                Previous
              </Button>
            )}

            {/* Next Compliment Button */}
            <Button
              onClick={handleNext}
              disabled={isLastCompliment || isTransitioning}
              size="lg"
            >
              Next Compliment
            </Button>
          </div>
        </div>
      </main>

      {/* Footer - Fixed at bottom */}
      <Footer />
    </div>
  );
}

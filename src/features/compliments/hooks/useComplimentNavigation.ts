import { useState, useEffect, useCallback, useRef } from 'react';
import { useMarkComplimentsAsUsed } from '../../../hooks/useCompliments';

const TRANSITION_DURATION = 150;

export function useComplimentNavigation(complimentsLength: number) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const viewedComplimentIdsRef = useRef<Set<string>>(new Set());
  const markAsUsedMutation = useMarkComplimentsAsUsed();
  const markAsUsedMutationRef = useRef(markAsUsedMutation);

  // Keep ref in sync with mutation object
  useEffect(() => {
    markAsUsedMutationRef.current = markAsUsedMutation;
  }, [markAsUsedMutation]);

  const isLastCompliment = currentIndex === complimentsLength - 1;
  const isFirstCompliment = currentIndex === 0;

  const markViewedComplimentsAsUsed = useCallback(async () => {
    const idsToMark = Array.from(viewedComplimentIdsRef.current);
    if (idsToMark.length === 0) return;

    try {
      await markAsUsedMutation.mutateAsync(idsToMark);
      viewedComplimentIdsRef.current.clear();
    } catch {
      // Silently fail - user experience shouldn't be interrupted
    }
  }, [markAsUsedMutation]);

  // Cleanup: mark as used when component unmounts
  useEffect(() => {
    const viewedIdsRef = viewedComplimentIdsRef;
    const mutationRef = markAsUsedMutationRef;

    return () => {
      const idsToMark = Array.from(viewedIdsRef.current);
      if (idsToMark.length > 0) {
        mutationRef.current.mutate(idsToMark);
      }
    };
  }, []);

  const handleNext = useCallback(
    (currentComplimentId?: string) => {
      if (!isLastCompliment && currentComplimentId) {
        viewedComplimentIdsRef.current.add(currentComplimentId);
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentIndex(prev => prev + 1);
          setIsTransitioning(false);
        }, TRANSITION_DURATION);
      }
    },
    [isLastCompliment]
  );

  const handlePrevious = useCallback(() => {
    if (!isFirstCompliment) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(prev => prev - 1);
        setIsTransitioning(false);
      }, TRANSITION_DURATION);
    }
  }, [isFirstCompliment]);

  return {
    currentIndex,
    isTransitioning,
    isLastCompliment,
    isFirstCompliment,
    handleNext,
    handlePrevious,
    markViewedComplimentsAsUsed,
  };
}

import { Button } from '../../components/ui/Button';

interface ComplimentNavigationProps {
  onNext: () => void;
  onPrevious: () => void;
  isFirstCompliment: boolean;
  isLastCompliment: boolean;
  isTransitioning: boolean;
}

export function ComplimentNavigation({
  onNext,
  onPrevious,
  isFirstCompliment,
  isLastCompliment,
  isTransitioning,
}: ComplimentNavigationProps) {
  return (
    <div className="flex justify-center gap-4 mb-8">
      {!isFirstCompliment && (
        <Button
          variant="secondary"
          onClick={onPrevious}
          disabled={isTransitioning}
        >
          Previous
        </Button>
      )}
      <Button
        onClick={onNext}
        disabled={isLastCompliment || isTransitioning}
        size="lg"
      >
        Next Compliment
      </Button>
    </div>
  );
}

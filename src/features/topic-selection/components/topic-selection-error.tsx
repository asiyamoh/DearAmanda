import { Button } from '../../../components/ui/Button';

interface TopicSelectionErrorProps {
  onBack: () => void;
}

export function TopicSelectionError({ onBack }: TopicSelectionErrorProps) {
  return (
    <div className="min-h-screen bg-offWhite flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-serif text-forestGreen mb-4">
          Error loading topics
        </h1>
        <p className="text-slateGray mb-4">Please try again later.</p>
        <Button onClick={onBack}>Go Back</Button>
      </div>
    </div>
  );
}

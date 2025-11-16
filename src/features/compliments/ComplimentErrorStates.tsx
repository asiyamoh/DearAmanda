import { Button } from '../../components/ui/Button';

interface ErrorStateProps {
  title: string;
  message: string;
  onBack: () => void;
}

function ErrorState({ title, message, onBack }: ErrorStateProps) {
  return (
    <div className="min-h-screen bg-offWhite flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-serif text-forestGreen mb-4">{title}</h1>
        <p className="text-slateGray mb-4">{message}</p>
        <Button onClick={onBack}>Go Back</Button>
      </div>
    </div>
  );
}

export function LoadingState() {
  return (
    <div className="min-h-screen bg-offWhite flex items-center justify-center">
      <div className="text-center">
        <p className="text-lg text-slateGray">Loading compliments...</p>
      </div>
    </div>
  );
}

export function TopicNotFoundState({ onBack }: { onBack: () => void }) {
  return (
    <ErrorState
      title="Topic not found"
      message="The topic you're looking for doesn't exist."
      onBack={onBack}
    />
  );
}

export function NoComplimentsState({ onBack }: { onBack: () => void }) {
  return (
    <ErrorState
      title="No compliments found"
      message="There are no compliments available for this topic."
      onBack={onBack}
    />
  );
}

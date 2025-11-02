import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/compliments/$topicSlug')({
  component: ComplimentDisplayPage,
});

function ComplimentDisplayPage() {
  const { topicSlug } = Route.useParams();

  return (
    <div className="min-h-screen bg-offWhite flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-serif font-bold text-forestGreen mb-4">
          Compliment Display
        </h1>
        <p className="text-slateGray font-sans">Topic: {topicSlug}</p>
        <p className="text-sm text-slateGray mt-4">
          (This page will be implemented later)
        </p>
      </div>
    </div>
  );
}

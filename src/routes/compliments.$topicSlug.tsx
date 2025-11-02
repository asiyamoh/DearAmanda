import { createFileRoute } from '@tanstack/react-router';
import { ComplimentDisplayPage } from '../features/compliments/compliment-display.page';

export const Route = createFileRoute('/compliments/$topicSlug')({
  component: ComplimentDisplayRoute,
});

function ComplimentDisplayRoute() {
  const { topicSlug } = Route.useParams();
  // Use key prop to reset component state when topicSlug changes
  return <ComplimentDisplayPage key={topicSlug} />;
}

import { createFileRoute } from '@tanstack/react-router';
import { TopicSelectionPage } from '../features/topic-selection/topic-selection.page';

export const Route = createFileRoute('/topic-selection')({
  component: TopicSelectionPage,
});

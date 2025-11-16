import { createFileRoute } from '@tanstack/react-router';
import { ComplimentsManagementPage } from '../features/admin/compliments/compliments-management.page';

// @ts-expect-error - TanStack Router types may not recognize dynamically generated routes
export const Route = createFileRoute('/admin-compliments/$topicSlug')({
  component: ComplimentsManagementRoute,
});

function ComplimentsManagementRoute() {
  const { topicSlug } = Route.useParams() as { topicSlug: string };
  return <ComplimentsManagementPage topicSlug={topicSlug} />;
}

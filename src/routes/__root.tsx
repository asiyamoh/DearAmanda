import { createRootRoute, Outlet, Navigate } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function RootComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => <Navigate to="/home" replace />,
});


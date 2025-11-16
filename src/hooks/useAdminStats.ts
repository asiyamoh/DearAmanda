/**
 * React Query hooks for admin statistics
 *
 * Note: This is a placeholder until the backend implements the stats endpoint
 */

import { useQuery } from '@tanstack/react-query';
import type { AdminStats } from '../api/types';

/**
 * Query key for admin stats
 */
export const adminStatsKeys = {
  all: ['adminStats'] as const,
};

/**
 * Get admin statistics
 *
 * TODO: Replace with actual API call when backend endpoint is ready
 * For now, returns placeholder data
 */
export function useAdminStats() {
  return useQuery({
    queryKey: adminStatsKeys.all,
    queryFn: async (): Promise<AdminStats> => {
      // TODO: Replace with actual API call
      // return getAdminStats();

      // Placeholder data - will be replaced when backend endpoint is ready
      // For now, we'll calculate stats from topics and compliments
      // This is a temporary solution until the backend implements the stats endpoint
      return {
        totalCompliments: 0,
        complimentsViewed: 0,
        favorites: 0,
        uniqueUsers: 0,
      };
    },
    staleTime: 1 * 60 * 1000, // 1 minute
  });
}

/**
 * React Query hooks for admin statistics
 */

import { useQuery } from '@tanstack/react-query';
import { getAdminStats } from '../api/endpoints/admin';

/**
 * Query key for admin stats
 */
export const adminStatsKeys = {
  all: ['adminStats'] as const,
};

/**
 * Get admin statistics
 */
export function useAdminStats() {
  return useQuery({
    queryKey: adminStatsKeys.all,
    queryFn: getAdminStats,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
}

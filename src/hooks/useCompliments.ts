/**
 * React Query hooks for compliments
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getComplimentsByTopicId,
  createCompliment,
  createComplimentsBatch,
  markComplimentsAsUsed,
} from '../api/endpoints/compliments';

/**
 * Query key factory for compliments
 */
export const complimentKeys = {
  all: ['compliments'] as const,
  lists: () => [...complimentKeys.all, 'list'] as const,
  list: (topicId: string) => [...complimentKeys.lists(), topicId] as const,
};

/**
 * Get compliments by topic ID
 */
export function useComplimentsByTopicId(topicId: string | undefined) {
  const compliment = useQuery({
    queryKey: complimentKeys.list(topicId || ''),
    queryFn: () => {
      return getComplimentsByTopicId(topicId!);
    },
    enabled: !!topicId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  return compliment;
}

/**
 * Create single compliment mutation
 */
export function useCreateCompliment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCompliment,
    onSuccess: data => {
      // Invalidate compliments for the topic
      queryClient.invalidateQueries({
        queryKey: complimentKeys.list(data.topicId),
      });
    },
  });
}

/**
 * Create multiple compliments mutation
 */
export function useCreateComplimentsBatch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createComplimentsBatch,
    onSuccess: (_, variables) => {
      // Invalidate compliments for the topic
      queryClient.invalidateQueries({
        queryKey: complimentKeys.list(variables.topicId),
      });
    },
  });
}

/**
 * Mark multiple compliments as used mutation (batch)
 */
export function useMarkComplimentsAsUsed() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markComplimentsAsUsed,
    onSuccess: () => {
      // Invalidate all compliment queries since we don't know which topics were affected
      queryClient.invalidateQueries({
        queryKey: complimentKeys.all,
      });
    },
  });
}

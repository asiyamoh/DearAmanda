/**
 * React Query hooks for topics
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getTopics,
  getTopicBySlug,
  createTopic,
  updateTopic,
  deleteTopic,
} from '../api/endpoints/topics';
import type { UpdateTopicDto } from '../api/types';

/**
 * Query key factory for topics
 */
export const topicKeys = {
  all: ['topics'] as const,
  lists: () => [...topicKeys.all, 'list'] as const,
  list: (filters: string) => [...topicKeys.lists(), { filters }] as const,
  details: () => [...topicKeys.all, 'detail'] as const,
  detail: (slug: string) => [...topicKeys.details(), slug] as const,
};

/**
 * Get all topics
 */
export function useTopics() {
  return useQuery({
    queryKey: topicKeys.lists(),
    queryFn: getTopics,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Get topic by slug
 */
export function useTopicBySlug(slug: string) {
  return useQuery({
    queryKey: topicKeys.detail(slug),
    queryFn: () => getTopicBySlug(slug),
    enabled: !!slug,
  });
}

/**
 * Create topic mutation
 */
export function useCreateTopic() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTopic,
    onSuccess: () => {
      // Invalidate topics list to refetch
      queryClient.invalidateQueries({ queryKey: topicKeys.lists() });
    },
  });
}

/**
 * Update topic mutation
 */
export function useUpdateTopic() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTopicDto }) =>
      updateTopic(id, data),
    onSuccess: data => {
      // Invalidate topics list and the specific topic detail
      queryClient.invalidateQueries({ queryKey: topicKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: topicKeys.detail(data.slug),
      });
    },
  });
}

/**
 * Delete topic mutation
 */
export function useDeleteTopic() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTopic,
    onSuccess: () => {
      // Invalidate topics list
      queryClient.invalidateQueries({ queryKey: topicKeys.lists() });
    },
  });
}

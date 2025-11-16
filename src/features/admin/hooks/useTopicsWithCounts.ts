import { useMemo } from 'react';
import { useTopics } from '../../../hooks/useTopics';
import type { Topic } from '../../../api/types';

interface TopicWithCount extends Topic {
  complimentCount?: number;
}

/**
 * Hook that returns topics with compliment counts
 */
export function useTopicsWithCounts() {
  const { data: topics, isLoading } = useTopics();

  const topicsWithCounts = useMemo<TopicWithCount[]>(() => {
    if (!topics) return [];
    return topics.map(topic => ({
      ...topic,
      complimentCount: topic.compliments?.length || 0,
    }));
  }, [topics]);

  return {
    topics: topicsWithCounts,
    isLoading,
  };
}

import { useMemo } from 'react';
import { useTopics } from '../../../hooks/useTopics';
import { useAdminStats } from '../../../hooks/useAdminStats';
import type { Topic } from '../../../api/types';

interface TopicWithCount extends Topic {
  complimentCount?: number;
}

/**
 * Hook that returns topics with compliment counts from admin stats
 */
export function useTopicsWithCounts() {
  const { data: topics, isLoading: topicsLoading } = useTopics();
  const { data: adminStats, isLoading: statsLoading } = useAdminStats();

  const topicsWithCounts = useMemo<TopicWithCount[]>(() => {
    if (!topics) return [];

    // Create a map of topicId -> total count from admin stats
    const countsMap = new Map<string, number>();
    if (adminStats?.complimentsByTopic) {
      adminStats.complimentsByTopic.forEach(topicStat => {
        countsMap.set(topicStat.topicId, topicStat.total);
      });
    }

    // Merge topics with counts from admin stats
    const topicsWithCounts = topics.map(topic => ({
      ...topic,
      complimentCount: countsMap.get(topic.id) ?? 0,
    }));

    // Sort alphabetically by topic name for admin management table
    return topicsWithCounts.sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
    );
  }, [topics, adminStats]);

  return {
    topics: topicsWithCounts,
    isLoading: topicsLoading || statsLoading,
  };
}

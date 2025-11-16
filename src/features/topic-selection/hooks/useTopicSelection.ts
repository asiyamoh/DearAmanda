import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import type { Topic } from '../../../api/types';

/**
 * Hook for topic selection state and navigation
 */
export function useTopicSelection() {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const navigate = useNavigate();

  const handleTopicClick = (topic: Topic) => {
    setSelectedTopic(topic);
  };

  const handleContinue = () => {
    if (selectedTopic) {
      navigate({
        to: '/compliments/$topicSlug',
        params: { topicSlug: selectedTopic.slug },
      });
    }
  };

  const handleBack = () => {
    navigate({ to: '/home' });
  };

  return {
    selectedTopic,
    handleTopicClick,
    handleContinue,
    handleBack,
  };
}

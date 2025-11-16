import {
  useCreateTopic,
  useUpdateTopic,
  useDeleteTopic,
} from '../../../hooks/useTopics';
import { useCreateComplimentsBatch } from '../../../hooks/useCompliments';
import { generateCompliments } from '../../../utils/openai';
import type { Topic } from '../../../api/types';

/**
 * Hook for topic CRUD operations
 */
export function useTopicActions() {
  const createTopicMutation = useCreateTopic();
  const updateTopicMutation = useUpdateTopic();
  const deleteTopicMutation = useDeleteTopic();
  const createComplimentsMutation = useCreateComplimentsBatch();

  const saveTopic = async (
    topicData: Omit<Topic, 'id' | 'createdAt' | 'updatedAt' | 'compliments'>,
    topicId?: string
  ) => {
    if (topicId) {
      return updateTopicMutation.mutateAsync({
        id: topicId,
        data: {
          name: topicData.name,
          prompt: topicData.prompt,
        },
      });
    } else {
      return createTopicMutation.mutateAsync({
        name: topicData.name,
        prompt: topicData.prompt,
      });
    }
  };

  const generateTopicWithCompliments = async (
    topicData: Omit<Topic, 'id' | 'createdAt' | 'updatedAt' | 'compliments'> & {
      complimentCountToGenerate?: number;
    }
  ) => {
    // First, create the topic
    const newTopic = await createTopicMutation.mutateAsync({
      name: topicData.name,
      prompt: topicData.prompt,
    });

    // Then generate compliments using OpenAI
    if (topicData.prompt && topicData.complimentCountToGenerate) {
      const compliments = await generateCompliments(
        topicData.prompt,
        topicData.complimentCountToGenerate
      );

      // Save compliments to database
      await createComplimentsMutation.mutateAsync({
        topicId: newTopic.id,
        contents: compliments,
      });
    }

    return newTopic;
  };

  const deleteTopic = async (topicId: string) => {
    return deleteTopicMutation.mutateAsync(topicId);
  };

  return {
    saveTopic,
    generateTopicWithCompliments,
    deleteTopic,
    isDeleting: deleteTopicMutation.isPending,
  };
}

import { useState, useMemo } from 'react';
import { AppHeader } from '../../components/navigation/AppHeader';
import { AdminModeToggle } from './admin-mode-toggle';
import { TopicsManagementCard } from './topics-management-card';
import { ComplimentSummaryCard } from './compliment-summary-card';
import { FloatingActionButton } from './floating-action-button';
import { CreateTopicModal } from './create-topic-modal';
import { useTopics } from '../../hooks/useTopics';
import { useCreateTopic } from '../../hooks/useTopics';
import { useCreateComplimentsBatch } from '../../hooks/useCompliments';
import { useAdminStats } from '../../hooks/useAdminStats';
import { generateCompliments } from '../../utils/openai';
import type { Topic } from '../../api/types';

// Extended Topic type for admin view with compliment count
interface TopicWithCount extends Topic {
  complimentCount?: number;
}

// Add compliment counts for admin view
// In real implementation, this would come from a separate query or be included in the topic response
const getTopicsWithCounts = (topicsList: Topic[]): TopicWithCount[] => {
  // For now, we'll use the compliments relation if available, otherwise 0
  return topicsList.map(topic => ({
    ...topic,
    complimentCount: topic.compliments?.length || 0,
  }));
};

export function AdminDashboardPage() {
  const { data: topics, isLoading: topicsLoading } = useTopics();
  const { data: adminStats, isLoading: statsLoading } = useAdminStats();
  const createTopicMutation = useCreateTopic();
  const createComplimentsMutation = useCreateComplimentsBatch();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const topicsWithCounts = useMemo(
    () => getTopicsWithCounts(topics || []),
    [topics]
  );

  const handleGenerateMore = (topic: Topic) => {
    // TODO: Implement generate more functionality
    console.log('Generate more compliments for:', topic.name);
  };

  const handleEdit = (topic: Topic) => {
    // TODO: Implement edit functionality
    console.log('Edit topic:', topic.name);
  };

  const handleDelete = (topic: Topic) => {
    // TODO: Implement delete functionality
    console.log('Delete topic:', topic.name);
  };

  const handleCreateTopic = () => {
    setIsCreateModalOpen(true);
  };

  const handleSaveTopic = async (
    topicData: Omit<Topic, 'id' | 'createdAt' | 'updatedAt' | 'compliments'>
  ) => {
    try {
      await createTopicMutation.mutateAsync({
        name: topicData.name,
        prompt: topicData.prompt,
      });
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Error creating topic:', error);
      // TODO: Show error toast/notification to user
    }
  };

  const handleGenerateTopic = async (
    topicData: Omit<Topic, 'id' | 'createdAt' | 'updatedAt' | 'compliments'> & {
      complimentCountToGenerate?: number;
    }
  ) => {
    try {
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

        console.log('Generated and saved compliments:', compliments.length);
      }

      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Error generating topic and compliments:', error);
      // TODO: Show error toast/notification to user
    }
  };

  if (topicsLoading || statsLoading) {
    return (
      <div className="min-h-screen bg-offWhite flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-slateGray">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-offWhite flex flex-col">
      {/* Header with Admin Mode Toggle */}
      <AppHeader
        title="Dear Amanda"
        rightAction={<AdminModeToggle alwaysVisible={true} />}
      />

      {/* Main Content */}
      <main className="flex-1 px-4 py-8 md:py-12">
        <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
          {/* Topics Management Card */}
          <TopicsManagementCard
            topics={topicsWithCounts}
            onGenerateMore={handleGenerateMore}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          {/* Compliment Summary Card */}
          {adminStats && <ComplimentSummaryCard stats={adminStats} />}
        </div>
      </main>

      {/* Floating Action Button */}
      <FloatingActionButton onClick={handleCreateTopic} />

      {/* Create Topic Modal */}
      <CreateTopicModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleSaveTopic}
        onGenerate={handleGenerateTopic}
      />
    </div>
  );
}

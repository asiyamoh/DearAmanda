import { useState } from 'react';
import { AppHeader } from '../../components/navigation/AppHeader';
import { AdminModeToggle } from './components/admin-mode-toggle';
import { TopicsManagementCard } from './components/topics-management-card';
import { ComplimentSummaryCard } from './components/compliment-summary-card';
import { FloatingActionButton } from './components/floating-action-button';
import { AdminDashboardLoading } from './components/admin-dashboard-loading';
import { TopicModal } from './topics/topic-modal';
import { DeleteTopicConfirmationModal } from './topics/delete-topic-confirmation-modal';
import { useTopicModal } from './hooks/useTopicModal';
import { useTopicActions } from './hooks/useTopicActions';
import { useTopicsWithCounts } from './hooks/useTopicsWithCounts';
import { useAdminStats } from '../../hooks/useAdminStats';
import type { Topic } from '../../api/types';

export function AdminDashboardPage() {
  const { data: adminStats, isLoading: statsLoading } = useAdminStats();
  const { topics, isLoading: topicsLoading } = useTopicsWithCounts();
  const topicModal = useTopicModal();
  const { saveTopic, generateTopicWithCompliments, deleteTopic, isDeleting } =
    useTopicActions();
  const [topicToDelete, setTopicToDelete] = useState<Topic | null>(null);

  const handleGenerateMore = (topic: Topic) => {
    // TODO: Implement generate more functionality
    console.log('Generate more compliments for:', topic.name);
  };

  const handleDelete = (topic: Topic) => {
    setTopicToDelete(topic);
  };

  const handleConfirmDelete = async (topicId: string) => {
    try {
      await deleteTopic(topicId);
      setTopicToDelete(null);
    } catch (error) {
      console.error('Error deleting topic:', error);
    }
  };

  const handleSaveTopic = async (
    topicData: Omit<Topic, 'id' | 'createdAt' | 'updatedAt' | 'compliments'>,
    topicId?: string
  ) => {
    try {
      await saveTopic(topicData, topicId);
      topicModal.closeModal();
    } catch (error) {
      console.error('Error saving topic:', error);
    }
  };

  const handleGenerateTopic = async (
    topicData: Omit<Topic, 'id' | 'createdAt' | 'updatedAt' | 'compliments'> & {
      complimentCountToGenerate?: number;
    }
  ) => {
    try {
      await generateTopicWithCompliments(topicData);
      topicModal.closeModal();
    } catch (error) {
      console.error('Error generating topic and compliments:', error);
    }
  };

  if (topicsLoading || statsLoading) {
    return <AdminDashboardLoading />;
  }

  return (
    <div className="min-h-screen bg-offWhite flex flex-col">
      <AppHeader
        title="Dear Amanda"
        rightAction={<AdminModeToggle alwaysVisible={true} />}
      />

      <main className="flex-1 px-4 py-8 md:py-12">
        <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
          <TopicsManagementCard
            topics={topics}
            onGenerateMore={handleGenerateMore}
            onEdit={topicModal.openEditModal}
            onDelete={handleDelete}
          />

          {adminStats && <ComplimentSummaryCard stats={adminStats} />}
        </div>
      </main>

      <FloatingActionButton onClick={topicModal.openCreateModal} />

      <TopicModal
        isOpen={topicModal.isOpen}
        onClose={topicModal.closeModal}
        initialTopic={topicModal.editingTopic}
        onSave={handleSaveTopic}
        onGenerate={handleGenerateTopic}
      />

      <DeleteTopicConfirmationModal
        isOpen={!!topicToDelete}
        onClose={() => setTopicToDelete(null)}
        topic={topicToDelete}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
}

import { useState, useMemo } from 'react';
import { AppHeader } from '../../components/navigation/AppHeader';
import { AdminModeToggle } from './admin-mode-toggle';
import { TopicsManagementCard } from './topics-management-card';
import { ComplimentSummaryCard } from './compliment-summary-card';
import { FloatingActionButton } from './floating-action-button';
import { CreateTopicModal } from './create-topic-modal';
import { adminStats } from './admin-stats.data';
import { topics as initialTopics } from '../../features/topic-selection/topic-selection.data';
import { Topic } from '../../features/topic-selection/topic-selection.data';
import { generateCompliments } from '../../utils/openai';

// Add fake compliment counts for admin view
// In real implementation, this would come from database
const getTopicsWithCounts = (topicsList: Topic[]): Topic[] => {
  return topicsList.map((topic, index) => ({
    ...topic,
    complimentCount:
      [
        1250, 980, 1520, 870, 1100, 750, 1340, 920, 1080, 650, 1420, 890, 1150,
        1030, 680,
      ][index] || 0,
  }));
};

export function AdminDashboardPage() {
  const [topics, setTopics] = useState<Topic[]>(initialTopics);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const topicsWithCounts = useMemo(() => getTopicsWithCounts(topics), [topics]);

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

  const handleSaveTopic = (
    topicData: Omit<Topic, 'id' | 'complimentCount'>
  ) => {
    // Generate a new ID (in real implementation, this would come from the database)
    const newId = Math.max(...topics.map(t => t.id), 0) + 1;

    const newTopic: Topic = {
      ...topicData,
      id: newId,
      complimentCount: 0,
    };

    // Add to topics list
    setTopics(prev => [...prev, newTopic]);

    console.log('Topic saved:', newTopic);
    // TODO: In real implementation, save to Supabase/database
  };

  const handleGenerateTopic = async (
    topicData: Omit<Topic, 'id' | 'complimentCount'>
  ) => {
    try {
      // First, save the topic
      const newId = Math.max(...topics.map(t => t.id), 0) + 1;
      const newTopic: Topic = {
        ...topicData,
        id: newId,
        complimentCount: topicData.complimentCountToGenerate || 0,
      };

      // Add to topics list
      setTopics(prev => [...prev, newTopic]);

      // Then generate compliments using OpenAI
      if (topicData.aiPrompt && topicData.complimentCountToGenerate) {
        const compliments = await generateCompliments(
          topicData.aiPrompt,
          topicData.complimentCountToGenerate
        );

        console.log('Generated compliments:', compliments);
        // TODO: In real implementation, save compliments to database
        // await supabase.from('compliments').insert(
        //   compliments.map(text => ({
        //     text,
        //     topic_id: newTopic.id,
        //     topic_slug: newTopic.slug,
        //   }))
        // );
      }
    } catch (error) {
      console.error('Error generating topic and compliments:', error);
      // TODO: Show error toast/notification to user
    }
  };

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
          <ComplimentSummaryCard stats={adminStats} />
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

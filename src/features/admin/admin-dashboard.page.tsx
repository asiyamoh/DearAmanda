import { AppHeader } from '../../components/navigation/AppHeader';
import { AdminModeToggle } from '../../components/admin/admin-mode-toggle';
import { TopicsManagementCard } from '../../components/admin/topics-management-card';
import { ComplimentSummaryCard } from '../../components/admin/compliment-summary-card';
import { FloatingActionButton } from '../../components/admin/floating-action-button';
import { adminStats } from './admin-stats.data';
import { topics } from '../../features/topic-selection/topic-selection.data';
import { Topic } from '../../features/topic-selection/topic-selection.data';

// Add fake compliment counts for admin view
// In real implementation, this would come from database
const topicsWithCounts: Topic[] = topics.map((topic, index) => ({
  ...topic,
  complimentCount:
    [
      1250, 980, 1520, 870, 1100, 750, 1340, 920, 1080, 650, 1420, 890, 1150,
      1030, 680,
    ][index] || 0,
}));

export function AdminDashboardPage() {
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
    // TODO: Implement create topic functionality
    console.log('Create new topic');
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
    </div>
  );
}

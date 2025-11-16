import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { AppHeader } from '../../components/navigation/AppHeader';
import { TopicCard } from '../../components/ui/topic-card';
import { Button } from '../../components/ui/Button';
import { AdminModeToggle } from '../admin/admin-mode-toggle';
import { useToggleReveal } from '../../contexts/toggle-reveal-provider';
import { useTopics } from '../../hooks/useTopics';
import type { Topic } from '../../api/types';

export function TopicSelectionContent() {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const navigate = useNavigate();
  const { handleLogoClick } = useToggleReveal();
  const { data: topics, isLoading, isError } = useTopics();

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-offWhite flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-slateGray">Loading topics...</p>
        </div>
      </div>
    );
  }

  if (isError || !topics) {
    return (
      <div className="min-h-screen bg-offWhite flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif text-forestGreen mb-4">
            Error loading topics
          </h1>
          <p className="text-slateGray mb-4">Please try again later.</p>
          <Button onClick={handleBack}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-offWhite flex flex-col">
      {/* Header */}
      <AppHeader
        title="Dear Amanda"
        showBackButton
        onBack={handleBack}
        onLogoClick={handleLogoClick}
        rightAction={<AdminModeToggle />}
      />

      {/* Main Content */}
      <div className="flex-1 px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Title and Subtitle */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-forestGreen mb-4">
              Choose a Topic
            </h1>
            <p className="text-lg md:text-xl text-slateGray font-sans">
              What kind of encouragement do you need today?
            </p>
          </div>

          {/* Topic Grid */}
          {topics.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slateGray">No topics available.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
              {topics.map(topic => (
                <TopicCard
                  key={topic.id}
                  name={topic.name}
                  isSelected={selectedTopic?.id === topic.id}
                  onClick={() => handleTopicClick(topic)}
                />
              ))}
            </div>
          )}

          {/* Continue Button */}
          <div className="flex justify-center pb-8">
            <Button
              onClick={handleContinue}
              disabled={!selectedTopic}
              size="lg"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

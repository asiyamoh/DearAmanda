import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { AppHeader } from '../../components/navigation/AppHeader';
import { TopicCard } from '../../components/ui/topic-card';
import { Button } from '../../components/ui/Button';
import { AdminModeToggle } from '../admin/admin-mode-toggle';
import { useToggleReveal } from '../../contexts/toggle-reveal-provider';
import { topics, Topic } from './topic-selection.data';

export function TopicSelectionContent() {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const navigate = useNavigate();
  const { handleLogoClick } = useToggleReveal();

  const handleTopicClick = (topic: Topic) => {
    setSelectedTopic(topic);
  };

  const handleContinue = () => {
    if (selectedTopic) {
      // Navigate to compliment display page with topic slug
      // Placeholder route for now - will be created later
      navigate({
        to: '/compliments/$topicSlug',
        params: { topicSlug: selectedTopic.slug },
      });
    }
  };

  const handleBack = () => {
    navigate({ to: '/home' });
  };

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

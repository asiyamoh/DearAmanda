import { AppHeader } from '../../../components/navigation/AppHeader';
import { TopicCard } from '../../../components/ui/topic-card';
import { Button } from '../../../components/ui/Button';
import { AdminModeToggle } from '../../admin/components/admin-mode-toggle';
import { useToggleReveal } from '../../../contexts/toggle-reveal-provider';
import { useTopics } from '../../../hooks/useTopics';
import { useTopicSelection } from '../hooks/useTopicSelection';
import { TopicSelectionLoading } from './topic-selection-loading';
import { TopicSelectionError } from './topic-selection-error';
import { TopicSelectionEmpty } from './topic-selection-empty';

export function TopicSelectionContent() {
  const { handleLogoClick } = useToggleReveal();
  const { data: topics, isLoading, isError } = useTopics();
  const { selectedTopic, handleTopicClick, handleContinue, handleBack } =
    useTopicSelection();

  if (isLoading) {
    return <TopicSelectionLoading />;
  }

  if (isError || !topics) {
    return <TopicSelectionError onBack={handleBack} />;
  }

  return (
    <div className="min-h-screen bg-offWhite flex flex-col">
      <AppHeader
        title="Dear Amanda"
        showBackButton
        onBack={handleBack}
        onLogoClick={handleLogoClick}
        rightAction={<AdminModeToggle />}
      />

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
            <TopicSelectionEmpty />
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

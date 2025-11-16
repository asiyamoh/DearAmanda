import { useNavigate } from '@tanstack/react-router';
import { Footer } from '../../../components/ui/Footer';
import { AppHeader } from '../../../components/navigation/AppHeader';
import { AdminModeToggle } from '../../admin/components/admin-mode-toggle';
import { useToggleReveal } from '../../../contexts/toggle-reveal-provider';
import { Route } from '../../../routes/compliments.$topicSlug';
import { useTopicBySlug } from '../../../hooks/useTopics';
import { useComplimentsByTopicId } from '../../../hooks/useCompliments';
import { useComplimentNavigation } from '../hooks/useComplimentNavigation';
import { useComplimentKeyboardNavigation } from '../hooks/useComplimentKeyboardNavigation';
import { ComplimentCard } from './ComplimentCard';
import { ComplimentNavigation } from './ComplimentNavigation';
import {
  LoadingState,
  TopicNotFoundState,
  NoComplimentsState,
} from './ComplimentErrorStates';

export function ComplimentDisplayContent() {
  const { topicSlug } = Route.useParams();
  const navigate = useNavigate();
  const { handleLogoClick } = useToggleReveal();

  const {
    data: topic,
    isLoading: topicLoading,
    isError: topicError,
  } = useTopicBySlug(topicSlug);
  const { data: compliments, isLoading: complimentsLoading } =
    useComplimentsByTopicId(topic?.id);

  const {
    currentIndex,
    isTransitioning,
    isLastCompliment,
    isFirstCompliment,
    handleNext,
    handlePrevious,
    markViewedComplimentsAsUsed,
  } = useComplimentNavigation(compliments?.length || 0);

  const currentCompliment = compliments?.[currentIndex];
  const topicName = topic?.name || 'Compliments';

  useComplimentKeyboardNavigation({
    onNext: () => handleNext(currentCompliment?.id),
    onPrevious: handlePrevious,
  });

  const handleBack = async () => {
    await markViewedComplimentsAsUsed();
    navigate({ to: '/topic-selection' });
  };

  if (topicLoading || complimentsLoading) {
    return <LoadingState />;
  }

  if (topicError || !topic) {
    return <TopicNotFoundState onBack={handleBack} />;
  }

  if (!compliments || compliments.length === 0 || !currentCompliment) {
    return <NoComplimentsState onBack={handleBack} />;
  }

  return (
    <div className="min-h-screen bg-offWhite flex flex-col">
      <AppHeader
        title={topicName}
        showBackButton
        onBack={handleBack}
        onLogoClick={handleLogoClick}
        rightAction={<AdminModeToggle />}
      />

      <main className="flex-1 flex items-center justify-center px-4 py-8 md:py-12">
        <div className="w-full max-w-2xl">
          <ComplimentCard
            content={currentCompliment.content}
            isTransitioning={isTransitioning}
          />

          <ComplimentNavigation
            onNext={() => handleNext(currentCompliment.id)}
            onPrevious={handlePrevious}
            isFirstCompliment={isFirstCompliment}
            isLastCompliment={isLastCompliment}
            isTransitioning={isTransitioning}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}

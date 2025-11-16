import { ToggleRevealProvider } from '../../contexts/toggle-reveal-provider';
import { TopicSelectionContent } from './components/topic-selection-content';

export function TopicSelectionPage() {
  return (
    <ToggleRevealProvider enableReveal={true}>
      <TopicSelectionContent />
    </ToggleRevealProvider>
  );
}

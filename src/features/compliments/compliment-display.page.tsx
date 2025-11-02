import { ToggleRevealProvider } from '../../contexts/toggle-reveal-provider';
import { ComplimentDisplayContent } from './compliment-display-content';

export function ComplimentDisplayPage() {
  return (
    <ToggleRevealProvider enableReveal={true}>
      <ComplimentDisplayContent />
    </ToggleRevealProvider>
  );
}

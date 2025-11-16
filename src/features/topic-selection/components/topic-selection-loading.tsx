/**
 * Loading state component for topic selection
 */
export function TopicSelectionLoading() {
  return (
    <div className="min-h-screen bg-offWhite flex items-center justify-center">
      <div className="text-center">
        <p className="text-lg text-slateGray">Loading topics...</p>
      </div>
    </div>
  );
}

import clsx from 'clsx';

interface ComplimentCardProps {
  content: string;
  isTransitioning: boolean;
}

export function ComplimentCard({
  content,
  isTransitioning,
}: ComplimentCardProps) {
  return (
    <div className="relative mb-8">
      <div
        className={clsx(
          'bg-pureWhite rounded-xl shadow-button p-8 md:p-12 transition-opacity duration-300',
          isTransitioning ? 'opacity-0' : 'opacity-100'
        )}
      >
        <div className="flex justify-center mb-4">
          <svg
            className="w-6 h-6 text-sageGreen/60"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
        <p className="text-center text-lg md:text-xl font-serif text-charcoal leading-relaxed">
          {content}
        </p>
      </div>
    </div>
  );
}

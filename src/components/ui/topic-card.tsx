import clsx from 'clsx';

interface TopicCardProps {
  name: string;
  isSelected: boolean;
  onClick: () => void;
}

export function TopicCard({ name, isSelected, onClick }: TopicCardProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'flex flex-col items-center justify-center gap-3 p-6 rounded-xl transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sageGreen',
        'min-h-[120px]',
        // Base styles
        isSelected
          ? 'bg-forestGreen text-white shadow-lg scale-105'
          : 'bg-mintGreen text-forestGreen hover:bg-sageGreen hover:text-white hover:shadow-md',
        // Hover effect for non-selected
        !isSelected && 'hover:scale-105'
      )}
      aria-label={`Select ${name}`}
    >
      <span className="font-sans font-medium text-sm md:text-base text-center">
        {name}
      </span>
    </button>
  );
}

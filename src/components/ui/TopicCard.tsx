import { ComponentType } from 'react';
import clsx from 'clsx';
import {
  HeartIcon,
  SparklesIcon,
  BookOpenIcon,
  LightBulbIcon,
  AcademicCapIcon,
  ShieldCheckIcon,
  Cog6ToothIcon,
  UserGroupIcon,
  MoonIcon,
  BoltIcon,
  CpuChipIcon,
  BriefcaseIcon,
  FaceSmileIcon,
  StarIcon,
  HomeIcon,
} from '@heroicons/react/24/outline';

// Icon mapping for dynamic rendering
const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  HeartIcon,
  SparklesIcon,
  BookOpenIcon,
  LightBulbIcon,
  AcademicCapIcon,
  ShieldCheckIcon,
  Cog6ToothIcon,
  UserGroupIcon,
  MoonIcon,
  BoltIcon,
  CpuChipIcon,
  BriefcaseIcon,
  FaceSmileIcon,
  StarIcon,
  HomeIcon,
};

interface TopicCardProps {
  name: string;
  icon: string;
  isSelected: boolean;
  onClick: () => void;
}

export function TopicCard({ name, icon, isSelected, onClick }: TopicCardProps) {
  const IconComponent = iconMap[icon] || SparklesIcon;

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
      <IconComponent className="w-8 h-8" />
      <span className="font-sans font-medium text-sm md:text-base text-center">
        {name}
      </span>
    </button>
  );
}

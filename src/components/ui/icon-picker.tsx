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
  FireIcon,
  SunIcon,
  CloudIcon,
  BeakerIcon,
  ChartBarIcon,
  CommandLineIcon,
  CubeIcon,
  GiftIcon,
  GlobeAltIcon,
  KeyIcon,
  PaintBrushIcon,
  PuzzlePieceIcon,
  RocketLaunchIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline';

// Icon mapping for dynamic rendering
export const iconMap: Record<string, ComponentType<{ className?: string }>> = {
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
  FireIcon,
  SunIcon,
  CloudIcon,
  BeakerIcon,
  ChartBarIcon,
  CommandLineIcon,
  CubeIcon,
  GiftIcon,
  GlobeAltIcon,
  KeyIcon,
  PaintBrushIcon,
  PuzzlePieceIcon,
  RocketLaunchIcon,
  TrophyIcon,
};

// Available icon names
export const availableIcons = Object.keys(iconMap);

interface IconPickerProps {
  selectedIcon: string;
  onSelectIcon: (iconName: string) => void;
  label?: string;
  error?: string;
  className?: string;
}

export function IconPicker({
  selectedIcon,
  onSelectIcon,
  label,
  error,
  className = '',
}: IconPickerProps) {
  const hasError = !!error;

  return (
    <div className={clsx('w-full', className)}>
      {label && (
        <label className="block text-sm font-medium text-forestGreen mb-1.5">
          {label}
          <span className="text-softRed ml-1">*</span>
        </label>
      )}

      <div
        className={clsx(
          'grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2 p-4 rounded-lg border',
          'bg-pureWhite',
          hasError
            ? 'border-softRed'
            : 'border-mintGreen focus-within:border-sageGreen focus-within:ring-2 focus-within:ring-sageGreen/20'
        )}
      >
        {availableIcons.map(iconName => {
          const IconComponent = iconMap[iconName];
          const isSelected = selectedIcon === iconName;

          return (
            <button
              key={iconName}
              type="button"
              onClick={() => onSelectIcon(iconName)}
              className={clsx(
                'flex items-center justify-center p-2 rounded-lg transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-sageGreen/20',
                isSelected
                  ? 'bg-forestGreen text-white shadow-md scale-105'
                  : 'bg-mintGreen/30 text-forestGreen hover:bg-sageGreen hover:text-white hover:scale-105'
              )}
              aria-label={`Select ${iconName}`}
            >
              <IconComponent className="w-5 h-5" />
            </button>
          );
        })}
      </div>

      {error && (
        <p className="mt-1.5 text-sm text-softRed" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

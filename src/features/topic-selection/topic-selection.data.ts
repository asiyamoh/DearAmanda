/**
 * Fake data for topic selection
 * This file can be easily replaced with a Supabase query later
 */

export interface Topic {
  id: number;
  name: string;
  icon: string; // Heroicon name
  slug: string;
}

/**
 * Array of all available topics for selection
 * Can be replaced with: const topics = await supabase.from('topics').select('*')
 */
export const topics: Topic[] = [
  {
    id: 1,
    name: 'Self-Love',
    icon: 'HeartIcon',
    slug: 'self-love',
  },
  {
    id: 2,
    name: 'Joy & Happiness',
    icon: 'SparklesIcon',
    slug: 'joy-happiness',
  },
  {
    id: 3,
    name: 'Learning & Growth',
    icon: 'BookOpenIcon',
    slug: 'learning-growth',
  },
  {
    id: 4,
    name: 'Creativity',
    icon: 'LightBulbIcon',
    slug: 'creativity',
  },
  {
    id: 5,
    name: 'Mindfulness',
    icon: 'AcademicCapIcon',
    slug: 'mindfulness',
  },
  {
    id: 6,
    name: 'Resilience',
    icon: 'ShieldCheckIcon',
    slug: 'resilience',
  },
  {
    id: 7,
    name: 'Productivity',
    icon: 'Cog6ToothIcon',
    slug: 'productivity',
  },
  {
    id: 8,
    name: 'Relationships',
    icon: 'UserGroupIcon',
    slug: 'relationships',
  },
  {
    id: 9,
    name: 'Sleep & Rest',
    icon: 'MoonIcon',
    slug: 'sleep-rest',
  },
  {
    id: 10,
    name: 'Energy Boost',
    icon: 'BoltIcon',
    slug: 'energy-boost',
  },
  {
    id: 11,
    name: 'Stress Relief',
    icon: 'CpuChipIcon',
    slug: 'stress-relief',
  },
  {
    id: 12,
    name: 'Career Path',
    icon: 'BriefcaseIcon',
    slug: 'career-path',
  },
  {
    id: 13,
    name: 'Inner Peace',
    icon: 'FaceSmileIcon',
    slug: 'inner-peace',
  },
  {
    id: 14,
    name: 'Hope & Future',
    icon: 'StarIcon',
    slug: 'hope-future',
  },
  {
    id: 15,
    name: 'Balance',
    icon: 'HomeIcon',
    slug: 'balance',
  },
];

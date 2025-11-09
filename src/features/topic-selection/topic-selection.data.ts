/**
 * Fake data for topic selection
 * This file can be easily replaced with a Supabase query later
 */

export interface Topic {
  id: number;
  name: string;
  slug: string;
  complimentCount?: number; // Optional field for admin view
  aiPrompt?: string; // AI prompt for generating compliments
  complimentCountToGenerate?: number; // Number of compliments to generate
}

/**
 * Array of all available topics for selection
 * Can be replaced with: const topics = await supabase.from('topics').select('*')
 */
export const topics: Topic[] = [
  {
    id: 1,
    name: 'Self-Love',
    slug: 'self-love',
  },
  {
    id: 2,
    name: 'Joy & Happiness',
    slug: 'joy-happiness',
  },
  {
    id: 3,
    name: 'Learning & Growth',
    slug: 'learning-growth',
  },
  {
    id: 4,
    name: 'Creativity',
    slug: 'creativity',
  },
  {
    id: 5,
    name: 'Mindfulness',
    slug: 'mindfulness',
  },
  {
    id: 6,
    name: 'Resilience',
    slug: 'resilience',
  },
  {
    id: 7,
    name: 'Productivity',
    slug: 'productivity',
  },
  {
    id: 8,
    name: 'Relationships',
    slug: 'relationships',
  },
  {
    id: 9,
    name: 'Sleep & Rest',
    slug: 'sleep-rest',
  },
  {
    id: 10,
    name: 'Energy Boost',
    slug: 'energy-boost',
  },
  {
    id: 11,
    name: 'Stress Relief',
    slug: 'stress-relief',
  },
  {
    id: 12,
    name: 'Career Path',
    slug: 'career-path',
  },
  {
    id: 13,
    name: 'Inner Peace',
    slug: 'inner-peace',
  },
  {
    id: 14,
    name: 'Hope & Future',
    slug: 'hope-future',
  },
  {
    id: 15,
    name: 'Balance',
    slug: 'balance',
  },
];

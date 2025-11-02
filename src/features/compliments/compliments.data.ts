/**
 * Fake data for compliments
 * This file can be easily replaced with a Supabase query later
 */

export interface Compliment {
  id: number;
  text: string;
  topicSlug: string;
}

/**
 * Compliments organized by topic slug
 * Each topic has 3 compliments
 * Can be replaced with: const compliments = await supabase.from('compliments').select('*').eq('topic_id', topicId)
 */
export const complimentsByTopic: Record<string, Compliment[]> = {
  'self-love': [
    {
      id: 1,
      text: 'You deserve all the kindness you give to others. Take a moment to appreciate how wonderful you truly are.',
      topicSlug: 'self-love',
    },
    {
      id: 2,
      text: 'Your strength and grace in difficult moments inspire everyone around you. You are enough, exactly as you are.',
      topicSlug: 'self-love',
    },
    {
      id: 3,
      text: 'The love you show yourself today creates space for even more love tomorrow. You are worthy of your own compassion.',
      topicSlug: 'self-love',
    },
  ],
  'joy-happiness': [
    {
      id: 4,
      text: 'Your laughter and positive energy light up every room you enter. Thank you for bringing joy to those around you.',
      topicSlug: 'joy-happiness',
    },
    {
      id: 5,
      text: 'You have a beautiful way of finding happiness in the small moments. Keep embracing the little joys that make life special.',
      topicSlug: 'joy-happiness',
    },
    {
      id: 6,
      text: 'Your radiant smile and genuine warmth make the world a brighter place. You deserve all the happiness that comes your way.',
      topicSlug: 'joy-happiness',
    },
  ],
  'learning-growth': [
    {
      id: 7,
      text: 'Your curiosity and dedication to learning are truly inspiring. Every step you take towards growth makes you even more incredible.',
      topicSlug: 'learning-growth',
    },
    {
      id: 8,
      text: 'You have the courage to step outside your comfort zone and grow. That willingness to learn is one of your greatest strengths.',
      topicSlug: 'learning-growth',
    },
    {
      id: 9,
      text: 'Your growth mindset and openness to new experiences show incredible wisdom. Keep embracing the journey of becoming who you are meant to be.',
      topicSlug: 'learning-growth',
    },
  ],
  creativity: [
    {
      id: 10,
      text: 'Your creative spirit brings beauty and innovation into the world. Trust your artistic instincts and let your imagination soar.',
      topicSlug: 'creativity',
    },
    {
      id: 11,
      text: 'The way you express yourself creatively is uniquely beautiful. Your ideas and visions have the power to inspire and transform.',
      topicSlug: 'creativity',
    },
    {
      id: 12,
      text: 'Your creativity is a gift that makes the world more vibrant and interesting. Keep sharing your unique perspective with the world.',
      topicSlug: 'creativity',
    },
  ],
  mindfulness: [
    {
      id: 13,
      text: 'Your ability to stay present and mindful in each moment is a beautiful practice. You create peace wherever you go.',
      topicSlug: 'mindfulness',
    },
    {
      id: 14,
      text: 'The way you take time to appreciate the present moment shows incredible wisdom. Your mindful approach to life is inspiring.',
      topicSlug: 'mindfulness',
    },
    {
      id: 15,
      text: 'Your calm presence and thoughtful approach bring serenity to those around you. Keep honoring your inner peace.',
      topicSlug: 'mindfulness',
    },
  ],
  resilience: [
    {
      id: 16,
      text: 'Your resilience in the face of challenges is remarkable. You have the strength to overcome anything that comes your way.',
      topicSlug: 'resilience',
    },
    {
      id: 17,
      text: 'The way you bounce back from difficulties shows incredible inner strength. You are capable of weathering any storm.',
      topicSlug: 'resilience',
    },
    {
      id: 18,
      text: 'Your ability to adapt and persevere through tough times is truly inspiring. You are stronger than you know.',
      topicSlug: 'resilience',
    },
  ],
  productivity: [
    {
      id: 19,
      text: 'Your dedication and focus when working towards your goals is admirable. You have the discipline to achieve amazing things.',
      topicSlug: 'productivity',
    },
    {
      id: 20,
      text: 'The way you organize your time and energy shows incredible wisdom. You are making steady progress towards your dreams.',
      topicSlug: 'productivity',
    },
    {
      id: 21,
      text: 'Your commitment to doing meaningful work inspires those around you. Keep moving forward with purpose and intention.',
      topicSlug: 'productivity',
    },
  ],
  relationships: [
    {
      id: 22,
      text: 'Your kindness and empathy make you an incredible friend and partner. The people in your life are lucky to have you.',
      topicSlug: 'relationships',
    },
    {
      id: 23,
      text: 'The way you care for others and nurture your relationships is truly special. You bring love and connection wherever you go.',
      topicSlug: 'relationships',
    },
    {
      id: 24,
      text: "Your ability to listen, understand, and support others makes you a treasured presence in people's lives. You are deeply appreciated.",
      topicSlug: 'relationships',
    },
  ],
  'sleep-rest': [
    {
      id: 25,
      text: "Taking time to rest and recharge is not selfish—it's essential. You deserve peaceful sleep and moments of quiet restoration.",
      topicSlug: 'sleep-rest',
    },
    {
      id: 26,
      text: 'Your body and mind work so hard for you every day. Honor them with the rest they need. You have earned this peace.',
      topicSlug: 'sleep-rest',
    },
    {
      id: 27,
      text: 'Rest is not a sign of weakness, but a sign of wisdom. You are making a thoughtful choice to care for yourself.',
      topicSlug: 'sleep-rest',
    },
  ],
  'energy-boost': [
    {
      id: 28,
      text: 'You have more energy and vitality within you than you realize. Take a deep breath and feel that power flowing through you.',
      topicSlug: 'energy-boost',
    },
    {
      id: 29,
      text: 'Your enthusiasm and drive are contagious. When you tap into your inner energy, you can accomplish anything you set your mind to.',
      topicSlug: 'energy-boost',
    },
    {
      id: 30,
      text: 'You are full of potential and strength. Let that energy rise within you and carry you forward with confidence.',
      topicSlug: 'energy-boost',
    },
  ],
  'stress-relief': [
    {
      id: 31,
      text: "It's okay to feel stressed sometimes. You are handling difficult situations with grace, and you have the tools to find peace again.",
      topicSlug: 'stress-relief',
    },
    {
      id: 32,
      text: "You don't have to carry everything alone. Take a moment to breathe deeply and remember that this feeling will pass.",
      topicSlug: 'stress-relief',
    },
    {
      id: 33,
      text: 'Your resilience shines even in stressful moments. You have overcome challenges before, and you will navigate this with strength.',
      topicSlug: 'stress-relief',
    },
  ],
  'career-path': [
    {
      id: 34,
      text: 'Your dedication to your career and professional growth is inspiring. You are building something meaningful, one step at a time.',
      topicSlug: 'career-path',
    },
    {
      id: 35,
      text: 'The skills and talents you bring to your work make a real difference. Your professional journey is unfolding beautifully.',
      topicSlug: 'career-path',
    },
    {
      id: 36,
      text: 'Your ambition and hard work are creating opportunities for yourself and others. Keep moving forward with confidence in your abilities.',
      topicSlug: 'career-path',
    },
  ],
  'inner-peace': [
    {
      id: 37,
      text: 'Your inner peace is a beautiful gift you carry within you. Take a moment to connect with that calm center that always exists.',
      topicSlug: 'inner-peace',
    },
    {
      id: 38,
      text: "Peace isn't about everything being perfect—it's about finding calm within yourself no matter what's happening around you. You have that ability.",
      topicSlug: 'inner-peace',
    },
    {
      id: 39,
      text: 'Your capacity for inner peace grows stronger each day. Trust in your ability to find serenity, even in the midst of chaos.',
      topicSlug: 'inner-peace',
    },
  ],
  'hope-future': [
    {
      id: 40,
      text: 'Your hope and optimism about the future light the way forward. Better days are ahead, and you have the strength to reach them.',
      topicSlug: 'hope-future',
    },
    {
      id: 41,
      text: 'Even when things seem uncertain, you carry hope within you. That light will guide you through any darkness you might face.',
      topicSlug: 'hope-future',
    },
    {
      id: 42,
      text: 'Your future holds so much promise and possibility. Keep believing in yourself and the beautiful journey that lies ahead.',
      topicSlug: 'hope-future',
    },
  ],
  balance: [
    {
      id: 43,
      text: 'Finding balance in life is an ongoing journey, and you are navigating it with wisdom and grace. You are doing better than you think.',
      topicSlug: 'balance',
    },
    {
      id: 44,
      text: 'Your ability to balance different aspects of your life shows incredible maturity. You are creating harmony in your own unique way.',
      topicSlug: 'balance',
    },
    {
      id: 45,
      text: "Balance doesn't mean perfection—it means honoring all parts of yourself. You are finding that equilibrium, and it's beautiful to witness.",
      topicSlug: 'balance',
    },
  ],
};

/**
 * Get compliments for a specific topic slug
 */
export function getComplimentsForTopic(topicSlug: string): Compliment[] {
  return complimentsByTopic[topicSlug] || [];
}

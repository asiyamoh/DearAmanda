-- IMPORTANT SETUP INSTRUCTIONS:
-- 1. Delete or clear this file before initial database setup
-- 2. Start Supabase: `supabase start` (or `supabase db reset` if resetting)
-- 3. Run Prisma migrations: `npx prisma migrate deploy` (creates tables)
-- 4. Restore this file with seed data
-- 5. Seed the database: `supabase db reset --seed` OR manually run this file
--
-- Seed data for Dear Amanda app
-- This file is automatically run by Supabase when using `supabase db reset --seed`

-- Insert Topics
INSERT INTO topics (id, name, slug, prompt, created_at, updated_at)
VALUES
  (
    gen_random_uuid(),
    'Self-Love',
    'self-love',
    'Generate warm, encouraging compliments about self-love and self-acceptance. Focus on inner strength, self-worth, and the importance of being kind to oneself.',
    NOW(),
    NOW()
  ),
  (
    gen_random_uuid(),
    'Joy & Happiness',
    'joy-happiness',
    'Create uplifting compliments about finding joy and happiness in everyday moments. Emphasize positivity, gratitude, and the beauty of simple pleasures.',
    NOW(),
    NOW()
  ),
  (
    gen_random_uuid(),
    'Learning & Growth',
    'learning-growth',
    'Write motivating compliments about personal growth, learning, and continuous improvement. Highlight curiosity, resilience, and the courage to try new things.',
    NOW(),
    NOW()
  ),
  (
    gen_random_uuid(),
    'Creativity',
    'creativity',
    'Generate inspiring compliments about creativity and artistic expression. Celebrate unique perspectives, imagination, and the courage to create.',
    NOW(),
    NOW()
  ),
  (
    gen_random_uuid(),
    'Mindfulness',
    'mindfulness',
    'Create calming compliments about mindfulness and being present. Focus on inner peace, awareness, and the value of taking time to breathe.',
    NOW(),
    NOW()
  ),
  (
    gen_random_uuid(),
    'Resilience',
    'resilience',
    'Write empowering compliments about resilience and overcoming challenges. Emphasize strength, perseverance, and the ability to bounce back.',
    NOW(),
    NOW()
  ),
  (
    gen_random_uuid(),
    'Productivity',
    'productivity',
    'Generate motivating compliments about productivity and achieving goals. Focus on dedication, focus, and making meaningful progress.',
    NOW(),
    NOW()
  ),
  (
    gen_random_uuid(),
    'Relationships',
    'relationships',
    'Create warm compliments about relationships and connections. Highlight kindness, empathy, and the value of meaningful bonds.',
    NOW(),
    NOW()
  ),
  (
    gen_random_uuid(),
    'Sleep & Rest',
    'sleep-rest',
    'Write soothing compliments about rest and self-care. Emphasize the importance of taking time to recharge and restore.',
    NOW(),
    NOW()
  ),
  (
    gen_random_uuid(),
    'Energy Boost',
    'energy-boost',
    'Generate energizing compliments about vitality and motivation. Focus on inner strength, enthusiasm, and the power within.',
    NOW(),
    NOW()
  ),
  (
    gen_random_uuid(),
    'Stress Relief',
    'stress-relief',
    'Create calming compliments about managing stress and finding peace. Emphasize self-compassion, breathing, and letting go.',
    NOW(),
    NOW()
  ),
  (
    gen_random_uuid(),
    'Career Path',
    'career-path',
    'Write encouraging compliments about career growth and professional development. Highlight ambition, skills, and building a meaningful path.',
    NOW(),
    NOW()
  ),
  (
    gen_random_uuid(),
    'Inner Peace',
    'inner-peace',
    'Generate peaceful compliments about finding inner calm and serenity. Focus on tranquility, balance, and connecting with your center.',
    NOW(),
    NOW()
  ),
  (
    gen_random_uuid(),
    'Hope & Future',
    'hope-future',
    'Create hopeful compliments about the future and possibilities. Emphasize optimism, potential, and the journey ahead.',
    NOW(),
    NOW()
  ),
  (
    gen_random_uuid(),
    'Balance',
    'balance',
    'Write thoughtful compliments about finding balance in life. Highlight harmony, wisdom, and honoring all parts of yourself.',
    NOW(),
    NOW()
  )
ON CONFLICT (slug) DO NOTHING;

-- Insert sample compliments for each topic
-- Note: We use subqueries to get the topic IDs dynamically
INSERT INTO compliments (id, topic_id, content, used, created_at, updated_at)
SELECT
  gen_random_uuid(),
  t.id,
  c.content,
  false,
  NOW(),
  NOW()
FROM topics t
CROSS JOIN (
  VALUES
    -- Self-Love
    ('self-love', 'You deserve all the kindness you give to others. Take a moment to appreciate how wonderful you truly are.'),
    ('self-love', 'Your strength and grace in difficult moments inspire everyone around you. You are enough, exactly as you are.'),
    ('self-love', 'The love you show yourself today creates space for even more love tomorrow. You are worthy of your own compassion.'),
    
    -- Joy & Happiness
    ('joy-happiness', 'Your laughter and positive energy light up every room you enter. Thank you for bringing joy to those around you.'),
    ('joy-happiness', 'You have a beautiful way of finding happiness in the small moments. Keep embracing the little joys that make life special.'),
    ('joy-happiness', 'Your radiant smile and genuine warmth make the world a brighter place. You deserve all the happiness that comes your way.'),
    
    -- Learning & Growth
    ('learning-growth', 'Your curiosity and dedication to learning are truly inspiring. Every step you take towards growth makes you even more incredible.'),
    ('learning-growth', 'You have the courage to step outside your comfort zone and grow. That willingness to learn is one of your greatest strengths.'),
    ('learning-growth', 'Your growth mindset and openness to new experiences show incredible wisdom. Keep embracing the journey of becoming who you are meant to be.'),
    
    -- Creativity
    ('creativity', 'Your creative spirit brings beauty and innovation into the world. Trust your artistic instincts and let your imagination soar.'),
    ('creativity', 'The way you express yourself creatively is uniquely beautiful. Your ideas and visions have the power to inspire and transform.'),
    ('creativity', 'Your creativity is a gift that makes the world more vibrant and interesting. Keep sharing your unique perspective with the world.'),
    
    -- Mindfulness
    ('mindfulness', 'Your ability to stay present and mindful in each moment is a beautiful practice. You create peace wherever you go.'),
    ('mindfulness', 'The way you take time to appreciate the present moment shows incredible wisdom. Your mindful approach to life is inspiring.'),
    ('mindfulness', 'Your calm presence and thoughtful approach bring serenity to those around you. Keep honoring your inner peace.')
) AS c(slug, content)
WHERE t.slug = c.slug
ON CONFLICT DO NOTHING;


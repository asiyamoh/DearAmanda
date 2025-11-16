import { z } from 'zod';

/**
 * Validation schema for topic form
 */
export const topicFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Topic name is required')
    .min(2, 'Topic name must be at least 2 characters'),
  prompt: z
    .string()
    .min(1, 'AI prompt is required')
    .min(10, 'AI prompt must be at least 10 characters'),
  complimentCount: z
    .number()
    .min(1, 'Must generate at least 1 compliment')
    .max(1000, 'Cannot generate more than 1000 compliments'),
});

export type TopicFormData = z.infer<typeof topicFormSchema>;

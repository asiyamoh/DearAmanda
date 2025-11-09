import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Modal } from '../../components/ui/Modal';
import { FormInput } from '../../components/ui/FormInput';
import { Textarea } from '../../components/ui/Textarea';
import { NumberInput } from '../../components/ui/NumberInput';
import { Button } from '../../components/ui/Button';
import { generateSlug } from '../../utils/slug';
import { Topic } from '../topic-selection/topic-selection.data';

// Form validation schema
const createTopicSchema = z.object({
  name: z
    .string()
    .min(1, 'Topic name is required')
    .min(2, 'Topic name must be at least 2 characters'),
  aiPrompt: z
    .string()
    .min(1, 'AI prompt is required')
    .min(10, 'AI prompt must be at least 10 characters'),
  complimentCount: z
    .number()
    .min(1, 'Must generate at least 1 compliment')
    .max(1000, 'Cannot generate more than 1000 compliments'),
});

export type CreateTopicFormData = z.infer<typeof createTopicSchema>;

interface CreateTopicModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (topic: Omit<Topic, 'id' | 'complimentCount'>) => void;
  onGenerate: (topic: Omit<Topic, 'id' | 'complimentCount'>) => void;
}

export function CreateTopicModal({
  isOpen,
  onClose,
  onSave,
  onGenerate,
}: CreateTopicModalProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateTopicFormData>({
    resolver: zodResolver(createTopicSchema),
    defaultValues: {
      name: '',
      aiPrompt: '',
      complimentCount: 50,
    },
  });

  const onSubmit = (data: CreateTopicFormData) => {
    const topic: Omit<Topic, 'id' | 'complimentCount'> = {
      name: data.name,
      slug: generateSlug(data.name),
      aiPrompt: data.aiPrompt,
      complimentCountToGenerate: data.complimentCount,
    };

    onSave(topic);
    reset();
    onClose();
  };

  const handleGenerateNow = () => {
    handleSubmit((data: CreateTopicFormData) => {
      const topic: Omit<Topic, 'id' | 'complimentCount'> = {
        name: data.name,
        slug: generateSlug(data.name),
        aiPrompt: data.aiPrompt,
        complimentCountToGenerate: data.complimentCount,
      };

      onGenerate(topic);
      reset();
      onClose();
    })();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create New Topic"
      className="max-w-3xl"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Instructions */}
        <p className="text-slateGray text-sm mb-6">
          Define the parameters and prompt for your compliment generation.
        </p>

        {/* Topic Name */}
        <FormInput
          label="Topic Name"
          placeholder="E.g., Daily Motivation, Self-Love Affirmations"
          {...register('name')}
          error={errors.name?.message}
          required
        />

        {/* AI Prompt */}
        <Textarea
          label="AI Prompt"
          placeholder="Describe the tone, context, and recipient for the compliments. Be specific, kind, and detailed."
          rows={6}
          {...register('aiPrompt')}
          error={errors.aiPrompt?.message}
          helperText="AI prompts help shape how compliments are written. Be specific, kind, and detailed."
          required
        />

        {/* Number of Compliments */}
        <Controller
          name="complimentCount"
          control={control}
          render={({ field }) => (
            <NumberInput
              label="How many compliments to generate?"
              min={1}
              max={1000}
              {...field}
              value={field.value ?? 50}
              onChange={e => field.onChange(Number(e.target.value))}
              error={errors.complimentCount?.message}
              required
            />
          )}
        />

        {/* Action Buttons */}
        <div className="flex items-center gap-4 pt-4">
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            loading={isSubmitting}
            className="flex-1"
          >
            Save Topic
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={handleGenerateNow}
            disabled={isSubmitting}
            className="flex-1"
          >
            Generate Now
          </Button>
        </div>
      </form>
    </Modal>
  );
}

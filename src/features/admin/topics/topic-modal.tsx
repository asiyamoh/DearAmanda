import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { TopicFormFields } from './topic-form-fields';
import { topicFormSchema, type TopicFormData } from './topic-form-schema';
import type { Topic } from '../../../api/types';

interface TopicModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: Topic | null;
  onSave: (
    topic: Omit<Topic, 'id' | 'createdAt' | 'updatedAt' | 'compliments'>,
    topicId?: string
  ) => void | Promise<void>;
  onGenerate: (
    topic: Omit<Topic, 'id' | 'createdAt' | 'updatedAt' | 'compliments'> & {
      complimentCountToGenerate?: number;
    }
  ) => void | Promise<void>;
}

export function TopicModal({
  isOpen,
  onClose,
  initialTopic,
  onSave,
  onGenerate,
}: TopicModalProps) {
  const isEditMode = !!initialTopic;

  const form = useForm<TopicFormData>({
    resolver: zodResolver(topicFormSchema),
    defaultValues: {
      name: '',
      prompt: '',
      complimentCount: 50,
    },
  });

  const { handleSubmit, reset, formState } = form;

  // Pre-populate form when initialTopic changes
  useEffect(() => {
    if (initialTopic) {
      reset({
        name: initialTopic.name,
        prompt: initialTopic.prompt,
        complimentCount: 50,
      });
    } else {
      reset({
        name: '',
        prompt: '',
        complimentCount: 50,
      });
    }
  }, [initialTopic, reset]);

  const onSubmit = (data: TopicFormData) => {
    const topic: Omit<Topic, 'id' | 'createdAt' | 'updatedAt' | 'compliments'> =
      {
        name: data.name,
        slug: '',
        prompt: data.prompt,
      };

    onSave(topic, isEditMode ? initialTopic?.id : undefined);
    reset();
    onClose();
  };

  const handleGenerateNow = async () => {
    await handleSubmit(async (data: TopicFormData) => {
      const topic: Omit<
        Topic,
        'id' | 'createdAt' | 'updatedAt' | 'compliments'
      > & {
        complimentCountToGenerate?: number;
      } = {
        name: data.name,
        slug: '',
        prompt: data.prompt,
        complimentCountToGenerate: data.complimentCount,
      };

      await onGenerate(topic);
      reset();
      onClose();
    })();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const { isSubmitting } = formState;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEditMode ? 'Edit Topic' : 'Create New Topic'}
      className="max-w-3xl"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <p className="text-slateGray text-sm mb-6">
          {isEditMode
            ? 'Update the topic name and prompt for your compliment generation.'
            : 'Define the parameters and prompt for your compliment generation.'}
        </p>

        <TopicFormFields form={form} isEditMode={isEditMode} />

        <div className="flex items-center gap-4 pt-4">
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            loading={isSubmitting}
            className="flex-1"
          >
            {isEditMode ? 'Update Topic' : 'Save Topic'}
          </Button>
          {!isEditMode && (
            <Button
              type="button"
              variant="secondary"
              onClick={handleGenerateNow}
              disabled={isSubmitting}
              className="flex-1"
            >
              Generate Now
            </Button>
          )}
        </div>
      </form>
    </Modal>
  );
}

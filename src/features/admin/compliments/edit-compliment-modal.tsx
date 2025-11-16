import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { z } from 'zod';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { Textarea } from '../../../components/ui/Textarea';
import type { Compliment } from '../../../api/types';

const complimentFormSchema = z.object({
  content: z.string().min(1, 'Content is required'),
});

type ComplimentFormData = z.infer<typeof complimentFormSchema>;

interface EditComplimentModalProps {
  isOpen: boolean;
  onClose: () => void;
  compliment: Compliment | null;
  onSave?: (id: string, content: string) => Promise<void>;
  onCreate?: (content: string) => Promise<void>;
  isSaving?: boolean;
}

export function EditComplimentModal({
  isOpen,
  onClose,
  compliment,
  onSave,
  onCreate,
  isSaving = false,
}: EditComplimentModalProps) {
  const isEditMode = !!compliment;

  const form = useForm<ComplimentFormData>({
    resolver: zodResolver(complimentFormSchema),
    defaultValues: {
      content: '',
    },
  });

  const { handleSubmit, reset, formState, register } = form;

  // Pre-populate form when compliment changes
  useEffect(() => {
    if (compliment) {
      reset({
        content: compliment.content,
      });
    } else {
      reset({
        content: '',
      });
    }
  }, [compliment, reset]);

  const onSubmit = async (data: ComplimentFormData) => {
    if (isEditMode) {
      if (!compliment || !onSave) return;
      await onSave(compliment.id, data.content);
    } else {
      if (!onCreate) return;
      await onCreate(data.content);
    }
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const { isSubmitting } = formState;
  const isLoading = isSubmitting || isSaving;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEditMode ? 'Edit Compliment' : 'Create New Compliment'}
      showCloseButton={!isLoading}
      className="max-w-3xl"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <p className="text-slateGray text-sm mb-6">
          {isEditMode
            ? 'Update the compliment content below.'
            : 'Enter the compliment content below.'}
        </p>

        <Textarea
          {...register('content')}
          label="Compliment Content"
          rows={6}
          required
          disabled={isLoading}
          error={formState.errors.content?.message}
        />

        <div className="flex items-center gap-4 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={handleClose}
            disabled={isLoading}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
            loading={isLoading}
            className="flex-1"
          >
            {isEditMode ? 'Save Changes' : 'Add Compliment'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

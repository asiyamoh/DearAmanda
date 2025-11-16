import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { Alert } from '../../../components/ui/Alert';
import type { Topic } from '../../../api/types';

interface DeleteTopicConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  topic: Topic | null;
  onConfirm: (topicId: string) => Promise<void>;
  isDeleting?: boolean;
}

export function DeleteTopicConfirmationModal({
  isOpen,
  onClose,
  topic,
  onConfirm,
  isDeleting = false,
}: DeleteTopicConfirmationModalProps) {
  if (!topic) return null;

  const handleDelete = async () => {
    await onConfirm(topic.id);
    onClose();
  };

  const complimentCount = topic.compliments?.length || 0;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Topic"
      showCloseButton={!isDeleting}
    >
      <div className="space-y-6">
        {/* Warning Message */}
        <Alert variant="warning" title="This action cannot be undone">
          <p>
            Deleting this topic will permanently remove the topic and{' '}
            <strong>all associated compliments</strong>. This action cannot be
            undone.
          </p>
        </Alert>

        {/* Topic Info */}
        <div className="bg-mintGreen/10 border border-mintGreen/30 rounded-lg p-6">
          <div className="space-y-3">
            <div>
              <h3 className="text-lg font-serif font-bold text-charcoal mb-1">
                {topic.name}
              </h3>
              <p className="text-sm text-slateGray">
                Created {new Date(topic.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="pt-3 border-t border-mintGreen/20">
              <div className="flex justify-between items-center">
                <span className="text-sm font-sans text-charcoal">
                  Compliments:
                </span>
                <span className="text-sm font-sans font-medium text-forestGreen">
                  {complimentCount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="danger"
            onClick={handleDelete}
            disabled={isDeleting}
            loading={isDeleting}
            className="flex-1"
          >
            {isDeleting ? 'Deleting...' : 'Delete Forever'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

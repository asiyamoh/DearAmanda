import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { Alert } from '../../../components/ui/Alert';
import type { Compliment } from '../../../api/types';

interface DeleteComplimentConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  compliment: Compliment | null;
  onConfirm: (complimentId: string) => Promise<void>;
  isDeleting?: boolean;
}

export function DeleteComplimentConfirmationModal({
  isOpen,
  onClose,
  compliment,
  onConfirm,
  isDeleting = false,
}: DeleteComplimentConfirmationModalProps) {
  if (!compliment) return null;

  const handleDelete = async () => {
    await onConfirm(compliment.id);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Compliment"
      showCloseButton={!isDeleting}
    >
      <div className="space-y-6">
        {/* Warning Message */}
        <Alert variant="warning" title="This action cannot be undone">
          <p>
            Deleting this compliment will permanently remove it. This action
            cannot be undone.
          </p>
        </Alert>

        {/* Compliment Info */}
        <div className="bg-mintGreen/10 border border-mintGreen/30 rounded-lg p-6">
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-sans font-semibold text-charcoal mb-2">
                Compliment Content:
              </h3>
              <p className="text-sm text-slateGray font-sans leading-relaxed">
                {compliment.content}
              </p>
            </div>

            <div className="pt-3 border-t border-mintGreen/20">
              <div className="flex justify-between items-center">
                <span className="text-sm font-sans text-charcoal">Status:</span>
                <span
                  className={`text-sm font-sans font-medium ${
                    compliment.used ? 'text-forestGreen' : 'text-slateGray'
                  }`}
                >
                  {compliment.used ? 'Used' : 'Unused'}
                </span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm font-sans text-charcoal">
                  Created:
                </span>
                <span className="text-sm font-sans text-slateGray">
                  {new Date(compliment.createdAt).toLocaleDateString()}
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

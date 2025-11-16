import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { AppHeader } from '../../../components/navigation/AppHeader';
import { AdminModeToggle } from '../components/admin-mode-toggle';
import { ComplimentsManagementTable } from '../components/compliments-management-table';
import { AdminDashboardLoading } from '../components/admin-dashboard-loading';
import { FloatingActionButton } from '../components/floating-action-button';
import { EditComplimentModal } from './edit-compliment-modal';
import { DeleteComplimentConfirmationModal } from './delete-compliment-confirmation-modal';
import { useTopicBySlug } from '../../../hooks/useTopics';
import { useComplimentsByTopicId } from '../../../hooks/useCompliments';
import {
  useUpdateCompliment,
  useDeleteCompliment,
  useCreateCompliment,
} from '../../../hooks/useCompliments';
import type { Compliment } from '../../../api/types';

interface ComplimentsManagementPageProps {
  topicSlug: string;
}

export function ComplimentsManagementPage({
  topicSlug,
}: ComplimentsManagementPageProps) {
  const navigate = useNavigate();
  const { data: topic, isLoading: topicLoading } = useTopicBySlug(topicSlug);
  const { data: compliments, isLoading: complimentsLoading } =
    useComplimentsByTopicId(topic?.id);
  const updateCompliment = useUpdateCompliment();
  const deleteCompliment = useDeleteCompliment();
  const createCompliment = useCreateCompliment();

  const [complimentToEdit, setComplimentToEdit] = useState<Compliment | null>(
    null
  );
  const [complimentToDelete, setComplimentToDelete] =
    useState<Compliment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (compliment: Compliment) => {
    setComplimentToEdit(compliment);
    setIsModalOpen(true);
  };

  const handleDelete = (compliment: Compliment) => {
    setComplimentToDelete(compliment);
  };

  const handleSaveCompliment = async (id: string, content: string) => {
    try {
      await updateCompliment.mutateAsync({
        id,
        data: { content },
      });
      setComplimentToEdit(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating compliment:', error);
      throw error;
    }
  };

  const handleCreateCompliment = async (content: string) => {
    if (!topic) return;
    try {
      await createCompliment.mutateAsync({
        topicId: topic.id,
        content,
      });
      setComplimentToEdit(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating compliment:', error);
      throw error;
    }
  };

  const handleCloseModal = () => {
    setComplimentToEdit(null);
    setIsModalOpen(false);
  };

  const handleOpenCreateModal = () => {
    setComplimentToEdit(null);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async (complimentId: string) => {
    try {
      await deleteCompliment.mutateAsync(complimentId);
      setComplimentToDelete(null);
    } catch (error) {
      console.error('Error deleting compliment:', error);
      throw error;
    }
  };

  const handleBack = () => {
    navigate({ to: '/admin-dashboard' });
  };

  if (topicLoading || complimentsLoading) {
    return <AdminDashboardLoading />;
  }

  if (!topic) {
    return (
      <div className="min-h-screen bg-offWhite flex flex-col">
        <AppHeader
          title="Dear Amanda"
          showBackButton
          onBack={handleBack}
          rightAction={<AdminModeToggle alwaysVisible={true} />}
        />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <h2 className="text-2xl font-serif font-bold text-charcoal mb-2">
              Topic Not Found
            </h2>
            <p className="text-slateGray">
              The topic you&apos;re looking for doesn&apos;t exist.
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-offWhite flex flex-col">
      <AppHeader
        title={topic.name}
        showBackButton
        onBack={handleBack}
        rightAction={<AdminModeToggle alwaysVisible={true} />}
      />

      <main className="flex-1 px-4 py-8 md:py-12">
        <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
          <ComplimentsManagementTable
            compliments={compliments || []}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </main>

      <FloatingActionButton
        onClick={handleOpenCreateModal}
        label="Add new compliment"
      />

      <EditComplimentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        compliment={complimentToEdit}
        onSave={handleSaveCompliment}
        onCreate={handleCreateCompliment}
        isSaving={
          complimentToEdit
            ? updateCompliment.isPending
            : createCompliment.isPending
        }
      />

      <DeleteComplimentConfirmationModal
        isOpen={!!complimentToDelete}
        onClose={() => setComplimentToDelete(null)}
        compliment={complimentToDelete}
        onConfirm={handleConfirmDelete}
        isDeleting={deleteCompliment.isPending}
      />
    </div>
  );
}

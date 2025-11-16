import { useState } from 'react';
import type { Topic } from '../../../api/types';

/**
 * Hook for managing topic modal state (create/edit)
 */
export function useTopicModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);

  const openCreateModal = () => {
    setEditingTopic(null);
    setIsOpen(true);
  };

  const openEditModal = (topic: Topic) => {
    setEditingTopic(topic);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setEditingTopic(null);
  };

  return {
    isOpen,
    editingTopic,
    openCreateModal,
    openEditModal,
    closeModal,
  };
}

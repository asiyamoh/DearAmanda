import { Card } from '../../../components/ui/Card';
import { Table, TableColumn, TableAction } from '../../../components/ui/Table';
import { Button } from '../../../components/ui/Button';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import type { Topic } from '../../../api/types';

interface TopicWithCount extends Topic {
  complimentCount?: number;
}

interface TopicsManagementCardProps {
  topics: TopicWithCount[];
  onGenerateMore?: (topic: Topic) => void;
  onEdit?: (topic: Topic) => void;
  onDelete?: (topic: Topic) => void;
}

export function TopicsManagementCard({
  topics,
  onGenerateMore,
  onEdit,
  onDelete,
}: TopicsManagementCardProps) {
  const columns: TableColumn<TopicWithCount>[] = [
    {
      header: 'Topic Name',
      key: 'name',
      render: topic => (
        <span className="font-sans font-medium text-charcoal">
          {topic.name}
        </span>
      ),
    },
    {
      header: 'Compliments',
      key: 'complimentCount',
      render: topic => (
        <span className="font-sans text-slateGray">
          {topic.complimentCount?.toLocaleString() || '0'}
        </span>
      ),
      className: 'text-right',
    },
  ];

  const actions: TableAction<TopicWithCount>[] = [
    {
      label: 'Edit',
      icon: <PencilIcon className="w-4 h-4" />,
      onClick: topic => {
        onEdit?.(topic);
      },
      variant: 'ghost',
    },
    {
      label: 'Delete',
      icon: <TrashIcon className="w-4 h-4" />,
      onClick: topic => {
        onDelete?.(topic);
      },
      variant: 'danger',
    },
  ];

  // Add Generate More button as a column since Table actions are icon-only
  const columnsWithActions: TableColumn<TopicWithCount>[] = [
    ...columns,
    {
      header: 'Actions',
      key: 'actions',
      render: topic => (
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            onClick={e => {
              e.stopPropagation();
              onGenerateMore?.(topic);
            }}
          >
            Generate More
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Card padding="lg" className="bg-pureWhite">
      <h2 className="text-2xl md:text-3xl font-serif font-bold text-charcoal mb-6">
        Topic Management
      </h2>
      <div className="overflow-x-auto">
        <Table
          columns={columnsWithActions}
          data={topics}
          actions={actions}
          keyExtractor={topic => topic.id}
          emptyMessage="No topics available"
        />
      </div>
    </Card>
  );
}

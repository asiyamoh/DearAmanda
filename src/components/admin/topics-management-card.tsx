import { Card } from '../ui/Card';
import { Table, TableColumn, TableAction } from '../ui/Table';
import { Button } from '../ui/Button';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Topic } from '../../features/topic-selection/topic-selection.data';

interface TopicsManagementCardProps {
  topics: Topic[];
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
  const columns: TableColumn<Topic>[] = [
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

  const actions: TableAction<Topic>[] = [
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
  const columnsWithActions: TableColumn<Topic>[] = [
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

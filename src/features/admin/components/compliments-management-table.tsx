import { Card } from '../../../components/ui/Card';
import { Table, TableColumn, TableAction } from '../../../components/ui/Table';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import type { Compliment } from '../../../api/types';

interface ComplimentsManagementTableProps {
  compliments: Compliment[];
  onEdit?: (compliment: Compliment) => void;
  onDelete?: (compliment: Compliment) => void;
}

export function ComplimentsManagementTable({
  compliments,
  onEdit,
  onDelete,
}: ComplimentsManagementTableProps) {
  const columns: TableColumn<Compliment>[] = [
    {
      header: 'Content',
      key: 'content',
      render: compliment => (
        <span className="font-sans text-charcoal line-clamp-2">
          {compliment.content}
        </span>
      ),
    },
    {
      header: 'Status',
      key: 'used',
      render: compliment => (
        <span
          className={clsx(
            'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-sans font-medium',
            compliment.used
              ? 'bg-forestGreen/10 text-forestGreen'
              : 'bg-slateGray/10 text-slateGray'
          )}
        >
          {compliment.used ? 'Used' : 'Unused'}
        </span>
      ),
      className: 'text-center',
    },
  ];

  const actions: TableAction<Compliment>[] = [
    {
      label: 'Edit',
      icon: <PencilIcon className="w-4 h-4" />,
      onClick: compliment => {
        onEdit?.(compliment);
      },
      variant: 'ghost',
    },
    {
      label: 'Delete',
      icon: <TrashIcon className="w-4 h-4" />,
      onClick: compliment => {
        onDelete?.(compliment);
      },
      variant: 'danger',
    },
  ];

  return (
    <Card padding="lg" className="bg-pureWhite">
      <h2 className="text-2xl md:text-3xl font-serif font-bold text-charcoal mb-6">
        Compliments Management
      </h2>
      <div className="overflow-x-auto">
        <Table
          columns={columns}
          data={compliments}
          actions={actions}
          keyExtractor={compliment => compliment.id}
          emptyMessage="No compliments available"
        />
      </div>
    </Card>
  );
}

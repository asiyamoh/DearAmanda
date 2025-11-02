import { ReactNode, HTMLAttributes } from 'react';
import clsx from 'clsx';

export interface TableColumn<T> {
  header: string;
  key: string;
  render?: (item: T) => ReactNode;
  className?: string;
}

export interface TableAction<T> {
  label: string;
  icon?: ReactNode;
  onClick: (item: T) => void;
  variant?: 'primary' | 'ghost' | 'danger';
  className?: string;
}

export interface TableProps<T> extends HTMLAttributes<HTMLDivElement> {
  columns: TableColumn<T>[];
  data: T[];
  actions?: TableAction<T>[];
  keyExtractor?: (item: T) => string | number;
  emptyMessage?: string;
  className?: string;
}

export function Table<T extends Record<string, unknown>>({
  columns,
  data,
  actions,
  keyExtractor,
  emptyMessage = 'No data available',
  className = '',
  ...props
}: TableProps<T>) {
  if (data.length === 0) {
    return (
      <div
        className={clsx(
          'text-center py-12 text-slateGray font-sans',
          className
        )}
        {...props}
      >
        {emptyMessage}
      </div>
    );
  }

  return (
    <div
      className={clsx('overflow-x-auto -mx-4 sm:mx-0', className)}
      {...props}
    >
      {/* Desktop Table View */}
      <table className="w-full border-collapse hidden md:table">
        <thead>
          <tr className="border-b border-mintGreen/30">
            {columns.map(column => (
              <th
                key={column.key}
                className={clsx(
                  'text-left py-3 px-4 font-sans font-semibold text-charcoal',
                  column.className
                )}
              >
                {column.header}
              </th>
            ))}
            {actions && actions.length > 0 && (
              <th className="text-left py-3 px-4 font-sans font-semibold text-charcoal">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => {
            const key: string | number = keyExtractor
              ? keyExtractor(item)
              : 'id' in item &&
                  typeof item.id !== 'undefined' &&
                  (typeof item.id === 'string' || typeof item.id === 'number')
                ? item.id
                : rowIndex;
            return (
              <tr
                key={key}
                className={clsx(
                  'border-b border-mintGreen/20',
                  rowIndex % 2 === 0 ? 'bg-pureWhite' : 'bg-offWhite/50'
                )}
              >
                {columns.map(column => (
                  <td
                    key={column.key}
                    className={clsx(
                      'py-4 px-4 text-slateGray font-sans',
                      column.className
                    )}
                  >
                    {column.render
                      ? column.render(item)
                      : String(item[column.key as keyof T] ?? '')}
                  </td>
                ))}
                {actions && actions.length > 0 && (
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      {actions.map((action, actionIndex) => (
                        <button
                          key={actionIndex}
                          onClick={() => action.onClick(item)}
                          className={clsx(
                            'p-2 rounded-lg transition-colors duration-200',
                            'focus:outline-none focus:ring-2 focus:ring-sageGreen/20',
                            action.variant === 'danger'
                              ? 'text-softRed hover:bg-red-50'
                              : action.variant === 'ghost'
                                ? 'text-slateGray hover:bg-mintGreen/50'
                                : 'text-sageGreen hover:bg-mintGreen/50',
                            action.className
                          )}
                          aria-label={action.label}
                        >
                          {action.icon || action.label}
                        </button>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {data.map((item, rowIndex) => {
          const key: string | number = keyExtractor
            ? keyExtractor(item)
            : 'id' in item &&
                typeof item.id !== 'undefined' &&
                (typeof item.id === 'string' || typeof item.id === 'number')
              ? item.id
              : rowIndex;
          return (
            <div
              key={key}
              className="bg-pureWhite rounded-lg p-4 border border-mintGreen/20 shadow-sm"
            >
              <div className="space-y-3">
                {columns.map(column => (
                  <div key={column.key} className="flex flex-col">
                    <span className="text-xs font-semibold text-charcoal mb-1">
                      {column.header}
                    </span>
                    <span
                      className={clsx(
                        'text-slateGray font-sans',
                        column.className
                      )}
                    >
                      {column.render
                        ? column.render(item)
                        : String(item[column.key as keyof T] ?? '')}
                    </span>
                  </div>
                ))}
                {actions && actions.length > 0 && (
                  <div className="flex items-center gap-2 pt-2 border-t border-mintGreen/20">
                    {actions.map((action, actionIndex) => (
                      <button
                        key={actionIndex}
                        onClick={() => action.onClick(item)}
                        className={clsx(
                          'px-3 py-1.5 rounded-lg text-sm transition-colors duration-200',
                          'focus:outline-none focus:ring-2 focus:ring-sageGreen/20',
                          action.variant === 'danger'
                            ? 'text-softRed hover:bg-red-50'
                            : action.variant === 'ghost'
                              ? 'text-slateGray hover:bg-mintGreen/50'
                              : 'bg-sageGreen text-white hover:bg-forestGreen',
                          action.className
                        )}
                        aria-label={action.label}
                      >
                        {action.icon && (
                          <span className="mr-1">{action.icon}</span>
                        )}
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

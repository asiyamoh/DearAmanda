import { HTMLAttributes, useState, useEffect, useRef } from 'react';
import clsx from 'clsx';

export interface BarChartProps extends HTMLAttributes<HTMLDivElement> {
  data: number[];
  labels?: string[];
  maxValue?: number;
  color?: 'green' | 'lightGreen' | 'red' | 'orange';
  height?: 'sm' | 'md' | 'lg';
  className?: string;
  showValues?: boolean;
  showLabels?: boolean;
}

const colorClasses = {
  green: 'bg-sageGreen',
  lightGreen: 'bg-mintGreen',
  red: 'bg-softRed',
  orange: 'bg-peach',
};

export function BarChart({
  data,
  labels,
  maxValue,
  color = 'green',
  height = 'md',
  className = '',
  showValues = true,
  showLabels = true,
  ...props
}: BarChartProps) {
  // Calculate max value if not provided, ensuring it's at least 1 to avoid division by zero
  const max = maxValue ?? Math.max(...data, 1);

  // Calculate container height in pixels (using the height prop)
  const containerHeightPx = height === 'sm' ? 32 : height === 'md' ? 48 : 64;
  const actualContainerHeight = Math.max(containerHeightPx, 80); // Minimum 80px

  // Tooltip state
  const [tooltip, setTooltip] = useState<{
    label: string;
    value: number;
    x: number;
    y: number;
  } | null>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  // Close tooltip on outside click or escape key
  useEffect(() => {
    if (!tooltip) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        chartRef.current &&
        !chartRef.current.contains(event.target as Node)
      ) {
        setTooltip(null);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setTooltip(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [tooltip]);

  const handleClick = (
    event: React.MouseEvent,
    label: string,
    value: number,
    isLabel = false
  ) => {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const chartRect = chartRef.current?.getBoundingClientRect();

    if (chartRect) {
      // Position tooltip above the clicked element
      const x = rect.left + rect.width / 2 - chartRect.left;
      const y = isLabel
        ? rect.top - chartRect.top - 10 // For labels, position above
        : rect.top - chartRect.top - 10; // For bars, position above

      setTooltip({
        label,
        value,
        x,
        y,
      });
    }
  };

  return (
    <div
      ref={chartRef}
      className={clsx('w-full relative', className)}
      {...props}
    >
      {/* Bars with values above */}
      <div
        className={clsx('flex items-end gap-1.5 mb-3 relative')}
        style={{ height: `${actualContainerHeight}px` }}
      >
        {data.map((value, index) => {
          // Calculate bar height in pixels based on percentage of max
          const percentage = max > 0 ? value / max : 0;
          const barHeightPx =
            value > 0
              ? Math.max(percentage * actualContainerHeight, 4) // Minimum 4px for visibility
              : 4; // Show a small bar even for zero values

          return (
            <div
              key={index}
              className="flex-1 flex flex-col items-center justify-end relative group"
              style={{ height: '100%' }}
            >
              {/* Value label above bar - always show, even for zero */}
              {showValues && (
                <div className="absolute -top-6 text-xs font-sans font-semibold text-charcoal whitespace-nowrap z-10">
                  {value.toLocaleString()}
                </div>
              )}
              {/* Bar */}
              <div
                className={clsx(
                  'w-full rounded-t transition-all duration-300 relative',
                  colorClasses[color],
                  value > 0
                    ? 'group-hover:opacity-80 cursor-pointer'
                    : 'opacity-30'
                )}
                style={{ height: `${barHeightPx}px` }}
                aria-label={
                  labels?.[index]
                    ? `${labels[index]}: ${value}`
                    : `Bar ${index + 1}: ${value}`
                }
                title={
                  labels?.[index]
                    ? `${labels[index]}: ${value.toLocaleString()}`
                    : undefined
                }
                onClick={e => {
                  if (labels?.[index]) {
                    handleClick(e, labels[index], value, false);
                  }
                }}
              />
            </div>
          );
        })}
      </div>
      {/* Labels below bars */}
      {showLabels && labels && labels.length > 0 && (
        <div className="flex gap-1.5">
          {labels.map((label, index) => (
            <div
              key={index}
              className="flex-1 text-center min-w-0"
              title={label} // Full name on hover
              onClick={e => {
                handleClick(e, label, data[index] || 0, true);
              }}
            >
              <div className="text-xs font-sans text-slateGray truncate px-1 leading-tight cursor-pointer hover:text-charcoal transition-colors">
                {label}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute z-50 px-3 py-2 bg-charcoal text-pureWhite rounded-lg shadow-lg pointer-events-none"
          style={{
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            transform: 'translateX(-50%) translateY(-100%)',
          }}
        >
          <div className="text-sm font-sans font-semibold whitespace-nowrap">
            {tooltip.label}
          </div>
          <div className="text-xs font-sans opacity-90 mt-0.5">
            {tooltip.value.toLocaleString()}{' '}
            {tooltip.value === 1 ? 'compliment' : 'compliments'}
          </div>
          {/* Tooltip arrow */}
          <div
            className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-charcoal"
            style={{ marginTop: '-1px' }}
          />
        </div>
      )}
    </div>
  );
}

import { HTMLAttributes } from 'react';
import clsx from 'clsx';

export interface BarChartProps extends HTMLAttributes<HTMLDivElement> {
  data: number[];
  maxValue?: number;
  color?: 'green' | 'lightGreen' | 'red' | 'orange';
  height?: 'sm' | 'md' | 'lg';
  className?: string;
}

const colorClasses = {
  green: 'bg-sageGreen',
  lightGreen: 'bg-mintGreen',
  red: 'bg-softRed',
  orange: 'bg-peach',
};

const heightClasses = {
  sm: 'h-8',
  md: 'h-12',
  lg: 'h-16',
};

export function BarChart({
  data,
  maxValue,
  color = 'green',
  height = 'md',
  className = '',
  ...props
}: BarChartProps) {
  // Calculate max value if not provided
  const max = maxValue ?? Math.max(...data, 1);

  return (
    <div
      className={clsx('flex items-end gap-1', heightClasses[height], className)}
      {...props}
    >
      {data.map((value, index) => {
        const percentage = (value / max) * 100;
        return (
          <div
            key={index}
            className={clsx(
              'flex-1 rounded-t transition-all duration-300',
              colorClasses[color],
              'min-h-[2px]' // Ensure bars are visible even for small values
            )}
            style={{ height: `${percentage}%` }}
            aria-label={`Bar ${index + 1}: ${value}`}
          />
        );
      })}
    </div>
  );
}

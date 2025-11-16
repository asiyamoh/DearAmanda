import { Card } from '../../components/ui/Card';
import { BarChart } from '../../components/ui/bar-chart';
import { BoltIcon, EyeIcon, HeartIcon } from '@heroicons/react/24/outline';
import type { AdminStats } from '../../api/types';

// Placeholder chart data generator
// TODO: Replace with actual chart data from backend when stats endpoint is implemented
const getStatChartData = (statType: keyof AdminStats): number[] => {
  // Generate sample chart data - in real implementation, this would come from database
  const baseValues: Record<keyof AdminStats, number[]> = {
    totalCompliments: [420, 580, 650, 720, 680, 750, 820, 890, 950, 1020],
    complimentsViewed: [310, 420, 480, 550, 520, 590, 640, 680, 720, 780],
    favorites: [120, 150, 180, 200, 190, 210, 230, 250, 270, 285],
    uniqueUsers: [28, 35, 42, 48, 45, 52, 58, 62, 68, 75],
  };

  return baseValues[statType] || [];
};

interface StatBoxProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  chartColor: 'green' | 'lightGreen' | 'red';
  chartData: number[];
}

function StatBox({ title, value, icon, chartColor, chartData }: StatBoxProps) {
  return (
    <div className="bg-pureWhite rounded-lg p-4 border border-mintGreen/20 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <div className="text-forestGreen">{icon}</div>
        <h3 className="text-sm font-sans font-semibold text-charcoal">
          {title}
        </h3>
      </div>
      <div className="text-3xl font-serif font-bold text-charcoal mb-4">
        {value.toLocaleString()}
      </div>
      <BarChart data={chartData} color={chartColor} height="sm" />
    </div>
  );
}

interface ComplimentSummaryCardProps {
  stats: AdminStats;
}

export function ComplimentSummaryCard({ stats }: ComplimentSummaryCardProps) {
  return (
    <Card padding="lg" className="bg-offWhite/30">
      <h2 className="text-2xl md:text-3xl font-serif font-bold text-charcoal mb-6">
        Compliment Statistics
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatBox
          title="Total Compliments"
          value={stats.totalCompliments}
          icon={<BoltIcon className="w-5 h-5" />}
          chartColor="green"
          chartData={getStatChartData('totalCompliments')}
        />
        <StatBox
          title="Compliments Viewed"
          value={stats.complimentsViewed}
          icon={<EyeIcon className="w-5 h-5" />}
          chartColor="lightGreen"
          chartData={getStatChartData('complimentsViewed')}
        />
        <StatBox
          title="Favorites"
          value={stats.favorites}
          icon={<HeartIcon className="w-5 h-5" />}
          chartColor="red"
          chartData={getStatChartData('favorites')}
        />
      </div>
    </Card>
  );
}

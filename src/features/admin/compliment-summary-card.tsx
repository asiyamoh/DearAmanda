import { Card } from '../../components/ui/Card';
import { BarChart } from '../../components/ui/bar-chart';
import { BoltIcon, EyeIcon, HeartIcon } from '@heroicons/react/24/outline';
import { AdminStats, getStatChartData } from './admin-stats.data';

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

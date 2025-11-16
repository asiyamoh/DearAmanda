import { Card } from '../../../components/ui/Card';
import { BarChart } from '../../../components/ui/bar-chart';
import { BoltIcon, EyeIcon } from '@heroicons/react/24/outline';
import type { AdminStats } from '../../../api/types';

interface StatBoxProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  chartColor: 'green' | 'lightGreen' | 'red';
  chartData: number[];
  chartLabels: string[];
}

function StatBox({
  title,
  value,
  icon,
  chartColor,
  chartData,
  chartLabels,
}: StatBoxProps) {
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
      {chartData.length > 0 ? (
        <div className="pt-2">
          <BarChart
            data={chartData}
            labels={chartLabels}
            color={chartColor}
            height="md"
            showValues={true}
            showLabels={true}
          />
        </div>
      ) : (
        <div className="text-sm text-slateGray font-sans py-4 text-center">
          No data available
        </div>
      )}
    </div>
  );
}

interface ComplimentSummaryCardProps {
  stats: AdminStats;
}

export function ComplimentSummaryCard({ stats }: ComplimentSummaryCardProps) {
  // Sort topics by total count (descending) for total compliments chart
  const sortedByTotal = [...stats.complimentsByTopic].sort(
    (a, b) => b.total - a.total
  );

  // Sort topics by viewed count (descending) for viewed compliments chart
  const sortedByViewed = [...stats.complimentsByTopic].sort(
    (a, b) => b.viewed - a.viewed
  );

  // Extract per-topic data for bar charts
  const totalByTopic = sortedByTotal.map(topic => topic.total);
  const totalTopicNames = sortedByTotal.map(topic => topic.topicName);

  const viewedByTopic = sortedByViewed.map(topic => topic.viewed);
  const viewedTopicNames = sortedByViewed.map(topic => topic.topicName);

  return (
    <Card padding="lg" className="bg-offWhite/30">
      <h2 className="text-2xl md:text-3xl font-serif font-bold text-charcoal mb-6">
        Compliment Statistics
      </h2>
      <div className="flex flex-col gap-4">
        <StatBox
          title="Total Compliments"
          value={stats.totalCompliments}
          icon={<BoltIcon className="w-5 h-5" />}
          chartColor="green"
          chartData={totalByTopic}
          chartLabels={totalTopicNames}
        />
        <StatBox
          title="Compliments Viewed"
          value={stats.complimentsViewed}
          icon={<EyeIcon className="w-5 h-5" />}
          chartColor="lightGreen"
          chartData={viewedByTopic}
          chartLabels={viewedTopicNames}
        />
      </div>
    </Card>
  );
}

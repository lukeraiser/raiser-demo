interface MetricUpdate {
  id: string;
  date: string;
  source: string;
  value: number;
  notes: string;
}

interface Metric {
  id: string;
  title: string;
  target: string;
  value: string;
  period: string;
  lastUpdated: string;
  updates: MetricUpdate[];
}

interface MetricCardProps {
  metric: Metric;
  onEdit: () => void;
  onAddUpdate: () => void;
}

export default function MetricCard({ metric, onEdit, onAddUpdate }: MetricCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{metric.title}</h3>
        <button
          onClick={onEdit}
          className="text-gray-500 hover:text-gray-700"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500">Current Value</p>
          <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Target</p>
          <p className="text-2xl font-bold text-gray-900">{metric.target}</p>
        </div>
      </div>

      <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
        <span>{metric.period}</span>
        <span>Last updated: {metric.lastUpdated}</span>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-sm font-medium text-gray-900">Recent Updates</h4>
          <button
            onClick={onAddUpdate}
            className="text-sm text-[#ff65c3] hover:text-[#e64fb3]"
          >
            + Add Update
          </button>
        </div>
        <ul className="space-y-2">
          {metric.updates.slice(0, 2).map(update => (
            <li key={update.id} className="text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">{update.source}</span>
                <span className="font-medium text-gray-900">+{update.value}</span>
              </div>
              <p className="text-gray-500 text-xs">{update.notes}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 
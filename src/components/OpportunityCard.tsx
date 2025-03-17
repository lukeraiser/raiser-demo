'use client';

import { useState } from 'react';
import Image from 'next/image';

interface OpportunityCardProps {
  id: string;
  title: string;
  amount: string;
  status: string;
  statusColor: string;
  project: string;
  deadline: string;
  owner: string;
  addedDate: string;
  daysAgo: number;
  onOpportunityClick: (id: string) => void;
}

const OpportunityCard = ({
  id,
  title,
  amount,
  status,
  statusColor,
  project,
  deadline,
  owner,
  addedDate,
  daysAgo,
  onOpportunityClick,
}: OpportunityCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Calculate days until deadline
  const getDaysUntilDeadline = () => {
    if (deadline === 'Completed' || deadline === 'Reapply next year') return null;
    if (deadline.startsWith('Interview:')) return null;

    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntilDeadline = getDaysUntilDeadline();

  const getDeadlineColor = () => {
    if (daysUntilDeadline === null) return '';
    if (daysUntilDeadline <= 7) return 'text-red-600';
    if (daysUntilDeadline <= 14) return 'text-orange-600';
    return 'text-gray-600';
  };

  const handleQuickAction = (action: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    // TODO: Implement quick actions
    console.log(`Quick action: ${action}`);
  };

  return (
    <div
      onClick={() => onOpportunityClick(id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-white rounded-lg border border-gray-200 p-4 cursor-pointer hover:shadow-md transition-all relative"
    >
      {/* Quick Actions - Show on Hover */}
      {isHovered && (
        <div className="absolute -right-2 top-2 flex flex-col gap-1 bg-white shadow-lg rounded-lg p-1 border border-gray-200">
          <button
            onClick={(e) => handleQuickAction('edit', e)}
            className="p-1.5 hover:bg-gray-50 rounded"
            title="Edit"
          >
            ✏️
          </button>
          <button
            onClick={(e) => handleQuickAction('share', e)}
            className="p-1.5 hover:bg-gray-50 rounded"
            title="Share"
          >
            📤
          </button>
          <button
            onClick={(e) => handleQuickAction('archive', e)}
            className="p-1.5 hover:bg-gray-50 rounded"
            title="Archive"
          >
            📁
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-gray-900 group-hover:text-pink-600 transition-colors">
            {title}
          </h3>
          <span className={`px-2 py-0.5 rounded-full text-xs ${statusColor} border border-gray-200`}>
            {status}
          </span>
        </div>

        <div className="flex items-baseline justify-between">
          <span className="text-lg font-bold text-gray-900">{amount}</span>
          {daysUntilDeadline !== null && (
            <span className={`text-xs ${getDeadlineColor()}`}>
              {daysUntilDeadline} days left
            </span>
          )}
        </div>

        <div className="space-y-1.5 text-sm">
          <p className="text-gray-900 font-medium truncate">{project}</p>
          <div className="flex items-center justify-between text-xs text-gray-600">
            <span className="flex items-center gap-1">
              👤 {owner}
            </span>
            <span>
              {daysAgo}d ago
            </span>
          </div>
        </div>

        {/* Progress Indicators */}
        {status === 'Drafting' && (
          <div className="mt-2">
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-yellow-400 rounded-full" style={{ width: '60%' }} />
            </div>
            <p className="text-xs text-gray-600 mt-1">60% complete</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OpportunityCard; 
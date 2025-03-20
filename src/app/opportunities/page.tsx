'use client';

import { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import Header from '@/components/Header';
import KanbanColumn from '@/components/KanbanColumn';
import OpportunityDetailsModal from '@/components/OpportunityDetailsModal';

interface Opportunity {
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
}

const mockOpportunities: Opportunity[] = [
  {
    id: '1',
    title: 'City Art Museum',
    amount: '£15,000',
    status: 'Researching',
    statusColor: 'bg-blue-50',
    project: 'Art Education Program',
    deadline: 'May 1, 2024',
    owner: 'Sara',
    addedDate: 'March 1, 2024',
    daysAgo: 2,
  },
  {
    id: '2',
    title: 'Johnson Family',
    amount: '£25,000',
    status: 'Researching',
    statusColor: 'bg-blue-50',
    project: 'Youth Mentorship',
    deadline: 'June 15, 2024',
    owner: 'Mike',
    addedDate: 'February 25, 2024',
    daysAgo: 5,
  },
  {
    id: '3',
    title: 'Tech for Good',
    amount: '£18,000',
    status: 'Eligible',
    statusColor: 'bg-blue-50',
    project: 'Digital Skills Training',
    deadline: 'April 30, 2024',
    owner: 'John',
    addedDate: 'February 22, 2024',
    daysAgo: 8,
  },
  {
    id: '4',
    title: 'Green Initiative',
    amount: '£30,000',
    status: 'Drafting',
    statusColor: 'bg-yellow-50',
    project: 'Community Garden',
    deadline: 'April 15, 2024',
    owner: 'Sara',
    addedDate: 'February 18, 2024',
    daysAgo: 12,
  },
  {
    id: '5',
    title: 'Regional Fund',
    amount: '£22,000',
    status: 'Applied',
    statusColor: 'bg-purple-50',
    project: 'Local Development',
    deadline: 'Interview: Mar 20',
    owner: 'Sara',
    addedDate: 'February 12, 2024',
    daysAgo: 18,
  },
  {
    id: '6',
    title: 'Smith Foundation',
    amount: '£35,000',
    status: 'Successful',
    statusColor: 'bg-green-50',
    project: 'Education Initiative',
    deadline: 'Completed',
    owner: 'Mike',
    addedDate: 'January 30, 2024',
    daysAgo: 30,
  },
  {
    id: '7',
    title: 'Business Alliance',
    amount: '£10,000',
    status: 'Successful',
    statusColor: 'bg-green-50',
    project: 'Small Business Support',
    deadline: 'Completed',
    owner: 'John',
    addedDate: 'January 25, 2024',
    daysAgo: 35,
  },
  {
    id: '8',
    title: 'Davis Trust',
    amount: '£20,000',
    status: 'Unsuccessful',
    statusColor: 'bg-red-50',
    project: 'Arts Program',
    deadline: 'Reapply next year',
    owner: 'Lisa',
    addedDate: 'January 15, 2024',
    daysAgo: 45,
  },
];

const pipelineValue = "2.5M";

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(mockOpportunities);
  const [selectedOpportunityId, setSelectedOpportunityId] = useState<string | null>(null);

  // Calculate pipeline values
  const parseCurrency = (amount: string): number => {
    // Remove pound sign and commas, then parse
    return parseInt(amount.replace(/[£,]/g, ''), 10);
  };

  const formatCurrency = (amount: number): string => {
    if (amount >= 1000000) {
      return `£${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `£${(amount / 1000).toFixed(0)}K`;
    }
    return `£${amount.toFixed(0)}`;
  };

  const getStatusColor = (status: string): string => {
    const colors: { [key: string]: string } = {
      'Researching': 'bg-blue-50',
      'Eligible': 'bg-blue-50',
      'Drafting': 'bg-yellow-50',
      'Applied': 'bg-purple-50',
      'Successful': 'bg-green-50',
      'Unsuccessful': 'bg-red-50'
    };
    return colors[status] || 'bg-gray-50';
  };

  const calculatePipelineValues = () => {
    const totalWon = opportunities
      .filter(opp => opp.status === 'Successful')
      .reduce((sum, opp) => sum + parseCurrency(opp.amount), 0);

    const activePipelineStatuses = ['Researching', 'Eligible', 'Drafting', 'Applied'];
    const totalPipeline = opportunities
      .filter(opp => activePipelineStatuses.includes(opp.status))
      .reduce((sum, opp) => sum + parseCurrency(opp.amount), 0);

    const weightedPipeline = totalPipeline * 0.4; // 40% likelihood

    return {
      totalWon: formatCurrency(totalWon),
      totalPipeline: formatCurrency(totalPipeline),
      weightedPipeline: formatCurrency(weightedPipeline)
    };
  };

  const pipelineStats = calculatePipelineValues();

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // Dropped outside a valid droppable
    if (!destination) return;

    // Find the opportunity that was dragged
    const draggedOpportunity = opportunities.find(opp => opp.id === result.draggableId);
    if (!draggedOpportunity) return;

    // Create new array without the dragged opportunity
    const newOpportunities = opportunities.filter(opp => opp.id !== result.draggableId);

    // Update the status of the dragged opportunity
    const newStatus = destination.droppableId;
    const updatedOpportunity = {
      ...draggedOpportunity,
      status: newStatus,
      statusColor: getStatusColor(newStatus)
    };

    // Insert the opportunity at the new position
    newOpportunities.splice(destination.index, 0, updatedOpportunity);

    // Update state
    setOpportunities(newOpportunities);
  };

  const handleOpportunityClick = (id: string) => {
    setSelectedOpportunityId(id);
  };

  const selectedOpportunity = opportunities.find(opp => opp.id === selectedOpportunityId);

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Pipeline</h1>
          <div className="flex gap-4">
            <div className="bg-white rounded-lg shadow-sm px-6 py-3 w-44">
              <p className="text-sm text-gray-600 font-medium">Total Won</p>
              <p className="text-lg font-semibold text-green-600">{pipelineStats.totalWon}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm px-6 py-3 w-44">
              <p className="text-sm text-gray-600 font-medium">Total Pipeline</p>
              <p className="text-lg font-semibold text-blue-600">{pipelineStats.totalPipeline}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm px-6 py-3 w-44">
              <p className="text-sm text-gray-600 font-medium">Weighted Pipeline</p>
              <p className="text-lg font-semibold text-purple-600">{pipelineStats.weightedPipeline}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm px-6 py-3 w-44">
              <p className="text-sm text-gray-600 font-medium">Total Opportunities</p>
              <p className="text-lg font-semibold text-gray-900">{opportunities.length}</p>
            </div>
          </div>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex gap-6 overflow-x-auto pb-6">
            <KanbanColumn
              id="Researching"
              title="Researching"
              opportunities={opportunities.filter(opp => opp.status === 'Researching')}
              onOpportunityClick={handleOpportunityClick}
            />
            <KanbanColumn
              id="Eligible"
              title="Eligible"
              opportunities={opportunities.filter(opp => opp.status === 'Eligible')}
              onOpportunityClick={handleOpportunityClick}
            />
            <KanbanColumn
              id="Drafting"
              title="Drafting"
              opportunities={opportunities.filter(opp => opp.status === 'Drafting')}
              onOpportunityClick={handleOpportunityClick}
            />
            <KanbanColumn
              id="Applied"
              title="Applied"
              opportunities={opportunities.filter(opp => opp.status === 'Applied')}
              onOpportunityClick={handleOpportunityClick}
            />
            <KanbanColumn
              id="Successful"
              title="Successful"
              opportunities={opportunities.filter(opp => opp.status === 'Successful')}
              onOpportunityClick={handleOpportunityClick}
            />
            <KanbanColumn
              id="Unsuccessful"
              title="Unsuccessful"
              opportunities={opportunities.filter(opp => opp.status === 'Unsuccessful')}
              onOpportunityClick={handleOpportunityClick}
            />
          </div>
        </DragDropContext>

        {selectedOpportunity && (
          <OpportunityDetailsModal
            opportunity={selectedOpportunity}
            onClose={() => setSelectedOpportunityId(null)}
          />
        )}
      </div>
    </main>
  );
} 
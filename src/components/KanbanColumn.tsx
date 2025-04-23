'use client';

import { Droppable, Draggable } from '@hello-pangea/dnd';

interface Opportunity {
  id: string;
  title: string;
  funder: string;
  amount: number;
  deadline: string;
  status: string;
  description: string;
}

interface KanbanColumnProps {
  id: string;
  title: string;
  opportunities: Opportunity[];
  onOpportunityClick: (id: string) => void;
}

export default function KanbanColumn({ id, title, opportunities, onOpportunityClick }: KanbanColumnProps) {
  return (
    <div className="w-80 flex-shrink-0">
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {title} ({opportunities.length})
        </h3>
        
        <Droppable droppableId={id}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="space-y-3"
            >
              {opportunities.map((opportunity, index) => (
                <Draggable
                  key={opportunity.id}
                  draggableId={opportunity.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      onClick={() => onOpportunityClick(opportunity.id)}
                      className="bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <h4 className="font-medium text-gray-900">{opportunity.title}</h4>
                      <p className="text-sm text-gray-500 mt-1">{opportunity.funder}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm font-medium text-gray-900">
                          £{opportunity.amount.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-500">
                          Due {new Date(opportunity.deadline).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
}
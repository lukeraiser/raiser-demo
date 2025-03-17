'use client';

import { Droppable, Draggable } from 'react-beautiful-dnd';
import OpportunityCard from './OpportunityCard';

interface KanbanColumnProps {
  id: string;
  title: string;
  opportunities: Array<{
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
  }>;
  onOpportunityClick: (id: string) => void;
}

const KanbanColumn = ({ id, title, opportunities, onOpportunityClick }: KanbanColumnProps) => {
  return (
    <div className="flex-shrink-0 w-80">
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-700 text-sm">{title}</h2>
          <span className="text-sm text-gray-500">{opportunities.length}</span>
        </div>
        <Droppable 
          droppableId={id} 
          isDropDisabled={false}
          isCombineEnabled={false}
        >
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`space-y-3 min-h-[150px] transition-colors duration-200 ${
                snapshot.isDraggingOver ? 'bg-gray-50 rounded-lg p-2' : ''
              }`}
            >
              {opportunities.map((opportunity, index) => (
                <Draggable
                  key={opportunity.id}
                  draggableId={opportunity.id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        opacity: snapshot.isDragging ? 0.8 : 1,
                      }}
                    >
                      <OpportunityCard
                        {...opportunity}
                        onOpportunityClick={onOpportunityClick}
                      />
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
};

export default KanbanColumn;
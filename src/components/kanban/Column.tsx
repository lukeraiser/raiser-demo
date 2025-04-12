'use client';

import { Droppable } from '@hello-pangea/dnd';
import Card from './Card';
import { Column as ColumnType, GrantCard } from '@/types/kanban';
import { Pencil } from 'lucide-react';

interface ColumnProps {
  column: ColumnType;
  onCardUpdate: (cardId: string, updatedCard: Partial<GrantCard>) => void;
  onStartApplication?: (card: GrantCard) => void;
}

export default function Column({ column, onCardUpdate, onStartApplication }: ColumnProps) {
  return (
    <div className="flex flex-col min-w-[450px]">
      <div className="p-2 bg-gray-100 rounded-t-lg">
        <h3 className="font-semibold">{column.title} ({column.cards.length})</h3>
      </div>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex flex-col gap-2 p-2 min-h-[500px] bg-gray-50 rounded-b-lg ${
              snapshot.isDraggingOver ? 'bg-gray-100' : ''
            }`}
          >
            {Array.isArray(column.cards) && column.cards.map((card, index) => (
              <div key={card.id} className="relative group">
                <Card 
                  card={card} 
                  index={index} 
                  onUpdate={(updatedCard: Partial<GrantCard>) => onCardUpdate(card.id, updatedCard)}
                  onStartApplication={onStartApplication}
                />
                {onStartApplication && column.type === 'eligible' && (
                  <button
                    onClick={() => onStartApplication(card)}
                    className="absolute top-2 right-2 p-2 bg-pink-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
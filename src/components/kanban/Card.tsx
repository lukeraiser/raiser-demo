'use client';

import { Draggable } from '@hello-pangea/dnd';
import { GrantCard } from '@/types/kanban';
import Image from 'next/image';
import { useState } from 'react';
import OpportunityModal from '../kanban/OpportunityModal';
import { Pencil } from 'lucide-react';

interface CardProps {
  card: GrantCard;
  index: number;
  onUpdate?: (updatedCard: GrantCard) => void;
  onStartApplication?: (card: GrantCard) => void;
}

function getDeadlineInfo(deadline: string) {
  const deadlineDate = new Date(deadline);
  const now = new Date();
  const daysUntilDeadline = Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  if (daysUntilDeadline < 0) {
    return {
      color: 'bg-gray-100 text-gray-700',
      text: 'Deadline passed'
    };
  } else if (daysUntilDeadline <= 7) {
    return {
      color: 'bg-red-100 text-red-700',
      text: `Due in ${daysUntilDeadline} day${daysUntilDeadline === 1 ? '' : 's'}`
    };
  } else if (daysUntilDeadline <= 28) {
    return {
      color: 'bg-amber-100 text-amber-700',
      text: `Due in ${Math.ceil(daysUntilDeadline / 7)} week${Math.ceil(daysUntilDeadline / 7) === 1 ? '' : 's'}`
    };
  } else {
    return {
      color: 'bg-green-100 text-green-700',
      text: 'On track'
    };
  }
}

export default function Card({ card, index, onUpdate, onStartApplication }: CardProps) {
  const deadlineInfo = getDeadlineInfo(card.deadline);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleSave = (updatedData: Partial<GrantCard>) => {
    if (onUpdate) {
      onUpdate({
        ...card,
        ...updatedData,
      });
    }
  };

  return (
    <>
      <Draggable draggableId={String(card.id)} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={() => setIsModalOpen(true)}
            className={`p-4 bg-white rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow ${
              snapshot.isDragging ? 'shadow-md' : ''
            }`}
          >
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 relative flex-shrink-0 bg-gray-100 rounded-lg flex items-center justify-center">
                  {card.logo ? (
                    <Image
                      src={card.logo}
                      alt={`${card.title} logo`}
                      fill
                      className="object-contain p-1"
                      sizes="40px"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm font-medium">
                      {card.title.split(' ').map(word => word[0]).join('').slice(0, 2).toUpperCase()}
                    </span>
                  )}
                </div>
                <h4 className="font-medium text-gray-900 text-lg flex-1">{card.title}</h4>
                {onStartApplication && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onStartApplication(card);
                    }}
                    className="p-2 text-pink-600 hover:bg-pink-50 rounded-full transition-colors"
                  >
                    <Pencil className="h-5 w-5" />
                  </button>
                )}
              </div>
              
              <p className="text-sm text-gray-500">{card.eligibility}</p>
              
              <div className="mt-3 flex justify-between items-baseline">
                <span className="text-lg font-medium text-gray-900">
                  £{Number(card.amount).toLocaleString()}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(card.deadline).toLocaleDateString()}
                </span>
              </div>

              <div className="mt-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${deadlineInfo.color}`}>
                  {deadlineInfo.text}
                </span>
              </div>

              <div className="mt-2 text-sm text-gray-500">
                {card.application_details}
              </div>
            </div>
          </div>
        )}
      </Draggable>

      <OpportunityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        opportunity={card}
        mode="view"
        onSave={handleSave}
      />
    </>
  );
} 
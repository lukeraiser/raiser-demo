import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import Column from './Column';
import { Column as ColumnType, GrantCard } from '@/types/kanban';

interface BoardProps {
  initialColumns: ColumnType[];
  onColumnsChange?: (columns: ColumnType[]) => void;
  onStartApplication?: (grant: GrantCard) => void;
}

export default function Board({ initialColumns, onColumnsChange, onStartApplication }: BoardProps) {
  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    // If there's no destination or if the card was dropped in the same spot
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }

    // Find the source and destination columns
    const sourceColumn = initialColumns.find(col => col.id === source.droppableId);
    const destColumn = initialColumns.find(col => col.id === destination.droppableId);

    if (!sourceColumn || !destColumn) {
      return;
    }

    // Create new arrays for the cards
    const sourceCards = Array.from(sourceColumn.cards);
    const destCards = source.droppableId === destination.droppableId
      ? sourceCards
      : Array.from(destColumn.cards);

    // Remove the card from the source column
    const [movedCard] = sourceCards.splice(source.index, 1);

    // Add the card to the destination column
    destCards.splice(destination.index, 0, movedCard);

    // Update the columns
    const updatedColumns = initialColumns.map(col => {
      if (col.id === source.droppableId) {
        return { ...col, cards: sourceCards };
      }
      if (col.id === destination.droppableId) {
        return { ...col, cards: destCards };
      }
      return col;
    });

    if (onColumnsChange) {
      onColumnsChange(updatedColumns);
    }
  };

  const handleCardUpdate = (columnId: string, cardId: string, updatedCard: Partial<GrantCard>) => {
    const updatedColumns = initialColumns.map(column => {
      if (column.id === columnId) {
        return {
          ...column,
          cards: column.cards.map((card: GrantCard) => 
            card.id === cardId ? { ...card, ...updatedCard } : card
          )
        };
      }
      return column;
    });

    if (onColumnsChange) {
      onColumnsChange(updatedColumns);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 h-full overflow-x-auto">
        {initialColumns.map(column => (
          <Column
            key={column.id}
            column={column}
            onCardUpdate={(cardId, updatedCard) => handleCardUpdate(column.id, cardId, updatedCard)}
            onStartApplication={onStartApplication}
          />
        ))}
      </div>
    </DragDropContext>
  );
}
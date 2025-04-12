interface ProjectUpdate {
  id: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
}

interface ProjectUpdateCardProps {
  update: ProjectUpdate;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ProjectUpdateCard({ update, onEdit, onDelete }: ProjectUpdateCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{update.title}</h3>
        <div className="flex space-x-2">
          <button
            onClick={onEdit}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={onDelete}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
      <p className="text-gray-600 mb-4">{update.description}</p>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <div>
          <span className="font-medium">{update.author}</span>
          <span className="mx-2">•</span>
          <span>{update.category}</span>
        </div>
        <span>{new Date(update.date).toLocaleDateString()}</span>
      </div>
    </div>
  );
} 
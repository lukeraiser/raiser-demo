'use client';

import Image from 'next/image';

interface ImpactStory {
  id: string;
  title: string;
  date: string;
  author: string;
  summary: string;
  content: string;
  imageUrl: string;
  tags: string[];
  linkedMetrics?: {
    metricId: string;
    value: number;
  }[];
  beneficiaryQuotes?: string[];
}

interface ImpactStoryCardProps {
  story: ImpactStory;
  onEdit: (story: ImpactStory) => void;
  onDelete: (id: string) => void;
}

export default function ImpactStoryCard({ story, onEdit, onDelete }: ImpactStoryCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {story.imageUrl && (
        <div className="relative h-48 w-full">
          <Image
            src={story.imageUrl}
            alt={story.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{story.title}</h3>
            <p className="text-sm text-gray-500">
              By {story.author} • {new Date(story.date).toLocaleDateString()}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(story)}
              className="text-[#ff65c3] hover:text-opacity-80"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(story.id)}
              className="text-red-500 hover:text-red-600"
            >
              Delete
            </button>
          </div>
        </div>

        <p className="text-gray-600 mb-4">{story.summary}</p>

        {story.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {story.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {story.beneficiaryQuotes && story.beneficiaryQuotes.length > 0 && (
          <div className="border-l-4 border-[#ff65c3] pl-4 mb-4">
            <blockquote className="text-gray-600 italic">
              "{story.beneficiaryQuotes[0]}"
            </blockquote>
          </div>
        )}

        {story.linkedMetrics && story.linkedMetrics.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mb-4">
            {story.linkedMetrics.map((metric, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Linked Metric</p>
                <p className="font-medium text-gray-900">{metric.value}</p>
              </div>
            ))}
          </div>
        )}

        <div className="prose max-w-none">
          <p className="text-gray-600">{story.content}</p>
        </div>
      </div>
    </div>
  );
} 
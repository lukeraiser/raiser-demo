'use client';

import { useState } from 'react';
import Image from 'next/image';
import ProjectDetailsModal from './ProjectDetailsModal';

interface ProjectWithFunding {
  id: string;
  title: string;
  description: string;
  budget: number;
  raised: number;
  image_url: string;
  status: string;
}

interface ProjectCardProps extends ProjectWithFunding {
  onUpdate: (project: ProjectWithFunding) => void;
}

export default function ProjectCard({ id, title, description, budget, raised, image_url, onUpdate }: ProjectCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [imageError, setImageError] = useState(false);

  const progress = (raised / budget) * 100;
  const progressColor = progress <= 30 ? 'bg-red-500' : progress <= 70 ? 'bg-amber-500' : 'bg-green-500';

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="relative h-48 bg-gray-100">
          {!imageError ? (
            <Image
              src={image_url}
              alt={title}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
          <button
            onClick={() => setIsEditing(true)}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm mb-4">{description}</p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Progress</span>
              <span className="text-gray-900 font-medium">{progress.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${progressColor}`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Raised</span>
              <span className="text-gray-900 font-medium">£{raised.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Target</span>
              <span className="text-gray-900 font-medium">£{budget.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <ProjectDetailsModal
          project={{ id, title, description, budget, raised, image_url, status: 'active' }}
          onClose={() => setIsEditing(false)}
          onUpdate={(updatedProject) => onUpdate(updatedProject)}
        />
      )}
    </>
  );
}
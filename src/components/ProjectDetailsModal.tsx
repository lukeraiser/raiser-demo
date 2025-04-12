'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Modal from './Modal';

interface Project {
  id: string;
  title: string;
  description: string;
  budget: number;
  raised: number;
  imageUrl: string;
  status: string;
  opportunities?: Array<{
    id: string;
    title: string;
    amount: string;
    status: string;
    statusColor: string;
    deadline: string;
  }>;
}

interface ProjectDetailsModalProps {
  project: Project;
  onClose: () => void;
  onUpdate: (project: Project) => void;
}

export default function ProjectDetailsModal({ project, onClose, onUpdate }: ProjectDetailsModalProps) {
  const [formData, setFormData] = useState<Project>(project);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
  };

  // Get opportunities for this project
  const mockOpportunities = [
    {
      id: '1',
      title: 'Local Trust Grant',
      amount: '£15,000',
      status: 'Successful',
      statusColor: 'bg-green-50',
      deadline: 'Completed',
      project: 'Core Costs'
    },
    {
      id: '6',
      title: 'Smith Foundation',
      amount: '£35,000',
      status: 'Successful',
      statusColor: 'bg-green-50',
      deadline: 'Completed',
      project: 'Youth Mentorship'
    },
    {
      id: '7',
      title: 'Business Alliance',
      amount: '£10,000',
      status: 'Successful',
      statusColor: 'bg-green-50',
      deadline: 'Completed',
      project: 'Sports Equipment'
    }
  ].filter(opp => opp.project === project.title);

  return (
    <Modal onClose={onClose}>
      <div className="bg-white rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            {project.id === 'new' ? 'Add New Project' : 'Edit Project'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Project Title
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
                Budget (£)
              </label>
              <input
                type="number"
                id="budget"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                required
                min="0"
              />
            </div>

            <div>
              <label htmlFor="raised" className="block text-sm font-medium text-gray-700">
                Amount Raised (£)
              </label>
              <input
                type="number"
                id="raised"
                value={formData.raised}
                onChange={(e) => setFormData({ ...formData, raised: Number(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                required
                min="0"
              />
            </div>

            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
                Image URL
              </label>
              <input
                type="text"
                id="imageUrl"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                required
              />
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#ff65c3] text-white rounded-md hover:bg-opacity-90"
              >
                {project.id === 'new' ? 'Create Project' : 'Update Project'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}
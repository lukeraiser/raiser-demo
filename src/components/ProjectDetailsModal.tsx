'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ProjectDetailsModalProps {
  project: {
    id: string;
    name: string;
    description: string;
    budget: number;
    raised: number;
    imageUrl: string;
  };
  onClose: () => void;
  onUpdate: (id: string, data: any) => void;
}

const ProjectDetailsModal = ({ project, onClose, onUpdate }: ProjectDetailsModalProps) => {
  const [editedData, setEditedData] = useState(project);
  const [activeTab, setActiveTab] = useState('overview');
  const [message, setMessage] = useState('');

  const tabs = ['overview', 'notes', 'timeline', 'documents', 'tasks'];

  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleSave = () => {
    onUpdate(project.id, editedData);
    onClose();
  };

  const progress = (editedData.raised / editedData.budget) * 100;
  const progressColor = progress <= 30 ? 'bg-red-500' : progress <= 70 ? 'bg-amber-500' : 'bg-green-500';

  return (
    <div 
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg w-[800px] h-[600px] flex flex-col"
        onClick={e => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">{editedData.name}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
          >
            ×
          </button>
        </div>

        {/* Details Section */}
        <div className="p-4 border-b">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Budget:</p>
              <p className="font-semibold">£{editedData.budget.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Raised:</p>
              <p className="font-semibold">£{editedData.raised.toLocaleString()}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-gray-600">Progress:</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div
                  className={`h-2 rounded-full ${progressColor}`}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-1">{progress.toFixed(0)}% complete</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 capitalize ${
                activeTab === tab
                  ? 'border-b-2 border-pink-500 text-pink-500 font-semibold'
                  : 'text-gray-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Chat Panel */}
          <div className="w-[300px] border-r bg-gray-50 flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* System Message */}
              <div className="bg-gray-200 rounded-lg p-3">
                <p className="text-sm text-gray-600">Project created on Mar 1</p>
                <p className="text-sm text-gray-600">Initial setup completed</p>
              </div>

              {/* Chat Messages */}
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-sm">Updated the project description and budget.</p>
                <p className="text-xs text-gray-600 mt-1">Sara • Mar 5</p>
              </div>

              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-sm">Added new impact metrics for tracking.</p>
                <p className="text-xs text-gray-600 mt-1">Mike • Mar 8</p>
              </div>
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 border rounded-lg text-sm"
                />
                <button className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white">
                  →
                </button>
              </div>
            </div>
          </div>

          {/* Edit Panel */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-6">
              <section>
                <h4 className="font-bold text-lg mb-2">Project Details</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Project Name
                    </label>
                    <input
                      type="text"
                      value={editedData.name}
                      onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={editedData.description}
                      onChange={(e) => setEditedData({ ...editedData, description: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
                      rows={4}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Budget
                      </label>
                      <input
                        type="number"
                        value={editedData.budget}
                        onChange={(e) => setEditedData({ ...editedData, budget: Number(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Amount Raised
                      </label>
                      <input
                        type="number"
                        value={editedData.raised}
                        onChange={(e) => setEditedData({ ...editedData, raised: Number(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Project Image
                    </label>
                    <div className="flex items-center space-x-4">
                      <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={editedData.imageUrl}
                          alt={editedData.name}
                          width={128}
                          height={128}
                          className="object-cover"
                        />
                      </div>
                      <input
                        type="text"
                        value={editedData.imageUrl}
                        onChange={(e) => setEditedData({ ...editedData, imageUrl: e.target.value })}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
                        placeholder="Image URL"
                      />
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsModal; 
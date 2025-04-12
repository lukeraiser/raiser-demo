'use client';

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, Pencil, Link } from 'lucide-react';
import { GrantCard } from '@/types/kanban';
import Image from 'next/image';

interface OpportunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  opportunity?: GrantCard;
  mode: 'view' | 'create' | 'edit';
  onSave?: (data: Partial<GrantCard>) => void;
}

export default function OpportunityModal({ isOpen, onClose, opportunity, mode, onSave }: OpportunityModalProps) {
  const [formData, setFormData] = useState<Partial<GrantCard>>(
    mode === 'create'
      ? {
          title: '',
          amount: 0,
          deadline: '',
          status: 'researching',
          description: '',
          eligibility: '',
          applicationDetails: '',
          logo: null,
        }
      : opportunity || {}
  );

  const [isEditing, setIsEditing] = useState(mode === 'create' || mode === 'edit');

  const handleInputChange = (field: keyof GrantCard, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave?.(formData);
    if (mode === 'edit') {
      setIsEditing(false);
    } else {
      onClose();
    }
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                <div className="absolute right-0 top-0 pr-4 pt-4 flex gap-2">
                  {mode === 'view' && (
                    <button
                      type="button"
                      className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                      onClick={() => setIsEditing(true)}
                    >
                      <Pencil className="h-6 w-6" aria-hidden="true" />
                    </button>
                  )}
                  <button
                    type="button"
                    className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 relative flex-shrink-0 bg-gray-100 rounded-lg flex items-center justify-center">
                      {formData.logo ? (
                        <Image
                          src={formData.logo}
                          alt={`${formData.title} logo`}
                          fill
                          className="object-contain p-1"
                          sizes="64px"
                        />
                      ) : (
                        <span className="text-gray-400 text-xl font-medium">
                          {formData.title?.split(' ').map(word => word[0]).join('').slice(0, 2).toUpperCase() || 'NEW'}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.title || ''}
                          onChange={(e) => handleInputChange('title', e.target.value)}
                          className="w-full text-2xl font-semibold text-gray-900 border-b border-gray-300 focus:border-pink-500 focus:outline-none"
                          placeholder="Enter funder name"
                        />
                      ) : (
                        <Dialog.Title as="h3" className="text-2xl font-semibold text-gray-900">
                          {formData.title}
                        </Dialog.Title>
                      )}
                      {isEditing ? (
                        <textarea
                          value={formData.description || ''}
                          onChange={(e) => handleInputChange('description', e.target.value)}
                          className="mt-1 w-full text-sm text-gray-500 border rounded-md p-2 focus:border-pink-500 focus:outline-none"
                          placeholder="Enter description"
                          rows={2}
                        />
                      ) : (
                        <p className="mt-1 text-sm text-gray-500">{formData.description}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-500">Amount</h4>
                      {isEditing ? (
                        <input
                          type="number"
                          value={formData.amount || ''}
                          onChange={(e) => handleInputChange('amount', e.target.value)}
                          className="mt-1 w-full text-lg font-semibold text-gray-900 bg-transparent focus:outline-none"
                          placeholder="Enter amount"
                        />
                      ) : (
                        <p className="mt-1 text-lg font-semibold text-gray-900">
                          £{Number(formData.amount).toLocaleString()}
                        </p>
                      )}
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-500">Deadline</h4>
                      {isEditing ? (
                        <input
                          type="date"
                          value={formData.deadline?.split('T')[0] || ''}
                          onChange={(e) => handleInputChange('deadline', e.target.value)}
                          className="mt-1 w-full text-lg font-semibold text-gray-900 bg-transparent focus:outline-none"
                        />
                      ) : (
                        <p className="mt-1 text-lg font-semibold text-gray-900">
                          {new Date(formData.deadline || '').toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-900">Eligibility Criteria</h4>
                    {isEditing ? (
                      <textarea
                        value={formData.eligibility || ''}
                        onChange={(e) => handleInputChange('eligibility', e.target.value)}
                        className="mt-2 w-full text-sm text-gray-600 border rounded-md p-2 focus:border-pink-500 focus:outline-none"
                        placeholder="Enter eligibility criteria"
                        rows={3}
                      />
                    ) : (
                      <p className="mt-2 text-sm text-gray-600">{formData.eligibility}</p>
                    )}
                  </div>

                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-900">Application Process</h4>
                    {isEditing ? (
                      <textarea
                        value={formData.applicationDetails || ''}
                        onChange={(e) => handleInputChange('applicationDetails', e.target.value)}
                        className="mt-2 w-full text-sm text-gray-600 border rounded-md p-2 focus:border-pink-500 focus:outline-none"
                        placeholder="Enter application details"
                        rows={3}
                      />
                    ) : (
                      <p className="mt-2 text-sm text-gray-600">{formData.applicationDetails}</p>
                    )}
                  </div>

                  <div className="mt-6">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm font-medium text-gray-900">Connected Projects</h4>
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                        onClick={() => {
                          // Implement project connection logic here
                        }}
                      >
                        <Link className="h-4 w-4" />
                        Connect Project
                      </button>
                    </div>
                    {opportunity?.projects?.length ? (
                      <div className="space-y-2">
                        {opportunity.projects.map(project => (
                          <div key={project.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                            <span className="text-sm font-medium text-gray-900">{project.title}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">No projects connected yet</p>
                    )}
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    {isEditing ? (
                      <>
                        <button
                          type="button"
                          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                          onClick={() => {
                            setIsEditing(false);
                            setFormData(opportunity || {});
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                          onClick={() => setIsEditing(false)}
                        >
                          <span className="sr-only">Close</span>
                          <X className="h-6 w-6" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                          onClick={handleSave}
                        >
                          <Pencil className="h-4 w-4" />
                          Save Changes
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                          onClick={onClose}
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          className="rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-500"
                        >
                          Move to Next Stage
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
} 
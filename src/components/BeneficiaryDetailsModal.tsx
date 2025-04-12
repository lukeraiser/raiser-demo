'use client';

import { useState } from 'react';
import BaseModal from './BaseModal';

interface BeneficiaryProfile {
  id: string;
  name: string;
  description: string;
  needs: string[];
  supportProvided: string[];
  imageUrl?: string;
  impactMetrics?: {
    name: string;
    value: number;
  };
}

interface BeneficiaryDetailsModalProps {
  beneficiary: BeneficiaryProfile | null;
  onClose: () => void;
  onSave: (beneficiary: BeneficiaryProfile) => void;
}

export default function BeneficiaryDetailsModal({ beneficiary, onClose, onSave }: BeneficiaryDetailsModalProps) {
  const [name, setName] = useState(beneficiary?.name || '');
  const [description, setDescription] = useState(beneficiary?.description || '');
  const [needs, setNeeds] = useState<string[]>(beneficiary?.needs || []);
  const [supportProvided, setSupportProvided] = useState<string[]>(beneficiary?.supportProvided || []);
  const [imageUrl, setImageUrl] = useState(beneficiary?.imageUrl || '');
  const [impactMetrics, setImpactMetrics] = useState(beneficiary?.impactMetrics || { name: '', value: 0 });
  const [newNeed, setNewNeed] = useState('');
  const [newSupport, setNewSupport] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: beneficiary?.id || Date.now().toString(),
      name,
      description,
      needs,
      supportProvided,
      imageUrl,
      impactMetrics
    });
  };

  const addNeed = () => {
    if (newNeed.trim() && !needs.includes(newNeed.trim())) {
      setNeeds([...needs, newNeed.trim()]);
      setNewNeed('');
    }
  };

  const removeNeed = (needToRemove: string) => {
    setNeeds(needs.filter(need => need !== needToRemove));
  };

  const addSupport = () => {
    if (newSupport.trim() && !supportProvided.includes(newSupport.trim())) {
      setSupportProvided([...supportProvided, newSupport.trim()]);
      setNewSupport('');
    }
  };

  const removeSupport = (supportToRemove: string) => {
    setSupportProvided(supportProvided.filter(support => support !== supportToRemove));
  };

  return (
    <BaseModal onClose={onClose}>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {beneficiary ? 'Edit Beneficiary Profile' : 'Add New Beneficiary Profile'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff65c3] focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff65c3] focus:border-transparent"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff65c3] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Key Needs</label>
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={newNeed}
                onChange={(e) => setNewNeed(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff65c3] focus:border-transparent"
                placeholder="Add a need..."
              />
              <button
                type="button"
                onClick={addNeed}
                className="px-4 py-2 bg-[#ff65c3] text-white rounded-lg hover:bg-opacity-90"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {needs.map((need, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  {need}
                  <button
                    type="button"
                    onClick={() => removeNeed(need)}
                    className="ml-1 text-gray-500 hover:text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Support Provided</label>
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={newSupport}
                onChange={(e) => setNewSupport(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff65c3] focus:border-transparent"
                placeholder="Add support provided..."
              />
              <button
                type="button"
                onClick={addSupport}
                className="px-4 py-2 bg-[#ff65c3] text-white rounded-lg hover:bg-opacity-90"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {supportProvided.map((support, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  {support}
                  <button
                    type="button"
                    onClick={() => removeSupport(support)}
                    className="ml-1 text-gray-500 hover:text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Impact Metrics</label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Metric Name</label>
              <input
                type="text"
                value={impactMetrics.name}
                onChange={(e) => setImpactMetrics({ ...impactMetrics, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff65c3] focus:border-transparent"
                placeholder="e.g., People Supported"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Value</label>
              <input
                type="number"
                value={impactMetrics.value}
                onChange={(e) => setImpactMetrics({ ...impactMetrics, value: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff65c3] focus:border-transparent"
                placeholder="0"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[#ff65c3] text-white rounded-lg hover:bg-opacity-90"
          >
            Save Profile
          </button>
        </div>
      </form>
    </BaseModal>
  );
} 
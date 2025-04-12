'use client';

import { useState } from 'react';
import BaseModal from './BaseModal';

interface MetricUpdate {
  id: string;
  date: string;
  source: string;
  value: number;
  notes: string;
}

interface Metric {
  id: string;
  title: string;
  target: string;
  value: string;
  period: string;
  lastUpdated: string;
  updates: MetricUpdate[];
}

interface MetricDetailsModalProps {
  metric: Metric | null;
  onClose: () => void;
  onUpdate: (metric: Metric) => void;
}

export default function MetricDetailsModal({ metric, onClose, onUpdate }: MetricDetailsModalProps) {
  const [title, setTitle] = useState(metric?.title || '');
  const [target, setTarget] = useState(metric?.target || '');
  const [value, setValue] = useState(metric?.value || '');
  const [period, setPeriod] = useState(metric?.period || '');
  const [newUpdate, setNewUpdate] = useState<MetricUpdate>({
    id: '',
    date: new Date().toISOString().split('T')[0],
    source: '',
    value: 0,
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({
      id: metric?.id || Date.now().toString(),
      title,
      target,
      value,
      period,
      lastUpdated: 'Today',
      updates: metric?.updates || []
    });
  };

  const handleAddUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (metric) {
      const updatedMetric = {
        ...metric,
        updates: [...metric.updates, { ...newUpdate, id: Date.now().toString() }],
        value: newUpdate.value.toString(),
        lastUpdated: 'Today'
      };
      onUpdate(updatedMetric);
      setNewUpdate({
        id: '',
        date: new Date().toISOString().split('T')[0],
        source: '',
        value: 0,
        notes: ''
      });
    }
  };

  return (
    <BaseModal onClose={onClose}>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {metric ? 'Edit Metric' : 'Add New Metric'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff65c3] focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Target</label>
          <input
            type="text"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff65c3] focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Current Value</label>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff65c3] focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Period</label>
          <input
            type="text"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff65c3] focus:border-transparent"
            required
          />
        </div>

        {metric && (
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Update History</h3>
            <div className="space-y-4">
              {metric.updates.map((update) => (
                <div key={update.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">{update.source}</p>
                      <p className="text-sm text-gray-500">{update.date}</p>
                    </div>
                    <p className="text-lg font-bold text-[#ff65c3]">{update.value}</p>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{update.notes}</p>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Add Update</h4>
              <form onSubmit={handleAddUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                  <input
                    type="text"
                    value={newUpdate.source}
                    onChange={(e) => setNewUpdate({ ...newUpdate, source: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff65c3] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                  <input
                    type="number"
                    value={newUpdate.value}
                    onChange={(e) => setNewUpdate({ ...newUpdate, value: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff65c3] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    value={newUpdate.notes}
                    onChange={(e) => setNewUpdate({ ...newUpdate, notes: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff65c3] focus:border-transparent"
                    rows={3}
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#ff65c3] text-white rounded-lg hover:bg-opacity-90"
                  >
                    Add Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

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
            Save Metric
          </button>
        </div>
      </form>
    </BaseModal>
  );
} 
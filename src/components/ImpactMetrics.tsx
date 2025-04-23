'use client';

import { useState } from 'react';

interface Metric {
  id: string;
  name: string;
  currentValue: number;
  targetValue: number;
  unit: string;
}

interface ImpactMetricsProps {
  metrics: Metric[];
  onUpdate: (id: string, data: any) => void;
}

export default function ImpactMetrics({ metrics, onUpdate }: ImpactMetricsProps) {
  const [editingMetric, setEditingMetric] = useState<string | null>(null);
  const [editedData, setEditedData] = useState<Partial<Metric>>({});

  const handleEdit = (metric: Metric) => {
    setEditingMetric(metric.id);
    setEditedData(metric);
  };

  const handleSave = (id: string) => {
    onUpdate(id, editedData);
    setEditingMetric(null);
  };

  const handleCancel = () => {
    setEditingMetric(null);
  };

  const categories = Array.from(new Set(metrics.map(m => m.name)));

  return (
    <div className="space-y-8">
      {categories.map(category => (
        <div key={category} className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">{category}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {metrics
              .filter(metric => metric.name === category)
              .map(metric => (
                <div key={metric.id} className="bg-white rounded-lg border border-gray-200 p-6">
                  {editingMetric === metric.id ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Name
                        </label>
                        <input
                          type="text"
                          value={editedData.name || ''}
                          onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Current Value
                        </label>
                        <input
                          type="number"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                          value={editedData.currentValue || ''}
                          onChange={(e) => setEditedData({ ...editedData, currentValue: Number(e.target.value) })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Target Value
                        </label>
                        <input
                          type="number"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                          value={editedData.targetValue || ''}
                          onChange={(e) => setEditedData({ ...editedData, targetValue: Number(e.target.value) })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Unit
                        </label>
                        <input
                          type="text"
                          value={editedData.unit || ''}
                          onChange={(e) => setEditedData({ ...editedData, unit: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={handleCancel}
                          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSave(metric.id)}
                          className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">{metric.name}</h4>
                        </div>
                        <button
                          onClick={() => handleEdit(metric)}
                          className="p-2 text-gray-400 hover:text-gray-500"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </button>
                      </div>
                      <div className="space-y-2">
                        <div className="text-right text-sm font-medium text-gray-900">
                          {((metric.currentValue / metric.targetValue) * 100).toFixed(0)}%
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-pink-500 h-2 rounded-full"
                            style={{ width: `${(metric.currentValue / metric.targetValue) * 100}%` }}
                          />
                        </div>
                        <div className="mt-2 flex justify-between text-sm text-gray-600">
                          <span>Current: {metric.currentValue.toLocaleString()} {metric.unit}</span>
                          <span>Target: {metric.targetValue.toLocaleString()} {metric.unit}</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
} 
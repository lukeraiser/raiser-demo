'use client';

import { useState } from 'react';
import BaseModal from './BaseModal';

interface ProjectUpdate {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  category: string;
  participantQuotes?: string[];
  attendance?: number;
  linkedMetrics?: {
    metricId: string;
    value: number;
  }[];
}

interface ProjectUpdateModalProps {
  update: ProjectUpdate | null;
  onClose: () => void;
  onSave: (update: ProjectUpdate) => void;
  availableMetrics: { id: string; title: string }[];
}

export default function ProjectUpdateModal({ update, onClose, onSave, availableMetrics }: ProjectUpdateModalProps) {
  const [title, setTitle] = useState(update?.title || '');
  const [content, setContent] = useState(update?.content || '');
  const [category, setCategory] = useState(update?.category || '');
  const [attendance, setAttendance] = useState(update?.attendance?.toString() || '');
  const [participantQuotes, setParticipantQuotes] = useState<string[]>(update?.participantQuotes || ['']);
  const [linkedMetrics, setLinkedMetrics] = useState<{ metricId: string; value: number }[]>(
    update?.linkedMetrics || []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: update?.id || Date.now().toString(),
      title,
      content,
      date: new Date().toISOString().split('T')[0],
      author: 'Demo User',
      category,
      attendance: attendance ? parseInt(attendance) : undefined,
      participantQuotes: participantQuotes.filter(quote => quote.trim() !== ''),
      linkedMetrics: linkedMetrics.filter(metric => metric.value > 0)
    });
  };

  const addParticipantQuote = () => {
    setParticipantQuotes([...participantQuotes, '']);
  };

  const removeParticipantQuote = (index: number) => {
    setParticipantQuotes(participantQuotes.filter((_, i) => i !== index));
  };

  const updateParticipantQuote = (index: number, value: string) => {
    const newQuotes = [...participantQuotes];
    newQuotes[index] = value;
    setParticipantQuotes(newQuotes);
  };

  const addLinkedMetric = () => {
    setLinkedMetrics([...linkedMetrics, { metricId: '', value: 0 }]);
  };

  const removeLinkedMetric = (index: number) => {
    setLinkedMetrics(linkedMetrics.filter((_, i) => i !== index));
  };

  const updateLinkedMetric = (index: number, field: 'metricId' | 'value', value: string | number) => {
    const newMetrics = [...linkedMetrics];
    newMetrics[index] = { ...newMetrics[index], [field]: value };
    setLinkedMetrics(newMetrics);
  };

  return (
    <BaseModal onClose={onClose}>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {update ? 'Edit Update' : 'Add New Update'}
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff65c3] focus:border-transparent"
            placeholder="e.g., Workshop, Training, Event"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Attendance</label>
          <input
            type="number"
            value={attendance}
            onChange={(e) => setAttendance(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff65c3] focus:border-transparent"
            placeholder="Number of participants"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Update Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff65c3] focus:border-transparent h-32"
            placeholder="Describe what happened in the session..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Participant Quotes</label>
          <div className="space-y-2">
            {participantQuotes.map((quote, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={quote}
                  onChange={(e) => updateParticipantQuote(index, e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff65c3] focus:border-transparent"
                  placeholder="Quote from a participant..."
                />
                <button
                  type="button"
                  onClick={() => removeParticipantQuote(index)}
                  className="text-gray-500 hover:text-red-500"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addParticipantQuote}
              className="text-sm text-[#ff65c3] hover:text-opacity-80"
            >
              + Add Quote
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Linked Metrics</label>
          <div className="space-y-2">
            {linkedMetrics.map((metric, index) => (
              <div key={index} className="flex gap-2">
                <select
                  value={metric.metricId}
                  onChange={(e) => updateLinkedMetric(index, 'metricId', e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff65c3] focus:border-transparent"
                >
                  <option value="">Select a metric</option>
                  {availableMetrics.map(m => (
                    <option key={m.id} value={m.id}>{m.title}</option>
                  ))}
                </select>
                <input
                  type="number"
                  value={metric.value}
                  onChange={(e) => updateLinkedMetric(index, 'value', parseInt(e.target.value))}
                  className="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff65c3] focus:border-transparent"
                  placeholder="Value"
                />
                <button
                  type="button"
                  onClick={() => removeLinkedMetric(index)}
                  className="text-gray-500 hover:text-red-500"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addLinkedMetric}
              className="text-sm text-[#ff65c3] hover:text-opacity-80"
            >
              + Link Metric
            </button>
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
            Save Update
          </button>
        </div>
      </form>
    </BaseModal>
  );
} 
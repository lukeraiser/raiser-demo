'use client';

import { useState } from 'react';
import BaseModal from './BaseModal';

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

interface ImpactStoryModalProps {
  story: ImpactStory | null;
  onClose: () => void;
  onSave: (story: ImpactStory) => void;
  availableMetrics: { id: string; title: string }[];
}

export default function ImpactStoryModal({ story, onClose, onSave, availableMetrics }: ImpactStoryModalProps) {
  const [title, setTitle] = useState(story?.title || '');
  const [summary, setSummary] = useState(story?.summary || '');
  const [content, setContent] = useState(story?.content || '');
  const [imageUrl, setImageUrl] = useState(story?.imageUrl || '');
  const [tags, setTags] = useState<string[]>(story?.tags || []);
  const [newTag, setNewTag] = useState('');
  const [beneficiaryQuotes, setBeneficiaryQuotes] = useState<string[]>(story?.beneficiaryQuotes || ['']);
  const [linkedMetrics, setLinkedMetrics] = useState<{ metricId: string; value: number }[]>(
    story?.linkedMetrics || []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: story?.id || Date.now().toString(),
      title,
      date: new Date().toISOString().split('T')[0],
      author: 'Demo User',
      summary,
      content,
      imageUrl,
      tags,
      beneficiaryQuotes: beneficiaryQuotes.filter(quote => quote.trim() !== ''),
      linkedMetrics: linkedMetrics.filter(metric => metric.value > 0)
    });
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const addBeneficiaryQuote = () => {
    setBeneficiaryQuotes([...beneficiaryQuotes, '']);
  };

  const removeBeneficiaryQuote = (index: number) => {
    setBeneficiaryQuotes(beneficiaryQuotes.filter((_, i) => i !== index));
  };

  const updateBeneficiaryQuote = (index: number, value: string) => {
    const newQuotes = [...beneficiaryQuotes];
    newQuotes[index] = value;
    setBeneficiaryQuotes(newQuotes);
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
        {story ? 'Edit Impact Story' : 'Create New Impact Story'}
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Summary</label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff65c3] focus:border-transparent"
            rows={3}
            placeholder="A brief summary of the impact story..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff65c3] focus:border-transparent"
            rows={8}
            placeholder="Tell the full story of impact..."
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
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff65c3] focus:border-transparent"
              placeholder="Add a tag..."
            />
            <button
              type="button"
              onClick={addTag}
              className="px-4 py-2 bg-[#ff65c3] text-white rounded-lg hover:bg-opacity-90"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Beneficiary Quotes</label>
          <div className="space-y-2">
            {beneficiaryQuotes.map((quote, index) => (
              <div key={index} className="flex gap-2">
                <textarea
                  value={quote}
                  onChange={(e) => updateBeneficiaryQuote(index, e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff65c3] focus:border-transparent"
                  rows={2}
                  placeholder="Quote from a beneficiary..."
                />
                <button
                  type="button"
                  onClick={() => removeBeneficiaryQuote(index)}
                  className="text-gray-500 hover:text-red-500"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addBeneficiaryQuote}
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
            Save Story
          </button>
        </div>
      </form>
    </BaseModal>
  );
} 
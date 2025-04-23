'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface OpportunityDetailsModalProps {
  opportunity: {
    title: string;
    amount: string;
    status: string;
    project: string;
    deadline: string;
    owner: string;
    addedDate: string;
    daysAgo: number;
    statusColor: string;
  };
  onClose: () => void;
}

const OpportunityDetailsModal = ({ opportunity, onClose }: OpportunityDetailsModalProps) => {
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
          <h2 className="text-xl font-bold text-gray-800">{opportunity.title}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
          >
            ×
          </button>
        </div>

        {/* Details Section */}
        <div className="p-4 border-b">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-sm text-gray-600">Amount:</div>
              <div className="font-semibold">{opportunity.amount}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Status:</div>
              <span className={`inline-block px-3 py-1 rounded-full text-sm ${opportunity.statusColor}`}>
                {opportunity.status}
              </span>
            </div>
            <div>
              <div className="text-sm text-gray-600">Project:</div>
              <div className="font-semibold">{opportunity.project}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Deadline:</div>
              <div>{opportunity.deadline}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Owner:</div>
              <div>{opportunity.owner}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Added:</div>
              <div>{opportunity.addedDate} ({opportunity.daysAgo} days ago)</div>
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
                <p className="text-sm text-gray-600">Application started by Sara on Mar 1</p>
                <p className="text-sm text-gray-600">Initial draft created from template</p>
              </div>

              {/* Chat Messages */}
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-sm">I've filled in the project background and budget sections. Still need to add impact metrics.</p>
                <p className="text-xs text-gray-600 mt-1">Sara • Mar 5</p>
              </div>

              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-sm">I've added some metrics from our previous garden project. Let me know if they work.</p>
                <p className="text-xs text-gray-600 mt-1">Mike • Mar 8</p>
              </div>

              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-sm">Perfect! I'll finalize the community support section by tomorrow.</p>
                <p className="text-xs text-gray-600 mt-1">Sara • Yesterday</p>
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

          {/* Document Panel */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">Green Initiative Grant Application</h3>
              <span className="text-sm text-gray-600">50% Complete</span>
            </div>

            <div className="space-y-6">
              <section>
                <h4 className="font-bold text-lg mb-2">1. Organisation Details</h4>
                <div className="space-y-1">
                  <p>Organisation Name: Greenfield Community Trust</p>
                  <p>Charity Number: 1234567</p>
                  <p>Contact Person: Sara Thompson</p>
                  <p>Email: sara@greenfieldtrust.org</p>
                </div>
              </section>

              <section>
                <h4 className="font-bold text-lg mb-2">2. Project Overview</h4>
                <p>
                  The Community Garden Expansion project aims to transform an unused 0.5 acre plot of land into a
                  productive community garden that will provide fresh produce for local food banks and educational
                  opportunities for local schools...
                </p>
              </section>

              <section>
                <h4 className="font-bold text-lg mb-2">3. Budget Breakdown</h4>
                <div className="space-y-1">
                  <p>Equipment and Materials: £12,500</p>
                  <p>Labor and Professional Services: £10,000</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunityDetailsModal; 
'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import GrantForm from '@/components/GrantForm';

interface Grant {
  id: string;
  title: string;
  amount: number;
  status: string;
  project: string;
  deadline?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  assignedTo?: string;
}

export default function GrantsPage() {
  const { user } = useUser();
  const [grants, setGrants] = useState<Grant[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchGrants();
  }, []);

  const fetchGrants = async () => {
    try {
      const response = await fetch('/api/grants');
      if (!response.ok) throw new Error('Failed to fetch grants');
      const data = await response.json();
      setGrants(data);
    } catch (error) {
      console.error('Error fetching grants:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData: any) => {
    try {
      const response = await fetch('/api/grants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to create grant');
      
      setShowForm(false);
      fetchGrants();
    } catch (error) {
      console.error('Error creating grant:', error);
    }
  };

  if (!user) return <div>Please sign in to view grants.</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Grant Applications</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
        >
          Add New Grant
        </button>
      </div>
      
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Grant</h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <GrantForm onSubmit={handleSubmit} />
          </div>
        </div>
      )}
      
      <div className="grid gap-4">
        {grants.map((grant) => (
          <div
            key={grant.id}
            className="bg-white p-6 rounded-lg shadow-sm border"
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold">{grant.title}</h2>
              <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                {grant.status}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Amount</p>
                <p className="font-semibold">£{grant.amount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Project</p>
                <p className="font-semibold">{grant.project}</p>
              </div>
              {grant.deadline && (
                <div>
                  <p className="text-sm text-gray-500">Deadline</p>
                  <p className="font-semibold">
                    {new Date(grant.deadline).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
            
            {grant.description && (
              <p className="text-gray-600 text-sm mb-4">{grant.description}</p>
            )}
            
            <div className="flex justify-end gap-2">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                Edit
              </button>
              <button className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
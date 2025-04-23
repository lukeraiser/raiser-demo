'use client';

import { useState } from 'react';

export default function OrganisationSettings() {
  const [orgName, setOrgName] = useState('Small But Mighty');
  const [orgEmail, setOrgEmail] = useState('contact@smallbutmighty.org');

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Organisation Settings</h1>
      
      <div className="space-y-6">
        <div>
          <label htmlFor="orgName" className="block text-sm font-medium text-gray-700">
            Organisation Name
          </label>
          <input
            type="text"
            id="orgName"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="orgEmail" className="block text-sm font-medium text-gray-700">
            Organisation Email
          </label>
          <input
            type="email"
            id="orgEmail"
            value={orgEmail}
            onChange={(e) => setOrgEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="bg-[#ff65c3] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
} 
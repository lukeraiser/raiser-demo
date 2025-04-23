'use client';

import { useState } from 'react';
import Link from 'next/link';

const GrantsPage = () => {
  const demoUser = {
    name: 'Demo User',
    email: 'demo@example.com',
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-3xl font-bold mb-8">Available Grants</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Example grant cards */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-2">Community Development Grant</h3>
          <p className="text-gray-600 mb-4">Supporting local community initiatives and social development projects.</p>
          <div className="flex justify-between items-center">
            <span className="text-pink-600 font-medium">£5,000 - £25,000</span>
            <Link href="/grants/1" className="text-blue-600 hover:underline">Learn More</Link>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-2">Environmental Innovation Fund</h3>
          <p className="text-gray-600 mb-4">For projects focused on sustainability and environmental protection.</p>
          <div className="flex justify-between items-center">
            <span className="text-pink-600 font-medium">£10,000 - £50,000</span>
            <Link href="/grants/2" className="text-blue-600 hover:underline">Learn More</Link>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-2">Youth Education Program</h3>
          <p className="text-gray-600 mb-4">Supporting educational initiatives for young people.</p>
          <div className="flex justify-between items-center">
            <span className="text-pink-600 font-medium">£2,500 - £15,000</span>
            <Link href="/grants/3" className="text-blue-600 hover:underline">Learn More</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrantsPage; 
'use client';

export default function BillingSettings() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Billing & Subscription</h1>

      {/* Current Plan */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Plan</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-medium text-gray-900">Raiser Basic Subscription</p>
            <p className="text-sm text-gray-500">£99/month</p>
          </div>
          <span className="px-3 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full">
            Active
          </span>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-500">Next billing date: March 1, 2024</p>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Method</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center">
              <span className="text-gray-500">VISA</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">•••• 4242</p>
              <p className="text-sm text-gray-500">Expires 12/25</p>
            </div>
          </div>
          <button className="text-sm text-pink-600 hover:text-pink-700">
            Update
          </button>
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Billing History</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="text-sm font-medium text-gray-900">Raiser Basic Subscription - February 2024</p>
              <p className="text-sm text-gray-500">Feb 1, 2024</p>
            </div>
            <p className="text-sm font-medium text-gray-900">£99.00</p>
          </div>
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="text-sm font-medium text-gray-900">Raiser Basic Subscription - January 2024</p>
              <p className="text-sm text-gray-500">Jan 1, 2024</p>
            </div>
            <p className="text-sm font-medium text-gray-900">£99.00</p>
          </div>
        </div>
      </div>
    </div>
  );
} 
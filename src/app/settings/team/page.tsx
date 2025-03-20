'use client';

export default function TeamSettings() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Team Management</h1>

      {/* Team Members */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Team Members</h2>
          <button className="px-4 py-2 bg-pink-600 text-white text-sm font-medium rounded-md hover:bg-pink-700">
            Invite Member
          </button>
        </div>

        <div className="space-y-4">
          {/* Team Member 1 */}
          <div className="flex items-center justify-between py-4 border-b">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">JD</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">John Doe</p>
                <p className="text-sm text-gray-500">john@example.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
                Admin
              </span>
              <button className="text-sm text-gray-500 hover:text-gray-700">
                Edit
              </button>
              <button className="text-sm text-red-600 hover:text-red-700">
                Remove
              </button>
            </div>
          </div>

          {/* Team Member 2 */}
          <div className="flex items-center justify-between py-4 border-b">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">AS</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Alice Smith</p>
                <p className="text-sm text-gray-500">alice@example.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="px-3 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full">
                Editor
              </span>
              <button className="text-sm text-gray-500 hover:text-gray-700">
                Edit
              </button>
              <button className="text-sm text-red-600 hover:text-red-700">
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Team Roles */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Team Roles</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="text-sm font-medium text-gray-900">Admin</p>
              <p className="text-sm text-gray-500">Full access to all features</p>
            </div>
            <button className="text-sm text-pink-600 hover:text-pink-700">
              Edit Permissions
            </button>
          </div>
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="text-sm font-medium text-gray-900">Editor</p>
              <p className="text-sm text-gray-500">Can edit content and manage opportunities</p>
            </div>
            <button className="text-sm text-pink-600 hover:text-pink-700">
              Edit Permissions
            </button>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm font-medium text-gray-900">Viewer</p>
              <p className="text-sm text-gray-500">Can only view content</p>
            </div>
            <button className="text-sm text-pink-600 hover:text-pink-700">
              Edit Permissions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 
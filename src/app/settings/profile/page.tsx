'use client';

import { useUser } from '@clerk/nextjs';
import Image from 'next/image';

export default function ProfileSettings() {
  const { user } = useUser();

  if (!user) return null;

  const handleSave = async () => {
    try {
      await user.update({
        firstName: (document.getElementById('firstName') as HTMLInputElement).value,
        lastName: (document.getElementById('lastName') as HTMLInputElement).value,
      });
      // Show success message
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  const handleAvatarUpload = async () => {
    try {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      
      input.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (!file) return;
        
        await user.setProfileImage({ file });
        await user.reload();
      };
      
      input.click();
    } catch (error) {
      console.error('Error uploading avatar:', error);
      alert('Failed to upload profile picture. Please try again.');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Profile Settings</h1>

      {/* Profile Section */}
      <div className="space-y-6">
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
            {user.imageUrl ? (
              <Image
                src={user.imageUrl}
                alt={user.fullName || 'Profile'}
                width={96}
                height={96}
              />
            ) : (
              <span className="text-3xl text-teal-400 font-medium">
                {user.firstName?.[0] || user.emailAddresses[0].emailAddress[0].toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{user.fullName}</h2>
            <p className="text-sm text-gray-500">{user.emailAddresses[0].emailAddress}</p>
            <button 
              onClick={handleAvatarUpload}
              className="mt-4 px-4 py-2 bg-pink-600 text-white text-sm font-medium rounded-md hover:bg-pink-700"
            >
              Change Profile Picture
            </button>
          </div>
        </div>

        {/* Personal Information */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                id="firstName"
                type="text"
                defaultValue={user.firstName || ''}
                className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 text-base"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                id="lastName"
                type="text"
                defaultValue={user.lastName || ''}
                className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 text-base"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                defaultValue={user.emailAddresses[0].emailAddress}
                className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 text-base"
                disabled
              />
            </div>
          </div>
        </div>

        {/* Access Settings */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Access Settings</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Access Level</label>
              <select className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 text-base">
                <option>Administrator</option>
                <option>Manager</option>
                <option>Editor</option>
                <option>Viewer</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Access</label>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="mobileApp"
                    type="checkbox"
                    className="h-5 w-5 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                  />
                  <label htmlFor="mobileApp" className="ml-3 block text-sm text-gray-900">
                    Enable mobile app access
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="mobileNotifications"
                    type="checkbox"
                    className="h-5 w-5 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                  />
                  <label htmlFor="mobileNotifications" className="ml-3 block text-sm text-gray-900">
                    Enable push notifications
                  </label>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Two-Factor Authentication</label>
              <div className="flex items-center">
                <input
                  id="twoFactor"
                  type="checkbox"
                  className="h-5 w-5 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                />
                <label htmlFor="twoFactor" className="ml-3 block text-sm text-gray-900">
                  Enable two-factor authentication for additional security
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button 
            onClick={handleSave}
            className="px-6 py-2 bg-pink-600 text-white text-sm font-medium rounded-md hover:bg-pink-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
} 
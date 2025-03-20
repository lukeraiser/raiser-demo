'use client';

import CharitySignupForm from '@/components/CharitySignupForm';

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-4xl mx-auto py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome to Raiser</h1>
          <p className="mt-2 text-lg text-gray-600">
            Let's get your charity set up on the platform
          </p>
        </div>
        
        <CharitySignupForm />
      </div>
    </div>
  );
} 
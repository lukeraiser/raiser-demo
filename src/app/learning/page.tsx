'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Course {
  id: string;
  title: string;
  description: string;
  modules: number;
  duration: string;
  progress: number;
  enrolledCount: number;
  imageUrl: string;
}

export default function LearningPage() {
  const [activeTab, setActiveTab] = useState('courses');
  const [searchQuery, setSearchQuery] = useState('');

  const currentCourse = {
    title: 'Fundraising Essentials',
    currentModule: 'Module 5: Grant Writing Techniques',
    progress: 67,
  };

  const recommendedCourses: Course[] = [
    {
      id: '1',
      title: 'Digital Marketing for Nonprofits',
      description: '8 modules • 3.5 hours',
      modules: 8,
      duration: '3.5 hours',
      progress: 30,
      enrolledCount: 132,
      imageUrl: '/images/digital-marketing.jpg'
    },
    {
      id: '2',
      title: 'Donor Retention Strategies',
      description: '6 modules • 2 hours',
      modules: 6,
      duration: '2 hours',
      progress: 0,
      enrolledCount: 98,
      imageUrl: '/images/donor-retention.jpg'
    },
    {
      id: '3',
      title: 'Grant Reporting Best Practices',
      description: '5 modules • 1.5 hours',
      modules: 5,
      duration: '1.5 hours',
      progress: 20,
      enrolledCount: 76,
      imageUrl: '/images/grant-reporting.jpg'
    },
    {
      id: '4',
      title: 'Impact Measurement',
      description: '7 modules • 2.5 hours',
      modules: 7,
      duration: '2.5 hours',
      progress: 0,
      enrolledCount: 105,
      imageUrl: '/images/impact-measurement.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Learning Dashboard</h1>
        
        <div className="flex gap-6">
          {/* Left Sidebar */}
          <div className="w-64 bg-white rounded-lg shadow-sm p-6">
            <div className="text-center mb-8">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg viewBox="0 0 120 120" className="w-full h-full">
                  <circle cx="60" cy="60" r="54" fill="none" stroke="#e0e0e0" strokeWidth="12"/>
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke="#FF69B4"
                    strokeWidth="12"
                    strokeDasharray={`${currentCourse.progress * 3.39} 339.292`}
                    transform="rotate(-90 60 60)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div>
                    <div className="text-2xl font-bold">{currentCourse.progress}%</div>
                    <div className="text-sm text-gray-500">Complete</div>
                  </div>
                </div>
              </div>
              <h3 className="font-bold text-gray-800">{currentCourse.title}</h3>
              <p className="text-sm text-gray-500">4 of 6 modules completed</p>
            </div>

            <nav className="space-y-4">
              <a href="#" className="block px-4 py-2 rounded-lg bg-pink-50 text-gray-800 font-medium">
                All Courses
              </a>
              <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-50">
                My Progress
              </a>
              <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-50">
                Community
              </a>
              <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-50">
                Resources
              </a>
              <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-50">
                Help & Support
              </a>
            </nav>

            <div className="mt-8 p-4 bg-white rounded-lg border border-gray-200">
              <h4 className="font-bold text-gray-800 mb-2">Need personalized help?</h4>
              <p className="text-sm text-gray-600 mb-4">Book a 1:1 coaching session</p>
              <button className="w-full bg-pink-500 text-white rounded-full px-4 py-2 hover:bg-pink-600">
                Book Session
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white rounded-lg shadow-sm">
            <div className="border-b border-gray-200">
              <div className="flex items-center px-6">
                <div className="flex space-x-6">
                  <button
                    onClick={() => setActiveTab('courses')}
                    className={`py-4 px-6 ${
                      activeTab === 'courses'
                        ? 'border-b-2 border-pink-500 text-pink-500 font-medium'
                        : 'text-gray-600'
                    }`}
                  >
                    Courses
                  </button>
                  <button
                    onClick={() => setActiveTab('discussions')}
                    className={`py-4 px-6 ${
                      activeTab === 'discussions'
                        ? 'border-b-2 border-pink-500 text-pink-500 font-medium'
                        : 'text-gray-600'
                    }`}
                  >
                    Discussions
                  </button>
                  <button
                    onClick={() => setActiveTab('events')}
                    className={`py-4 px-6 ${
                      activeTab === 'events'
                        ? 'border-b-2 border-pink-500 text-pink-500 font-medium'
                        : 'text-gray-600'
                    }`}
                  >
                    Events
                  </button>
                </div>
                <div className="ml-auto">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-8">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Continue Learning</h2>
                <div className="bg-gray-50 rounded-lg p-6 relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-pink-500 rounded-l-lg" />
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-800 mb-2">{currentCourse.title}</h3>
                      <p className="text-gray-600 mb-4">{currentCourse.currentModule}</p>
                      <div className="w-96 h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-teal-500 rounded-full"
                          style={{ width: `${currentCourse.progress}%` }}
                        />
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{currentCourse.progress}% Complete</p>
                    </div>
                    <button className="bg-pink-500 text-white rounded-full px-6 py-2 hover:bg-pink-600">
                      Resume
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-800 mb-4">Recommended For You</h2>
                <div className="grid grid-cols-2 gap-6">
                  {recommendedCourses.map((course) => (
                    <div key={course.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="h-48 bg-gray-100 relative">
                        {course.imageUrl && (
                          <Image
                            src={course.imageUrl}
                            alt={course.title}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-gray-800 mb-2">{course.title}</h3>
                        <p className="text-gray-600 mb-4">{course.description}</p>
                        <div className="w-full h-2 bg-gray-200 rounded-full mb-2">
                          <div
                            className="h-2 bg-teal-500 rounded-full"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            {course.enrolledCount} learners enrolled
                          </span>
                          <button className="text-pink-500 font-medium">
                            {course.progress > 0 ? 'Resume' : 'Start'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Community Chat */}
          <div className="w-64 bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-bold text-gray-800">Community Chat</h2>
            </div>
            <div className="p-4 space-y-4 h-[calc(100vh-12rem)] overflow-y-auto">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-800 mb-2">
                  Anyone have tips for corporate sponsorship proposals?
                </p>
                <p className="text-xs text-gray-500">Sarah T. • 10m ago</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-3 ml-4">
                <p className="text-sm text-gray-800 mb-2">
                  Focus on their business goals and how partnership benefits their brand!
                </p>
                <p className="text-xs text-gray-500">Mike L. • 5m ago</p>
              </div>
              {/* Add more chat messages here */}
            </div>
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <button className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center">
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
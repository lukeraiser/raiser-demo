'use client';

import { useState } from 'react';
import Header from '@/components/Header';

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  progress: number;
  duration: string;
  image: string;
  lessons: number;
}

interface SkillProgress {
  category: string;
  score: number;
  color: string;
  icon: string;
}

const skillProgress: SkillProgress[] = [
  {
    category: 'Fundraising',
    score: 85,
    color: 'bg-blue-500',
    icon: '💰'
  },
  {
    category: 'Governance',
    score: 70,
    color: 'bg-purple-500',
    icon: '⚖️'
  },
  {
    category: 'Grant Writing',
    score: 92,
    color: 'bg-green-500',
    icon: '✍️'
  },
  {
    category: 'Onboarding',
    score: 100,
    color: 'bg-pink-500',
    icon: '🎯'
  },
  {
    category: 'Marketing',
    score: 65,
    color: 'bg-yellow-500',
    icon: '📢'
  }
];

const courses: Course[] = [
  {
    id: '1',
    title: 'Mastering Grant Applications',
    description: 'Learn the art of writing compelling grant applications',
    category: 'Grant Writing',
    progress: 75,
    duration: '4 hours',
    image: 'https://images.unsplash.com/photo-1455849318743-b2233052fcff?q=80&w=300&h=200&fit=crop',
    lessons: 8
  },
  {
    id: '2',
    title: 'Nonprofit Governance Essentials',
    description: 'Understanding board responsibilities and best practices',
    category: 'Governance',
    progress: 30,
    duration: '3 hours',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=300&h=200&fit=crop',
    lessons: 6
  },
  {
    id: '3',
    title: 'Digital Marketing for Nonprofits',
    description: 'Boost your online presence and reach',
    category: 'Marketing',
    progress: 0,
    duration: '5 hours',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=300&h=200&fit=crop',
    lessons: 10
  },
  {
    id: '4',
    title: 'Donor Relations Mastery',
    description: 'Build and maintain strong donor relationships',
    category: 'Fundraising',
    progress: 90,
    duration: '6 hours',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=300&h=200&fit=crop',
    lessons: 12
  },
  {
    id: '5',
    title: 'Impact Measurement',
    description: 'Learn to measure and report your social impact',
    category: 'Governance',
    progress: 45,
    duration: '4 hours',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=300&h=200&fit=crop',
    lessons: 8
  },
  {
    id: '6',
    title: 'Team Onboarding Guide',
    description: 'Best practices for new team member onboarding',
    category: 'Onboarding',
    progress: 100,
    duration: '2 hours',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=300&h=200&fit=crop',
    lessons: 5
  }
];

export default function LearningHub() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);

  const categories = ['all', ...new Set(courses.map(course => course.category))];

  const calculateOverallProgress = () => {
    const completedLessons = courses.reduce((acc, course) => acc + (course.lessons * course.progress / 100), 0);
    const totalLessons = courses.reduce((acc, course) => acc + course.lessons, 0);
    return Math.round((completedLessons / totalLessons) * 100);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8 mt-16">
        {/* User Progress Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Your Learning Progress</h2>
              <p className="text-gray-600">Overall completion: {calculateOverallProgress()}%</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                <div className="relative group">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center border-2 border-white">
                    <span className="text-lg text-white">🏆</span>
                  </div>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Grant Writing Expert
                  </div>
                </div>
                <div className="relative group">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center border-2 border-white">
                    <span className="text-lg text-white">⭐</span>
                  </div>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Fundraising Master
                  </div>
                </div>
                <div className="relative group">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center border-2 border-white">
                    <span className="text-lg text-white">🎯</span>
                  </div>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Impact Reporting Pro
                  </div>
                </div>
              </div>
              <button className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
                View Certificates
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {skillProgress.map((skill) => (
              <div key={skill.category} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{skill.icon}</span>
                  <h3 className="font-medium text-gray-900">{skill.category}</h3>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${skill.color} transition-all duration-500`}
                    style={{ width: `${skill.score}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-1">{skill.score}% Mastered</p>
              </div>
            ))}
          </div>
        </div>

        {/* Course Filters */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-pink-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-40">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-xs font-medium text-gray-600">
                  {course.duration}
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-pink-600 bg-pink-50 px-2 py-1 rounded-full">
                    {course.category}
                  </span>
                  <span className="text-xs text-gray-500">{course.lessons} lessons</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{course.description}</p>
                <div className="mt-2">
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-1">
                    <span>{course.progress}% Complete</span>
                    <span>{Math.round(course.lessons * course.progress / 100)}/{course.lessons} Lessons</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-pink-600 transition-all duration-500"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
} 
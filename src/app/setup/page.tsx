'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import AIAssistant from '@/components/AIAssistant';
import ProjectCard from '@/components/ProjectCard';
import ImpactMetrics from '@/components/ImpactMetrics';

interface Version {
  id: string;
  content: string;
  timestamp: Date;
  isPublished: boolean;
}

interface Project {
  id: string;
  name: string;
  description: string;
  budget: number;
  raised: number;
  imageUrl: string;
}

interface ImpactMetric {
  id: string;
  title: string;
  description: string;
  currentValue: number;
  targetValue: number;
  unit: string;
  category: string;
}

const sidebarItems = [
  { id: 'organisation', label: 'Organisation Details', active: true },
  { id: 'mission', label: 'Mission & Vision' },
  { id: 'projects', label: 'Projects' },
  { id: 'impact', label: 'Impact Metrics' },
  { id: 'budget', label: 'Budget Information' },
  { id: 'media', label: 'Media Library' },
  { id: 'social', label: 'Social Updates' },
  { id: 'domain', label: 'Custom Domain' },
  { id: 'design', label: 'Design & Colors' },
  { id: 'publish', label: 'Publish Settings' },
];

export default function Setup() {
  const [activeSection, setActiveSection] = useState('organisation');
  const [missionStatement, setMissionStatement] = useState('');
  const [visionStatement, setVisionStatement] = useState('');
  const [missionVersions, setMissionVersions] = useState<Version[]>([
    {
      id: '1',
      content: 'To empower communities through sustainable development and education.',
      timestamp: new Date(),
      isPublished: true
    }
  ]);
  const [visionVersions, setVisionVersions] = useState<Version[]>([
    {
      id: '1',
      content: 'A world where every community thrives through education and opportunity.',
      timestamp: new Date(),
      isPublished: true
    }
  ]);
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'Core Costs',
      description: 'Essential operational costs to keep our organization running effectively.',
      budget: 40000,
      raised: 25000,
      imageUrl: '/images/core-costs.jpg'
    },
    {
      id: '2',
      name: 'Youth Club',
      description: 'Supporting young people through engaging activities and mentorship.',
      budget: 25000,
      raised: 12000,
      imageUrl: '/images/youth-club.jpg'
    },
    {
      id: '3',
      name: 'Community Sports Program',
      description: 'Promoting health and community engagement through sports activities.',
      budget: 33000,
      raised: 8000,
      imageUrl: '/images/sports.jpg'
    }
  ]);
  const [impactMetrics, setImpactMetrics] = useState<ImpactMetric[]>([
    {
      id: '1',
      title: 'People Supported',
      description: 'Number of individuals who have received support through our programs',
      currentValue: 150,
      targetValue: 200,
      unit: 'people',
      category: 'Community Impact'
    },
    {
      id: '2',
      title: 'Volunteer Hours',
      description: 'Total hours contributed by volunteers to our community projects',
      currentValue: 2500,
      targetValue: 3000,
      unit: 'hours',
      category: 'Community Impact'
    },
    {
      id: '3',
      title: 'Funds Raised',
      description: 'Total amount raised for community projects and initiatives',
      currentValue: 75000,
      targetValue: 100000,
      unit: '£',
      category: 'Financial Impact'
    },
    {
      id: '4',
      title: 'Program Success Rate',
      description: 'Percentage of program participants who achieve their goals',
      currentValue: 85,
      targetValue: 90,
      unit: '%',
      category: 'Program Impact'
    }
  ]);

  const handleAISuggestion = (suggestion: string) => {
    if (activeSection === 'mission') {
      setMissionStatement(suggestion);
    } else {
      setVisionStatement(suggestion);
    }
  };

  const saveVersion = (type: 'mission' | 'vision', content: string) => {
    const newVersion: Version = {
      id: Date.now().toString(),
      content,
      timestamp: new Date(),
      isPublished: false
    };

    if (type === 'mission') {
      setMissionVersions(prev => [...prev, newVersion]);
    } else {
      setVisionVersions(prev => [...prev, newVersion]);
    }
  };

  const publishVersion = (type: 'mission' | 'vision', versionId: string) => {
    if (type === 'mission') {
      setMissionVersions(prev => 
        prev.map(v => ({
          ...v,
          isPublished: v.id === versionId
        }))
      );
    } else {
      setVisionVersions(prev => 
        prev.map(v => ({
          ...v,
          isPublished: v.id === versionId
        }))
      );
    }
  };

  const handleProjectUpdate = (id: string, data: any) => {
    setProjects(prev => prev.map(project => 
      project.id === id ? { ...project, ...data } : project
    ));
  };

  const handleImpactMetricUpdate = (id: string, data: any) => {
    setImpactMetrics(prev => prev.map(metric => 
      metric.id === id ? { ...metric, ...data } : metric
    ));
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'organisation':
        return (
          <>
            <h2 className="text-xl font-bold text-gray-900 mb-8">Organisation Details</h2>
            <div className="space-y-6">
              {/* Charity Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Charity Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Enter charity name"
                />
              </div>

              {/* Charity Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Charity Number
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Enter charity number"
                />
              </div>

              {/* Logo Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Charity Logo
                </label>
                <div className="flex gap-4">
                  <div className="w-48 h-48 bg-gray-100 rounded-md flex items-center justify-center">
                    <span className="text-gray-500">Current Logo</span>
                  </div>
                  <div className="w-48 h-48 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center">
                    <span className="text-gray-500 mb-2">Drop a new file here</span>
                    <span className="text-gray-500 mb-2">or</span>
                    <button className="px-4 py-2 bg-teal-400 text-white rounded-md hover:bg-teal-500">
                      Browse Files
                    </button>
                  </div>
                </div>
              </div>

              {/* Tagline */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tagline
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Enter tagline"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Short Description (max 200 characters)
                </label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
                  rows={4}
                  placeholder="Enter description"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button className="px-6 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 font-semibold">
                  Save
                </button>
                <button className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                  Cancel
                </button>
              </div>
            </div>
          </>
        );

      case 'mission':
        return (
          <>
            <h2 className="text-xl font-bold text-gray-900 mb-8">Mission & Vision</h2>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-8">
                {/* Mission Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700">
                      Mission Statement
                    </label>
                    <span className="text-sm text-green-600">Currently Published</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-gray-700">
                      {missionVersions.find(v => v.isPublished)?.content || 'No published version yet'}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <textarea
                      value={missionStatement}
                      onChange={(e) => setMissionStatement(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
                      rows={4}
                      placeholder="Draft your mission statement..."
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => saveVersion('mission', missionStatement)}
                        className="px-4 py-2 bg-teal-400 text-white rounded-md hover:bg-teal-500"
                      >
                        Save Draft
                      </button>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Version History</h3>
                    <div className="space-y-2">
                      {missionVersions.map(version => (
                        <div
                          key={version.id}
                          className="flex items-start justify-between p-3 bg-gray-50 rounded-md"
                        >
                          <div className="flex-1">
                            <p className="text-sm text-gray-700">{version.content}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {version.timestamp.toLocaleString()}
                            </p>
                          </div>
                          {!version.isPublished && (
                            <button
                              onClick={() => publishVersion('mission', version.id)}
                              className="ml-2 px-3 py-1 text-sm bg-pink-500 text-white rounded-md hover:bg-pink-600"
                            >
                              Publish
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Vision Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700">
                      Vision Statement
                    </label>
                    <span className="text-sm text-green-600">Currently Published</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-gray-700">
                      {visionVersions.find(v => v.isPublished)?.content || 'No published version yet'}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <textarea
                      value={visionStatement}
                      onChange={(e) => setVisionStatement(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
                      rows={4}
                      placeholder="Draft your vision statement..."
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => saveVersion('vision', visionStatement)}
                        className="px-4 py-2 bg-teal-400 text-white rounded-md hover:bg-teal-500"
                      >
                        Save Draft
                      </button>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Version History</h3>
                    <div className="space-y-2">
                      {visionVersions.map(version => (
                        <div
                          key={version.id}
                          className="flex items-start justify-between p-3 bg-gray-50 rounded-md"
                        >
                          <div className="flex-1">
                            <p className="text-sm text-gray-700">{version.content}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {version.timestamp.toLocaleString()}
                            </p>
                          </div>
                          {!version.isPublished && (
                            <button
                              onClick={() => publishVersion('vision', version.id)}
                              className="ml-2 px-3 py-1 text-sm bg-pink-500 text-white rounded-md hover:bg-pink-600"
                            >
                              Publish
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-[600px]">
                <AIAssistant onSuggestionSelect={handleAISuggestion} />
              </div>
            </div>
          </>
        );

      case 'projects':
        return (
          <>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-gray-900">Projects</h2>
              <button className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600">
                Add New Project
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map(project => (
                <ProjectCard
                  key={project.id}
                  {...project}
                  onUpdate={handleProjectUpdate}
                />
              ))}
            </div>
          </>
        );

      case 'impact':
        return (
          <>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-gray-900">Impact Metrics</h2>
              <button className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600">
                Add New Metric
              </button>
            </div>
            <ImpactMetrics
              metrics={impactMetrics}
              onUpdate={handleImpactMetricUpdate}
            />
          </>
        );

      default:
        return (
          <div className="text-center text-gray-500 py-8">
            Select a section from the sidebar to get started
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="p-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Public Profile Setup</h1>
          <button className="px-6 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600">
            Preview Public Page
          </button>
        </div>

        {/* Main Content */}
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-56 flex-shrink-0">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full px-4 py-3 text-left text-sm ${
                    activeSection === item.id
                      ? 'bg-pink-500 text-white font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-grow bg-white rounded-lg border border-gray-200 p-8">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
} 
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import ProjectDetailsModal from '@/components/ProjectDetailsModal';
import LeftNavbar from '@/components/LeftNavbar';

interface Project {
  id: string;
  title: string;
  description: string;
  budget: number;
  raised: number;
  imageUrl: string;
  status: string;
}

const OrganisationPage = () => {
  const [activeSection, setActiveSection] = useState('details');
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [missionStatement, setMissionStatement] = useState('');
  const [visionStatement, setVisionStatement] = useState('');
  const [missionVersions, setMissionVersions] = useState([
    {
      id: '1',
      content: 'Small But Mighty empowers the citizens of Smallville to be everyday heroes in their community. Through grassroots initiatives and local journalism mentorship supported by our patron Clark Kent of the Daily Planet, we foster strength, courage, and truth in our next generation of community leaders.',
      timestamp: new Date(),
      isPublished: true
    }
  ]);
  const [visionVersions, setVisionVersions] = useState([
    {
      id: '1',
      content: 'We envision Smallville as a beacon of hope where every citizen, no matter how ordinary they may seem, has the power to make an extraordinary difference. Just as our town has shown that heroes can come from anywhere, we believe in nurturing the superhuman potential within every community member.',
      timestamp: new Date(),
      isPublished: true
    }
  ]);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        if (!response.ok) throw new Error('Failed to fetch projects');
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleAISuggestion = (suggestion: string) => {
    if (activeSection === 'mission') {
      setMissionStatement(suggestion);
    } else {
      setVisionStatement(suggestion);
    }
  };

  const saveVersion = (type: 'mission' | 'vision', content: string) => {
    const newVersion = {
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

  const navigationItems = [
    { id: 'details', label: 'Overview', path: '/organisation' },
    { id: 'mission', label: 'Mission & Vision', path: '/organisation?section=mission' },
    { id: 'projects', label: 'Projects', path: '/organisation?section=projects' },
    { id: 'budget', label: 'Budget Information', path: '/organisation?section=budget' }
  ];


  const renderMissionVision = () => (
    <div className="space-y-8">
      <div className="space-y-6">
        {/* Mission Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Mission Statement</h3>
            <span className="text-sm text-green-600">Currently Published</span>
          </div>
          <div className="bg-gray-50 p-4 rounded-md mb-4">
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
                className="px-4 py-2 bg-[#ff65c3] text-white rounded-md hover:bg-opacity-90"
              >
                Save Draft
              </button>
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Vision Statement</h3>
            <span className="text-sm text-green-600">Currently Published</span>
          </div>
          <div className="bg-gray-50 p-4 rounded-md mb-4">
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
                className="px-4 py-2 bg-[#ff65c3] text-white rounded-md hover:bg-opacity-90"
              >
                Save Draft
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBasicDetails = () => (
    <div className="space-y-4">
      <div className="relative bg-white p-4 rounded-lg shadow-sm group">
        <button 
          onClick={() => setActiveSection('mission')}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-gray-100 rounded-full hover:bg-gray-200"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 relative">
            <Image
              src="/images/smb-logo.png"
              alt="Small But Mighty Logo"
              width={80}
              height={80}
              priority
              className="object-contain"
            />
          </div>
          <h3 className="text-2xl font-semibold text-[#545454]">Small But Mighty</h3>
        </div>
      </div>

      <div className="relative bg-white p-4 rounded-lg shadow-sm group">
        <button 
          onClick={() => setActiveSection('mission')}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-gray-100 rounded-full hover:bg-gray-200"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Mission & Vision</h4>
            <p className="mt-1 text-gray-900 line-clamp-2">Small But Mighty empowers the citizens of Smallville to be everyday heroes in their community...</p>
            <Link href="/organisation?section=mission" className="text-[#ff65c3] text-sm font-medium hover:underline mt-1 inline-block">
              Read More
            </Link>
          </div>
        </div>
      </div>

      <div className="relative bg-white p-4 rounded-lg shadow-sm group">
        <button 
          onClick={() => setActiveSection('projects')}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-gray-100 rounded-full hover:bg-gray-200"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
        <h4 className="text-sm font-medium text-gray-500 mb-3">Projects</h4>
        <div className="grid grid-cols-3 gap-4">
          {projects.map((project) => (
            <div key={project.id} className="bg-gray-50 rounded-lg overflow-hidden relative group">
              <div className="aspect-video relative">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <button 
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => setEditingProject(project)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2">{project.title}</h3>
                <p className="text-sm text-gray-600">{project.description}</p>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{Math.round((project.raised / project.budget) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#ff65c3] h-2 rounded-full"
                      style={{ width: `${(project.raised / project.budget) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span>£{project.raised.toLocaleString()}</span>
                    <span>£{project.budget.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-16">
        <LeftNavbar
          title="About Organisation"
          items={navigationItems}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        {/* Main Content */}
        <main className="ml-64 min-h-[calc(100vh-64px)]">
          <div className="p-8 max-w-[1200px] mx-auto">
            {activeSection === 'details' && renderBasicDetails()}
            {activeSection === 'mission' && renderMissionVision()}
            {activeSection === 'projects' && (
              <div>
                <div className="grid grid-cols-3 gap-4">
                  {projects.map((project) => (
                    <div key={project.id} className="bg-gray-50 rounded-lg overflow-hidden relative group">
                      <div className="aspect-video relative">
                        <Image
                          src={project.imageUrl}
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <button 
                          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => setEditingProject(project)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </button>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-2">{project.title}</h3>
                        <p className="text-sm text-gray-600">{project.description}</p>
                        <div className="mt-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{Math.round((project.raised / project.budget) * 100)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-[#ff65c3] h-2 rounded-full"
                              style={{ width: `${(project.raised / project.budget) * 100}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-sm mt-1">
                            <span>£{project.raised.toLocaleString()}</span>
                            <span>£{project.budget.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Add New Project Button */}
                  <button 
                    onClick={() => setEditingProject({ id: 'new', title: '', description: '', budget: 0, raised: 0, imageUrl: '', status: 'active' })}
                    className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center aspect-[4/3] hover:border-pink-500 hover:bg-pink-50 transition-colors"
                  >
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-gray-600">Add New Project</span>
                    </div>
                  </button>
                </div>

                {editingProject && (
                  <ProjectDetailsModal
                    project={editingProject}
                    onClose={() => setEditingProject(null)}
                    onUpdate={async (updatedProject) => {
                      try {
                        if (updatedProject.id === 'new') {
                          const response = await fetch('/api/projects', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(updatedProject),
                          });
                          if (!response.ok) throw new Error('Failed to create project');
                          const newProject = await response.json();
                          setProjects(prev => [...prev, newProject]);
                        } else {
                          // Handle update logic here
                          setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
                        }
                        setEditingProject(null);
                      } catch (error) {
                        console.error('Error updating project:', error);
                      }
                    }}
                  />
                )}
              </div>
            )}
            {activeSection === 'budget' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">Budget Management</h2>
                  <button 
                    onClick={() => window.open('/templates/budget_template.xlsx')}
                    className="text-pink-600 hover:text-pink-700 text-sm flex items-center"
                  >
                    Download Template
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Excel Import */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-pink-500 transition-colors">
                    <input
                      type="file"
                      accept=".xlsx,.xls"
                      className="hidden"
                      id="excel-upload"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          // Handle Excel import
                        }
                      }}
                    />
                    <label 
                      htmlFor="excel-upload"
                      className="flex flex-col items-center justify-center cursor-pointer"
                    >
                      <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-600">Upload Excel File</span>
                      <span className="text-xs text-gray-500 mt-1">Drag and drop or click to select</span>
                    </label>
                  </div>

                  {/* Google Sheets Import */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-pink-500 transition-colors">
                    <button 
                      className="w-full h-full flex flex-col items-center justify-center"
                      onClick={() => {
                        // Handle Google Sheets import
                      }}
                    >
                      <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-600">Import from Google Sheets</span>
                      <span className="text-xs text-gray-500 mt-1">Connect your Google account</span>
                    </button>
                  </div>
                </div>

                {/* Budget Preview Section */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Budget</h3>
                  <div className="bg-white rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between px-6 py-4 border-b">
                      <div className="flex items-center space-x-2">
                        <h2 className="text-xl font-semibold text-gray-900">Small But Mighty</h2>
                        <span className="text-gray-500">·</span>
                        <span className="text-gray-600">Budget 2025</span>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Income Categories</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-pink-50">
                              <div className="flex items-center space-x-1">
                                <span>Support Costs</span>
                                <Link href="/organisation?section=projects&id=core-costs">
                                  <svg className="w-4 h-4 text-gray-400 hover:text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                  </svg>
                                </Link>
                              </div>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-blue-50">
                              <div className="flex items-center space-x-1">
                                <span>Fundraising</span>
                                <Link href="/organisation?section=projects&id=fundraising">
                                  <svg className="w-4 h-4 text-gray-400 hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                  </svg>
                                </Link>
                              </div>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-green-50">
                              <div className="flex items-center space-x-1">
                                <span>Youth Club</span>
                                <Link href="/organisation?section=projects&id=youth-club">
                                  <svg className="w-4 h-4 text-gray-400 hover:text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                  </svg>
                                </Link>
                              </div>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-green-50">
                              <div className="flex items-center space-x-1">
                                <span>Community Sports</span>
                                <Link href="/organisation?section=projects&id=sports">
                                  <svg className="w-4 h-4 text-gray-400 hover:text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                  </svg>
                                </Link>
                              </div>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100">Total</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {/* Income Section */}
                          <tr className="font-semibold bg-pink-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900" colSpan={6}>INCOME</td>
                          </tr>
                          <tr className="font-semibold bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Income from Trading</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£0</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 pl-10 whitespace-nowrap text-sm text-gray-600">Ticket sales</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">£0</td>
                          </tr>
                          <tr className="font-semibold bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Donations</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£35,000</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£35,000</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 pl-10 whitespace-nowrap text-sm text-gray-600">Grants</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">£35,000</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">£35,000</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 pl-10 whitespace-nowrap text-sm text-gray-600">Sponsorship</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">£0</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 pl-10 whitespace-nowrap text-sm text-gray-600">Fundraising Events</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">£0</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 pl-10 whitespace-nowrap text-sm text-gray-600">Individual Donations</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">£0</td>
                          </tr>
                          <tr className="font-semibold bg-gray-100">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Total Income</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£35,000</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£35,000</td>
                          </tr>
                          
                          {/* Expenditure Section */}
                          <tr className="font-semibold bg-blue-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900" colSpan={6}>EXPENDITURE</td>
                          </tr>
                          <tr className="font-semibold bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Charity Management & Administration</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£12,000</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£12,000</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 pl-10 whitespace-nowrap text-sm text-gray-600">Web & Software Costs</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">£5,000</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">£5,000</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 pl-10 whitespace-nowrap text-sm text-gray-600">Trustee meeting expenses</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">£3,000</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">£3,000</td>
                          </tr>
                          <tr className="font-semibold bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Staff Costs</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£15,000</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£15,000</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 pl-10 whitespace-nowrap text-sm text-gray-600">Staff Salaries and Wages</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">£12,000</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">£12,000</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 pl-10 whitespace-nowrap text-sm text-gray-600">Staff Training & Recruitment</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">£3,000</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">£3,000</td>
                          </tr>
                          <tr className="font-semibold bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Volunteer Expenses</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£8,000</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£8,000</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 pl-10 whitespace-nowrap text-sm text-gray-600">Volunteer Training</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">£5,000</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">£5,000</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 pl-10 whitespace-nowrap text-sm text-gray-600">Volunteer Travel</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">£3,000</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">£3,000</td>
                          </tr>
                          <tr className="font-semibold bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Fundraising Costs</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£2,000</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£2,000</td>
                          </tr>
                          <tr className="font-semibold bg-gray-100">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Total Expenditure</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£35,000</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£0</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£35,000</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default OrganisationPage;
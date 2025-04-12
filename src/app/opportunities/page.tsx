'use client';

import { useEffect, useState } from 'react';
import Board from '@/components/kanban/Board';
import { Column, GrantCard, DatabaseGrant, GrantStatus, Project } from '@/types/kanban';
import Header from '@/components/Header';
import LeftNavbar from '@/components/LeftNavbar';
import OpportunityModal from '@/components/kanban/OpportunityModal';
import ApplicationsWorkspace from '@/components/ApplicationsWorkspace';
import { Plus, MessageSquare, CheckCircle2, Clock, Pencil, Building2, Star, Filter, Search, PlusCircle } from 'lucide-react';

const initialColumns: Column[] = [
  {
    id: 'researching',
    title: 'Researching',
    type: 'researching',
    cards: []
  },
  {
    id: 'eligible',
    title: 'Eligible',
    type: 'eligible',
    cards: []
  },
  {
    id: 'drafting',
    title: 'Drafting',
    type: 'drafting',
    cards: []
  },
  {
    id: 'applied',
    title: 'Applied',
    type: 'applied',
    cards: []
  },
  {
    id: 'successful',
    title: 'Successful',
    type: 'successful',
    cards: []
  },
  {
    id: 'unsuccessful',
    title: 'Unsuccessful',
    type: 'unsuccessful',
    cards: []
  }
];

type ActiveView = 'pipeline' | 'applications' | 'funders';

export default function OpportunitiesPage() {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeView, setActiveView] = useState<ActiveView>('pipeline');
  const [selectedGrant, setSelectedGrant] = useState<GrantCard | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [starredFunders, setStarredFunders] = useState<Set<string>>(new Set());
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [showRequestModal, setShowRequestModal] = useState(false);

  // Calculate metrics from grants
  const calculateMetrics = (grants: GrantCard[]) => {
    return {
      successful: {
        count: grants.filter(g => g.status === 'successful').length,
        value: grants.filter(g => g.status === 'successful')
          .reduce((sum, g) => sum + g.amount, 0)
      },
      pending: {
        count: grants.filter(g => g.status === 'applied').length,
        value: grants.filter(g => g.status === 'applied')
          .reduce((sum, g) => sum + g.amount, 0)
      },
      drafting: {
        count: grants.filter(g => g.status === 'drafting').length,
        value: grants.filter(g => g.status === 'drafting')
          .reduce((sum, g) => sum + g.amount, 0)
      }
    };
  };

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch grants
        const grantsResponse = await fetch('/api/grants');
        const grants: DatabaseGrant[] = await grantsResponse.json();
        
        // Fetch projects
        const projectsResponse = await fetch('/api/projects');
        const fetchedProjects: Project[] = await projectsResponse.json();
        setProjects(fetchedProjects);

        if (!Array.isArray(grants)) {
          console.error('Expected grants to be an array but got:', typeof grants);
          return;
        }

        // Map the grants to their respective columns
        const updatedColumns = initialColumns.map(column => ({
          ...column,
          cards: grants
            .filter(grant => grant.status === column.type)
            .map(grant => ({
              id: grant.id,
              title: grant.title,
              amount: grant.amount,
              deadline: grant.deadline || 'No deadline',
              status: grant.status as GrantStatus,
              description: grant.description || '',
              eligibility: grant.eligibility || '',
              applicationDetails: grant.applicationDetails || '',
              logo: grant.logo,
              projects: grant.projects || []
            }))
        }));

        setColumns(updatedColumns);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    }

    fetchData();
  }, []);

  const handleStartApplication = (grant: GrantCard) => {
    setSelectedGrant(grant);
    setActiveView('applications');
  };

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
  };

  const handleGrantSelect = (grant: GrantCard) => {
    setSelectedGrant(grant);
  };

  // Get all available grants from the columns
  const availableGrants = columns.flatMap(column => column.cards);

  const metrics = calculateMetrics(availableGrants);

  // Extract unique funders from grants
  const funders = Array.from(
    new Set(availableGrants.map(grant => grant.title)),
    title => {
      const grantsForFunder = availableGrants.filter(g => g.title === title);
      const firstGrant = grantsForFunder[0];
      return {
        name: title,
        logo: firstGrant.logo,
        description: firstGrant.description,
        eligibility: firstGrant.eligibility,
        totalFunding: grantsForFunder.reduce((sum, g) => sum + g.amount, 0),
        successRate: Math.round(
          (grantsForFunder.filter(g => g.status === 'successful').length /
            grantsForFunder.length) * 100
        ) || 0,
        applicationProcess: firstGrant.applicationDetails
      };
    }
  );

  const handleStarFunder = (funderName: string) => {
    setStarredFunders(prev => {
      const newStarred = new Set(prev);
      if (newStarred.has(funderName)) {
        newStarred.delete(funderName);
      } else {
        newStarred.add(funderName);
      }
      return newStarred;
    });

    // If starring, automatically add to researching column
    if (!starredFunders.has(funderName)) {
      const funder = funders.find(f => f.name === funderName);
      if (funder) {
        const newGrant: GrantCard = {
          id: `new-${Date.now()}`,
          title: funder.name,
          amount: funder.totalFunding,
          status: 'researching',
          deadline: '',
          description: funder.description,
          eligibility: funder.eligibility,
          applicationDetails: funder.applicationProcess,
          logo: funder.logo,
          projects: []
        };

        const updatedColumns = columns.map(column => {
          if (column.type === 'researching') {
            return {
              ...column,
              cards: [...column.cards, newGrant]
            };
          }
          return column;
        });
        setColumns(updatedColumns);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-16">
        {/* Sidebar */}
        <div className="fixed top-16 left-0 w-64 h-[calc(100vh-64px)] bg-white border-r border-gray-200">
          <div className="p-4">
            <div className="bg-[#ff65c3] text-white rounded-t-lg px-4 py-3">
              <h2 className="font-bold text-center text-white">Opportunities</h2>
            </div>
            <nav className="space-y-1 border border-gray-200 rounded-b-lg p-2">
              <button
                onClick={() => setActiveView('pipeline')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeView === 'pipeline'
                    ? 'bg-pink-50 text-pink-600'
                    : 'text-gray-600 hover:bg-gray-50'
                } font-medium flex items-center gap-2`}
              >
                <span className="text-lg">📊</span>
                Pipeline
              </button>
              <button
                onClick={() => setActiveView('applications')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeView === 'applications'
                    ? 'bg-pink-50 text-pink-600'
                    : 'text-gray-600 hover:bg-gray-50'
                } font-medium flex items-center gap-2`}
              >
                <span className="text-lg">✍️</span>
                Applications
              </button>
              <button
                onClick={() => setActiveView('funders')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeView === 'funders'
                    ? 'bg-pink-50 text-pink-600'
                    : 'text-gray-600 hover:bg-gray-50'
                } font-medium flex items-center gap-2`}
              >
                <Building2 className="w-5 h-5" />
                Funders
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="ml-64">
          {activeView === 'pipeline' ? (
            <div className="p-6">
              {/* Header Section */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">Opportunity Pipeline</h1>
                  <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#ff65c3] text-white rounded-lg hover:bg-opacity-90"
                  >
                    <Plus className="w-5 h-5" />
                    Add Opportunity
                  </button>
                </div>
                <p className="text-gray-600">
                  Track and manage your funding opportunities through each stage of the application process.
                </p>

                {/* Metrics Overview */}
                <div className="grid grid-cols-3 gap-6 mt-6">
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-green-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Successful Grants</p>
                        <h3 className="text-2xl font-bold text-green-600 mt-1">
                          £{metrics.successful.value.toLocaleString()}
                        </h3>
                      </div>
                      <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      {metrics.successful.count} successful {metrics.successful.count === 1 ? 'application' : 'applications'}
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-6 shadow-sm border border-blue-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Pending Applications</p>
                        <h3 className="text-2xl font-bold text-blue-600 mt-1">
                          £{metrics.pending.value.toLocaleString()}
                        </h3>
                      </div>
                      <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                        <Clock className="w-6 h-6 text-blue-500" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      {metrics.pending.count} pending {metrics.pending.count === 1 ? 'application' : 'applications'}
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-6 shadow-sm border border-purple-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">In Draft</p>
                        <h3 className="text-2xl font-bold text-purple-600 mt-1">
                          £{metrics.drafting.value.toLocaleString()}
                        </h3>
                      </div>
                      <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center">
                        <Pencil className="w-6 h-6 text-purple-500" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      {metrics.drafting.count} {metrics.drafting.count === 1 ? 'opportunity' : 'opportunities'} in progress
                    </p>
                  </div>
                </div>
              </div>

              {/* Board Section */}
              <Board 
                initialColumns={columns}
                onColumnsChange={setColumns}
                onStartApplication={handleStartApplication}
              />
            </div>
          ) : activeView === 'applications' ? (
            <div className="p-6">
              <ApplicationsWorkspace
                selectedGrant={selectedGrant}
                projects={projects}
                onProjectSelect={handleProjectSelect}
                onGrantSelect={handleGrantSelect}
                availableGrants={availableGrants}
              />
            </div>
          ) : (
            <div className="p-6">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Find Funders</h1>
                <p className="text-gray-600">
                  Discover funding opportunities that match your cause and add them to your pipeline.
                </p>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b">
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border shadow-sm flex-1">
                  <Search className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search funders..."
                    className="flex-1 border-0 focus:ring-0 text-sm"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveFilter('all')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      activeFilter === 'all'
                        ? 'bg-pink-50 text-pink-600'
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setActiveFilter('small')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      activeFilter === 'small'
                        ? 'bg-pink-50 text-pink-600'
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    Small Grants (&lt;£10k)
                  </button>
                  <button
                    onClick={() => setActiveFilter('medium')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      activeFilter === 'medium'
                        ? 'bg-pink-50 text-pink-600'
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    Medium Grants (£10k-£50k)
                  </button>
                  <button
                    onClick={() => setActiveFilter('large')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      activeFilter === 'large'
                        ? 'bg-pink-50 text-pink-600'
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    Large Grants (&gt;£50k)
                  </button>
                </div>
              </div>

              {/* Suggested Matches */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Suggested Matches</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {funders.slice(0, 3).map((funder, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm border border-pink-100 overflow-hidden relative">
                      <div className="absolute top-4 right-4">
                        <button
                          onClick={() => handleStarFunder(funder.name)}
                          className="p-1.5 rounded-full hover:bg-gray-100"
                        >
                          {starredFunders.has(funder.name) ? (
                            <Star className="h-5 w-5 text-yellow-400" />
                          ) : (
                            <Star className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 relative flex-shrink-0 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                            {funder.logo ? (
                              <img
                                src={funder.logo}
                                alt={`${funder.name} logo`}
                                className="object-contain p-1"
                              />
                            ) : (
                              <span className="text-gray-400 text-sm font-medium">
                                {funder.name.split(' ').map(word => word[0]).join('').slice(0, 2).toUpperCase()}
                              </span>
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{funder.name}</h3>
                            <p className="text-sm text-gray-500">{funder.description}</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600">Total Funding Available</span>
                              <span className="font-medium text-gray-900">£{funder.totalFunding.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Success Rate</span>
                              <span className="font-medium text-gray-900">{funder.successRate}%</span>
                            </div>
                          </div>

                          <div className="border-t pt-4">
                            <h4 className="text-sm font-medium text-gray-900 mb-2">Eligibility</h4>
                            <p className="text-sm text-gray-600">{funder.eligibility}</p>
                          </div>

                          <div className="border-t pt-4">
                            <h4 className="text-sm font-medium text-gray-900 mb-2">Application Process</h4>
                            <p className="text-sm text-gray-600">{funder.applicationProcess}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* All Funders */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">All Funders</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {funders.map((funder, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden relative">
                      <div className="absolute top-4 right-4">
                        <button
                          onClick={() => handleStarFunder(funder.name)}
                          className="p-1.5 rounded-full hover:bg-gray-100"
                        >
                          {starredFunders.has(funder.name) ? (
                            <Star className="h-5 w-5 text-yellow-400" />
                          ) : (
                            <Star className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 relative flex-shrink-0 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                            {funder.logo ? (
                              <img
                                src={funder.logo}
                                alt={`${funder.name} logo`}
                                className="object-contain p-1"
                              />
                            ) : (
                              <span className="text-gray-400 text-sm font-medium">
                                {funder.name.split(' ').map(word => word[0]).join('').slice(0, 2).toUpperCase()}
                              </span>
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{funder.name}</h3>
                            <p className="text-sm text-gray-500">{funder.description}</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600">Total Funding Available</span>
                              <span className="font-medium text-gray-900">£{funder.totalFunding.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Success Rate</span>
                              <span className="font-medium text-gray-900">{funder.successRate}%</span>
                            </div>
                          </div>

                          <div className="border-t pt-4">
                            <h4 className="text-sm font-medium text-gray-900 mb-2">Eligibility</h4>
                            <p className="text-sm text-gray-600">{funder.eligibility}</p>
                          </div>

                          <div className="border-t pt-4">
                            <h4 className="text-sm font-medium text-gray-900 mb-2">Application Process</h4>
                            <p className="text-sm text-gray-600">{funder.applicationProcess}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Request New Funder Button */}
              <div className="mt-8 text-center">
                <button
                  onClick={() => setShowRequestModal(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white text-pink-600 rounded-lg border border-pink-200 hover:bg-pink-50"
                >
                  <PlusCircle className="w-5 h-5" />
                  Request to Add New Funder
                </button>
                <p className="text-sm text-gray-500 mt-2">
                  Don't see a funder you're looking for? Request to add them to our database.
                </p>
              </div>

              {/* Request Modal */}
              {showRequestModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-6 max-w-lg w-full">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Request New Funder</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Funder Name
                        </label>
                        <input
                          type="text"
                          className="w-full rounded-lg border-gray-300"
                          placeholder="Enter funder name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Website
                        </label>
                        <input
                          type="text"
                          className="w-full rounded-lg border-gray-300"
                          placeholder="Enter funder website"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Additional Information
                        </label>
                        <textarea
                          className="w-full rounded-lg border-gray-300"
                          rows={3}
                          placeholder="Any additional details about the funder..."
                        />
                      </div>
                      <div className="flex justify-end gap-2 mt-6">
                        <button
                          onClick={() => setShowRequestModal(false)}
                          className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            // Handle submit
                            setShowRequestModal(false);
                          }}
                          className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
                        >
                          Submit Request
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Create Opportunity Modal */}
      {isCreateModalOpen && (
        <OpportunityModal 
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          mode="create"
        />
      )}
    </div>
  );
} 
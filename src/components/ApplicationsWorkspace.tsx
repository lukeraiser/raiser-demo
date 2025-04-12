import { useState } from 'react';
import { GrantCard, Project, Metric } from '@/types/kanban';
import { MessageSquare, FileText, Sparkles, RefreshCw, BarChart, Calendar, PoundSterling } from 'lucide-react';

interface ApplicationsWorkspaceProps {
  selectedGrant: GrantCard | null;
  projects: Project[];
  onProjectSelect: (project: Project) => void;
  onGrantSelect: (grant: GrantCard) => void;
  availableGrants: GrantCard[];
}

type ActiveSection = 'description' | 'metrics' | 'budget' | 'timeline' | null;

export default function ApplicationsWorkspace({ 
  selectedGrant, 
  projects, 
  onProjectSelect,
  onGrantSelect,
  availableGrants 
}: ApplicationsWorkspaceProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [aiMessage, setAiMessage] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeSection, setActiveSection] = useState<ActiveSection>(null);

  // Sample metrics data (since we don't have it in the database yet)
  const sampleMetrics = [
    { id: '1', name: 'People Supported', value: 120, target: 150, unit: 'individuals' },
    { id: '2', name: 'Training Sessions', value: 24, target: 30, unit: 'sessions' },
    { id: '3', name: 'Community Events', value: 8, target: 12, unit: 'events' },
    { id: '4', name: 'Volunteer Hours', value: 450, target: 600, unit: 'hours' }
  ];

  // Sample budget data
  const sampleBudget = {
    staffCosts: 25000,
    equipmentCosts: 8000,
    venueHire: 5000,
    marketingCosts: 3000,
    volunteerExpenses: 2000,
    adminCosts: 2000
  };

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    onProjectSelect(project);
    setIsAnalyzing(true);
    
    // Simulate AI analyzing the project and grant
    setTimeout(() => {
      setIsAnalyzing(false);
      
      // Generate analysis based on available project data
      const analysis = [];
      
      if (selectedGrant) {
        analysis.push(`I've analyzed your project "${project.title}" for the ${selectedGrant.title} grant. Here's what I found:`);
        
        // Grant amount alignment
        analysis.push(`• The grant offers £${selectedGrant.amount.toLocaleString()}, which could provide significant funding for your project`);
        
        // Deadline context
        const deadline = new Date(selectedGrant.deadline);
        const timeUntilDeadline = Math.ceil((deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
        analysis.push(`• The application deadline is in ${timeUntilDeadline} days (${deadline.toLocaleDateString()})`);
        
        // Metrics analysis
        if (project.metrics && project.metrics.length > 0) {
          const completedMetrics = project.metrics.filter(m => m.value >= m.target).length;
          const totalMetrics = project.metrics.length;
          analysis.push(`• Your project has achieved ${completedMetrics} out of ${totalMetrics} impact targets`);
          
          // Highlight a specific metric
          const firstMetric = project.metrics[0];
          analysis.push(`• Your strongest metric is "${firstMetric.name}" at ${firstMetric.value}/${firstMetric.target} ${firstMetric.unit}`);
        }
        
        // Add eligibility check
        analysis.push(`• The funder requires: ${selectedGrant.eligibility}`);
        
        // Add next steps
        analysis.push('\nI can help you with:');
        analysis.push('1. Crafting your project description to align with the funder\'s priorities');
        analysis.push('2. Developing a detailed budget breakdown');
        analysis.push('3. Creating a realistic project timeline');
        analysis.push('4. Strengthening your impact measurement approach');
        
        analysis.push('\nWhat section would you like to work on first?');
      }
      
      setAiMessage(analysis.join('\n'));
    }, 1500);
  };

  const renderSectionContent = () => {
    if (!selectedProject || !selectedGrant) return null;

    switch (activeSection) {
      case 'description':
        return (
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Project Description Draft</h3>
              <div className="prose max-w-none">
                <p className="text-gray-700 mb-4">
                  Based on your project details and {selectedGrant.title}'s priorities, here's a suggested project description:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <p className="text-gray-800">
                    {selectedProject.title} aims to create meaningful impact in our community through sustainable and measurable outcomes. 
                    With a proven track record of successful delivery, our project aligns perfectly with {selectedGrant.title}'s focus on {selectedGrant.description}.
                  </p>
                  <p className="text-gray-800 mt-2">
                    Our approach combines direct community engagement with sustainable impact measurement, ensuring that the £{selectedGrant.amount.toLocaleString()} funding will be effectively utilized to achieve our targets.
                  </p>
                </div>
                <div className="bg-pink-50 p-4 rounded-lg">
                  <h4 className="font-medium text-pink-900 mb-2">AI Suggestions</h4>
                  <ul className="list-disc list-inside text-pink-800">
                    <li>Emphasize alignment with funder's priorities: {selectedGrant.description}</li>
                    <li>Highlight eligibility criteria match: {selectedGrant.eligibility}</li>
                    <li>Include specific impact metrics and targets</li>
                    <li>Add details about community engagement strategy</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'metrics':
        return (
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Impact Metrics Analysis</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {sampleMetrics.map(metric => (
                  <div key={metric.id} className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900">{metric.name}</h4>
                    <div className="mt-2">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress: {metric.value}/{metric.target} {metric.unit}</span>
                        <span>{Math.round((metric.value / metric.target) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-pink-500 h-2 rounded-full" 
                          style={{ width: `${(metric.value / metric.target) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-pink-50 p-4 rounded-lg">
                <h4 className="font-medium text-pink-900 mb-2">AI Recommendations</h4>
                <p className="text-pink-800 mb-2">Based on {selectedGrant.title}'s requirements, I suggest:</p>
                <ul className="list-disc list-inside text-pink-800">
                  <li>Add specific outcomes for disadvantaged communities</li>
                  <li>Include longer-term impact measurements</li>
                  <li>Highlight sustainable development goals alignment</li>
                  <li>Add case studies to support your metrics</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'budget':
        return (
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Budget Breakdown</h3>
              <div className="mb-6">
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(sampleBudget).map(([category, amount]) => (
                    <div key={category} className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 capitalize">{category.replace(/([A-Z])/g, ' $1').trim()}</h4>
                      <p className="text-2xl font-semibold text-gray-700 mt-2">£{amount.toLocaleString()}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {Math.round((amount / selectedGrant.amount) * 100)}% of grant
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-gray-900">Total Requested</h4>
                    <p className="text-2xl font-semibold text-gray-700">
                      £{Object.values(sampleBudget).reduce((a, b) => a + b, 0).toLocaleString()}
                    </p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-pink-500 h-2 rounded-full" 
                      style={{ width: `${(Object.values(sampleBudget).reduce((a, b) => a + b, 0) / selectedGrant.amount) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
              <div className="bg-pink-50 p-4 rounded-lg">
                <h4 className="font-medium text-pink-900 mb-2">AI Budget Analysis</h4>
                <ul className="list-disc list-inside text-pink-800">
                  <li>Budget aligns with {selectedGrant.title}'s typical funding patterns</li>
                  <li>Staff costs are within acceptable range (40-60% of total)</li>
                  <li>Consider adding match funding sources</li>
                  <li>Include detailed breakdown of equipment costs</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'timeline':
        return (
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Project Timeline</h3>
              <div className="space-y-4 mb-6">
                {[
                  { month: 1, activities: ['Project Setup', 'Staff Recruitment', 'Initial Community Engagement'] },
                  { month: 2, activities: ['Training Program Development', 'Marketing Campaign Launch', 'Volunteer Recruitment'] },
                  { month: 3, activities: ['First Community Workshop', 'Impact Measurement Setup', 'Partner Engagement'] },
                  { month: 4, activities: ['Program Delivery', 'Mid-term Evaluation', 'Community Feedback Session'] }
                ].map(phase => (
                  <div key={phase.month} className="flex gap-4 bg-gray-50 p-4 rounded-lg">
                    <div className="w-24 flex-shrink-0">
                      <div className="text-pink-600 font-medium">Month {phase.month}</div>
                    </div>
                    <div className="flex-1">
                      <ul className="space-y-2">
                        {phase.activities.map((activity, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-pink-400 rounded-full" />
                            <span className="text-gray-700">{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-pink-50 p-4 rounded-lg">
                <h4 className="font-medium text-pink-900 mb-2">AI Timeline Suggestions</h4>
                <ul className="list-disc list-inside text-pink-800">
                  <li>Timeline aligns with {selectedGrant.title}'s {selectedGrant.deadline ? new Date(selectedGrant.deadline).toLocaleDateString() : 'deadline'}</li>
                  <li>Consider adding contingency time for approvals</li>
                  <li>Include key reporting milestones</li>
                  <li>Add stakeholder engagement points</li>
                </ul>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
        <p className="mt-2 text-gray-600">
          Use our AI assistant to help you create compelling grant applications. Select a grant from your pipeline, 
          connect it with a relevant project, and let the AI help you craft your application using your existing project data.
        </p>
      </div>
      <div className="flex h-[calc(100vh-12rem)]">
        {/* Left Panel - Project Selection and Grant Details */}
        <div className="w-1/3 border-r border-gray-200 bg-white p-6 overflow-y-auto">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Selected Grant</h2>
            <div className="mb-4">
              <label htmlFor="grant-select" className="block text-sm font-medium text-gray-700 mb-1">
                Select a grant from your pipeline
              </label>
              <div className="relative">
                <select
                  id="grant-select"
                  value={selectedGrant?.id || ''}
                  onChange={(e) => {
                    const grant = availableGrants.find(g => g.id === e.target.value);
                    if (grant) onGrantSelect(grant);
                  }}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm rounded-md appearance-none bg-white"
                >
                  <option value="">Select a grant...</option>
                  {availableGrants.map((grant) => (
                    <option key={grant.id} value={grant.id}>
                      {grant.title} - £{grant.amount.toLocaleString()}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {selectedGrant ? (
              <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 relative flex-shrink-0 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                    {selectedGrant.logo ? (
                      <img
                        src={selectedGrant.logo}
                        alt={`${selectedGrant.title} logo`}
                        className="object-contain p-1"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm font-medium">
                        {selectedGrant.title.split(' ').map(word => word[0]).join('').slice(0, 2).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <h3 className="font-medium text-gray-900">{selectedGrant.title}</h3>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><span className="font-medium">Amount:</span> £{selectedGrant.amount.toLocaleString()}</p>
                  <p><span className="font-medium">Deadline:</span> {new Date(selectedGrant.deadline).toLocaleDateString()}</p>
                  <p><span className="font-medium">Eligibility:</span> {selectedGrant.eligibility}</p>
                  <p><span className="font-medium">Application Details:</span> {selectedGrant.applicationDetails}</p>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-gray-500">No grant selected</p>
                <p className="text-sm text-gray-400 mt-2">Select a grant from your pipeline to start</p>
              </div>
            )}
          </div>

          {selectedGrant && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Select a Project</h2>
              <div className="space-y-3">
                {projects.length > 0 ? (
                  projects.map((project) => (
                    <button
                      key={project.id}
                      onClick={() => handleProjectSelect(project)}
                      className={`w-full text-left p-4 rounded-lg border transition-colors ${
                        selectedProject?.id === project.id
                          ? 'border-pink-500 bg-pink-50'
                          : 'border-gray-200 hover:border-pink-300 hover:bg-gray-50'
                      }`}
                    >
                      <h3 className="font-medium text-gray-900">{project.title}</h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {project.metrics?.map(metric => (
                          <span key={metric.id} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {metric.name}: {metric.value}/{metric.target} {metric.unit}
                          </span>
                        ))}
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-gray-500">No projects available</p>
                    <p className="text-sm text-gray-400 mt-2">Please create a project in the Projects tab first</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Panel - AI Workspace */}
        <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
          {selectedProject ? (
            <div className="space-y-6">
              {/* AI Assistant Header */}
              <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
                <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-pink-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">AI Assistant</h3>
                  <p className="text-sm text-gray-500">Ready to help with your application</p>
                </div>
              </div>

              {/* AI Message */}
              {isAnalyzing ? (
                <div className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-3">
                  <RefreshCw className="w-5 h-5 text-pink-600 animate-spin" />
                  <p className="text-gray-700">Analyzing your project and grant requirements...</p>
                </div>
              ) : aiMessage ? (
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-gray-700 whitespace-pre-line">{aiMessage}</p>
                </div>
              ) : null}

              {/* Application Sections */}
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setActiveSection('description')}
                  className={`flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all ${
                    activeSection === 'description' ? 'ring-2 ring-pink-500' : ''
                  }`}
                >
                  <FileText className="w-5 h-5 text-pink-600" />
                  <span>Project Description</span>
                </button>
                <button 
                  onClick={() => setActiveSection('metrics')}
                  className={`flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all ${
                    activeSection === 'metrics' ? 'ring-2 ring-pink-500' : ''
                  }`}
                >
                  <BarChart className="w-5 h-5 text-pink-600" />
                  <span>Impact Metrics</span>
                </button>
                <button 
                  onClick={() => setActiveSection('budget')}
                  className={`flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all ${
                    activeSection === 'budget' ? 'ring-2 ring-pink-500' : ''
                  }`}
                >
                  <PoundSterling className="w-5 h-5 text-pink-600" />
                  <span>Budget Breakdown</span>
                </button>
                <button 
                  onClick={() => setActiveSection('timeline')}
                  className={`flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all ${
                    activeSection === 'timeline' ? 'ring-2 ring-pink-500' : ''
                  }`}
                >
                  <Calendar className="w-5 h-5 text-pink-600" />
                  <span>Timeline</span>
                </button>
              </div>

              {/* Section Content */}
              {renderSectionContent()}

              {/* Chat Interface */}
              <div className="mt-6">
                <div className="flex items-center gap-3 mb-4">
                  <MessageSquare className="w-5 h-5 text-gray-400" />
                  <h3 className="font-medium text-gray-900">Ask the AI Assistant</h3>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <textarea
                    className="w-full h-24 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Ask me anything about your application..."
                  />
                  <button className="mt-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Project</h3>
                <p className="text-gray-500">Choose a project to start working on your application with AI assistance</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
} 
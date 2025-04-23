'use client';

import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import LeftNavbar from '@/components/LeftNavbar';
import Link from 'next/link';
import BeneficiaryDetailsModal from '@/components/BeneficiaryDetailsModal';
import MetricDetailsModal from '@/components/MetricDetailsModal';
import { useRouter } from 'next/navigation';
import ProjectUpdateModal from '@/components/ProjectUpdateModal';
import ImpactStoryModal from '@/components/ImpactStoryModal';
import ImpactStoryCard from '@/components/ImpactStoryCard';
import MetricCard from '@/components/MetricCard';
import StoryDetailsModal from '@/components/StoryDetailsModal';

interface ImpactMetric {
  name: string;
  value: number;
}

interface BeneficiaryProfile {
  id: string;
  name: string;
  description: string;
  needs: string[];
  supportProvided: string[];
  imageUrl?: string;
  impactMetrics?: {
    name: string;
    value: number;
  };
}

interface Metric {
  id: string;
  title: string;
  target: string;
  value: string;
  period: string;
  lastUpdated: string;
  updates: {
    id: string;
    date: string;
    source: string;
    value: number;
    notes: string;
  }[];
}

interface ProjectUpdate {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  category: string;
  attendance?: number;
  participantQuotes?: string[];
  linkedMetrics?: { metricId: string; value: number }[];
}

interface ImpactStory {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  imageUrl?: string;
  tags: string[];
}

export default function ImpactPage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<BeneficiaryProfile | null>(null);
  const [editingMetric, setEditingMetric] = useState<Metric | null>(null);
  const [editingUpdate, setEditingUpdate] = useState<ProjectUpdate | null>(null);
  const [stories, setStories] = useState<ImpactStory[]>([
    {
      id: '1',
      title: 'Empowering Local Communities Through Education',
      content: 'Our education program has helped over 500 children in rural areas gain access to quality education. Through partnerships with local schools and dedicated teachers, we\'ve seen remarkable improvements in literacy rates and school attendance.',
      author: 'Sarah Johnson',
      date: '2024-03-15',
      imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=60',
      tags: ['Education', 'Community', 'Success Story']
    },
    {
      id: '2',
      title: 'Sustainable Agriculture Initiative Yields Results',
      content: 'The introduction of sustainable farming techniques has transformed the lives of 200 farming families. With improved crop yields and reduced water usage, these communities are now more resilient to climate challenges.',
      author: 'Michael Chen',
      date: '2024-03-10',
      imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=60',
      tags: ['Agriculture', 'Sustainability', 'Climate']
    }
  ]);
  const [selectedStory, setSelectedStory] = useState<ImpactStory | null>(null);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);

  const [beneficiaryProfiles, setBeneficiaryProfiles] = useState<BeneficiaryProfile[]>([
    {
      id: '1',
      name: 'Youth Club Support',
      description: 'Supporting local youth through educational and recreational activities',
      needs: ['Educational support', 'Safe space for activities', 'Mentorship'],
      supportProvided: ['Weekly tutoring', 'Sports equipment', 'Professional mentors'],
      imageUrl: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=800&auto=format&fit=crop&q=60',
      impactMetrics: {
        name: 'People Supported',
        value: 150
      }
    },
    {
      id: '2',
      name: 'Smallville Youth at Risk',
      description: 'Teenagers in Smallville who are discovering their unique abilities and facing challenges in a small town environment, needing guidance and support.',
      needs: [
        'Mentorship and guidance',
        'Safe space for self-discovery',
        'Support with unique abilities',
        'Community integration'
      ],
      supportProvided: [
        'Weekly mentorship sessions',
        'Ability development workshops',
        'Peer support groups',
        'Community service projects'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=800&auto=format&fit=crop&q=60',
      impactMetrics: {
        name: 'People Supported',
        value: 75
      }
    }
  ]);

  const [metrics, setMetrics] = useState<Metric[]>([
    {
      id: '1',
      title: 'People Impacted',
      target: '2,000',
      value: '1,250',
      period: 'Annually',
      lastUpdated: 'Yesterday',
      updates: [
        {
          id: '1',
          date: '2024-04-10',
          source: 'Youth Club Session',
          value: 15,
          notes: 'Weekly youth club session'
        },
        {
          id: '2',
          date: '2024-04-08',
          source: 'Smallville Youth at Risk',
          value: 10,
          notes: 'Ability development workshop'
        }
      ]
    },
    {
      id: '2',
      title: 'Support Groups',
      target: '50',
      value: '35',
      period: 'Weekly Sessions',
      lastUpdated: '5 days ago',
      updates: [
        {
          id: '1',
          date: '2024-04-05',
          source: 'New Support Group',
          value: 1,
          notes: 'Started new peer support group for Smallville youth'
        }
      ]
    }
  ]);

  const [updates, setUpdates] = useState<ProjectUpdate[]>([
    {
      id: '1',
      title: 'Amazing session today!',
      content: 'We had 30 attendees at today\'s Knit & Natter group. So many beautiful...',
      author: 'S',
      date: '2 days ago',
      category: 'Workshop',
      attendance: 30,
      participantQuotes: [
        'This group has changed my life',
        'I\'ve made so many new friends here'
      ],
      linkedMetrics: [
        { metricId: '1', value: 30 }
      ]
    },
    {
      id: '2',
      title: 'Youth Skills Workshop Success',
      content: '15 young people completed our CV and interview skills workshop today...',
      author: 'S',
      date: '1 week ago',
      category: 'Training',
      attendance: 15,
      participantQuotes: [
        'I feel much more confident about job interviews now',
        'The workshop was really helpful'
      ],
      linkedMetrics: [
        { metricId: '2', value: 1 }
      ]
    }
  ]);

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'metrics', label: 'Key Metrics', icon: '📈' },
    { id: 'beneficiaries', label: 'Beneficiary Profiles', icon: '👥' },
    { id: 'stories', label: 'Impact Stories', icon: '📖' },
    { id: 'updates', label: 'Project Updates', icon: '🔄' }
  ];

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  const handleSaveStory = (story: ImpactStory) => {
    if (story.id === selectedStory?.id) {
      setStories(stories.map(s => s.id === story.id ? story : s));
    } else {
      setStories([...stories, story]);
    }
    setIsStoryModalOpen(false);
    setSelectedStory(null);
  };

  const handleDeleteStory = (id: string) => {
    setStories(stories.filter(story => story.id !== id));
  };

  const handleEditMetric = (metric: Metric) => {
    setEditingMetric(metric);
  };

  const handleUpdateProfile = (updatedProfile: BeneficiaryProfile) => {
    if (updatedProfile.id === 'new') {
      setBeneficiaryProfiles([...beneficiaryProfiles, { ...updatedProfile, id: Date.now().toString() }]);
    } else {
      setBeneficiaryProfiles(profiles => 
        profiles.map(p => p.id === updatedProfile.id ? updatedProfile : p)
      );
    }
    setSelectedBeneficiary(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex relative pt-16">
        <LeftNavbar
          title="Impact"
          items={sidebarItems}
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
        />
        <div className="main-content">
          {activeSection === 'overview' && (
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-8">Impact Overview</h1>
              
              {/* Key Metrics Section */}
              <div className="mb-12">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Metrics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {metrics.map((metric) => (
                    <MetricCard
                      key={metric.id}
                      metric={metric}
                      onEdit={() => handleEditMetric(metric)}
                      onAddUpdate={() => handleEditMetric(metric)}
                    />
                  ))}
                </div>
              </div>

              {/* Recent Updates Section */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Updates</h2>
                <div className="space-y-4">
                  {updates.map((update, index) => (
                    <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#ff65c3] bg-opacity-70 flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold">{update.author}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{update.title}</h3>
                          <p className="text-gray-600 mt-1">{update.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'metrics' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Metrics</h2>
              <div className="grid grid-cols-3 gap-6">
                {metrics.map((metric) => (
                  <div key={metric.id} className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-medium text-gray-900">{metric.title}</h3>
                    <p className="text-4xl font-bold text-[#ff65c3] mt-2">{metric.value}</p>
                    <p className="text-gray-600 mt-1">{metric.period}</p>
                    <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between items-center">
                      <span className="text-sm text-gray-500">Last updated: {metric.lastUpdated}</span>
                      <button 
                        onClick={() => setEditingMetric(metric)}
                        className="text-[#ff65c3] font-medium hover:text-opacity-80"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'beneficiaries' && (
            <>
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Beneficiary Profiles</h1>
                    <p className="text-gray-600 mt-1">Create and manage profiles of the people and causes you support.</p>
                  </div>
                  <button 
                    onClick={() => setSelectedBeneficiary({
                      id: 'new',
                      name: '',
                      description: '',
                      needs: [''],
                      supportProvided: [''],
                      imageUrl: '/images/placeholder.jpg'
                    })}
                    className="bg-[#ff65c3] text-white rounded-full px-6 py-2 hover:bg-opacity-90 transition-colors"
                  >
                    + Add New Profile
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {beneficiaryProfiles.map((profile) => (
                    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start space-x-4">
                        <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={profile.imageUrl || '/placeholder-profile.jpg'} 
                            alt={profile.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{profile.name}</h3>
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{profile.description}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {profile.needs.slice(0, 3).map((need, index) => (
                              <span key={index} className="px-2 py-1 bg-pink-50 text-pink-700 text-xs rounded-full">
                                {need}
                              </span>
                            ))}
                            {profile.needs.length > 3 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                +{profile.needs.length - 3} more
                              </span>
                            )}
                          </div>
                          <div className="flex justify-end">
                            <button
                              onClick={() => setSelectedBeneficiary(profile)}
                              className="text-[#ff65c3] font-medium hover:text-opacity-80"
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeSection === 'stories' && (
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Impact Stories</h2>
                  <p className="mt-2 text-gray-600">
                    Share in-depth case studies and success stories that demonstrate your organisation's impact.
                    These stories can be used in fundraising materials and reports.
                  </p>
                </div>
                <button
                  onClick={() => setSelectedStory({
                    id: 'new',
                    title: '',
                    content: '',
                    author: '',
                    date: new Date().toISOString().split('T')[0],
                    tags: []
                  })}
                  className="px-4 py-2 bg-[#ff65c3] text-white rounded-md hover:bg-opacity-90"
                >
                  Create New Story
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {stories.map((story) => (
                  <div key={story.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    {story.imageUrl && (
                      <div className="aspect-video relative">
                        <img
                          src={story.imageUrl}
                          alt={story.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {story.tags.map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-pink-50 text-pink-700 text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{story.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">{story.content}</p>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>By {story.author}</span>
                        <span>{new Date(story.date).toLocaleDateString()}</span>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <button
                          onClick={() => setSelectedStory(story)}
                          className="text-[#ff65c3] font-medium hover:text-opacity-80"
                        >
                          Edit Story
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'updates' && (
            <>
              <div className="p-8">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Project Updates</h1>
                    <p className="text-gray-600 mt-1">Share updates about your activities and their impact.</p>
                  </div>
                  <button 
                    onClick={() => setEditingUpdate({
                      id: '',
                      title: '',
                      content: '',
                      date: '',
                      author: '',
                      category: '',
                      participantQuotes: [],
                      linkedMetrics: []
                    })}
                    className="bg-[#ff65c3] text-white rounded-full px-6 py-2 hover:bg-opacity-90 transition-colors"
                  >
                    + Add New Update
                  </button>
                </div>

                <div className="space-y-6">
                  {updates.map((update) => (
                    <div key={update.id} className="bg-white rounded-lg border border-gray-200 p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#ff65c3] bg-opacity-70 flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold">{update.author}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium text-gray-900">{update.title}</h3>
                            <span className="text-sm text-gray-500">{update.date}</span>
                          </div>
                          <p className="text-gray-600 mt-1">{update.content}</p>
                          
                          {update.attendance && (
                            <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                              <span className="font-medium">Attendance:</span>
                              <span>{update.attendance} participants</span>
                            </div>
                          )}

                          {update.participantQuotes && update.participantQuotes.length > 0 && (
                            <div className="mt-4">
                              <h4 className="text-sm font-medium text-gray-700 mb-2">Participant Quotes</h4>
                              <div className="space-y-2">
                                {update.participantQuotes.map((quote, index) => (
                                  <div key={index} className="bg-gray-50 rounded-lg p-3">
                                    <p className="text-gray-600 italic">"{quote}"</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {update.linkedMetrics && update.linkedMetrics.length > 0 && (
                            <div className="mt-4">
                              <h4 className="text-sm font-medium text-gray-700 mb-2">Linked Metrics</h4>
                              <div className="flex flex-wrap gap-2">
                                {update.linkedMetrics.map((metric, index) => {
                                  const metricData = metrics.find(m => m.id === metric.metricId);
                                  return metricData ? (
                                    <div key={index} className="bg-pink-50 rounded-lg px-3 py-1">
                                      <span className="text-sm text-pink-700">
                                        {metricData.title}: {metric.value}
                                      </span>
                                    </div>
                                  ) : null;
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                        <button 
                          onClick={() => setEditingUpdate(update)}
                          className="text-[#ff65c3] font-medium hover:text-opacity-80"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {selectedBeneficiary && (
        <BeneficiaryDetailsModal
          beneficiary={selectedBeneficiary}
          onClose={() => setSelectedBeneficiary(null)}
          onSave={(updatedBeneficiary) => {
            setBeneficiaryProfiles(profiles => 
              profiles.map(profile => 
                profile.id === updatedBeneficiary.id ? updatedBeneficiary : profile
              )
            );
            setSelectedBeneficiary(null);
          }}
        />
      )}

      {editingMetric && (
        <MetricDetailsModal
          metric={editingMetric}
          onClose={() => setEditingMetric(null)}
          onUpdate={(updatedMetric) => {
            if (!updatedMetric.id) {
              setMetrics([...metrics, { ...updatedMetric, id: Date.now().toString() }]);
            } else {
              setMetrics(metrics.map(m => m.id === updatedMetric.id ? updatedMetric : m));
            }
            setEditingMetric(null);
          }}
        />
      )}

      {editingUpdate && (
        <ProjectUpdateModal
          update={editingUpdate}
          onClose={() => setEditingUpdate(null)}
          onSave={(updatedUpdate) => {
            if (!updatedUpdate.id) {
              setUpdates([...updates, updatedUpdate]);
            } else {
              setUpdates(updates.map(u => u.id === updatedUpdate.id ? updatedUpdate : u));
            }
            setEditingUpdate(null);
          }}
          availableMetrics={metrics.map(m => ({ id: m.id, title: m.title }))}
        />
      )}

      {selectedStory && (
        <StoryDetailsModal
          story={selectedStory}
          onClose={() => setSelectedStory(null)}
          onSave={(updatedStory) => {
            if (updatedStory.id === 'new') {
              setStories([...stories, updatedStory]);
            } else {
              setStories(stories.map(story => 
                story.id === updatedStory.id ? updatedStory : story
              ));
            }
            setSelectedStory(null);
          }}
        />
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import LeftNavbar from '@/components/LeftNavbar';
import MetricCard from '@/components/MetricCard';
import ProjectUpdateCard from '@/components/ProjectUpdateCard';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
  description: string;
  date: string;
  author: string;
  category: string;
}

export default function OverviewPage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('overview');

  const navItems = [
    {
      id: 'overview',
      label: 'Overview',
      icon: '📊'
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: '📋'
    },
    {
      id: 'impact',
      label: 'Impact',
      icon: '📈'
    },
    {
      id: 'opportunities',
      label: 'Opportunities',
      icon: '🎯'
    }
  ];

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    const path = section === 'overview' ? '/' : `/${section}`;
    router.push(path);
  };

  const [metrics] = useState<Metric[]>([
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

  const [recentUpdates] = useState<ProjectUpdate[]>([
    {
      id: '1',
      title: 'New Youth Club Location',
      description: 'We\'ve secured a new venue for our weekly youth club sessions in Smallville.',
      date: '2024-04-10',
      author: 'Sarah Johnson',
      category: 'Facilities'
    },
    {
      id: '2',
      title: 'Volunteer Training Program',
      description: 'Launched a new training program for volunteers working with at-risk youth.',
      date: '2024-04-08',
      author: 'Michael Chen',
      category: 'Training'
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <LeftNavbar
          title="Navigation"
          items={navItems}
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
        />
        <div className="flex-1 p-8 pt-24">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Overview</h1>
          
          {/* Key Metrics Section */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {metrics.map(metric => (
                <MetricCard
                  key={metric.id}
                  metric={metric}
                  onEdit={() => {}}
                  onAddUpdate={() => {}}
                />
              ))}
            </div>
          </div>

          {/* Recent Updates Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Updates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentUpdates.map(update => (
                <ProjectUpdateCard
                  key={update.id}
                  update={update}
                  onEdit={() => {}}
                  onDelete={() => {}}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
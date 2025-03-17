'use client';

import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ComposedChart } from 'recharts';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import Header from '@/components/Header';

interface MetricCardProps {
  title: string;
  value: string | React.ReactNode;
  subtext: string;
  valueColor?: string;
  weightedValue?: string;
  weightedColor?: string;
  progress?: {
    current: number;
    target: number;
    color: string;
  };
  additionalSubtext?: string | React.ReactNode;
}

const MetricCard = ({ 
  title, 
  value, 
  subtext, 
  valueColor = 'text-pink-500', 
  weightedValue, 
  weightedColor,
  progress,
  additionalSubtext
}: MetricCardProps) => (
  <div className="bg-white rounded-lg border border-gray-200 p-6">
    <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
    <div className="mt-4">
      <p className={`text-2xl font-bold ${valueColor}`}>{value}</p>
      {weightedValue && (
        <p className={`text-lg font-semibold mt-1 ${weightedColor}`}>{weightedValue}</p>
      )}
      {progress && (
        <div className="mt-3">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress against Budget</span>
            <span>{Math.round((progress.current / progress.target) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${progress.color}`}
              style={{ width: `${Math.min((progress.current / progress.target) * 100, 100)}%` }}
            />
          </div>
        </div>
      )}
    </div>
    {!progress && <p className="text-sm text-gray-500 mt-2">{subtext}</p>}
    {additionalSubtext && (
      <p className="text-sm text-gray-500 mt-1">{additionalSubtext}</p>
    )}
  </div>
);

const pipelineData = [
  { name: 'Eligible', total: 45000, weighted: 18000, color: 'rgba(88, 227, 234, 0.1)' },
  { name: 'Drafting', total: 55000, weighted: 22000, color: 'rgba(88, 227, 234, 0.2)' },
  { name: 'Applied', total: 30000, weighted: 12000, color: 'rgba(88, 227, 234, 0.3)' },
  { name: 'Successful', total: 45000, weighted: 45000, color: 'rgba(88, 227, 234, 0.4)' },
];

const projectData = [
  {
    name: 'Core Costs',
    budget: 40000,
    raised: 25000,
    donors: 2,
    image: '/images/core-costs.jpg'
  },
  {
    name: 'Youth Club',
    budget: 25000,
    raised: 12000,
    donors: 3,
    image: '/images/youth-club.jpg'
  },
  {
    name: 'Community Sports Program',
    budget: 33000,
    raised: 8000,
    donors: 4,
    image: '/images/sports.jpg'
  }
];

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('Q1 2025');

  const formatCurrency = (value: number) => {
    return `£${(value / 1000).toFixed(0)}k`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="p-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">👋 Welcome to your dashboard</h1>
          <div className="relative">
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-md px-4 py-2 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option>Q1 2025</option>
              <option>Q4 2024</option>
              <option>Q3 2024</option>
              <option>Q2 2024</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Secured Funding"
            value="£45,000"
            subtext=""
            valueColor="text-green-600"
            progress={{
              current: 45000,
              target: 98000,
              color: Math.round((45000 / 98000) * 100) <= 30 ? 'bg-red-500' : 
                     Math.round((45000 / 98000) * 100) <= 70 ? 'bg-amber-500' : 
                     'bg-green-500'
            }}
            additionalSubtext="From 3 donors"
          />
          <MetricCard
            title="Pipeline Value"
            value="£130,000 Total"
            weightedValue="£52,000 (Weighted)"
            subtext="12 opportunities"
            valueColor="text-[#58e3ea]"
            weightedColor="text-pink-500"
          />
          <MetricCard
            title="Success Rate"
            value={
              <div className="flex items-center">
                <span className="text-2xl font-bold text-teal-500">67%</span>
                <span className="text-sm font-normal text-gray-500 ml-2">2 out of 3 completed opportunities</span>
              </div>
            }
            subtext=""
            valueColor="text-teal-500"
            additionalSubtext={
              <div className="mt-2 flex items-center">
                <span className="text-xl font-bold text-teal-500">40%</span>
                <span className="text-sm font-normal text-gray-500 ml-2">pipeline weighting</span>
              </div>
            }
          />
          <MetricCard
            title="Upcoming Deadlines"
            value="3"
            subtext=""
            valueColor="text-yellow-600"
            additionalSubtext={
              <div className="space-y-2 mt-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium">Green Initiative</span>
                  <span className="text-red-600">Due Tomorrow</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium">Regional Fund</span>
                  <span className="text-amber-600">Due Mar 18</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium">Tech for Good</span>
                  <span className="text-gray-600">Due Mar 20</span>
                </div>
              </div>
            }
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Opportunity Pipeline Chart */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Opportunity Pipeline</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={pipelineData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12, fill: '#666' }}
                    axisLine={false}
                    interval={0}
                  />
                  <YAxis 
                    tickFormatter={formatCurrency}
                    tick={{ fontSize: 12, fill: '#666' }}
                    axisLine={false}
                  />
                  <Tooltip 
                    formatter={(value, name) => {
                      if (name === 'Total Amount') {
                        return [`${formatCurrency(value as number)}`, 'Total'];
                      }
                      return [`${formatCurrency(value as number)}`, 'Weighted'];
                    }}
                    contentStyle={{ 
                      backgroundColor: 'white',
                      border: '1px solid #e0e0e0',
                      borderRadius: '4px',
                      padding: '8px'
                    }}
                    labelStyle={{ color: '#333' }}
                  />
                  <Bar 
                    dataKey="total" 
                    radius={[4, 4, 0, 0]}
                    fill="#58e3ea"
                    name="Total Amount"
                  />
                  <Line
                    type="monotone"
                    dataKey="weighted"
                    stroke="#FF69B4"
                    strokeWidth={2}
                    dot={{ fill: '#FF69B4', r: 4 }}
                    name="Weighted Amount"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              <p>* Weighted amounts: 40% of total for Eligible/Drafting/Applied, 100% for Successful</p>
            </div>
          </div>

          {/* Project Funding Cards */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Project Funding Overview</h2>
            <div className="space-y-4">
              {projectData.map((project, index) => {
                const progress = Math.round((project.raised / project.budget) * 100);
                const isOverBudget = project.raised > project.budget;
                const getProgressColor = (progress: number) => {
                  if (progress <= 30) return 'bg-red-500';
                  if (progress <= 70) return 'bg-amber-500';
                  return 'bg-green-500';
                };
                return (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                        <img 
                          src={project.image} 
                          alt={project.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://via.placeholder.com/64';
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-sm font-semibold text-gray-900">{project.name}</h3>
                      <div className="mt-2">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Progress against Budget</span>
                          <span>{progress}% of £{project.budget.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${getProgressColor(progress)}`}
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          />
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">From {project.donors} donors</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Activity and Tasks Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[
                { text: 'Sara updated Green Initiative application', time: '1h ago' },
                { text: 'Mike added impact metrics to Green Initiative', time: '6h ago' },
                { text: 'John moved Tech for Good to Eligible stage', time: 'Yesterday' },
                { text: 'Lisa added a note to Davis Trust application', time: 'Yesterday' },
                { text: 'Sara scheduled interview for Regional Fund', time: '2d ago' },
              ].map((activity, index) => (
                <div key={index} className="py-2 border-b border-gray-100 last:border-0">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-900">{activity.text}</span>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Tasks</h2>
            <div className="space-y-4">
              {[
                { text: 'Complete community section for Green Initiative', due: 'Due Tomorrow', urgent: true },
                { text: 'Prepare for Regional Fund interview', due: 'Due Mar 18', urgent: true },
                { text: 'Begin drafting for Tech for Good application', due: 'Due Mar 20', urgent: false },
                { text: 'Submit report for Business Alliance grant', due: 'Due Apr 5', urgent: false },
                { text: 'Schedule team meeting for Q2 planning', due: 'Due Apr 10', urgent: false },
              ].map((task, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                    />
                    <span className="text-sm text-gray-900">{task.text}</span>
                  </div>
                  <span className={`text-xs ${task.urgent ? 'text-red-600' : 'text-gray-500'}`}>
                    {task.due}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
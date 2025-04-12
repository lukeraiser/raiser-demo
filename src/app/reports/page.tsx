'use client';

import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ComposedChart, PieChart, Pie, Cell, Legend, Area, AreaChart } from 'recharts';
import Header from '@/components/Header';

interface ReportCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  gradient: string;
  previewData: React.ReactNode;
}

const ReportCard = ({ title, description, icon, onClick, gradient, previewData }: ReportCardProps) => (
  <div className="relative">
    {/* Preview Card - Now always visible */}
    <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-4 mb-2">
      <div className="h-[200px]">
        {previewData}
      </div>
    </div>
    
    {/* Main Card */}
    <div 
      onClick={onClick}
      className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}
    >
      <div className={`absolute inset-0 ${gradient} opacity-90`} />
      <div className="relative p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
            {icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="text-sm text-white/80 mt-1">{description}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const fundingData = [
  { month: 'Jan', secured: 25000, pipeline: 45000, target: 40000 },
  { month: 'Feb', secured: 35000, pipeline: 55000, target: 40000 },
  { month: 'Mar', secured: 45000, pipeline: 65000, target: 40000 },
  { month: 'Apr', secured: 30000, pipeline: 50000, target: 40000 },
  { month: 'May', secured: 40000, pipeline: 60000, target: 40000 },
  { month: 'Jun', secured: 50000, pipeline: 70000, target: 40000 },
];

const successRateData = [
  { name: 'Core Costs', value: 75 },
  { name: 'Youth Club', value: 45 },
  { name: 'Sports Program', value: 60 },
  { name: 'Community Events', value: 85 },
  { name: 'Education Fund', value: 70 },
];

const COLORS = ['#FF69B4', '#58E3EA', '#10B981', '#F59E0B', '#6366F1'];

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState('6m');
  const [reportType, setReportType] = useState('all');

  const formatCurrency = (value: number) => {
    return `£${(value / 1000).toFixed(0)}k`;
  };

  const reports = [
    {
      id: 'funding',
      title: 'Funding Overview',
      description: 'Track secured funding, pipeline value, and targets over time',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: 'bg-gradient-to-br from-pink-500 to-purple-600',
      previewData: (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={fundingData.slice(-3)}>
            <defs>
              <linearGradient id="previewSecured" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF69B4" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#FF69B4" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="previewPipeline" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#58E3EA" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#58E3EA" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={formatCurrency} />
            <Tooltip formatter={(value) => formatCurrency(value as number)} />
            <Area type="monotone" dataKey="secured" stroke="#FF69B4" fillOpacity={1} fill="url(#previewSecured)" />
            <Area type="monotone" dataKey="pipeline" stroke="#58E3EA" fillOpacity={1} fill="url(#previewPipeline)" />
          </AreaChart>
        </ResponsiveContainer>
      ),
    },
    {
      id: 'success',
      title: 'Success Rate',
      description: 'Analyze success rates across different projects and funding types',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      gradient: 'bg-gradient-to-br from-blue-500 to-cyan-500',
      previewData: (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={successRateData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {successRateData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      ),
    },
    {
      id: 'donors',
      title: 'Donor Insights',
      description: 'Understand donor behavior, preferences, and engagement patterns',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      gradient: 'bg-gradient-to-br from-emerald-500 to-teal-500',
      previewData: (
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={[
            { month: 'Jan', new: 5, returning: 8 },
            { month: 'Feb', new: 7, returning: 10 },
            { month: 'Mar', new: 4, returning: 12 },
          ]}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="new" fill="#FF69B4" name="New Donors" radius={[4, 4, 0, 0]} />
            <Bar dataKey="returning" fill="#58E3EA" name="Returning Donors" radius={[4, 4, 0, 0]} />
          </ComposedChart>
        </ResponsiveContainer>
      ),
    },
    {
      id: 'impact',
      title: 'Impact Metrics',
      description: 'Measure and visualise your organisation\'s impact across key areas',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      gradient: 'bg-gradient-to-br from-orange-500 to-amber-500',
      previewData: (
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Youth Program Participation</span>
              <span className="font-semibold">85%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="h-2 rounded-full bg-gradient-to-r from-green-400 to-green-500" style={{ width: '85%' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Skills Development</span>
              <span className="font-semibold">92%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="h-2 rounded-full bg-gradient-to-r from-purple-400 to-purple-500" style={{ width: '92%' }} />
            </div>
          </div>
        </div>
      ),
    },
  ];

  const renderReport = () => {
    switch (selectedReport) {
      case 'funding':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Funding Trends</h2>
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    +15% vs last period
                  </span>
                </div>
              </div>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={fundingData}>
                    <defs>
                      <linearGradient id="secured" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FF69B4" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#FF69B4" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="pipeline" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#58E3EA" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#58E3EA" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={formatCurrency} />
                    <Tooltip 
                      formatter={(value) => formatCurrency(value as number)}
                      contentStyle={{ 
                        backgroundColor: 'white',
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px',
                        padding: '12px'
                      }}
                    />
                    <Area type="monotone" dataKey="secured" stroke="#FF69B4" fillOpacity={1} fill="url(#secured)" name="Secured Funding" />
                    <Area type="monotone" dataKey="pipeline" stroke="#58E3EA" fillOpacity={1} fill="url(#pipeline)" name="Pipeline Value" />
                    <Line type="monotone" dataKey="target" stroke="#10B981" strokeDasharray="5 5" name="Monthly Target" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl p-6 text-white">
                <h3 className="text-sm font-medium text-white/80">Total Secured</h3>
                <p className="text-3xl font-bold mt-2">£230,000</p>
                <p className="text-sm text-white/80 mt-1">+15% vs last period</p>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl p-6 text-white">
                <h3 className="text-sm font-medium text-white/80">Pipeline Value</h3>
                <p className="text-3xl font-bold mt-2">£340,000</p>
                <p className="text-sm text-white/80 mt-1">+8% vs last period</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl p-6 text-white">
                <h3 className="text-sm font-medium text-white/80">Target Achievement</h3>
                <p className="text-3xl font-bold mt-2">95%</p>
                <p className="text-sm text-white/80 mt-1">+5% vs last period</p>
              </div>
            </div>
          </div>
        );
      case 'success':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Success Rate by Project</h2>
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    +5% vs last period
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={successRateData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={150}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {successRateData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-4">
                  {successRateData.map((item, index) => (
                    <div key={item.name} className="flex items-center space-x-4">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                      <div className="flex-1">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>{item.name}</span>
                          <span>{item.value}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full" 
                            style={{ 
                              width: `${item.value}%`,
                              backgroundColor: COLORS[index % COLORS.length]
                            }} 
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl p-6 text-white">
                <h3 className="text-sm font-medium text-white/80">Overall Success Rate</h3>
                <p className="text-3xl font-bold mt-2">67%</p>
                <p className="text-sm text-white/80 mt-1">+5% vs last period</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl p-6 text-white">
                <h3 className="text-sm font-medium text-white/80">Average Grant Size</h3>
                <p className="text-3xl font-bold mt-2">£32,000</p>
                <p className="text-sm text-white/80 mt-1">+12% vs last period</p>
              </div>
            </div>
          </div>
        );
      case 'donors':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Donor Engagement</h2>
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                    +18% vs last period
                  </span>
                </div>
              </div>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={[
                    { month: 'Jan', new: 5, returning: 8, total: 13 },
                    { month: 'Feb', new: 7, returning: 10, total: 17 },
                    { month: 'Mar', new: 4, returning: 12, total: 16 },
                    { month: 'Apr', new: 6, returning: 9, total: 15 },
                    { month: 'May', new: 8, returning: 11, total: 19 },
                    { month: 'Jun', new: 9, returning: 13, total: 22 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="new" fill="#FF69B4" name="New Donors" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="returning" fill="#58E3EA" name="Returning Donors" radius={[4, 4, 0, 0]} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl p-6 text-white">
                <h3 className="text-sm font-medium text-white/80">Total Donors</h3>
                <p className="text-3xl font-bold mt-2">102</p>
                <p className="text-sm text-white/80 mt-1">+18% vs last period</p>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl p-6 text-white">
                <h3 className="text-sm font-medium text-white/80">New Donors</h3>
                <p className="text-3xl font-bold mt-2">39</p>
                <p className="text-sm text-white/80 mt-1">+22% vs last period</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl p-6 text-white">
                <h3 className="text-sm font-medium text-white/80">Returning Rate</h3>
                <p className="text-3xl font-bold mt-2">62%</p>
                <p className="text-sm text-white/80 mt-1">+5% vs last period</p>
              </div>
            </div>
          </div>
        );
      case 'impact':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Impact Metrics</h2>
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                    +25% vs last period
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-4">Community Engagement</h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Youth Program Participation</span>
                        <span className="font-semibold">85%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="h-3 rounded-full bg-gradient-to-r from-green-400 to-green-500" style={{ width: '85%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Volunteer Hours</span>
                        <span className="font-semibold">1,250</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="h-3 rounded-full bg-gradient-to-r from-blue-400 to-blue-500" style={{ width: '75%' }} />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-4">Program Outcomes</h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Skills Development</span>
                        <span className="font-semibold">92%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="h-3 rounded-full bg-gradient-to-r from-purple-400 to-purple-500" style={{ width: '92%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Employment Rate</span>
                        <span className="font-semibold">78%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="h-3 rounded-full bg-gradient-to-r from-orange-400 to-orange-500" style={{ width: '78%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl p-6 text-white">
                <h3 className="text-sm font-medium text-white/80">Total Beneficiaries</h3>
                <p className="text-3xl font-bold mt-2">1,250</p>
                <p className="text-sm text-white/80 mt-1">+25% vs last period</p>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl p-6 text-white">
                <h3 className="text-sm font-medium text-white/80">Program Completion Rate</h3>
                <p className="text-3xl font-bold mt-2">88%</p>
                <p className="text-sm text-white/80 mt-1">+8% vs last period</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="p-8 mt-16">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="text-gray-600 mt-2">Comprehensive insights and analysis of your fundraising activities</p>
          </div>
          <div className="flex space-x-4">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent shadow-sm"
            >
              <option value="1m">Last Month</option>
              <option value="3m">Last 3 Months</option>
              <option value="6m">Last 6 Months</option>
              <option value="1y">Last Year</option>
            </select>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent shadow-sm"
            >
              <option value="all">All Reports</option>
              <option value="funding">Funding Reports</option>
              <option value="success">Success Reports</option>
              <option value="donors">Donor Reports</option>
              <option value="impact">Impact Reports</option>
            </select>
          </div>
        </div>

        {/* Report Cards Grid */}
        {!selectedReport && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reports.map((report) => (
              <ReportCard
                key={report.id}
                title={report.title}
                description={report.description}
                icon={report.icon}
                onClick={() => setSelectedReport(report.id)}
                gradient={report.gradient}
                previewData={report.previewData}
              />
            ))}
          </div>
        )}

        {/* Selected Report Content */}
        {selectedReport && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => setSelectedReport(null)}
                className="text-sm text-gray-600 hover:text-gray-900 flex items-center group"
              >
                <svg className="w-4 h-4 mr-1 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Reports
              </button>
              <button className="bg-pink-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 shadow-sm transition-colors duration-200">
                Export Report
              </button>
            </div>
            {renderReport()}
          </div>
        )}
      </div>
    </div>
  );
} 
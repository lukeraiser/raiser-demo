import { NextResponse } from 'next/server';

const mockGrants = [
  {
    id: '1',
    title: 'National Lottery Community Fund',
    amount: 10000,
    status: 'researching',
    deadline: new Date('2025-06-30').toISOString(),
    description: 'Funding for community projects that matter',
    eligibility: 'UK registered charities and non-profit organisations',
    applicationDetails: 'Online application required with project plan',
    logo: '/images/lottery.png',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    projects: [],
  },
  {
    id: '2',
    title: 'The Fore',
    amount: 15000,
    status: 'eligible',
    deadline: new Date('2025-04-28').toISOString(),
    description: 'Supporting innovative solutions to social issues',
    eligibility: 'Small charities and social enterprises',
    applicationDetails: 'Two-stage application process',
    logo: '/images/fore.png',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    projects: [],
  },
  {
    id: '3',
    title: 'King Charles III Charitable Fund',
    amount: 25000,
    status: 'applied',
    deadline: new Date('2025-05-15').toISOString(),
    description: 'Supporting environmental and community initiatives',
    eligibility: 'UK registered environmental charities',
    applicationDetails: 'Detailed project proposal required',
    logo: '/images/king.png',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    projects: [],
  },
  {
    id: '4',
    title: 'Greggs Foundation',
    amount: 5000,
    status: 'successful',
    deadline: new Date('2025-04-18').toISOString(),
    description: 'Local community projects funding',
    eligibility: 'Local community organisations',
    applicationDetails: 'Simple online application',
    logo: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    projects: [],
  },
  {
    id: '5',
    title: 'Matthew Good Foundation',
    amount: 7500,
    status: 'unsuccessful',
    deadline: new Date('2025-04-01').toISOString(),
    description: 'Supporting grassroots charities',
    eligibility: 'Small UK charities with annual income under £50,000',
    applicationDetails: 'Monthly grant rounds',
    logo: '/images/matthew.png',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    projects: [],
  },
];

export async function GET() {
  return NextResponse.json(mockGrants);
}

export async function POST(request: Request) {
  try {
    // In demo mode, we just return a success response
    return NextResponse.json({ success: true, message: 'Grant created successfully (Demo)' });
  } catch (error) {
    console.error('Error creating grant:', error);
    return NextResponse.json(
      { error: 'Failed to create grant' },
      { status: 500 }
    );
  }
} 
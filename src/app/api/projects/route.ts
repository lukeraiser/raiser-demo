import { NextResponse } from 'next/server';

const mockProjects = [
  {
    id: '1',
    title: 'Core Costs',
    description: 'Essential operational costs to keep our organisation running effectively.',
    budget: 40000,
    raised: 25000,
    imageUrl: '/images/core-costs.jpg',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    metrics: [
      {
        id: '1',
        name: 'Staff Retention',
        value: 85,
        target: 90,
        unit: 'percent',
        projectId: '1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Operating Costs',
        value: 25000,
        target: 40000,
        unit: 'GBP',
        projectId: '1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    grants: [],
  },
  {
    id: '2',
    title: 'Youth Club',
    description: 'Supporting young people through engaging activities and mentorship.',
    budget: 25000,
    raised: 12000,
    imageUrl: '/images/youth-club.jpg',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    metrics: [
      {
        id: '3',
        name: 'Weekly Attendance',
        value: 45,
        target: 60,
        unit: 'participants',
        projectId: '2',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '4',
        name: 'Activities Offered',
        value: 8,
        target: 12,
        unit: 'programs',
        projectId: '2',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    grants: [],
  },
  {
    id: '3',
    title: 'Community Sports Program',
    description: 'Promoting health and community engagement through sports activities.',
    budget: 33000,
    raised: 8000,
    imageUrl: '/images/sports.jpg',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    metrics: [
      {
        id: '5',
        name: 'Active Members',
        value: 120,
        target: 200,
        unit: 'members',
        projectId: '3',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '6',
        name: 'Weekly Sessions',
        value: 6,
        target: 10,
        unit: 'sessions',
        projectId: '3',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    grants: [],
  },
];

export async function GET() {
  return NextResponse.json(mockProjects);
}

export async function POST(request: Request) {
  try {
    const { title, description, budget, raised, imageUrl, status } = await request.json();
    const project = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      description,
      budget,
      raised,
      imageUrl,
      status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      metrics: [],
      grants: [],
    };
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, ...data } = await request.json();
    if (!id) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }
    const project = await prisma.project.update({
      where: { id },
      data,
    });
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }
    await prisma.project.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
} 
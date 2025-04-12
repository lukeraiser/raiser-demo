import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Sample data
const users = [
  {
    id: 'demo_user',
    email: 'demo@example.com',
    name: 'Demo User',
  },
];

const charities = [
  {
    id: 'demo_charity',
    name: 'Demo Charity',
    description: 'A demonstration charity for testing purposes',
  },
];

const projects = [
  {
    id: 'demo_project',
    title: 'Demo Project',
    description: 'A demonstration project for testing purposes',
    budget: 100000,
    imageUrl: '/images/demo.png',
    status: 'active',
    charityId: 'demo_charity',
    createdBy: 'demo_user',
  },
];

const grants = [
  {
    id: 'demo_grant',
    title: 'Demo Grant',
    amount: 50000,
    status: 'researching',
    deadline: new Date('2025-12-31'),
    description: 'A demonstration grant for testing purposes',
    eligibility: 'Open to all demo projects',
    applicationDetails: 'Submit a demo application',
    logo: '/images/demo.png',
    createdBy: 'demo_user',
    donor: 'Demo Donor',
  },
];

const metrics = [
  {
    id: 'demo_metric',
    name: 'Demo Metric',
    value: 50,
    target: 100,
    unit: 'units',
    projectId: 'demo_project',
  },
];

async function main() {
  try {
    // Create users
    for (const user of users) {
      await prisma.user.upsert({
        where: { id: user.id },
        update: user,
        create: user,
      });
    }

    // Create charities
    for (const charity of charities) {
      await prisma.charity.upsert({
        where: { id: charity.id },
        update: charity,
        create: charity,
      });
    }

    // Create projects
    for (const project of projects) {
      await prisma.project.upsert({
        where: { id: project.id },
        update: project,
        create: project,
      });
    }

    // Create grants
    for (const grant of grants) {
      await prisma.grant.upsert({
        where: { id: grant.id },
        update: grant,
        create: grant,
      });
    }

    // Create metrics
    for (const metric of metrics) {
      await prisma.metric.upsert({
        where: { id: metric.id },
        update: metric,
        create: metric,
      });
    }

    console.log('Seed data created successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main(); 
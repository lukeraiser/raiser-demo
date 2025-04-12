import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.grant.deleteMany();
  await prisma.project.deleteMany();
  await prisma.charity.deleteMany();

  // Create a charity first
  const charity = await prisma.charity.create({
    data: {
      name: 'Demo Charity',
      description: 'A demonstration charity for testing purposes'
    }
  });

  // Create projects first
  const projects = await Promise.all([
    prisma.project.create({
      data: {
        title: 'Core Costs',
        description: 'Essential operational costs to keep our organisation running effectively.',
        budget: 40000,
        raised: 25000,
        imageUrl: '/images/core-costs.jpg',
        status: 'active',
        createdBy: 'demo_user',
        charityId: charity.id
      }
    }),
    prisma.project.create({
      data: {
        title: 'Youth Club',
        description: 'Supporting young people through engaging activities and mentorship.',
        budget: 25000,
        raised: 12000,
        imageUrl: '/images/youth-club.jpg',
        status: 'active',
        createdBy: 'demo_user',
        charityId: charity.id
      }
    }),
    prisma.project.create({
      data: {
        title: 'Community Sports Program',
        description: 'Promoting health and community engagement through sports activities.',
        budget: 33000,
        raised: 8000,
        imageUrl: '/images/sports.jpg',
        status: 'active',
        createdBy: 'demo_user',
        charityId: charity.id
      }
    })
  ]);

  // Create sample grants
  const grants = [
    {
      title: 'National Lottery Community Fund',
      amount: 10000,
      status: 'researching',
      deadline: new Date('2025-06-30'),
      description: 'Funding for community projects that matter',
      eligibility: 'UK registered charities and non-profit organisations',
      applicationDetails: 'Online application required with project plan',
      logo: '/images/lottery.png',
      projects: {
        connect: [{ id: projects[0].id }]
      }
    },
    {
      title: 'The Fore',
      amount: 15000,
      status: 'eligible',
      deadline: new Date('2025-04-28'),
      description: 'Supporting innovative solutions to social issues',
      eligibility: 'Small charities and social enterprises',
      applicationDetails: 'Two-stage application process',
      logo: '/images/fore.png',
      projects: {
        connect: [{ id: projects[1].id }]
      }
    },
    {
      title: 'King Charles III Charitable Fund',
      amount: 25000,
      status: 'applied',
      deadline: new Date('2025-05-15'),
      description: 'Supporting environmental and community initiatives',
      eligibility: 'UK registered environmental charities',
      applicationDetails: 'Detailed project proposal required',
      logo: '/images/king.png',
      projects: {
        connect: [{ id: projects[2].id }]
      }
    },
    {
      title: 'Greggs Foundation',
      amount: 5000,
      status: 'successful',
      deadline: new Date('2025-04-18'),
      description: 'Local community projects funding',
      eligibility: 'Local community organisations',
      applicationDetails: 'Simple online application',
      logo: null,
      projects: {
        connect: [{ id: projects[0].id }]
      }
    },
    {
      title: 'Matthew Good Foundation',
      amount: 7500,
      status: 'unsuccessful',
      deadline: new Date('2025-04-01'),
      description: 'Supporting grassroots charities',
      eligibility: 'Small UK charities with annual income under £50,000',
      applicationDetails: 'Monthly grant rounds',
      logo: '/images/matthew.png',
      projects: {
        connect: [{ id: projects[1].id }]
      }
    },
    {
      title: 'The Leathersellers\' Company',
      amount: 12000,
      status: 'researching',
      deadline: new Date('2025-09-30'),
      description: 'Supporting UK charities and educational initiatives',
      eligibility: 'UK registered charities working with disadvantaged communities',
      applicationDetails: 'Rolling programme with 8 application windows per year',
      logo: '/images/leathersellers.png',
      projects: {
        connect: [{ id: projects[2].id }]
      }
    },
    {
      title: 'Trusthouse Charitable Foundation',
      amount: 20000,
      status: 'eligible',
      deadline: new Date('2025-05-02'),
      description: 'Supporting rural and urban communities',
      eligibility: 'UK charities and not-for-profit organisations',
      applicationDetails: 'Online application with detailed project budget required',
      logo: '/images/trusthouse.webp',
      projects: {
        connect: [{ id: projects[0].id }]
      }
    },
    {
      title: 'The Clothworkers\' Foundation',
      amount: 30000,
      status: 'applied',
      deadline: new Date('2025-07-30'),
      description: 'Capital grants for UK charities',
      eligibility: 'UK registered charities with annual income under £2 million',
      applicationDetails: 'Two-stage application process for capital projects',
      logo: '/images/clothworkers.png',
      projects: {
        connect: [{ id: projects[1].id }]
      }
    },
    {
      title: 'UK Community Foundations',
      amount: 8000,
      status: 'researching',
      deadline: new Date('2025-10-15'),
      description: 'Local funding for community initiatives',
      eligibility: 'Community groups and small charities',
      applicationDetails: 'Application through local Community Foundation',
      logo: '/images/community.png',
      projects: {
        connect: [{ id: projects[2].id }]
      }
    },
    {
      title: 'Garfield Weston Foundation',
      amount: 40000,
      status: 'eligible',
      deadline: new Date('2025-09-01'),
      description: 'Supporting charities across the UK',
      eligibility: 'UK registered charities',
      applicationDetails: 'Regular grants programme with online application',
      logo: null,
      projects: {
        connect: [{ id: projects[0].id }]
      }
    },
    {
      title: 'The Tudor Trust',
      amount: 35000,
      status: 'applied',
      deadline: new Date('2025-08-30'),
      description: 'Core funding for voluntary and community groups',
      eligibility: 'UK organisations working for positive social change',
      applicationDetails: 'Two-stage application process with initial proposal',
      logo: null,
      projects: {
        connect: [{ id: projects[1].id }]
      }
    },
    {
      title: 'Esmée Fairbairn Foundation',
      amount: 50000,
      status: 'researching',
      deadline: new Date('2025-11-15'),
      description: 'Supporting social change and environmental protection',
      eligibility: 'UK organisations with clear social impact',
      applicationDetails: 'Expression of interest required before full application',
      logo: null,
      projects: {
        connect: [{ id: projects[2].id }]
      }
    },
    {
      title: 'Lloyds Bank Foundation',
      amount: 25000,
      status: 'drafting',
      deadline: new Date('2025-07-15'),
      description: 'Supporting small and local charities',
      eligibility: 'UK charities with income under £1 million',
      applicationDetails: 'Two-stage application process with development support',
      logo: null,
      projects: {
        connect: [{ id: projects[0].id }]
      }
    },
    {
      title: 'The Wolfson Foundation',
      amount: 35000,
      status: 'drafting',
      deadline: new Date('2025-08-20'),
      description: 'Capital funding for charities and educational institutions',
      eligibility: 'UK registered charities and educational institutions',
      applicationDetails: 'Detailed project proposal and budget required',
      logo: null,
      projects: {
        connect: [{ id: projects[1].id }]
      }
    }
  ];

  // Create grants
  for (const grant of grants) {
    await prisma.grant.create({
      data: {
        ...grant,
        createdBy: 'demo_user', // Clerk user ID
        donor: 'Demo Donor Organization' // Name of the donor organization
      },
    });
  }

  console.log('Database seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 
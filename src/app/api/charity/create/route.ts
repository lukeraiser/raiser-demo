import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, description, website, address } = await request.json();

    // Create the charity
    const charity = await prisma.charity.create({
      data: {
        name,
        description,
        website,
        address,
      },
    });

    // Create the user profile and associate it with the charity
    await prisma.userProfile.create({
      data: {
        id: userId,
        role: 'admin', // First user is admin
        charityId: charity.id,
      },
    });

    return NextResponse.json(charity);
  } catch (error) {
    console.error('Error creating charity:', error);
    return NextResponse.json(
      { error: 'Failed to create charity' },
      { status: 500 }
    );
  }
} 
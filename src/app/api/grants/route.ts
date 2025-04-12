import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    console.log('Fetching grants from database...');
    const grants = await prisma.grant.findMany({
      include: {
        projects: {
          include: {
            metrics: true
          }
        }
      }
    });
    console.log('Found grants:', grants);

    return NextResponse.json(grants);
  } catch (error) {
    console.error('Error fetching grants:', error);
    return NextResponse.json(
      { error: 'Failed to fetch grants' },
      { status: 500 }
    );
  }
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
import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { userId } = getAuth(req);
    
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const grants = await prisma.grant.findMany({
      include: {
        comments: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(grants);
  } catch (error) {
    console.error('[GRANTS_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req);
    
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const { title, amount, status, project, deadline, description } = body;

    if (!title || !amount || !status || !project) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const grant = await prisma.grant.create({
      data: {
        title,
        amount: parseFloat(amount),
        status,
        project,
        deadline: deadline ? new Date(deadline) : null,
        description,
        createdBy: userId,
        assignedTo: userId,
      },
    });

    return NextResponse.json(grant);
  } catch (error) {
    console.error('[GRANTS_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
} 
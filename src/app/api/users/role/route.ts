import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { roleAssignmentSchema } from '@/lib/validations';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = roleAssignmentSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    const { userId, roleType, permissions } = parsed.data;
    const userRole = await prisma.userRole.upsert({
      where: { userId },
      update: { roleType, permissions },
      create: { userId, roleType, permissions },
    });
    return NextResponse.json({ userRole }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to assign role' }, { status: 500 });
  }
}

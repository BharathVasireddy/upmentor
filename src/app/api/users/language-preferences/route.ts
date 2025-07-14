import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { languagePreferencesSchema } from '@/lib/validations';

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = languagePreferencesSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    const { userId, primaryLanguage, languagesSpoken } = parsed.data;
    const user = await prisma.user.update({
      where: { id: userId },
      data: { primaryLanguage, languagesSpoken },
    });
    return NextResponse.json({ user: { id: user.id, primaryLanguage: user.primaryLanguage, languagesSpoken: user.languagesSpoken } }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update language preferences' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { db } from '@/db';
import { names } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idStr } = await params;
  const body = await request.json();
  const { vote } = body;

  const id = parseInt(idStr, 10);
  const voteInt = parseInt(vote, 10);

  if (isNaN(id) || (voteInt !== 1 && voteInt !== -1)) {
    return NextResponse.json({ error: 'invalid' }, { status: 400 });
  }

  await db
    .update(names)
    .set({ score: sql`${names.score} + ${voteInt}` })
    .where(eq(names.id, id));

  return NextResponse.json({ ok: true });
}

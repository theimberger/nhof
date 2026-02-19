import { NextResponse } from 'next/server';
import { db } from '@/db';
import { names } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';

const BLACKLIST = [
  'adolf hitler',
  'george bernard shaw',
  'kim jung-un',
  'jeffrey dahmer',
  'charles manson',
];

export async function GET() {
  const results = await db
    .select({
      id: names.id,
      name: names.name,
      date: names.createdAt,
      bio: names.bio,
      score: names.score,
    })
    .from(names)
    .orderBy(desc(names.id));

  return NextResponse.json(results);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, bio } = body;

  if (!name || !bio) {
    return NextResponse.json({ type: 'already submitted' }, { status: 422 });
  }

  if (typeof name !== 'string' || name.length > 200) {
    return NextResponse.json({ type: 'invalid', field: 'name' }, { status: 422 });
  }

  if (typeof bio !== 'string' || bio.length > 2000) {
    return NextResponse.json({ type: 'invalid', field: 'bio' }, { status: 422 });
  }

  if (BLACKLIST.includes(name.toLowerCase())) {
    return NextResponse.json({ type: 'blacklisted' }, { status: 422 });
  }

  try {
    const existing = await db
      .select({ id: names.id })
      .from(names)
      .where(eq(names.name, name));

    if (existing.length > 0) {
      return NextResponse.json({ type: 'already submitted' }, { status: 422 });
    }

    const [inserted] = await db
      .insert(names)
      .values({ name, bio, createdAt: new Date(), updatedAt: new Date() })
      .returning({
        id: names.id,
        name: names.name,
        date: names.createdAt,
        bio: names.bio,
        score: names.score,
      });

    return NextResponse.json(inserted, { status: 201 });
  } catch (err: unknown) {
    if (
      typeof err === 'object' &&
      err !== null &&
      'code' in err &&
      (err as { code: string }).code === '23505'
    ) {
      return NextResponse.json({ type: 'already submitted' }, { status: 422 });
    }
    return NextResponse.json({ type: 'error' }, { status: 500 });
  }
}

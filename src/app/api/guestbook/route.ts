import { NextResponse } from 'next/server';
import { getGuestbookEntries, signGuestbook } from '@/lib/services';

export async function GET() {
  try {
    const entries = await getGuestbookEntries();
    return NextResponse.json(entries);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch guestbook' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, message } = await req.json();
    
    if (!name || !message) {
      return NextResponse.json({ error: 'Name and message are required' }, { status: 400 });
    }

    const newEntry = await signGuestbook(name, message);
    return NextResponse.json(newEntry, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to sign guestbook' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Here you would typically send an email or save to a database
    // For now, we'll log it to the server console
    console.log('New Contact Form Submission:', { name, email, message });

    return NextResponse.json({ 
      success: true, 
      message: 'Transmission received. Protocol initiated.' 
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'System Malfunction' },
      { status: 500 }
    );
  }
}
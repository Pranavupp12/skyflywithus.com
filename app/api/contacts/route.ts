import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; 

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Validation
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // We can use (prisma as any) to bypass the editor cache bug
    const message = await (prisma as any).contactMessage.create({
      data: {
        name: data.name,
        email: data.email,
        company: data.company,
        message: data.message,
      },
    });

    return NextResponse.json(message, { status: 201 });
  } catch (error: any) {
    console.error('Contact Form Error:', error);
    if (error instanceof TypeError && error.message.includes("Cannot read properties of undefined")) {
      return NextResponse.json({ error: 'Database client is not initialized.' }, { status: 500 });
    }
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
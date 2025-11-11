import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from "next-auth/next";
// @ts-ignore
import { authOptions } from "@/lib/auth.config";

interface Params {
    id: string;
}

// --- PATCH (Update specific FAQ) ---
// 1. Define params as Promise<Params>
export async function PATCH(req: Request, { params }: { params: Promise<Params> }) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  // 2. Await the params object
  const { id: faqId } = await params;

  try {
    const { question, answer } = await req.json();

    // 3. The where clause is now correctly receiving a defined string (faqId)
    const updatedFaq = await prisma.faq.update({
      where: { id: faqId },
      data: { question, answer },
    });

    return NextResponse.json(updatedFaq, { status: 200 });
  } catch (error) {
    console.error('FAQ Update Error:', error);
    return NextResponse.json({ error: 'Failed to update FAQ' }, { status: 500 });
  }
}

// --- DELETE (Delete specific FAQ) ---
// 1. Define params as Promise<Params>
export async function DELETE(req: Request, { params }: { params: Promise<Params> }) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  // 2. Await the params object
  const { id: faqId } = await params;
  
  try {
    // This will now correctly receive a defined string
    await prisma.faq.delete({
      where: { id: faqId },
    });

    return NextResponse.json({ message: 'FAQ deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('FAQ Delete Error:', error);
    if ((error as any).code === 'P2025') {
        return NextResponse.json({ error: 'FAQ not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Failed to delete FAQ' }, { status: 500 });
  }
}
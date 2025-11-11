import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from "next-auth/next";
// @ts-ignore
import { authOptions } from "@/lib/auth.config";


// --- GET (Read all FAQs for a specific blog) ---
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const blogId = searchParams.get('blogId');

    if (!blogId) {
        return NextResponse.json({ error: 'Missing blogId parameter' }, { status: 400 });
    }
    
    try {
        const faqs = await prisma.faq.findMany({
            where: { blogId },
            orderBy: { id: 'asc' }, // Order by ID for consistency
        });
        console.log(`[FAQ DEBUG] Fetched ${faqs.length} FAQs for blog ID: ${blogId}`);
        return NextResponse.json(faqs, { status: 200 });
    } catch (error) {
        console.error('FAQ Read Error:', error);
        return NextResponse.json({ error: 'Failed to fetch FAQs' }, { status: 500 });
    }
}

// --- POST (Create new FAQ) ---
export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    try {
        const { blogId, question, answer } = await req.json();

        if (!blogId || !question || !answer) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const newFaq = await prisma.faq.create({
            data: { blogId, question, answer },
        });

        return NextResponse.json(newFaq, { status: 201 });
    } catch (error) {
        console.error('FAQ Create Error:', error);
        return NextResponse.json({ error: 'Failed to create FAQ' }, { status: 500 });
    }
}
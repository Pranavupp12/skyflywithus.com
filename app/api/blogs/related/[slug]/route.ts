// app/api/blogs/related/[slug]/route.ts

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

interface Params {
    slug: string;
}

export async function GET(req: Request, { params }:{ params: Promise<Params> }) {
    const { slug } = await params;

    if (!slug) {
        return NextResponse.json({ error: 'Missing slug parameter' }, { status: 400 });
    }

    try {
        // 1. Find the current post to get its category and ID
        const currentPost = await prisma.blog.findUnique({
            where: { slug: slug },
            select: { 
                id: true, 
                category: true, 
                authorId: true, // Need this to find the author name later
            },
        });

        if (!currentPost) {
            return NextResponse.json({ error: 'Source post not found' }, { status: 404 });
        }

        // 2. Fetch related posts by category, excluding the current post
        const relatedBlogs = await prisma.blog.findMany({
            where: {
                category: currentPost.category,
                NOT: { id: currentPost.id }, // Exclude the current blog
            },
            orderBy: { createdAt: 'desc' },
            take: 3, // Limit to 3 posts for the sidebar
            include: {
                author: { select: { name: true } } // Include author name for display
            }
        });

        // 3. Format the data for the frontend
        const formattedRelatedBlogs = relatedBlogs.map(blog => ({
            id: blog.id,
            title: blog.title,
            slug: blog.slug,
            category: blog.category,
            authorName: blog.author.name,
            publishDate: new Date(blog.createdAt).toLocaleDateString('en-GB'),
        }));

        return NextResponse.json(formattedRelatedBlogs, { status: 200 });
    } catch (error) {
        console.error('Related Blog Fetch Error:', error);
        return NextResponse.json({ error: 'Failed to fetch related posts' }, { status: 500 });
    }
}
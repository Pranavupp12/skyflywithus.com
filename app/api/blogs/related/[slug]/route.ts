import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

interface Params {
    slug: string;
}

export async function GET(req: Request, { params }:{ params: Promise<Params> }) {
    const { slug } = await params;
    if (!slug) return NextResponse.json({ error: 'Missing slug' }, { status: 400 });

    try {
        // 1. Find current post
        const currentPost = await prisma.blog.findUnique({
            where: { slug: slug },
            select: { id: true, categories: true }, // Select categories array
        });

        if (!currentPost) return NextResponse.json({ error: 'Post not found' }, { status: 404 });

        // 2. Fetch related: Where categories array has SOME values in common with currentPost.categories
        const relatedBlogs = await prisma.blog.findMany({
            where: {
                categories: { hasSome: currentPost.categories }, // Prisma Array Filter
                NOT: { id: currentPost.id },
            },
            orderBy: { createdAt: 'desc' },
            take: 4,
            include: { author: { select: { name: true } } }
        });

        const formattedRelatedBlogs = relatedBlogs.map(blog => ({
            id: blog.id,
            title: blog.title,
            image: blog.image,
            slug: blog.slug,
            categories: blog.categories, // Return array
            authorName: blog.author.name,
            publishDate: new Date(blog.createdAt).toLocaleDateString('en-GB'),
        }));

        return NextResponse.json(formattedRelatedBlogs, { status: 200 });
    } catch (error) {
        console.error('Related Blog Error:', error);
        return NextResponse.json({ error: 'Failed to fetch related' }, { status: 500 });
    }
}
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Use alias for app directory

export async function GET() {
    try {
        const blogs = await prisma.blog.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            // Include author name for display on the card
            include: {
                author: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        // We must map the data to the format the frontend expects (AuthorName, ImageUrl, etc.)
        const formattedBlogs = blogs.map(blog => ({
            id: blog.id,
            title: blog.title,
            slug: blog.slug,
            category: blog.category,
            categorySlug: blog.category.toLowerCase().replace(/\s+/g, '-'), // Generate slug for links
            description: blog.metaDesc, // Using metaDesc as the card description
            imageUrl: blog.image,
            authorName: blog.author.name,
            publishDate: new Date(blog.createdAt).toLocaleDateString('en-GB'), // Use GB format (dd/mm/yyyy)
            content: blog.content,
            metaTitle: blog.metaTitle,
            metaDesc: blog.metaDesc,
            metaKeywords: blog.metaKeywords,
            faqs: [], // Placeholder for now, as the card doesn't need them
        }));

        return NextResponse.json(formattedBlogs, { status: 200 });
    } catch (error) {
        console.error('Fetch All Blogs Error:', error);
        return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
    }
}
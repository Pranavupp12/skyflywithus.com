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

        // We must map the data to the format the frontend expects
        const formattedBlogs = blogs.map(blog => ({
            id: blog.id,
            title: blog.title,
            slug: blog.slug,
            
            // FIX: Map the first category from the array to the single string expected by the UI
            category: blog.categories[0] || "Uncategorized",
            categories: blog.categories, // Pass the full array just in case
            
            // FIX: Generate slug from the first category
            categorySlug: (blog.categories[0] || "").toLowerCase().replace(/\s+/g, '-'), 
            
            description: blog.metaDesc, // Using metaDesc as the card description
            imageUrl: blog.image,
            // Added safety check for author
            authorName: blog.author?.name || "Unknown Author",
            publishDate: new Date(blog.createdAt).toLocaleDateString('en-GB'), // Use GB format (dd/mm/yyyy)
            content: blog.content,
            metaTitle: blog.metaTitle,
            metaDesc: blog.metaDesc,
            metaKeywords: blog.metaKeywords,
            faqs: [], // Placeholder for now
        }));

        return NextResponse.json(formattedBlogs, { status: 200 });
    } catch (error) {
        console.error('Fetch All Blogs Error:', error);
        return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
    }
}
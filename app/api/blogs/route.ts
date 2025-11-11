import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // This import is fine for the app/ dir
// @ts-ignore
import { authOptions } from "@/lib/auth.config";
import { getServerSession } from "next-auth/next";

export async function POST(req: Request) {
  // Get the session to find the author's ID
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const data = await req.json();

    // Validate required fields
    if (!data.title || !data.slug || !data.category || !data.content || !data.image || !data.metaTitle || !data.metaDesc || !data.metaKeywords) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // --- FIX 2: Use (prisma as any) to bypass the editor cache error ---
    const existingSlug = await (prisma as any).blog.findUnique({
      where: { slug: data.slug },
    });

    if (existingSlug) {
      return NextResponse.json({ error: 'This slug (blog URL) is already in use.' }, { status: 409 });
    }

    // --- FIX 2: Use (prisma as any) here as well ---
    const newBlog = await (prisma as any).blog.create({
      data: {
        title: data.title,
        slug: data.slug,
        category: data.category,
        content: data.content,
        image: data.image,
        metaTitle: data.metaTitle,
        metaDesc: data.metaDesc,
        metaKeywords: data.metaKeywords,
        authorId: session.user.id, // Link the blog to the logged-in user
      },
    });

    return NextResponse.json(newBlog, { status: 201 });

  } catch (error: any) {
    console.error('Blog Creation Error:', error);
    if (error.code === 'P2002' && error.meta?.target.includes('slug')) {
      return NextResponse.json({ error: 'This slug (blog URL) is already in use.' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Something went wrong on the server' }, { status: 500 });
  }
}

// Define the handler for GET requests (Read/Filter Blogs)
export async function GET(req: Request) {
    const url = new URL(req.url);
    const categoryName = url.searchParams.get('category');// We filter by the full name

    console.log(`[DEBUG] Fetching blogs with category filter: ${categoryName}`);

    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '6', 10); // Default to 6 per page
    const skip = (page - 1) * limit;

    const whereClause: { category?: string } = {};

    // Apply filter if category name is provided
    if (categoryName) {
        whereClause.category = categoryName; 
    }

    try {
      
        const totalPosts = await prisma.blog.count({ where: whereClause });

        const blogs = await prisma.blog.findMany({
            where: whereClause, // Filters by category name
            orderBy: {
                createdAt: 'desc',
            },
            skip: skip, 
            take: limit, 
            select: {
                id: true,
                title: true,
                slug: true,
                category: true, // Used for display
                content: true,
                image: true,
                metaTitle: true,
                metaDesc: true, // Used for card description
                metaKeywords: true,
                createdAt: true,
                author: { select: { name: true } },
            }
        });

        // Map the data for the frontend
        const formattedBlogs = blogs.map(blog => ({
            id: blog.id,
            title: blog.title,
            slug: blog.slug,
            category: blog.category,
            // FIX: Create categorySlug from name (e.g., "Compensation" -> "compensation")
            categorySlug: blog.category.toLowerCase().replace(/\s+/g, '-'), 
            description: blog.metaDesc, // FIX: Using metaDesc as the card summary
            imageUrl: blog.image,
            authorName: blog.author.name,
            publishDate: new Date(blog.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            content: blog.content,
            metaTitle: blog.metaTitle,
            metaDesc: blog.metaDesc,
            metaKeywords: blog.metaKeywords,
            faqs: [], // Initialize empty array for the interface
        }));

        return NextResponse.json({
            data: formattedBlogs,
            metadata: {
                totalPosts: totalPosts,
                totalPages: Math.ceil(totalPosts / limit),
                currentPage: page,
                limit: limit,
            },
        }, { status: 200 });
    } catch (error) {
        console.error('Fetch Blogs Error:', error);
        return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
    }
}
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Keep your preferred import
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth.config"; // Ensure this path matches your setup

// --- POST (Create Blog with Multiple Categories) ---
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const data = await req.json();

    // 1. Validate 'categories' array instead of single 'category'
    if (!data.title || !data.slug || !data.categories || data.categories.length === 0 || !data.content || !data.image) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 2. Check for slug conflict
    const existingSlug = await prisma.blog.findUnique({
      where: { slug: data.slug },
    });

    if (existingSlug) {
      return NextResponse.json({ error: 'This slug (blog URL) is already in use.' }, { status: 409 });
    }

    // 3. Create the blog post (Saving categories array)
    const newBlog = await prisma.blog.create({
      data: {
        title: data.title,
        slug: data.slug,
        categories: data.categories, // <--- SAVING ARRAY
        content: data.content,
        image: data.image,
        metaTitle: data.metaTitle,
        metaDesc: data.metaDesc,
        metaKeywords: data.metaKeywords,
        authorId: session.user.id,
      },
    });

    return NextResponse.json(newBlog, { status: 201 });

  } catch (error: any) {
    console.error('Blog Creation Error:', error);
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'This slug is already in use.' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Something went wrong on the server' }, { status: 500 });
  }
}

// --- GET (Fetch Blogs with Optional Category Filter & Pagination) ---
export async function GET(req: Request) {
    const url = new URL(req.url);
    const categoryName = url.searchParams.get('category');
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '6', 10);
    const skip = (page - 1) * limit;

    console.log(`[API DEBUG] Fetching blogs. Category: ${categoryName}, Page: ${page}`);

    const whereClause: any = {};

    if (categoryName) {
        // Correct Prisma syntax for filtering a String[] array
        whereClause.categories = { has: categoryName };
    }

    try {
        const totalPosts = await prisma.blog.count({ where: whereClause });
        
        const blogs = await prisma.blog.findMany({
            where: whereClause,
            orderBy: { createdAt: 'desc' },
            skip: skip,
            take: limit,
            include: { author: { select: { name: true } } },
        });

        // Map data
        const formattedBlogs = blogs.map(blog => ({
            id: blog.id,
            title: blog.title,
            slug: blog.slug,
            
            // ✅ FIX: Pass the full array to the frontend so cards can show multiple badges
            categories: blog.categories, 

            // Fallbacks for backward compatibility
            category: (blog.categories && blog.categories.length > 0) ? blog.categories[0] : "Uncategorized",
            categorySlug: (blog.categories && blog.categories.length > 0) ? blog.categories[0].toLowerCase().replace(/\s+/g, '-') : "uncategorized",
            
            description: blog.metaDesc,
            imageUrl: blog.image,
            authorName: blog.author?.name || "Unknown Author",
            publishDate: new Date(blog.createdAt).toLocaleDateString('en-GB'),
            content: blog.content,
            metaTitle: blog.metaTitle,
            metaDesc: blog.metaDesc,
            metaKeywords: blog.metaKeywords,
            faqs: [],
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
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from "next-auth/next";
// @ts-ignore
import { authOptions } from "@/lib/auth.config";

// Define the type for the dynamic parameter
interface Params {
  slug: string;
}

// --- GET (Fetch a single blog post by slug) ---
export async function GET(
  req: Request,
  { params }: { params: Promise<Params> }
) {
  const { slug } = await params;

  if (!slug) {
    return NextResponse.json(
      { error: "Missing slug parameter" },
      { status: 400 }
    );
  }

  const isId = slug.length === 24 && /^[0-9a-fA-F]+$/.test(slug);

  try {
    const blog = await prisma.blog.findUnique({
      where: isId ? { id: slug } : { slug: slug },
      include: {
        author: { select: { name: true } },
        faqs: {
          select: {
            id: true,
            question: true,
            answer: true,
            blogId: true,
          },
        },
      },
    });

    if (!blog) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Format the data for the frontend Article interface
    const formattedBlog = {
      id: blog.id,
      title: blog.title,
      slug: blog.slug,
      
      // Handle Array -> Single string for frontend display
      category: blog.categories[0] || "Uncategorized", 
      categories: blog.categories, // Pass the full array if needed
      
      // Generate slug from the first category
      categorySlug: (blog.categories[0] || "").toLowerCase().replace(/\s+/g, "-"),
      
      description: blog.metaDesc,
      imageUrl: blog.image,
      authorName: blog.author?.name || "Unknown Author",
      publishDate: new Date(blog.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      content: blog.content,
      
      // 👇 NEW: Return focusKeyword to frontend (default empty string)
      focusKeyword: blog.focusKeyword || "",

      metaTitle: blog.metaTitle,
      metaDesc: blog.metaDesc,
      metaKeywords: blog.metaKeywords,
      // Map FAQs
      faqs: blog.faqs.map((f) => ({
        id: f.id,
        question: f.question,
        answer: f.answer,
      })),
    };

    return NextResponse.json(formattedBlog, { status: 200 });
  } catch (error) {
    console.error("Single Blog Fetch Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}

// --- PATCH (Update a blog post - used by Dashboard) ---
export async function PATCH(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { slug: blogSlug } = await params;

  try {
    const data = await req.json();

    // 1. Check for slug conflict
    const existingSlug = await prisma.blog.findFirst({
      where: {
        slug: data.slug,
        NOT: { slug: blogSlug },
      },
    });

    if (existingSlug) {
      return NextResponse.json(
        { error: "This slug is already in use by another post." },
        { status: 409 }
      );
    }

    // 2. Perform the update
    const updatedBlog = await prisma.blog.update({
      where: { slug: blogSlug },
      data: {
        title: data.title,
        slug: data.slug,
        categories: data.categories, 
        content: data.content,
        image: data.image,
        
        // 👇 NEW: Allow updating the focusKeyword
        focusKeyword: data.focusKeyword,

        metaTitle: data.metaTitle,
        metaDesc: data.metaDesc,
        metaKeywords: data.metaKeywords,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedBlog, { status: 200 });
  } catch (error) {
    console.error("Blog Update Error:", error);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}

// --- DELETE (Delete a blog post - used by Dashboard) ---
export async function DELETE(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { slug: blogSlug } = await params;

  try {
    const blogToDelete = await prisma.blog.findUnique({
      where: { slug: blogSlug },
    });

    if (!blogToDelete) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Delete associated FAQs first
    await prisma.faq.deleteMany({
      where: { blogId: blogToDelete.id },
    });

    // Delete the blog post
    const deletedBlog = await prisma.blog.delete({
      where: { id: blogToDelete.id },
    });

    return NextResponse.json(
      { message: "Blog and associated FAQs deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Blog Delete Error:", error);
    if ((error as any).code === "P2025") {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
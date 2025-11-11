import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DeleteBlogDialog } from "./DeleteBlogDialog"; 
import { UpdateBlogDialog } from "./UpdateBlogDialog";
import prisma from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { ListTree } from "lucide-react";
import Link from "next/link";
// --- NEW IMPORTS ---
import { PaginationControls } from "@/components/ui/pagination-controls";
import { Prisma } from "@prisma/client";
// -------------------

// Define the expected payload type (Blog with Author name)
type BlogTablePayload = Prisma.BlogGetPayload<{
    include: {
        author: {
            select: {
                name: true;
            };
        };
    };
}>;

interface PaginatedData {
    data: BlogTablePayload[];
    metadata: {
        totalPosts: number;
        totalPages: number;
        currentPage: number;
        limit: number;
    };
}

// --- Updated Fetch Function ---
async function getBlogs(page: number, limit: number): Promise<PaginatedData> {
  const skip = (page - 1) * limit;
  const emptyResult = { data: [], metadata: { totalPosts: 0, totalPages: 1, currentPage: page, limit: limit } };

  try {
    const totalPosts = await prisma.blog.count();
    
    // Fetch paginated blogs
    const blogs = await prisma.blog.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      skip: skip,
      take: limit, // Apply limit
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    
    // Calculate final metadata and return
    return {
        data: blogs as BlogTablePayload[],
        metadata: {
            totalPosts: totalPosts,
            totalPages: Math.ceil(totalPosts / limit),
            currentPage: page,
            limit: limit,
        },
    };

  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return emptyResult;
  }
}
// -----------------------------

// --- BlogTable Component (The Fix) ---
interface BlogTableProps {
    searchParams: { page?: string } | Promise<{ page?: string }>; // FIX 1: searchParams must be a Promise
}

// --- BlogTable Component (Updated) ---
export async function BlogTable({ searchParams }:  BlogTableProps) {
  const limit = 10;
  
  // FIX 2: Safely await the searchParams object
  const resolvedSearchParams = await searchParams;
  const currentPage = parseInt(resolvedSearchParams.page || '1', 10);
  
  // Fetch data
  const { data: blogs, metadata } = await getBlogs(currentPage, limit);

  return (
    <>
    <div className="rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md">
      <div className="p-6">
        <h2 className="text-2xl font-semibold">Existing Blog Posts (Page {currentPage} of {metadata.totalPages})</h2>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">S.No.</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Published At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogs.map((blog, index) => (
            <TableRow key={blog.id}>
              {/* Calculate S.No based on current page and limit */}
              <TableCell>{(currentPage - 1) * limit + index + 1}</TableCell>
              <TableCell className="font-medium max-w-xs truncate">{blog.title}</TableCell>
              <TableCell>{blog.author.name}</TableCell>
              <TableCell>{formatDate(blog.createdAt)}</TableCell>
              <TableCell className="flex gap-2">
               <UpdateBlogDialog blog={blog} />
               <DeleteBlogDialog blogSlug={blog.slug} blogTitle={blog.title} />
               <Link href={`/dashboard/blogs/faqs/${blog.id}`} passHref>
                    <Button variant="secondary" size="sm">
                        <ListTree className="h-4 w-4 mr-2" />
                        FAQs
                    </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {blogs.length === 0 && (
        <p className="text-center text-gray-500 py-8">
          No blog posts found. Create one above to get started.
        </p>
      )}
    </div>
    {/* Render Pagination Controls */}
      <PaginationControls 
        currentPage={metadata.currentPage}
        totalPages={metadata.totalPages}
      />
      </>
  );
}
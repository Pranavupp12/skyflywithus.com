import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DeleteBlogDialog } from "./DeleteBlogDialog"; 
import { UpdateBlogDialog } from "./UpdateBlogDialog";
import prisma from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { Pencil, Trash2, ListTree } from "lucide-react";
import Link from "next/link";

// This component is a Server Component, so we fetch data directly
async function getBlogs() {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      // We include the 'author' to get their name
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return blogs;
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return [];
  }
}

export async function BlogTable() {
  const blogs = await getBlogs();

  return (
    <div className="rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md">
      <div className="p-6">
        <h2 className="text-2xl font-semibold">Existing Blog Posts</h2>
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
              <TableCell>{index + 1}</TableCell>
              <TableCell className="font-medium max-w-xs truncate">{blog.title}</TableCell>
              <TableCell>{blog.author.name}</TableCell>
              <TableCell>{formatDate(blog.createdAt)}</TableCell>
              <TableCell className="flex gap-2">
               {/* 1. USE UPDATE MODAL */}
                <UpdateBlogDialog blog={blog} />
                
                {/* 2. USE DELETE MODAL */}
                <DeleteBlogDialog blogSlug={blog.slug} blogTitle={blog.title} />
                
                {/* 3. MANAGE FAQs LINK */}
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
  );
}
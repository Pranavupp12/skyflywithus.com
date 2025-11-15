// app/(main)/blog/page.tsx

import Link from "next/link";
import { BlogCard, Article } from "@/components/blog_components/blog-card";
import { PaginationControls } from "@/components/ui/pagination-controls";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Blog Articles',
  description: 'Browse all blog articles from SkyFlyWithUs.',
  robots: {
    index: false, // Do not index this main list page
    follow: true, // But DO follow the links to the articles
  },
};

const emptyMetadata = {
    totalPosts: 0,
    totalPages: 1,
    currentPage: 1,
    limit: 6,
};

// --- Data Fetching Function ---
async function getAllBlogs(page:number): Promise<{data:Article[],metadata:any}> {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/blogs?page=${page}&limit=6`, {
        cache: 'no-store',
    });

    if (!response.ok) return { data: [], metadata: emptyMetadata };
    
    return await response.json(); 

  } catch (error) {
    console.error("All Blogs Page Fetch Error:", error);
    return { data: [], metadata: {} };
  }
}

const categories = [
  { name: "Cancellation and Refund", slug: "cancellation-and-refund" },
  { name: "Change Flight", slug: "change-flight" },
  { name: "Compensation", slug: "compensation" },
  { name: "Seat Upgrade", slug: "seat-upgrade" },
  { name: "Voucher", slug: "voucher" },
  { name: "Lost and Found", slug: "lost-and-found" },
  { name: "Check In", slug: "check-in" },
  { name: "Airport", slug: "airport" },
];

const sortedCategories = [...categories].sort((a, b) => a.name.localeCompare(b.name));

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ page?: string }>}) {

  // 1. Await the searchParams object to ensure it is resolved
  const resolvedSearchParams = await searchParams;

  // 2. Access the 'page' parameter from the resolved object
  const currentPage = parseInt(resolvedSearchParams.page || '1', 10);

  const { data: allBlogs, metadata } = await getAllBlogs(currentPage);

  return (
    <main className="mx-5 md:mx-15 mt-20 mb-20">
      {/* Page Header */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-regular text-black dark:text-white mb-4">
          Our <span className="text-[#FF8C00] font-semibold">Blogs</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          All the latest travel tips, airline guides, and booking advice from
          the SkyFlyWithUs team.
        </p>
      </div>

      {/* NEW: Browse by Category Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-regular mb-6 text-center">
          Browse by Category
        </h2>
        <div className="flex flex-wrap h-auto justify-center gap-2">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/blog/category/${category.slug}`}
              className="bg-[#FF8C00] hover:bg-[#FFA749] dark:bg-gray-800 dark:hover:bg-gray-700 text-white dark:text-gray-200 px-4 py-2 rounded-full text-sm font-medium transition-colors"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allBlogs.length > 0 ? (
            allBlogs.map((article) => (
              <BlogCard key={article.id} article={article} />
            ))
        ) : (
            <p className="text-center text-gray-500 py-8 col-span-3">No articles found in the database.</p>
        )}
      </div>

      {/* Pagination Controls */}
      <PaginationControls 
        currentPage={metadata.currentPage}
        totalPages={metadata.totalPages}
      />
    </main>
  );
}
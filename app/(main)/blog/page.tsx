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

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ page?: string }>}) {

  // 1. Await the searchParams object to ensure it is resolved
  const resolvedSearchParams = await searchParams;

  // 2. Access the 'page' parameter from the resolved object
  const currentPage = parseInt(resolvedSearchParams.page || '1', 10);

  const { data: allBlogs, metadata } = await getAllBlogs(currentPage);

  return (
    // FIX: Applied negative margins to stretch background full width
    // Added min-h-screen to ensure background covers tall screens
    <main className="w-full min-h-screen bg-[#FFF5EB]/50 py-24">
      
      {/* Container to align content */}
      <div className="container mx-auto px-6 mt-10">
        
        {/* NEW DESIGN: Hero Section (Title + Categories) */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-[#FF8C00] font-bold tracking-wider uppercase text-sm mb-3">
            Travel Insights
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Our <span className="text-[#FF8C00]">Journal</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Expert advice on flight cancellations, refunds, and travel hacks. 
            Everything you need to fly smarter.
          </p>

          {/* Categories Filter */}
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/blog/category/${category.slug}`}
                className="bg-white dark:bg-gray-800 border border-transparent hover:border-[#FF8C00] text-gray-700 dark:text-gray-200 hover:text-[#FF8C00] px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-sm hover:shadow-md"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allBlogs.length > 0 ? (
              allBlogs.map((article) => (
                <BlogCard key={article.id} article={article} />
              ))
          ) : (
              <div className="col-span-3 text-center py-20">
                <p className="text-xl text-gray-500 font-medium">No articles found.</p>
                <p className="text-gray-400">Check back later for new updates.</p>
              </div>
          )}
        </div>

        {/* Pagination Controls */}
        <div className="mt-16">
            <PaginationControls 
                currentPage={metadata.currentPage}
                totalPages={metadata.totalPages}
            />
        </div>
      
      </div>
    </main>
  );
}
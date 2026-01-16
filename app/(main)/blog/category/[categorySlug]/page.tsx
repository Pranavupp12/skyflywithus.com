import Link from "next/link";
import { BlogCard, Article } from "@/components/blog_components/blog-card";
import { notFound } from "next/navigation";
import { PaginationControls } from "@/components/ui/pagination-controls";
import type { Metadata } from 'next';

// Hardcoded Categories: Source of Truth for Name and Slug
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

const emptyMetadata = {
    totalPosts: 0,
    totalPages: 1,
    currentPage: 1,
    limit: 6,
};


// Interface for the page props (Server Component)
interface CategoryPageProps {
  params: Promise<{ // <-- FIX 1: Define params as a Promise
    categorySlug: string; 
  }>;

  searchParams: Promise<{ 
    page?: string 
  }>;
}

// --- Data Fetching Function ---
async function getFilteredBlogs(categoryName: string, page:number): Promise<{ data: Article[], metadata: any }> {
  // NOTE: This function now receives the full name (e.g., "Compensation")
  try {
    // 2. Pass both the category name and the page number to the API
    const response = await fetch(
        `${process.env.NEXTAUTH_URL}/api/blogs?category=${encodeURIComponent(categoryName)}&page=${page}&limit=6`,
        { cache: 'no-store' }
    );

    if (!response.ok) {
        return { data: [], metadata: emptyMetadata };
    }
    
    // 3. Destructure the result to get data and metadata
    const result = await response.json();

    return {
        data: result.data || [],
        metadata: result.metadata || emptyMetadata,
    };

  } catch (error) {
    console.error("Category Blog Fetch Error:", error);
    return { data: [], metadata: emptyMetadata };
  }
}
// --- End Data Fetching ---

// --- ADD THIS FUNCTION ---
export async function generateMetadata({ params }: { params: Promise<{ categorySlug: string }> }): Promise<Metadata> {

  const { categorySlug } = await params;
  
  const category = categories.find((c) => c.slug === categorySlug);

  if (!category) {
    return { title: 'Category Not Found' };
  }

  return {
    title: category.name,
    description: `Browse all articles in the ${category.name} category.`,
    robots: {
      index: false, // Also no-index category pages
      follow: true,
    },
  };
}

export default async function CategoryBlogPage({ params, searchParams }: CategoryPageProps) {
  // 1. Access the new, unique parameter name
  const { categorySlug } = await params;

  const resolvedSearchParams = await searchParams;

  // 2. Access the current page from the resolved object
  const currentPage = parseInt(resolvedSearchParams.page || '1', 10);

  // 5. Look up the full category name
  const category = categories.find((c) => c.slug === categorySlug);

  if (!category) {
    notFound();
  }

  // 6. Fetch data using the full category NAME and currentPage
  const { data: filteredBlogs, metadata } = await getFilteredBlogs(category.name, currentPage);

  return (
    // FIX: Applied negative margins to stretch background full width
    // Added min-h-screen to ensure background covers tall screens
    <main className="w-full min-h-screen bg-[#FFF5EB]/50 py-24">
      
      {/* Container to align content */}
      <div className="container mx-auto px-6 mt-10">
      
        {/* Page Header with Breadcrumbs */}
        <div className="text-center mb-16">
          <div className="text-sm text-gray-500 mb-3 uppercase tracking-wide font-semibold">
            <Link href="/blog" className="hover:text-[#FF8C00] transition-colors">Blog</Link>
            <span className="mx-2 text-gray-300">/</span>
            <span className="text-[#FF8C00]">{category.name}</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            {category.name}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Explore all expert articles, tips, and guides related to {category.name.toLowerCase()}.
          </p>
        </div>

        {/* Filtered Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.length > 0 ? (
              filteredBlogs.map((article: Article) => (
                  <BlogCard key={article.id} article={article} />
              ))
          ) : (
              <div className="col-span-3 text-center py-20">
                <p className="text-xl text-gray-500 font-medium">No articles found in this category.</p>
                <p className="text-gray-400 mt-2">Check back later for new updates.</p>
                <Link href="/blog" className="inline-block mt-6 text-[#FF8C00] font-semibold hover:underline">
                    View all blogs &rarr;
                </Link>
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
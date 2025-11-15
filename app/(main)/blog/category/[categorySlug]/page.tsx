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
export async function generateMetadata({ params }: { params: { categorySlug: string } }): Promise<Metadata> {

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
    <main className="mx-5 md:mx-15  mt-20 mb-20">
      {/* Page Header with Breadcrumbs */}
      <div className="text-center mb-12">
        <div className="text-sm text-gray-500 mb-2">
          <Link href="/blog" className="hover:underline">Blog</Link>
          <span className="mx-2">&gt;</span>
          <span>{category.name}</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-semibold text-[#FF8C00] dark:text-white mb-4">
          {category.name}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Explore all articles and guides related to this category.
        </p>
      </div>

      {/* Filtered Articles Grid */}
      {/* Filtered Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBlogs.length > 0 ? (
            filteredBlogs.map((article: Article) => (
                <BlogCard key={article.id} article={article} />
            ))
        ) : (
            <div className="text-center text-gray-500 py-16 col-span-3">
                <h3 className="text-2xl font-semibold mb-2">No Articles Found</h3>
                <p>There are no articles in this category just yet. Check back soon!</p>
            </div>
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
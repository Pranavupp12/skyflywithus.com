// components/home_components/Recent-Articles.tsx

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react"; // Make sure ArrowRight is imported
import { BlogCard, Article } from "@/components/blog_components/blog-card";

// --- Data Fetching Function ---
async function getRecentBlogs(): Promise<Article[]> {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/blogs/all`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error("API Fetch Failed:", response.status);
      return [];
    }

    const allBlogs: Article[] = await response.json();
    return allBlogs.slice(0, 3);

  } catch (error) {
    console.error("Homepage Blog Fetch Error:", error);
    return [];
  }
}

export async function RecentArticles() {

  const recentArticles = await getRecentBlogs();

  return (
    <section className="w-full bg-[#FFF5EB]/50 py-20">
      <div className="container mx-auto px-6">
      {/* Header Container */}
      {/* FIX: Changed 'justify-center' to 'justify-start' to align content to the left */}
      <div className="relative flex justify-start items-center mb-12">
        
        {/* 1. Left-Aligned Text Block */}
        <div className="text-left">
          <h2 className="text-4xl font-bold text-black dark:text-white mb-4">
            Recent <span className="text-[#FF8C00] font-semibold">Blogs</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
           There are some blog that tells experiences.
          </p>
        </div>

        {/* 2. Absolutely Positioned Button (Stays on the right) */}
        <Link
          href="/blog"
          passHref
          // Centered vertically relative to the container
          className="absolute right-0 top-1/2 -translate-y-1/2" 
        >
          <Button variant="ghost" className="text-[#FF8C00] text-sm hover:text-white hidden lg:flex items-center">
            View All <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* 3-Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recentArticles.length > 0 ? (
          recentArticles.map((article) => (
            <BlogCard key={article.id} article={article} />
          ))
        ) : (
          <p className="text-center text-gray-500 py-8 col-span-3">No recent articles found.</p>
        )}
      </div>
      </div>
    </section>
  );
}
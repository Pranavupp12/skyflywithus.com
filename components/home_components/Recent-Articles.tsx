// components/home_components/Recent-Articles.tsx

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
// Import the card and its data type
import { BlogCard, Article } from "@/components/blog_components/blog-card";

// --- Data Fetching Function ---
async function getRecentBlogs(): Promise<Article[]> {
  try {
    // Fetch data from the new endpoint
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/blogs/all`, {
        // Essential to prevent caching and ensure fresh data
        cache: 'no-store', 
    });

    if (!response.ok) {
        console.error("API Fetch Failed:", response.status);
        return [];
    }
    
    // We only want the top 3 recent articles for the homepage
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
    <section className=" mx-auto p-10 bg-white rounded-2xl mt-20">
      {/* Heading and View All Button */}
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-5xl font-regular text-black dark:text-white mb-2">
            Recent <span className="text-indigo-500 font-semibold">Blogs</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Stay up-to-date with our latest travel guides and tips.
          </p>
        </div>
        <Link href="/blog" passHref>
          <Button variant="ghost" className="text-indigo-500 hover:text-indigo-50">
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
    </section>
  );
}
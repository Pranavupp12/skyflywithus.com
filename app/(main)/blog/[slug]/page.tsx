import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LetterAvatar } from "@/components/ui/letter-avatar";
import { Article } from "@/components/blog_components/blog-card";
import { ArticleFaqs } from "@/components/blog_components/article-faq";
import { Metadata } from "next";

// This file must be a Server Component (no "use client")
// It handles the route /blog/[slug]

// --- Data Fetching Function ---
async function getSingleBlog(slug: string): Promise<Article | null> {

  // Ensure slug is present
  if (!slug) {
    return null;
  }

  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/blogs/${slug}`,
      { cache: 'no-store' }
    );

    // --- REMOVED DEBUG LOGGING ---

    if (response.status === 404) {
      // If API returns 404, signal Next.js to show the proper 404 page
      notFound();
    }

    if (!response.ok) {
      // If status is 500 or another error, throw
      throw new Error(`API returned status ${response.status}`);
    }

    // Return the parsed data
    return await response.json();

  } catch (error) {
    // Keep a simplified log for tracking hard failures
    console.error('Individual Blog Fetch Failed:', error);
    return null;
  }
}


// --- New Related Posts Fetching Function ---
async function getRelatedBlogs(slug: string): Promise<any[]> {
  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/blogs/related/${slug}`,
      { cache: 'no-store' }
    );
    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    console.error("Related Post Fetch Error:", error);
    return [];
  }
}

// 1. --- GENERATEMETADATA FUNCTION (THE FIX) ---
// This runs first on the server to inject meta tags into the HTML <head>
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {

  const { slug } = await params;

  const post = await getSingleBlog(slug);

  // Provide default metadata if the post is not found
  if (!post) {
    return {
      title: "Page Not Found - SkyFlyWithUs",
      description: "The requested article could not be found.",
    };
  }

  // Use the fetched SEO fields
  return {
    title: post.metaTitle,
    description: post.metaDesc,
    keywords: post.metaKeywords.split(',').map(k => k.trim()),
    openGraph: {
      title: post.metaTitle,
      description: post.metaDesc,
      url: `${process.env.NEXTAUTH_URL}/blog/articles/${post.slug}`,
      images: [post.imageUrl],
    },
  };
}

// --- End Data Fetching ---

// --- Rendering Logic ---

export default async function IndividualBlogPage({ params }: { params: Promise<{ slug: string }> }) {

  const { slug } = await params;

  const post = await getSingleBlog(slug);
  const relatedBlogs = await getRelatedBlogs(slug);

  if (!post) {
    // If no post is found, the router will show the 404 page.
    // This also helps resolve the ambiguity with the category route.
    notFound();
  }

  // NOTE: We need a related posts endpoint, but for simplicity, we skip it for now.
  // The sidebar will be static until we create a dedicated 'related posts' API.

  return (
    <main className="container mx-10 md:mx-20 mt-20 mb-20">
      <div className="flex flex-col lg:flex-row gap-8">

        {/* Main Content Area (2/3 width) */}
        <div className="lg:w-2/3 bg-white rounded-2xl p-10">
          {/* Breadcrumbs */}
          <div className="text-sm text-gray-500 mb-6">
            <Link href="/blog" className="hover:underline">Blog</Link>
            <span className="mx-2">&gt;</span>
            <Link href={`/blog/category/${post.categorySlug}`} className="hover:underline">
              {post.category}
            </Link>
          </div>

          {/* Blog Title */}
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            {post.title}
          </h1>

          {/* Author Details */}
          <div className="flex items-center gap-3 mb-6 border-b pb-4">
            <LetterAvatar name={post.authorName} size={40} />
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{post.authorName}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{post.publishDate}</p>
            </div>
            <span className="ml-auto bg-[#FF8C00] text-white text-xs font-semibold px-3 py-1 rounded-full">
              {post.category}
            </span>
          </div>

          {/* Main Image */}
          <div className="relative w-full h-80 lg:h-96 rounded-lg overflow-hidden mb-8">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              loading="eager" 
              priority={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw"
            />
          </div>

          {/* Blog Content */}
          <div
            className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-200 mb-10"
            // WARNING: Since Tiptap outputs HTML, we must use this.
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* FAQ Section */}
          {post.faqs && post.faqs.length > 0 && (
            <ArticleFaqs questions={post.faqs} />
          )}
        </div>

        {/* Sidebar (1/3 width) */}
        <aside className="lg:w-1/3 space-y-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg sticky top-24">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              More in <span className="text-[#FF8C00]">{post.category}</span>
            </h2>
            <div className="space-y-4">
              {relatedBlogs.length > 0 ? (
                relatedBlogs.map(relatedPost => (
                  <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`} passHref>
                    <div className="p-3 rounded-md hover:bg-[#FFCA91] dark:hover:bg-gray-700 transition cursor-pointer">

                      {/* 1. Post Title */}
                      <p className="font-medium text-gray-900 dark:text-white line-clamp-2 mb-2">
                        {relatedPost.title}
                      </p>

                      {/* 2. Author Card Below Title (New Structure) */}
                      <div className="flex items-center gap-2">
                        <LetterAvatar name={relatedPost.authorName} size={24} />
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          By {relatedPost.authorName}
                        </p>
                        <span className="text-xs text-gray-400"> • </span>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {relatedPost.publishDate}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-gray-500">No other related posts found.</p>
              )}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
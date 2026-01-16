import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LetterAvatar } from "@/components/ui/letter-avatar";
import { Article } from "@/components/blog_components/blog-card";
import { ArticleFaqs } from "@/components/blog_components/article-faq";
import { Metadata } from "next";
import { CalendarDays, Clock, ArrowLeft } from "lucide-react";

// Define an extended interface
interface SingleBlogArticle extends Article {
  categories?: string[];
}

// --- Data Fetching Function ---
async function getSingleBlog(slug: string): Promise<SingleBlogArticle | null> {
  if (!slug) return null;
  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/blogs/${slug}`,
      { cache: 'no-store' }
    );
    if (response.status === 404) notFound();
    if (!response.ok) throw new Error(`API returned status ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Individual Blog Fetch Failed:', error);
    return null;
  }
}

// --- Related Posts Fetching Function ---
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

// --- Metadata ---
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getSingleBlog(slug);
  if (!post) return { title: "Page Not Found", description: "Article not found." };

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

// --- Main Page Component ---
export default async function IndividualBlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getSingleBlog(slug);
  const relatedBlogs = await getRelatedBlogs(slug);

  if (!post) notFound();

  // Categories Logic (Safe Fallback)
  const displayCategories = post.categories && post.categories.length > 0 
    ? post.categories 
    : [post.category];

  return (
    <main className="min-h-screen bg-[#FFF5EB]/50 py-24">
      
      {/* Container to align content */}
      <div className="container mx-auto px-6 mt-10">
        
        {/* Back Link */}
        <div className="mb-8">
            <Link href="/blog" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-[#FF8C00] transition-colors">
                <ArrowLeft className="w-4 h-4 mr-1" /> Back to Blogs
            </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">

          {/* Main Content Area (2/3 width) */}
          <div className="lg:w-2/3">
            
            {/* Article Header */}
            <div className="mb-8">
                {/* Category Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {displayCategories.map((cat, index) => (
                    <span 
                        key={index} 
                        className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-orange-100 text-xs font-bold uppercase tracking-wider text-[#FF8C00] shadow-sm"
                    >
                        {cat}
                    </span>
                    ))}
                </div>

                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
                    {post.title}
                </h1>

                {/* Author & Date Metadata */}
                <div className="flex items-center gap-4 text-sm text-gray-500 pb-8 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                        <LetterAvatar name={post.authorName} size={32} />
                        <span className="font-semibold text-gray-900 dark:text-gray-100">{post.authorName}</span>
                    </div>
                    <span className="text-gray-300">|</span>
                    <div className="flex items-center gap-1.5">
                        <CalendarDays className="w-4 h-4" />
                        <span>{post.publishDate}</span>
                    </div>
                     <span className="text-gray-300">|</span>
                    <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        <span>5 min read</span>
                    </div>
                </div>
            </div>

            {/* Main Image */}
            <div className="relative w-full h-[300px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg mb-10">
              <Image
                src={post.imageUrl || "/images/airplane-wing2.jpg"} // Added fallback for main image too just in case
                alt={post.title}
                fill
                className="object-cover"
                loading="eager" 
                priority={true}
                sizes="(max-width: 1024px) 100vw, 800px"
              />
            </div>

            {/* Blog Content */}
            <article className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-[#FF8C00] max-w-none bg-white dark:bg-gray-800 p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 mb-10">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>

            {/* FAQ Section */}
            {post.faqs && post.faqs.length > 0 && (
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                  <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Frequently Asked Questions</h3>
                  <ArticleFaqs questions={post.faqs} />
              </div>
            )}
          </div>

          {/* Sidebar (1/3 width) */}
          <aside className="lg:w-1/3 space-y-8">
            {/* Sticky Container */}
            <div className="sticky top-24 space-y-4">
                
                {/* Related Posts Card */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-[#FF8C00] pl-3">
                    More in {post.category}
                    </h2>
                    <div className="flex flex-col gap-6">
                    {relatedBlogs.length > 0 ? (
                        relatedBlogs.map(relatedPost => (
                        <Link key={relatedPost.id} href={`/blog/articles/${relatedPost.slug}`} className="group block">
                            <div className="flex gap-4 items-start">
                                {/* Thumbnail */}
                                <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                                    {/* FIX: Added fallback logic (||) to prevent empty src error */}
                                    <Image 
                                        src={relatedPost.image || "/images/airplane-wing2.jpg"} 
                                        alt={relatedPost.title} 
                                        fill 
                                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-[#FF8C00] transition-colors leading-snug mb-2">
                                        {relatedPost.title}
                                    </h4>
                                    <p className="text-xs text-gray-500">{relatedPost.publishDate}</p>
                                </div>
                            </div>
                        </Link>
                        ))
                    ) : (
                        <p className="text-gray-500 text-sm">No other related posts found.</p>
                    )}
                    </div>
                </div>

                {/* Optional: Newsletter / Promo Box */}
                <div className="bg-[#FF8C00] p-8 rounded-2xl text-white text-center shadow-lg">
                    <h3 className="text-xl font-bold mb-2">Want cheaper flights?</h3>
                    <p className="text-white/90 text-sm mb-6">Join 10,000+ travelers getting our weekly deal alerts.</p>
                    <Link href="/contacts">
                        <button className="bg-white text-[#FF8C00] font-bold py-3 px-6 rounded-full w-full hover:bg-orange-50 transition-colors shadow-md">
                            Get Alerts
                        </button>
                    </Link>
                </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
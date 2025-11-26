import Link from "next/link";
import prisma from "@/lib/prisma";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sitemap",
  description: "Overview of all pages and articles on SkyFlyWithUs.",
};

// Reusing your category list
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

// Server Component to fetch data
export default async function SitemapPage() {
  // Fetch recent blogs (limit to 50 or 100 to avoid a huge list)
  const blogs = await prisma.blog.findMany({
    select: { title: true, slug: true },
    orderBy: { createdAt: "desc" },
    take: 10, 
  });

  return (
    <main className="container mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Sitemap</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Navigate through our website content.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
        
        {/* Column 1: Main Pages */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-[#FF8C00] border-b pb-2">General</h2>
          <ul className="space-y-3">
            <li><Link href="/" className="hover:text-[#FFB667] hover:underline">Home</Link></li>
            <li><Link href="/about" className="hover:text-[#FFB667]  hover:underline">About Us</Link></li>
            <li><Link href="/blog" className="hover:text-[#FFB667]  hover:underline">Blog Index</Link></li>
            <li><Link href="/contact" className="hover:text-[#FFB667]  hover:underline">Contact Us</Link></li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#FF8C00] border-b pb-2 pt-4">Legal</h2>
          <ul className="space-y-3">
            <li><Link href="/privacy" className="hover:text-[#FFB667]  hover:underline">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-[#FFB667]  hover:underline">Terms and Conditions</Link></li>
          </ul>
        </div>

        {/* Column 2: Categories */}
        <div>
          <h2 className="text-2xl font-semibold text-[#FF8C00] border-b pb-2 mb-6">Blog Categories</h2>
          <ul className="space-y-3">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link href={`/blog/category/${cat.slug}`} className="hover:text-[#FFB667]  hover:underline">
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Recent Articles */}
        <div>
          <h2 className="text-2xl font-semibold text-[#FF8C00] border-b pb-2 mb-6">Recent Articles</h2>
          <ul className="space-y-3 text-sm">
            {blogs.map((blog) => (
              <li key={blog.slug}>
                <Link href={`/blog/${blog.slug}`} className="hover:text-[#FFB667] hover:underline">
                  {blog.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </main>
  );
}
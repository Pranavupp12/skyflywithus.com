import { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';

// Define your categories here (since they are hardcoded in your app)
const categories = [
  "cancellation-and-refund",
  "change-flight",
  "compensation",
  "seat-upgrade",
  "voucher",
  "lost-and-found",
  "check-in",
  "airport",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';

  // 1. Define Static Routes
  const routes = [
    '',
    '/about',
    '/blog',
    '/contact',
    '/privacy',
    '/terms',
    '/sitemap', // The visual sitemap page we are about to create
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // 2. Generate Category Routes
  const categoryRoutes = categories.map((slug) => ({
    url: `${baseUrl}/blog/category/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // 3. Fetch All Blog Posts for Dynamic Routes
  // We fetch only the slug and updatedAt date for efficiency
  const blogs = await prisma.blog.findMany({
    select: {
      slug: true,
      updatedAt: true,
    },
  });

  const blogRoutes = blogs.map((post) => ({
    url: `${baseUrl}/blog/articles/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // 4. Combine everything
  return [...routes, ...categoryRoutes, ...blogRoutes];
}
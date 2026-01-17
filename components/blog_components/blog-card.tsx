"use client";

import Image from "next/image";
import Link from "next/link";
import { LetterAvatar } from "@/components/ui/letter-avatar";
import { CalendarDays, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

// Define the shape of a blog article
export interface Article {
  id: string;
  slug: string;
  // Support both single string (legacy) and array (new)
  category: string; 
  categories?: string[]; 
  categorySlug: string;
  title: string;
  content: string;
  imageUrl: string;
  authorName: string;
  publishDate: string;
  metaTitle: string;
  metaDesc: string;
  metaKeywords: string;
  faqs?: FaqItem[] | undefined;
}

interface ArticleCardProps {
  article: Article;
  className?: string;
}

export function BlogCard({ article, className }: ArticleCardProps) {
  // Logic: Use the new 'categories' array if it exists and has items.
  // Otherwise, fall back to the single 'category' string wrapped in an array.
  const displayCategories = 
    article.categories && article.categories.length > 0 
      ? article.categories 
      : [article.category];

  // We limit to 3 categories to keep the card clean
  const visibleCategories = displayCategories.slice(0, 3);

  return (
    <Link 
      href={`/blog/${article.slug}`} 
      key={article.id} 
      className={cn("group block h-full", className)}
    >
      <div className="relative flex flex-col h-full overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        
        {/* Image Container with Zoom Effect */}
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Floating badges removed from here */}
        </div>

        {/* Card Content */}
        <div className="flex flex-1 flex-col p-6">
          
          {/* UPDATED: Categories (Placed above title | Style: Cat 1 | Cat 2) */}
          <div className="mb-3 flex flex-wrap items-center text-xs font-bold uppercase tracking-wider text-[#FF8C00]">
            {visibleCategories.map((cat, index) => (
              <div key={index} className="flex items-center">
                <span>{cat}</span>
                {/* Add pipe separator if it's not the last item in the list */}
                {index < visibleCategories.length - 1 && (
                   <span className="mx-2 text-gray-300 font-light text-[10px]">|</span>
                )}
              </div>
            ))}
          </div>

          {/* Title & Arrow */}
          <div className="flex justify-between items-start gap-4 mb-3">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight line-clamp-2 group-hover:text-[#FF8C00] transition-colors">
              {article.title}
            </h3>
            <ArrowUpRight className="h-5 w-5 text-gray-400 group-hover:text-[#FF8C00] transition-colors flex-shrink-0 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-300" />
          </div>

          {/* Description */}
          <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-3 mb-6 flex-grow">
            {article.metaDesc}
          </p>

          {/* Footer: Divider, Author, Date */}
          <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <LetterAvatar name={article.authorName} size={32} />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                {article.authorName}
              </span>
            </div>
            
            <div className="flex items-center text-xs text-gray-400 font-medium">
              <CalendarDays className="mr-1.5 h-3.5 w-3.5" />
              {article.publishDate}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
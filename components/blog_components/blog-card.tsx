"use client";

import Image from "next/image";
import Link from "next/link";
import { LetterAvatar } from "@/components/ui/letter-avatar";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

// Define the shape of a blog article
export interface Article {
  id: string;
  slug: string; // e.g., "jetstar-vs-rex"
  category: string;
  categorySlug: string;
  title: string;
  content: string;
  imageUrl: string;
  authorName: string;
  publishDate: string;
  metaTitle: string;
  metaDesc: string;
  metaKeywords: string;
  faqs?: FaqItem[] | undefined; // Optional FAQs associated with the article
}

interface ArticleCardProps {
  article: Article;
}

export function BlogCard({ article }: ArticleCardProps) {
  return (
    <Link href={`/blog/${article.slug}`} key={article.id} passHref>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer h-full flex flex-col">
        {/* Image with overlay text */}
        <div className="relative h-48 w-full">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className=" object-cover rounded-t-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
            <span className="bg-indigo-500 text-white text-xs font-semibold px-2 py-1 rounded">
              {article.category}
            </span>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6 flex-grow flex flex-col">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {article.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow">
            {article.metaDesc}
          </p>
          {/* Author and Date */}
          <div className="flex items-center mt-auto">
            <LetterAvatar name={article.authorName} size={32} className="mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                {article.authorName}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {article.publishDate}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
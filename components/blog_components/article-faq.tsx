// components/blog_components/article-faqs.tsx

"use client";

import React from 'react';
import Link from 'next/link'; 
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { FaqItem } from '@/components/blog_components/blog-card';

// The FaqItem interface, which is defined in blog-card.tsx, 
// must be: { id: string, question: string, answer: string }

// Define the props for the component
interface ArticleFaqsProps {
  questions: FaqItem[];
}

export function ArticleFaqs({ questions }: ArticleFaqsProps) {
  // Don't render the section if there are no questions
  if (!questions || questions.length === 0) {
    return null;
  }

    return (
        <div className="mx-auto w-full space-y-7">
            <div className="space-y-2">
                <h2 className="text-3xl text-[#FF8C00] font-semibold md:text-4xl">Frequently Asked Questions</h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
                    Here are some common questions related to this article.
                </p>
            </div>
            <Accordion
                type="single"
                collapsible
                className="bg-card dark:bg-card/50 w-full -space-y-px rounded-lg border dark:border-gray-700" 
                defaultValue="item-1"
            >
                {questions.map((item) => (
                    <AccordionItem
                        value={item.id}
                        key={item.id}
                        className="relative border-x-0 first:rounded-t-lg last:rounded-b-lg border-b dark:border-gray-700"
                    >
                        <AccordionTrigger 
                            className="px-4 py-4 text-[17px] leading-6 hover:no-underline text-left text-[#FF8C00] dark:text-indigo-400 font-medium"
                        >
                            {/* FIX 1: Map 'question' to the trigger text */}
                            {item.question}
                        </AccordionTrigger>
                        <AccordionContent 
                            // FIX 2: Map 'answer' to the content area
                            className="pb-4 px-4 text-gray-700 dark:text-gray-300"
                        >
                            {item.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}
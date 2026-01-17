"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react"; 

export function AboutUsSection() {
  return (
    // FIX APPLIED HERE:
    // Added '-mx-5 md:-mx-15' to counteract the parent page's margins.
    <section className="w-full py-24 bg-[#FFF5EB]/50">
      
      {/* This container keeps the internal content centered and aligned */}
      <div className="container mx-auto px-6 mt-15">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12  items-center">
          
          {/* LEFT COLUMN: Image Composition */}
          <div className="relative">
            {/* Main Image */}
            <div className="relative h-[400px] md:h-[500px] w-full rounded-3xl overflow-hidden">
              <Image
                src="/images/airplane-wing2.jpg" 
                alt="SkyFlyWithUs Travel Experience"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-black/10"></div>
            </div>

            {/* Floating Experience Badge */}
            <div className="absolute -bottom-6 -right-6 md:bottom-10 md:-left-10 md:right-auto bg-white dark:bg-gray-800 p-6 rounded-2xl max-w-[200px] border border-gray-200 dark:border-gray-700 hidden md:block">
              <p className="text-4xl font-bold text-[#FF8C00]">10+</p>
              <p className="text-sm text-gray-600 dark:text-gray-300 font-medium mt-1">
                Years of Finding The Best Deals
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: Content */}
          <div className="flex flex-col">

            {/* Heading */}
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Travel Smarter, <br />
              <span className="text-[#FF8C00]">Fly Cheaper.</span>
            </h2>

            {/* Paragraph */}
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              At SkyFlyWithUs, we believe exploring the world shouldn't cost a fortune. 
              We are dedicated to hunting down the absolute best flight deals and empowering 
              you with the knowledge to travel like a pro. From hidden fare hacks to 
              essential destination guides, we are your co-pilot for smarter, more affordable adventures.
            </p>

            {/* Key Features List - Tailored to Travel Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                    "Unbeatable Deals",
                    "Expert Travel Hacks",
                    "Hidden Gems",
                    "Smart Guides"
                ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-[#FF8C00]" />
                        <span className="text-gray-700 dark:text-gray-200 font-medium">{item}</span>
                    </div>
                ))}
            </div>

            {/* Stats Cards Row */}
            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white border border-gray-200">
                    <h3 className="text-3xl font-bold text-[#FF8C00] mb-1">50K+</h3>
                    <p className="text-xs text-gray-500 font-medium uppercase">Happy Travelers</p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-gray-200">
                    <h3 className="text-3xl font-bold text-[#FF8C00] mb-1">100%</h3>
                    <p className="text-xs text-gray-500 font-medium uppercase">Free Advice</p>
                </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
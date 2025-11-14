"use client";

import Image from "next/image";
// We no longer need to import Tabs
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; 

export function AboutUsSection() {
  // Placeholder image URL - you will replace this
  
  return (
    <section className=" rounded-2xl mx-10 md:mx-15 mt-25 p-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Column: Text Content */}
        <div className="flex flex-col">
          {/* Main Heading */}
          <h2 className="text-5xl font-regular mb-2 text-gray-900 dark:text-white">
            Built for Sellers,
            <br />
            <span className="text-[#FF8C00] dark:text-gray-500 font-bold">Backed by Innovation</span>
          </h2>

          {/* Removed Tabs Wrapper */}
          
          {/* Main Paragraph (from "Our Story") */}
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-200 leading-relaxed mb-2">
            At SkyFlyWithUs, we design powerful, easy-to-use tools that help
            online sellers thrive in a fast-changing digital world. Our
            platform combines smart technology with deep eCommerce
            insight to simplify selling, amplify marketing, and drive real
            growth — all in one place.
          </p>

        </div>

        {/* Right Column: Image */}
        <div className="relative w-full h-[300px] rounded-2xl overflow-hidden ">
          <Image
            src="/images/airplane-wing2.jpg" // Use the placeholder URL defined above
            alt="Two women collaborating on a tablet"
            fill
            className=" rounded-2xl object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="eager"
          />
        </div>
      </div>

      {/* Statistics Section (below the two columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 text-center">
        {/* Statistic 1 */}
        <div className="flex flex-col items-center">
          <h3 className="text-5xl font-bold text-[#FF8C00] dark:text-white mb-2">10+</h3>
          <p className="text-gray-600 dark:text-gray-300">Years Experience</p>
        </div>
        {/* Statistic 2 */}
        <div className="flex flex-col items-center">
          <h3 className="text-5xl font-bold text-[#FF8C00] dark:text-white mb-2">10K+</h3>
          <p className="text-gray-600 dark:text-gray-300">People Trust FlightFareMart</p>
        </div>
        {/* Statistic 3 */}
        <div className="flex flex-col items-center">
          <h3 className="text-5xl font-bold text-[#FF8C00] dark:text-white mb-2">98 %</h3>
          <p className="text-gray-600 dark:text-gray-300">Satisfied Clients</p>
        </div>
      </div>
    </section>
  );
}
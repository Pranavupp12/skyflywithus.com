"use client";

import { Tag, BookOpen, Headset } from 'lucide-react';

// Define the features
const features = [
  {
    icon: <Tag className="h-8 w-8 text-white" />,
    title: "Exclusive Deals",
    description: "We partner with top airlines to provide you with unpublished fares and exclusive deals you won't find anywhere else."
  },
  {
    icon: <BookOpen className="h-8 w-8 text-white" />,
    title: "Expert Travel Guides",
    description: "Our dashboard isn't just for booking. Get access to expert-written blogs on compensation, upgrades, and travel tips."
  },
  {
    icon: <Headset className="h-8 w-8 text-white" />,
    title: "24/7 Customer Support",
    description: "Our dedicated support team is available around the clock to assist you with any booking or travel questions, anytime."
  }
];

export function WhyChooseUs() {
  return (
    <section className="mt-20 bg-gray-100 dark:bg-gray-900">
      <div className=" mx-10 md:mx-15 md:p-0 p-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-regular text-gray-900 dark:text-white">
            Why Choose <span className="text-[#FF8C00] font-bold">SkyFly</span>withus <span className='text-[#FF8C00]'>?</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-3 max-w-2xl mx-auto">
            We're more than just a booking site. We're your complete travel partner, from planning to landing.
          </p>
        </div>
        
        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {features.map((feature) => (
            <div 
              key={feature.title}
              className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center flex flex-col items-center"
            >
              {/* Icon Wrapper */}
              <div className="flex-shrink-0 mb-4 p-4 bg-[#FFA749] dark:bg-indigo-900 rounded-full">
                {feature.icon}
              </div>
              
              {/* Card Content */}
              <h3 className="text-xl font-semibold text-[#FF8C00] dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-black dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
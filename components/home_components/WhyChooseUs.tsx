"use client";

import { Tag, BookOpen, Headset } from 'lucide-react';

// Define the features
const features = [
  {
    icon: <Tag className="h-8 w-8 text-white" />,
    title: "Exclusive Deals, just for you ",
    description: "Thanks to our direct partnerships with major airlines, we unlock hidden fares and limited-access discounts you won’t see on other booking sites. These exclusive offers are crafted to help you travel smarter — and save more."
  },
  {
    icon: <BookOpen className="h-8 w-8 text-white" />,
    title: "Trusted and responsible Travel Expertise",
    description: "Beyond booking, your dashboard unlocks expert-crafted blogs covering compensation, upgrades, and practical travel advice."
  },
  {
    icon: <Headset className="h-8 w-8 text-white" />,
    title: "24/7 helpline support",
    description: "We are always here for your help, and we also provide the best customer support at all times just for our customers. Just for your comfort."
  }
];

export function WhyChooseUs() {
  return (
    <section className="mt-20 bg-gray-100 dark:bg-gray-900">
      <div className="mx-5 md:mx-15">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-regular text-gray-900 dark:text-white">
            Why Choose <span className="text-[#FF8C00] font-bold">SkyFly</span>withus <span className='text-[#FF8C00]'>?</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-3 max-w-2xl mx-auto">
           From finding the perfect flight to helping you arrive smoothly at your destination.
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
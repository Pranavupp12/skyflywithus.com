"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation'; // Import useRouter

export function PreFooterBanner() {
  const router = useRouter();

  const handleBookNowClick = () => {
    // Scrolls to the booking form section on the homepage
    router.push('/#booking-form-section'); 
  };

  return (
    <section className="container mx-auto px-4 mb-20">
      <div className="bg-[#FF8C00] p-5 md:p-0 rounded-2xl overflow-hidden  flex flex-col md:flex-row items-center justify-center relative shadow-lg">
        
        {/* Left Side: Image of Happy Person */}
        {/* --- ADJUSTED SIZE CLASSES HERE --- */}
        <div className="relative w-full md:w-[50%] max-w-[450px] h-[300px] md:h-[400px] flex-shrink-0 mb-3 md:mb-0 md:mr-12">
          <Image
            src="/images/happy-cust-wbg2.png" // <--- CONFIRM THIS IMAGE PATH
            alt="Happy traveler looking at a phone"
            fill
            className="object-contain object-right"
            priority={false}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        {/* Right Side: Text and Button */}
        <div className="w-full md:w-auto text-center md:text-left flex flex-col items-center md:items-start">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 leading-tight">
            Ready for Your Next <br className="hidden md:inline"/> Adventure?
          </h2>
          <div className="flex items-center text-white mb-6">
            <p className="text-lg md:text-xl opacity-90">
              Discover amazing destinations and book your dream trip with us today!
            </p>
          </div>
          <Button 
            onClick={handleBookNowClick} 
            className="bg-white text-[#FF8C00] hover:bg-gray-100 hover:text-[#E07B00] px-10 py-4 rounded-full text-lg md:text-xl font-semibold shadow-md transition-colors duration-300"
          >
            Book Now
          </Button>
        </div>

      </div>
    </section>
  );
}
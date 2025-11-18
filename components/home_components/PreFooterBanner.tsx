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
    <section className="mx-8 md:mx-15 lg:mx-60 mb-20">
      <div className="bg-[#FF8C00] p-2 sm:p-0  rounded-2xl overflow-hidden flex flex-col md:flex-row items-center justify-center relative shadow-lg">
        
        {/* Left Side: Image of Happy Person */}
        {/* --- ADJUSTED SIZE CLASSES HERE --- */}
        <div className="relative w-full max-w-[300px] md:max-w-[330px] lg:max-w-[400px] h-[120px] md:h-[300px] lg:h-[360px] mb-2 ">
          <Image
            src="/images/happy-cust-wbg2.png" // <--- CONFIRM THIS IMAGE PATH
            alt="Happy traveler looking at a phone"
            fill
            className="object-contain object-center lg:pr-10"
            priority={true}
            sizes="(max-width: 768px) 100vw, 33vw"
            loading="eager"
          />
        </div>

        {/* Right Side: Text and Button */}
        <div className="w-full md:w-auto text-center md:text-left flex flex-col items-center md:items-start">
          <h2 className="text-lg md:text-3xl lg:text-4xl font-bold text-white mb-2 leading-tight">
            Ready for Your Next <br className="hidden md:inline"/> Adventure?
          </h2>
          <div className="flex items-center text-white mb-2 sm:mb-3 md:mb-4">
            <p className="text-sm lg:text-lg opacity-90">
              Discover amazing destinations and book <br/>
              your dream trip with us today!
            </p>
          </div>
          <Button 
            onClick={handleBookNowClick} 
            className="bg-white text-[#FF8C00] hover:bg-gray-100 hover:text-[#E07B00] px-4 py-2 rounded-full text-sm md:text-xl font-semibold shadow-md transition-colors duration-300"
          >
            Book Now
          </Button>
        </div>

      </div>
    </section>
  );
}
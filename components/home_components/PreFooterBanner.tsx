"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

export function PreFooterBanner() {
  const router = useRouter();

  const handleBookNowClick = () => {
    router.push('/#booking-form-section'); 
  };

  return (
    <section className="mx-5 md:mx-20 lg:mx-60 my-20 bg-[#FFF5EB]/50">
      <div className="relative bg-[#FF8C00] rounded-3xl overflow-hidden shadow-lg min-h-[300px] flex items-center">
        
        {/* --- BACKGROUND EFFECT: Concentric Semi-Circles --- */}
        {/* UPDATED: Increased opacity values (bg-white/xx) for better visibility */}
        <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 pointer-events-none">
            
            {/* Circle 1 (Innermost - Most visible) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-white/30 rounded-full"></div>
            
            {/* Circle 2 */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-white/20 rounded-full"></div>
            
            {/* Circle 3 */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/10 rounded-full"></div>
            
            {/* Circle 4 (Outermost - Faintest) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-white/5 rounded-full"></div>
        </div>

        {/* --- CONTENT --- */}
        <div className="relative z-10 w-full px-8 md:px-16 py-12 flex flex-col items-center md:items-start text-center md:text-left">
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Ready for Your Next <br className="hidden md:inline"/> Adventure?
          </h2>
          
          <div className="flex items-center text-white mb-8 opacity-90">
            <p className="text-lg lg:text-xl">
              Discover amazing destinations and book <br className="hidden md:inline" />
              your dream trip with us today!
            </p>
          </div>

          <Button 
            onClick={handleBookNowClick} 
            className="bg-black text-white hover:bg-gray-900 px-8 py-6 rounded-full text-lg font-bold shadow-md transition-transform hover:scale-105"
          >
            Book Now
          </Button>

        </div>

      </div>
    </section>
  );
}
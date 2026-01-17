"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

// --- Destination Data ---
const destinations = [
  {
    id: "paris",
    imageUrl: "/images/destinations/paris.png",
    category: "France",
    title: "Paris",
  },
  {
    id: "bali",
    imageUrl: "/images/destinations/bali.png",
    category: "Indonesia",
    title: "Bali",
  },
  {
    id: "tokyo",
    imageUrl: "/images/destinations/tokyo.png",
    category: "Japan",
    title: "Tokyo",
  },
  {
    id: "rome",
    imageUrl: "/images/destinations/rome.png", 
    category: "Italy",
    title: "Rome",
  },
  {
    id: "dubai",
    imageUrl: "/images/destinations/dubai.png",
    category: "UAE",
    title: "Dubai",
  },
];

// --- Card Component ---
interface DestinationImageCardProps {
  imageUrl: string;
  category: string;
  title: string;
  href: string;
}

function DestinationImageCard({ imageUrl, category, title, href }: DestinationImageCardProps) {
  return (
    <Link href={href} className="block group h-full w-full">
      {/* UPDATED: Removed fixed width (w-[250px]). 
         Now uses w-full to fill the carousel slot.
         Increased height to h-[400px] for a better poster look.
      */}
      <div className="relative h-[400px] w-full overflow-hidden rounded-2xl shadow-md group-hover:shadow-xl">
        {/* Background Image */}
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
        
        {/* Text Content */}
        <div className="absolute bottom-0 left-0 p-6 z-10 w-full">
          <p className="text-sm font-medium text-orange-400 mb-1 tracking-wide uppercase">{category}</p>
          <h3 className="text-3xl font-bold text-white">{title}</h3>
        </div>
      </div>
    </Link>
  );
}

// --- Main Component ---
export function PopularDestinations() {
  return (
    <section className="w-full py-20 bg-[#FFF5EB]/50">
      <div className="container mx-auto px-6">
        
        {/* UPDATED: Header is now Left Aligned */}
        <div className="text-left mb-12">
          <h2 className="text-4xl  font-bold text-gray-900 mb-4">
            Popular <span className="text-[#FF8C00]">Destinations</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl">
           Explore our most popular travel destinations — the places everyone is excited to visit.
          </p>
        </div>

        {/* Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {destinations.map((dest) => (
              <CarouselItem 
                key={dest.id} 
                // Adjusted basis for better spacing: 1 on mobile, 2 on tablet, 3 on small desktop, 4 on large
                className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <DestinationImageCard
                  href="#" 
                  imageUrl={dest.imageUrl}
                  category={dest.category}
                  title={dest.title}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Navigation Arrows - Positioned top right relative to carousel or standard sides */}
          <div className="hidden md:block">
            <CarouselPrevious className="absolute -left-12 top-1/2 bg-[#FF8C00] text-white hover:bg-[#FF8C00]/80 hover:text-white -translate-y-1/2" />
            <CarouselNext className="absolute -right-12 top-1/2 bg-[#FF8C00] text-white hover:bg-[#FF8C00]/80 hover:text-white -translate-y-1/2" />
          </div>
        </Carousel>

      </div>
    </section>
  );
}
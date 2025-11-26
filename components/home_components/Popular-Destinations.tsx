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


// --- Your Provided Destination Data ---
const destinations = [
  {
    id: "paris",
    imageUrl: "/images/destinations/paris-small.jpeg",
    category: "France",
    title: "Paris",
  },
  {
    id: "bali",
    imageUrl: "/images/destinations/bali-small.jpeg",
    category: "Indonesia",
    title: "Bali",
  },
  {
    id: "tokyo",
    imageUrl: "/images/destinations/tokyo-small.jpeg",
    category: "Japan",
    title: "Tokyo",
  },
  {
    id: "rome",
    // Note: You had bali-small.jpeg for Rome, you may want to change this
    imageUrl: "/images/destinations/rome-small.jpg", 
    category: "Italy",
    title: "Rome",
  },
  {
    id: "dubai",
    imageUrl: "/images/destinations/dubai-small.jpeg",
    category: "UAE",
    title: "Dubai",
  },
];

// --- New Card Sub-Component (Styled like your image) ---
interface DestinationImageCardProps {
  imageUrl: string;
  category: string;
  title: string;
  href: string; // Link for the card
}

function DestinationImageCard({ imageUrl, category, title, href }: DestinationImageCardProps) {
  return (
    <Link href={href} className="block group">
      {/* This div is the card itself. We give it a fixed height
        to create the vertical card shape from your example.
      */}
      <div className="relative h-[300px] w-full overflow-hidden rounded-lg shadow-md transition-shadow duration-300 ease-in-out group-hover:shadow-xl">
        {/* Background Image */}
        <Image
          src={imageUrl}
          alt={title}
          fill
          loading="eager"
          className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Gradient Overlay (for text readability) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        
        {/* Text Content (styled to match your example) */}
        <div className="absolute bottom-0 left-0 p-4 z-10">
          <h3 className="text-2xl font-bold text-white uppercase tracking-wider">{title}</h3>
          <p className="text-sm text-gray-200">{category}</p>
        </div>
      </div>
    </Link>
  );
}
// --- End Card Sub-Component ---


// --- Main PopularDestinations Component (Rebuilt) ---
export function PopularDestinations() {
  return (
    <section className="w-full mt-20 bg-gray-100 dark:bg-gray-900">
      <div className=" mx-5">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-regular text-gray-900 dark:text-white">
            Most <span className="text-[#FF8C00] font-bold">Loved Destinations</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-3 max-w-2xl mx-auto">
           Explore our most popular travel destinations — the places everyone is excited to visit.
          </p>
        </div>

        {/* Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-7xl mx-auto" // Set a max-width for the carousel
        >
          <CarouselContent className="-ml-4">
            {destinations.map((dest) => (
              <CarouselItem 
                key={dest.id} 
                // This makes it show 4 cards on desktop, 2 on tablet, 1 on mobile
                className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/5"
              >
                <DestinationImageCard
                  href="#" // Placeholder link, you can change this later
                  imageUrl={dest.imageUrl}
                  category={dest.category}
                  title={dest.title}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-12" />
          <CarouselNext className="mr-12" />
        </Carousel>
      </div>
    </section>
  );
}
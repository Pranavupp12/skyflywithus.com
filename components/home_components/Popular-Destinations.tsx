"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { DestinationCard } from "@/components/ui/destination-card";

// Sample data for our destinations
const destinations = [
  {
    id: "paris",
    imageUrl: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFyaXN8ZW58MHx8MHx8fDA%3D",
    category: "France",
    title: "Paris",
  },
  {
    id: "bali",
    imageUrl: "/images/destinations/bali.jpg",
    category: "Indonesia",
    title: "Bali",
  },
  {
    id: "tokyo",
    imageUrl: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=2070&auto=format&fit=crop",
    category: "Japan",
    title: "Tokyo",
  },
  {
    id: "rome",
    imageUrl: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1996&auto=format&fit=crop",
    category: "Italy",
    title: "Rome",
  },
  {
    id: "dubai",
    imageUrl: "https://images.unsplash.com/flagged/photo-1559717201-fbb671ff56b7?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "UAE",
    title: "Dubai",
  },
];

export function PopularDestinations() {
  // Simple state to manage likes for the demo
  const [liked, setLiked] = React.useState<string[]>([]);

  const handleLike = (id: string) => {
    setLiked((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="mx-10 md:mx-5 mt-20 bg-gray-100 dark:bg-gray-900">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-regular text-black dark:text-white">
            Most <span className="font-bold text-[#FF8C00]">Loved Destinations</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-3 max-w-2xl mx-auto">
            Explore our most popular travel spots, curated by travelers and
            experts.
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
          <CarouselContent>
            {destinations.map((dest) => (
              <CarouselItem
                key={dest.id}
                // This controls the size on different screens
                // On mobile: 1 card. On md: 2 cards. On lg: 3 cards.
                className=" basis-1 md:basis-1/2 lg:basis-1/4"
              >
                <div className="">
                  {/* This is where we set the card size. 
                   * You wanted it smaller, so we use h-[400px].
                   * The demo was h-[500px].
                   */}
                  <DestinationCard
                    className="h-[250px]"
                    imageUrl={dest.imageUrl}
                    category={dest.category}
                    title={dest.title}
                    isLiked={liked.includes(dest.id)}
                    onLike={() => handleLike(dest.id)}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-8" />
          <CarouselNext className="mr-8" />
        </Carousel>
      </div>
    </section>
  );
}
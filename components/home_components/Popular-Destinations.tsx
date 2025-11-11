"use client";

import {
  Palmtree,
  Sun,
  Waves,
  Ship,
  Building,
  Landmark,
} from "lucide-react";
import { ExpandingCards, CardItem } from "@/components/ui/expanding-cards";

// Updated data with local image paths
const popularDestinations: CardItem[] = [
  {
    id: "bali-indonesia",
    title: "Bali",
    description:
      "The 'Island of the Gods' offers everything from lush jungle highlands and volcanic mountains to iconic rice paddies and serene beaches.",
    imgSrc: "/images/destinations/bali.jpg", // <-- Change this
    icon: <Palmtree size={24} />,
    linkHref: "#",
  },
  {
    id: "santorini-greece",
    title: "Santorini",
    description:
      "Famous for its dramatic cliffs, whitewashed villages, and stunning sunsets over the deep blue caldera.",
    imgSrc: "/images/destinations/bali.jpg", // <-- Change this
    icon: <Sun size={24} />,
    linkHref: "#",
  },
  {
    id: "maldives",
    title: "Maldives",
    description:
      "A tropical paradise renowned for its overwater bungalows, crystal-clear turquoise waters, and vibrant coral reefs.",
    imgSrc: "/images/destinations/bali.jpg", // <-- Change this
    icon: <Waves size={24} />,
    linkHref: "#",
  },
  {
    id: "phuket-thailand",
    title: "Phuket",
    description:
      "Thailand's largest island, offering bustling beaches, vibrant nightlife, and stunning boat trips to nearby limestone karsts.",
    imgSrc: "/images/destinations/bali.jpg", // <-- Change this
    icon: <Ship size={24} />,
    linkHref: "#",
  },
  {
    id: "dubai-uae",
    title: "Dubai",
    description:
      "A futuristic desert metropolis, home to the world's tallest building, luxury shopping, and man-made islands.",
    imgSrc: "/images/destinations/bali.jpg", // <-- Change this
    icon: <Building size={24} />,
    linkHref: "#",
  },
  {
    id: "kyoto-japan",
    title: "Kyoto",
    description:
      "The cultural heart of Japan, famous for its classical Buddhist temples, traditional wooden houses, and serene gardens.",
    imgSrc: "/images/destinations/bali.jpg", // <-- Change this
    icon: <Landmark size={24} />,
    linkHref: "#",
  },
];

export function PopularDestinations() {
  return (
    <div className="flex w-full flex-col items-center justify-center mt-20 bg-background rounded-2xl p-10">
      <div className="text-center">
        <h2 className="text-5xl font-regular tracking-tight text-foreground mb-4">
          Most <span className="text-indigo-500 font-bold">Loved Destinations</span>
        </h2>
        <p className=" max-w-2xl text-lg text-muted-foreground mb-6">
          Explore our most popular travel spots. Hover or click on a card to
          unveil its story and find flight deals.
        </p>
      </div>
      <ExpandingCards items={popularDestinations} defaultActiveIndex={0} />
    </div>
  );
}
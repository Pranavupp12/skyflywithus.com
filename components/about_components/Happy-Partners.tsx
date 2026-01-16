"use client";

import { LogoCloud } from "@/components/ui/Logo-Cloud"; // Import the new component

// Using the same demo brands for now.
// You can replace these with your partners' logos.
const logos = [
    {
        alt: "Qatar Airways",
        src: "/images/brands/Qatar.svg",
    },
    {
        alt: "Indigo Airlines",
        src: "/images/brands/indigo.svg",
    },
    {
        alt: "KLM Airlines",
        src: "/images/brands/klm.svg",
    },
    {
        alt: "Indigo Airline",
        src: "/images/brands/indigo.svg",
    },
    {
        alt: "Qatar Airway",
        src: "/images/brands/Qatar.svg",
    },
    {
        alt: "Indigo Airlinez",
        src: "/images/brands/indigo.svg",
    },
     {
        alt: "Indigo Airlinezz",
        src: "/images/brands/Qatar.svg",
    },
     {
        alt: "Indigo Airlinezzz",
        src: "/images/brands/indigo.svg",
    },
     {
        alt: "KLM Airlinezz",
        src: "/images/brands/klm.svg",
    },
     
    
];

export function HappyPartners() {
  return (
    <section className="relative py-15 max-w-full w-full">
      <h2 className="mb-5 text-center font-regular text-4xl ">
        <span className="text-black">Our</span>{" "}
        <span className=" text-[#FF8C00] font-semibold">Partners</span>
      </h2>
      <div className="mx-auto my-5 h-px max-w-sm bg-[#FF8C00] [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />

      <LogoCloud logos={logos} />

      <div className="mt-5 h-px bg-[#FF8C00] [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />
    </section>
  );
}
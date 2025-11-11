"use client";

import { cn } from "@/lib/utils";
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
     
    
];

export function HappyPartners() {
  return (
    <section className="relative bg-white rounded-2xl mx-auto p-10 mt-20 max-w-full w-full">
      <h2 className="mb-5 text-center font-regular text-3xl tracking-tight md:text-5xl ">
        <span className="text-black">Our</span>{" "}
        <span className=" text-indigo-500 font-semibold">Happy Partners</span>
      </h2>
      <div className="mx-auto my-5 h-px max-w-sm bg-indigo-500 [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />

      <LogoCloud logos={logos} />

      <div className="mt-5 h-px bg-indigo-500 [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />
    </section>
  );
}
"use client";

import { Testimonial } from "@/components/ui/testimonial-card";

const testimonials = [
  {
    name: "Sarah Thompson",
    role: "Frequent Flyer",
    rating: 5,
    testimonial: "SkyFlyWithUs has transformed the way I book travel. The booking form was incredibly easy to use, and I found the cheapest flight to Bali in seconds. The travel blogs are also a fantastic bonus!"
  },
  {
    name: "Jonathan Yombo",
    role: "Travel Blogger",
    rating: 5,
    testimonial: "This is the only site I use now. The 'Perfect Experience' form is a game-changer for finding exactly what I need without the hassle."
  },
  {
    name: "Yucel Faruksahan",
    role: "Digital Nomad",
    rating: 5,
    testimonial: "I got an amazing deal on my flight to Tokyo. The 'Book Instantly' button is no joke. Highly recommend for anyone looking to save time and money."
  },
  // You can add more testimonials here. 

];

export function Testimonials() {
    return (
        <section className="py-20 w-full bg-gradient-to-b from-white to-white ">
            <div className="container mx-auto px-6 space-y-12">
                
                {/* Header - Left Aligned */}
                <div className="text-left max-w-xl space-y-4">
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                        Reviews & <span className='text-[#FF8C00]'>Experiences</span>
                    </h2>
                    <p className='text-lg text-gray-600 dark:text-gray-300'>
                        See what our happy customers have to say about how their blog helps to provide flight information.
                    </p>
                </div>

                {/* Grid of Testimonials */}
                {/* UPDATED: Changed lg:grid-cols-2 to lg:grid-cols-3 */}
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((testimonial, idx) => (
                        <Testimonial 
                            key={idx}
                            {...testimonial}
                            className="h-full"
                        />
                    ))}
                </div>

            </div>
         </section>
    )
}
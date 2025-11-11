
import { BookingForm } from "@/components/home_components/Booking-Form";
import { AboutUsSection } from "@/components/home_components/About-Us-section";
import { PopularDestinations } from "@/components/home_components/Popular-Destinations";
import { RecentArticles } from "@/components/home_components/Recent-Articles";
import { Testimonials } from "@/components/home_components/Testimonials";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Find Cheap Flights & Travel Guides', // This will override the default
  description: 'SkyFlyWithUs: Your main destination for booking cheap flights and discovering inspiring travel blogs and compensation guides.',
};

export default function Home() {
  return (

    <main className="flex min-h-screen flex-col items-center justify-between px-10 md:px-20">
      <BookingForm />
      <AboutUsSection/>
      <PopularDestinations/>
      <RecentArticles/>
      <Testimonials/>
    </main>
  );
}
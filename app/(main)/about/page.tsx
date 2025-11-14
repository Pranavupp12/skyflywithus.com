import { AboutUsSection } from "@/components/about_components/About-Us-section";
import { MeetTheTeam } from "@/components/about_components/Meet-The-Team"; 
import { HappyPartners } from "@/components/about_components/Happy-Partners";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about the team and mission behind SkyFlyWithUs.',
};

export default function AboutPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between ">
            <AboutUsSection />
            <HappyPartners />
            <MeetTheTeam /> 
        </main>
    )

}
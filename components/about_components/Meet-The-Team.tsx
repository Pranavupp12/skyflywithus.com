"use client";

import Image from "next/image";
import Link from "next/link";
import { Linkedin, Twitter } from "lucide-react";

// Placeholder data (replace image URLs with your own)
const teamMembers = [
  {
    name: "Alex Johnson",
    role: "Founder & CEO",
    bio: "Alex is the visionary behind SkyFlyWithUs, dedicated to making travel accessible for everyone.",
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&auto=format&fit=crop", 
    social: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Maria Garcia",
    role: "Head of Content",
    bio: "Maria curates all the amazing travel blogs and guides you read on our site.",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop", 
    social: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Lee Kim",
    role: "Lead Engineer",
    bio: "Lee is the technical wizard who built our platform and keeps the booking engine running smoothly.",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop", 
    social: { linkedin: "#", twitter: "#" },
  },
];

export function MeetTheTeam() {
  return (
    // FIX 1: Apply full-width background using negative margins
    <section className="w-full py-20 bg-[#FFF5EB]/50">
      
      {/* Container to center content and align with rest of page */}
      <div className="container mx-auto px-6">
        
        {/* FIX 2: Left-aligned Header */}
        <div className="text-left mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Meet <span className="text-[#FF8C00]">Our Team</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
            We have an expert team that is reliable, experienced, dedicated, and highly skilled.
          </p>
        </div>

        {/* Team Member Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              // FIX 3: White background for cards with shadow and border
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Member Image */}
              <div className="relative w-32 h-32 mx-auto mb-6">
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 200px"
                  className="object-cover rounded-full border-4 border-orange-50"
                />
              </div>

              {/* Member Info */}
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {member.name}
              </h3>
              <p className="text-[#FF8C00] font-medium mb-4 uppercase text-sm tracking-wide">
                {member.role}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                {member.bio}
              </p>

              {/* Social Links */}
              <div className="flex justify-center space-x-4 text-gray-400">
                <Link href={member.social.twitter} passHref className="hover:text-[#FF8C00] transition-colors">
                    <Twitter className="h-5 w-5" />
                </Link>
                <Link href={member.social.linkedin} passHref className="hover:text-[#FF8C00] transition-colors">
                    <Linkedin className="h-5 w-5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
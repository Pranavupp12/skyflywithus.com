"use client";

import Image from "next/image";
import Link from "next/link";
import { Linkedin, Twitter } from "lucide-react";

// You can replace this dummy data with your actual team
const teamMembers = [
  {
    name: "Alex Johnson",
    role: "Founder & CEO",
    bio: "Alex is the visionary behind SkyFlyWithUs, dedicated to making travel accessible for everyone.",
    imageUrl: "/images/team/member.jpg", // Add this image to public/images/team/
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Maria Garcia",
    role: "Head of Content",
    bio: "Maria curates all the amazing travel blogs and guides you read on our site.",
    imageUrl: "/images/team/member.jpg", // Add this image to public/images/team/
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Lee Kim",
    role: "Lead Engineer",
    bio: "David is the technical wizard who built our platform and keeps the booking engine running smoothly.",
    imageUrl: "/images/team/member.jpg", // Add this image to public/images/team/
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
];

export function MeetTheTeam() {
  return (
    <section className=" mt-10 mb-20 dark:bg-gray-900 mx-10 md:mx-5 ">
      <div className="p-10 mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-regular text-gray-900 dark:text-white mb-4">
            Meet <span className="text-[#FF8C00] font-semibold">Our Team</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We are a passionate group of travelers, creators, and tech enthusiasts
            dedicated to building your perfect travel experience.
          </p>
        </div>

        {/* Team Member Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center"
            >
              {/* Member Image */}
              <div className="relative w-32 h-32 mx-auto mb-4">
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 200px"
                  className=" object-cover rounded-full"
                />
              </div>

              {/* Member Info */}
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {member.name}
              </h3>
              <p className="text-[#FFA749] font-lg mb-2">{member.role}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                {member.bio}
              </p>

              {/* Social Links */}
              <div className="flex justify-center space-x-4 text-gray-500 dark:text-gray-400">
                <Link href={member.social.twitter} passHref>
                  <span className="cursor-pointer hover:text-[#FFA749]">
                    <Twitter className="h-5 w-5" />
                  </span>
                </Link>
                <Link href={member.social.linkedin} passHref>
                  <span className="cursor-pointer hover:text-[#FFA749]">
                    <Linkedin className="h-5 w-5" />
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
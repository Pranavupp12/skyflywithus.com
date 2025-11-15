"use client";

import Link from "next/link";
import Image from "next/image";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { Noto_Sans } from 'next/font/google'; // <-- 1. Import the new font

// 2. Initialize the font (Oswald needs a bold weight to be visible)
const noto_sans = Noto_Sans({
  subsets: ['latin'],
  weight: '600', 
});

// --- Categories for Blog links ---
const categories = [
  { name: "Cancellation and Refund", slug: "cancellation-and-refund" },
  { name: "Change Flight", slug: "change-flight" },
  { name: "Compensation", slug: "compensation" },
  { name: "Seat Upgrade", slug: "seat-upgrade" },
  { name: "Voucher", slug: "voucher" },
  { name: "Lost and Found", slug: "lost-and-found" },
  { name: "Check In", slug: "check-in" },
  { name: "Airport", slug: "airport" },
];

// --- 1. UPDATED: Link sections now include "Policy" ---
const defaultSections = [
  {
    title: "Company",
    links: [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Blogs",
    links: categories.map(cat => ({
      name: cat.name,
      href: `/blog/category/${cat.slug}`
    })),
  },
  {
    title: "Policy",
    links: [
      { name: "Terms and Conditions", href: "#" },
      { name: "Privacy Policy", href: "#" },
    ],
  },
];

// --- (Social links remain the same) ---
const defaultSocialLinks = [
  { icon: <FaInstagram className="size-5" />, href: "#", label: "Instagram" },
  { icon: <FaFacebook className="size-5" />, href: "#", label: "Facebook" },
  { icon: <FaTwitter className="size-5" />, href: "#", label: "Twitter" },
  { icon: <FaLinkedin className="size-5" />, href: "#", label: "LinkedIn" },
];

export function Footer() {
  return (
      <>
    <section className=" relative w-full overflow-hidden min-h-[400px] border-t  border-[#FF8C00] bg-gray-100 rounded-t-4xl dark:bg-gray-900 dark:border-gray-800">
      <Image
        src="/images/airport.jpg" // <--- ENSURE THIS PATH IS CORRECT FOR YOUR IMAGE 1
        alt="Airplane at sunset"
        fill
        loading="eager"
        quality={100}
        className="z-0 object-cover" // Ensure image is behind overlay
      />

      {/* Orange Overlay */}
      {/* Increased opacity to 90% for a stronger overlay like in the example */}
      <div className="absolute inset-0 bg-[#FFCA91] opacity-90 z-10"></div>

      <div className="relative z-20 mx-15 pt-5">
        <div className="flex w-full flex-col justify-between gap-8 lg:flex-row lg:items-start lg:text-left">

          {/* --- 3. LEFT COLUMN (Logo, Desc, Social, Subscribe) --- */}
          <div className="flex w-full flex-col justify-between gap-4 lg:items-start">
            {/* Logo */}
            {/*<div className="flex items-center gap-2 lg:justify-start">
              <Link href="/" className="flex items-center gap-2">
                <Plane className="h-6 w-6 text-black" />
                <h2 className="text-xl font-bold text-black dark:text-white"><span className="text-[#FF8C00]">SkyFly</span>WithUs</h2>
              </Link>
            </div>
            <p className="max-w-[70%] text-sm text-gray-800">
              Book cheap flights, read travel blogs, and plan your perfect experience with us.
            </p>*/}
            {/* --- 4. MOVED: Subscribe Section --- */}
            <div className="w-full max-w-xs hidden lg:block">
              <h3 className="mb-1 font-bold text-[#FF8C00] dark:text-white">Subscribe</h3>
              <p className=" text-sm text-black mb-4">
                Get the latest travel tips and deals straight to your inbox.
              </p>
              <form>
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-3 py-2 rounded-md border border-black text-black focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
                />
                <button
                  type="submit"
                  className="w-full mt-2 px-4 py-2 bg-[#FF8C00] text-white rounded-md font-semibold hover:bg-[#FFA749] transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
            {/* --------------------------------- */}
          </div>

          {/* --- 5. RIGHT COLUMNS (Company, Blogs, Policy) --- */}
          <div className="grid w-full gap-6 grid-cols-3 md:grid-row lg:gap-8">

            {/* Renders Company, Blogs, and Policy columns from the updated array */}
            {defaultSections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold text-[#FF8C00] dark:text-white">{section.title}</h3>
                <ul className="space-y-3 text-sm text-black">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-[#FFA749]"
                    >
                      <Link href={link.href}>{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* The subscribe form that was here is now GONE */}

          </div>
        </div>

        {/* --- 6. BOTTOM BAR (Legal links are now removed from here) --- */}
        <div className="mt-4 border-t border-black/30 dark:border-gray-800 p-4 text-xs font-medium text-black">

          <div className="flex flex-col-2 justify-between gap-4 md:flex-row md:items-center text-center md:text-left">

            <p className="order-2 ">
              © 2025 SkyFlyWithUs. All rights reserved.
            </p>

            <ul className="flex items-center space-x-6 text-black">
              {defaultSocialLinks.map((social, idx) => (
                <li key={idx} className="font-medium hover:text-[#FFA749]">
                  <a href={social.href} aria-label={social.label}>
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <h1
            className={`relative z-20 text-[55px] md:text-[100px] lg:text-[150px] font-extrabold text-[#FF8C00] text-center select-none z-0 ${noto_sans.className}`}
            aria-hidden="true"
          >
            SkyFlyWithUs
          </h1>
      </div>
    </section>
    {/* Disclaimer Bar (bottom) */}
      <div className=" relative z-20 p-5 bg-[#FF8C00] text-center">
        <p className="text-lg text-white">
          DISCLAIMER: This is a sample disclaimer line. You should replace this text with your official legal disclaimer.
        </p>
      </div>
   </>
  );
};
"use client";

import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const categories = [
  { name: "Cancellation & Refund", slug: "cancellation-and-refund" },
  { name: "Change Flight", slug: "change-flight" },
  { name: "Compensation", slug: "compensation" },
  { name: "Seat Upgrade", slug: "seat-upgrade" },
  { name: "Voucher", slug: "voucher" },
  { name: "Lost & Found", slug: "lost-and-found" },
  { name: "Check In", slug: "check-in" },
  { name: "Airport", slug: "airport" },
];

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
    title: "Travel Guides", 
    links: categories.map(cat => ({
      name: cat.name,
      href: `/blog/category/${cat.slug}`
    })),
  },
  {
    title: "Legal",
    links: [
      { name: "Terms and Conditions", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Sitemap", href: "/public-sitemap" },
    ],
  },
];

const defaultSocialLinks = [
  { icon: <FaInstagram className="size-5" />, href: "#", label: "Instagram" },
  { icon: <FaFacebook className="size-5" />, href: "#", label: "Facebook" },
  { icon: <FaTwitter className="size-5" />, href: "#", label: "Twitter" },
  { icon: <FaLinkedin className="size-5" />, href: "#", label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="w-full bg-[#FFF5EB] text-gray-600 font-sans">
      
      {/* --- TOP SECTION: Brand & Newsletter --- */}
      <div className="border-b border-orange-200/60">
        <div className="container mx-auto px-6 py-12 lg:px-20">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            
            {/* Brand Intro */}
            <div className="max-w-md">
              <Link href="/" className="flex items-center gap-3 mb-4 group">
                <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">
                  <span className="text-[#FF8C00]">SkyFly</span>WithUs
                </h2>
              </Link>
              <p className="text-sm text-gray-600 leading-relaxed">
                From local escapes to global adventures — we provide the insights 
                you need to travel smarter, cheaper, and faster.
              </p>
            </div>

            {/* Newsletter */}
            <div className="w-full lg:w-auto min-w-[340px]">
              <h3 className="text-gray-900 font-bold mb-2">Join our newsletter</h3>
              <p className="text-xs text-gray-500 mb-4">Get fast tips and exclusive deals directly to your inbox.</p>
              
              <form className="relative flex items-center">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-white text-gray-900 rounded-full py-3 pl-5 pr-32 focus:outline-none focus:ring-2 focus:ring-[#FF8C00] shadow-sm border border-orange-100 placeholder:text-gray-400"
                />
                <button 
                  type="submit" 
                  className="absolute right-1 top-1 bottom-1 bg-[#FF8C00] hover:bg-[#ff9d24] text-white font-medium rounded-full px-5 text-sm transition-colors flex items-center gap-2 shadow-md"
                >
                  Subscribe
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>

      {/* --- MIDDLE SECTION: 4 Column Grid --- */}
      <div className="container mx-auto px-6 py-16 lg:px-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 items-start">
          
          {/* 1. Company Links */}
          <div>
            <h4 className="text-gray-900 font-bold mb-6 text-lg">Company</h4>
            <ul className="space-y-4">
              {defaultSections[0].links.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="hover:text-[#FF8C00] transition-colors text-sm font-medium">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 2. Blog Links (Single Vertical Column) */}
          <div>
            <h4 className="text-gray-900 font-bold mb-6 text-lg">Travel Guides</h4>
            {/* CHANGED: Removed 'grid', added 'space-y-4' for vertical list */}
            <ul className="space-y-4">
              {defaultSections[1].links.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="hover:text-[#FF8C00] transition-colors text-sm font-medium flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF8C00] opacity-50"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Legal Links */}
          <div>
            <h4 className="text-gray-900 font-bold mb-6 text-lg">Legal</h4>
            <ul className="space-y-4">
              {defaultSections[2].links.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="hover:text-[#FF8C00] transition-colors text-sm font-medium">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Social Links (Vertical, Transparent BG) */}
          <div>
            <h4 className="text-gray-900 font-bold mb-6 text-lg">Follow Us</h4>
            <ul className="space-y-4">
              {defaultSocialLinks.map((social, idx) => (
                <li key={idx}>
                  <a 
                    href={social.href} 
                    // CHANGED: Removed bg-white/shadow/padding. Added flex alignment.
                    className="flex items-center gap-3 text-gray-500 hover:text-[#FF8C00] transition-colors duration-300 group"
                    aria-label={social.label}
                  >
                    <span className="group-hover:scale-110 transition-transform">
                        {social.icon}
                    </span>
                    <span className="text-sm font-medium">{social.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* --- BOTTOM SECTION: Disclaimer --- */}
      <div className="bg-[#FF8C00] text-white">
        <div className="container mx-auto px-6 py-6 lg:px-20 text-center">
          <p className="text-xs md:text-sm leading-relaxed opacity-95 max-w-4xl mx-auto font-medium">
            DISCLAIMER: Our website provides general information about flights and travel. While we have Professional duties to keep our content accurate and helpful, we cannot guarantee that all information is always complete or up to date. We are not legally responsible for any issues, losses, or decisions that result from using the information on our site.
          </p>
          <div className="mt-4 pt-4 border-t border-white/20 flex flex-col md:flex-row justify-between items-center text-xs opacity-80">
            <p>© 2025 SkyFlyWithUs. All rights reserved.</p>
            <p className="mt-2 md:mt-0">Made for travelers, by travelers.</p>
          </div>
        </div>
      </div>

    </footer>
  );
}
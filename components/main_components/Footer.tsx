"use client";

import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Plane } from "lucide-react"; // Using your existing Plane icon

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

// 1. Updated link sections as you requested
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
];

const defaultSocialLinks = [
  { icon: <FaInstagram className="size-5" />, href: "#", label: "Instagram" },
  { icon: <FaFacebook className="size-5" />, href: "#", label: "Facebook" },
  { icon: <FaTwitter className="size-5" />, href: "#", label: "Twitter" },
  { icon: <FaLinkedin className="size-5" />, href: "#", label: "LinkedIn" },
];

const defaultLegalLinks = [
  { name: "Terms and Conditions", href: "#" },
  { name: "Privacy Policy", href: "#" },
];

export function Footer() {
  return (
    <section className="py-10 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto">
        <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start lg:text-left">
          <div className="flex w-full flex-col justify-between gap-6 lg:items-start">
            {/* 2. Customized Logo to match your header */}
            <div className="flex items-center gap-2 lg:justify-start">
              <a href="/" className="flex items-center gap-2">
                <Plane className="h-6 w-6 text-indigo-500" />
                <h2 className="text-xl font-bold text-indigo-500 dark:text-white">SkyFlyWithUs</h2>
              </a>
            </div>
            {/* 3. Customized Description */}
            <p className="max-w-[70%] text-sm text-muted-foreground">
              Book cheap flights, read travel blogs, and plan your perfect experience with us.
            </p>
            <ul className="flex items-center space-x-6 text-muted-foreground">
              {defaultSocialLinks.map((social, idx) => (
                <li key={idx} className="font-medium hover:text-indigo-300">
                  <a href={social.href} aria-label={social.label}>
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* 4. Link sections are now dynamic based on defaultSections */}
          <div className="grid w-full gap-6 md:grid-cols-2 lg:gap-20">
            {defaultSections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold text-indigo-500 dark:text-white">{section.title}</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-indigo-300"
                    >
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-col justify-between gap-4 border-t border-gray-200 dark:border-gray-800 py-4 text-xs font-medium text-muted-foreground md:flex-row md:items-center md:text-left">
          {/* 5. Customized Copyright */}
          <p className="order-2 lg:order-1">© 2025 SkyFlyWithUs. All rights reserved.</p>
          <ul className="order-1 flex flex-col gap-2 md:order-2 md:flex-row">
            {defaultLegalLinks.map((link, idx) => (
              <li key={idx} className="hover:text-indigo-300">
                <a href={link.href}> {link.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
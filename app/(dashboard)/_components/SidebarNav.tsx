"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MessageSquare, FileText } from "lucide-react";

// 1. Define your navigation links
const navLinks = [
  {
    href: "/dashboard/bookings",
    label: "Bookings",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    href: "/dashboard/contacts",
    label: "Contacts",
    icon: <MessageSquare className="h-5 w-5" />,
  },
  {
    href: "/dashboard/blogs",
    label: "Manage Blogs",
    icon: <FileText className="h-5 w-5" />,
  },
];

export function SidebarNav() {
  // 2. Get the current URL path
  const pathname = usePathname();

  return (
    <nav className="flex flex-col space-y-2">
      {navLinks.map((link) => {
        // 3. Check if the current path starts with the link's href
        const isActive = pathname ? pathname.startsWith(link.href) : false;

        return (
          <Link
            key={link.label}
            href={link.href}
            // 4. Conditionally apply active styles
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 dark:text-gray-300",
              isActive
                ? "bg-indigo-100 dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 font-medium"
                : "hover:bg-indigo-50 dark:hover:bg-gray-800"
            )}
          >
            {link.icon}
            <span>{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
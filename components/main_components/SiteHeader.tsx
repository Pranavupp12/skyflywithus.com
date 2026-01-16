"use client";

import * as React from "react"
import { Button, buttonVariants } from '@/components/ui/button'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import { MobileNav } from '@/components/ui/navbar'
import Link from 'next/link'
import Image from "next/image"

// 1. Your specific navigation items
const navItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Blogs", link: "/blog" },
    { name: "Contact", link: "/contact" },
];

const mobileNavStructure = [
    {
        name: 'Menu',
        items: navItems.map(item => ({ label: item.name, href: item.link })),
    }
]

export default function SiteHeader() {
    return (
        // UPDATE: Changed classes to make header absolute, transparent, and sit on top (z-50)
        <header className="absolute top-0 left-0 right-0 z-50 w-full bg-transparent">
            <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4 md:px-6">
                
                <div className="flex items-center justify-start gap-2">
                    {/* Mobile Navigation */}
                    <MobileNav nav={mobileNavStructure} />

                    {/* Logo Area */}
                    <Link
                        href="/"
                        className={cn(
                            buttonVariants({ variant: 'ghost', size: 'icon' }),
                            // Added hover:bg-white/20 for better interaction on transparent bg
                            "text-accent-foreground w-auto hover:bg-white/20 transition-colors"
                        )}
                    >
                        <div className="flex items-center gap-2">
                            <Image 
                                src="/images/sf-logo.png" 
                                alt="SkyFlyWithUs Logo"
                                width={64} 
                                height={64} 
                                className="size-16 object-contain"
                                priority
                            />
                        </div>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <NavigationMenu className="max-md:hidden">
                    <NavigationMenuList>
                        {navItems.map((item, index) => (
                            <NavigationMenuItem key={index}>
                                {/* Added 'bg-transparent' to links to prevent white boxes */}
                                <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-white/20")}>
                                    <Link href={item.link}>
                                        {item.name}
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-2">
                    <Link href="/#booking-form-section">
                        <Button variant="default" className="bg-[#FF8C00] hover:bg-[#ff9514] text-white shadow-md">
                            Book Instantly
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    )
}
// components/main_components/SiteHeader.tsx
"use client";
import {
    Navbar,
    NavBody,
    NavItems,
    MobileNav,
    NavbarLogo,
    NavbarButton,
    MobileNavHeader,
    MobileNavToggle,
    MobileNavMenu,
} from "@/components/ui/resizable-navbar"; // <--- Imports from the file above
import { useState } from "react"; 


export default function SiteHeader() {
    // 1. Your nav links
    const navItems = [
        {
            name: "Home",
            link: "/",
        },
        {
            name: "About",
            link: "/about",
        },
        {
            name: "Blogs",
            link: "/blog",
        },
        {
            name: "Contact",
            link: "/contact",
        },
    ];

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
            <Navbar>
                {/* Desktop Navigation */}
                <NavBody>
                    <NavbarLogo />
                    <NavItems items={navItems} />
                    <div className="flex items-center gap-4">
                        {/* 2. Your single button */}

                        <NavbarButton variant="primary" href="/#booking-form-section">
                            Book Instantly
                        </NavbarButton>
                        </div>
                </NavBody>

                {/* Mobile Navigation */}
                <MobileNav>
                    <MobileNavHeader>
                        <NavbarLogo />
                        <MobileNavToggle
                            isOpen={isMobileMenuOpen}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        />
                    </MobileNavHeader>

                    <MobileNavMenu
                        isOpen={isMobileMenuOpen}
                        onClose={() => setIsMobileMenuOpen(false)}
                    >
                        {navItems.map((item, idx) => (
                            <a
                                key={`mobile-link-${idx}`}
                                href={item.link}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="relative text-lg font-medium text-primary dark:text-neutral-300"
                            >
                                <span className="block py-2">{item.name}</span>
                            </a>
                        ))}
                        <div className="flex w-full flex-col gap-4 pt-4">
                            <NavbarButton
                                onClick={() => setIsMobileMenuOpen(false)}
                                variant="primary"
                                className="w-full"
                                href="/#booking-form-section"
                                >
                                Book Instantly
                            </NavbarButton>
                        </div>
                    </MobileNavMenu>
                </MobileNav>
             </Navbar>
    );
}
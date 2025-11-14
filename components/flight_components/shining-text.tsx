"use client"

import * as React from "react"
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function ShiningText({ text, className }: { text: string, className?: string }) {
    return (
        <motion.p
            className={cn(
                // --- THIS LINE IS UPDATED ---
                "bg-[linear-gradient(110deg,#FF8C00,35%,#fff,50%,#FF8C00,75%,#FF8C00)] bg-[length:200%_100%] bg-clip-text text-lg font-medium text-transparent",
                className
            )}
            initial={{ backgroundPosition: "200% 0" }}
            animate={{ backgroundPosition: "-200% 0" }}
            transition={{
                repeat: Infinity,
                duration: 3, // Kept your duration of 3
                ease: "linear",
            }}
        >
            {text}
        </motion.p>
    );
}
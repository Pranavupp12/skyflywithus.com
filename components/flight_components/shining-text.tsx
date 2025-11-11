"use client"

import * as React from "react"
import { motion } from "motion/react"; // Correct import from the 'motion' package
import { cn } from "@/lib/utils";
export function ShiningText({ text, className }: { text: string, className?: string }) {
    return (
        // FIX: Changed from h1 to p for correct semantics
        <motion.p
            // Merged the provided classes with the className prop
            className={cn(
                "bg-[linear-gradient(110deg,#6366F1,35%,#fff,50%,#6366F1,75%,#6366F1)] bg-[length:200%_100%] bg-clip-text text-lg font-medium text-transparent",
                className // Allow overriding styles
            )}
            initial={{ backgroundPosition: "200% 0" }}
            animate={{ backgroundPosition: "-200% 0" }}
            transition={{
                repeat: Infinity,
                duration: 3,
                ease: "linear",
            }}
        >
            {text}
        </motion.p>
    );
}
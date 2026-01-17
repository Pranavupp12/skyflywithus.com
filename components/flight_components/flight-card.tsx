"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Plane, Clock, CalendarDays, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// --- HELPERS ---
const formatTime = (dateString: string) => {
    if (!dateString) return "--:--";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    }).format(date);
};

const formatDate = (dateString: string) => {
    if (!dateString) return "--/--/----";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", { 
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    }).format(date);
};

export interface FlightCardProps {
    imageUrl?: string; // Optional now, as we use CSS background
    airline: string;
    flightCode: string;
    flightClass: string;
    departureCode: string;
    departureCity: string;
    departureTime: string;
    arrivalCode: string;
    arrivalCity: string;
    arrivalTime: string;
    duration: string;
    className?: string;
    price: number;
}

export const FlightCard = React.forwardRef<HTMLDivElement, FlightCardProps>(
    (
        {
            imageUrl, // Not used in background anymore, but kept for interface compatibility
            airline,
            flightCode,
            flightClass,
            departureCode,
            departureCity,
            departureTime,
            arrivalCode,
            arrivalCity,
            arrivalTime,
            duration,
            price,
            className,
        },
        ref
    ) => {
        
        const depTimeFormatted = formatTime(departureTime);
        const depDateFormatted = formatDate(departureTime);
        const arrTimeFormatted = formatTime(arrivalTime);

        return (
            <motion.div
                ref={ref}
                className={cn(
                    "group relative w-full max-w-sm font-sans rounded-3xl bg-white border border-gray-200 overflow-hidden flex flex-col justify-between",
                    className
                )}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
            >
                {/* 1. Header: Solid Orange Background */}
                <div className="relative h-28 w-full overflow-hidden bg-[#FF8C00]">
                    
                    {/* Decorative Watermark Icon (Adds texture) */}
                    <Plane className="absolute -right-6 -bottom-12 w-48 h-48 text-white/10 rotate-[-15deg] pointer-events-none" />

                    {/* Airline Info */}
                    <div className="absolute top-6 left-6 z-20 flex flex-col text-white">
                        <span className="font-bold text-2xl tracking-tight">{airline}</span>
                        <div className="flex items-center gap-2 mt-1.5">
                             <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10">
                                {flightClass}
                             </span>
                             <span className="text-xs opacity-90 font-medium">
                                • {flightCode}
                             </span>
                        </div>
                    </div>
                </div>

                {/* 2. Main Flight Info */}
                <div className="px-6 pt-6 pb-2">
                    <div className="flex items-center justify-between w-full">
                        
                        {/* DEPARTURE */}
                        <div className="flex flex-col text-left min-w-[80px]">
                            <span className="text-3xl font-bold text-gray-900 leading-none">{departureCode}</span>
                            <span className="text-lg font-bold text-[#FF8C00] mt-1">{depTimeFormatted}</span>
                            <span className="text-xs text-gray-400 mt-1 truncate max-w-[100px] font-medium">{departureCity}</span>
                        </div>

                        {/* VISUAL PATH */}
                        <div className="flex flex-col items-center flex-1 px-2">
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">
                                {duration}
                            </span>
                            <div className="relative w-full flex items-center justify-center">
                                {/* Dotted Line */}
                                <div className="absolute w-full h-px border-t-2 border-dotted border-gray-300"></div>
                                {/* Plane Icon */}
                                <div className="z-10 bg-white p-1.5 rounded-full border border-gray-100 shadow-sm transform rotate-90">
                                    <Plane className="w-3.5 h-3.5 text-[#FF8C00]" />
                                </div>
                            </div>
                            <span className="text-[10px] text-green-600 font-bold mt-1 uppercase tracking-wider bg-green-50 px-2 py-0.5 rounded-full">
                                Direct
                            </span>
                        </div>

                        {/* ARRIVAL */}
                        <div className="flex flex-col text-right min-w-[80px]">
                            <span className="text-3xl font-bold text-gray-900 leading-none">{arrivalCode}</span>
                            <span className="text-lg font-bold text-[#FF8C00] mt-1">{arrTimeFormatted}</span>
                            <span className="text-xs text-gray-400 mt-1 truncate max-w-[100px] font-medium">{arrivalCity}</span>
                        </div>
                    </div>
                </div>

                {/* 3. Footer: Date & Price */}
                <div className="px-6 pb-6 pt-2 mt-auto">
                    {/* Dashed Separator */}
                    <div className="border-t border-dashed border-gray-200 mb-4"></div>
                    
                    <div className="flex items-center justify-between">
                        {/* Date */}
                        <div className="flex items-center gap-2 text-gray-500 bg-gray-50 px-3 py-2 rounded-xl border border-gray-100">
                            <CalendarDays className="w-4 h-4 text-[#FF8C00]" />
                            <span className="text-xs font-bold uppercase tracking-wide">{depDateFormatted}</span>
                        </div>

                        {/* Price & Action */}
                        <div className="flex items-center gap-4">
                             <div className="text-right">
                                <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total</span>
                                <span className="text-2xl font-black text-gray-900 leading-none">${price}</span>
                             </div>
                             <button className="bg-[#FF8C00] hover:bg-black text-white p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 group-hover:bg-black">
                                <ArrowRight className="w-5 h-5" />
                             </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    }
);

FlightCard.displayName = "FlightCard";
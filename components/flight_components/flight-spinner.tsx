// components/ui/flight-spinner.tsx
"use client";
import Lottie from "lottie-react";
import flightAnimationData from "@/public/animation/flight-animation.json";
import { Users, Armchair, Baby } from 'lucide-react';
import { ShiningText } from './shining-text';

// --- 1. Define Props ---
interface FlightSpinnerProps {
    statusText: string;
    departure_id: string;
    arrival_id: string;
    outbound_date: string;
    return_date: string;
    passengers: string;
    infants: string;
    travelClass: string;
}

export function FlightSpinner({
    statusText,
    departure_id,
    arrival_id,
    outbound_date,
    return_date,
    passengers,
    infants,
    travelClass,

}: FlightSpinnerProps) {

    return (
        <div className="flex flex-col items-center justify-center space-y-4 p-0 sm:p-8 w-full max-w-3xl">

            {/* --- 2. 3-Column Layout --- */}
            <div className="grid grid-cols-3 gap-10 items-center w-full">

                {/* Left: From Details */}
                <div className="text-right space-y-1">
                    <p className="text-sm text-gray-500">From</p>
                    <p className="text-3xl font-bold text-[#FF8C00] uppercase">{departure_id}</p>
                    <p className="text-sm text-gray-700">{outbound_date}</p>
                </div>

                {/* Middle: Lottie Animation */}
                <div className="w-40 h-40 -translate-x-9 sm:translate-x-6 translate-y-5  sm:-translate-x-0 ">
                    <Lottie
                        animationData={flightAnimationData}
                        loop={true}
                        autoplay={true}
                    />
                </div>

                {/* Right: To Details */}
                <div className="text-left space-y-1">
                    <p className="text-sm text-gray-500">To</p>
                    <p className="text-3xl font-bold text-[#FF8C00] uppercase">{arrival_id}</p>
                    <p className="text-sm text-gray-700">{return_date}</p>
                </div>
            </div>
            <div className="grid grid-cols-3  pt-4 w-full max-w-lg">
                <div className="flex items-center justify-center gap-2">
                    <Users className="h-5 w-5 text-[#FF8C00]" />
                    <span className=" text-xs sm:text-md text-gray-700 font-medium">{passengers}</span>
                </div>
                {/* Infants (Only shows if infants > 0) */}
                <div className="flex items-center justify-center gap-2">
                    <Baby className="h-5 w-5 text-[#FF8C00]" />
                    <span className=" text-xs sm:text-md text-gray-700 font-medium">{infants} </span>
                </div>

                <div className="flex items-center justify-center gap-2">
                    <Armchair className="h-5 w-5 text-[#FF8C00]" />
                    <span className=" text-xs sm:text-md text-gray-700 font-medium capitalize">{travelClass}</span>
                </div>
            </div>

            {/* --- 3. Status Text --- */}
            <ShiningText
                text={statusText}
                className="pt-4 text-lg sm:text-2xl pl-12 sm:pl-0" // Pass in original styles
            />
        </div>
    );
}
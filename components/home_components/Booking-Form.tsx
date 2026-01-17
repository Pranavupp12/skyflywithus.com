"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { AirportAutocomplete } from './AirportAutocomplete';
import {
  CalendarIcon,
  Users,
  Armchair,
  ArrowRightLeft,
  Plus,
  Minus,
  PlaneTakeoff,
  PlaneLanding,
  Search,
  Tag,      // New import
  BookOpen, // New import
  Headset   // New import
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { useRouter } from 'next/navigation';

// --- FEATURES DATA ---
const features = [
  {
    icon: <Tag className="h-6 w-6 text-white" />,
    title: "Exclusive Deals",
    description: "Unlock hidden fares and limited-access discounts thanks to our direct partnerships with major airlines. Travel smarter and save more."
  },
  {
    icon: <BookOpen className="h-6 w-6 text-white" />,
    title: "Expert Travel Advice",
    description: "Beyond booking, access expert-crafted guides on compensation, upgrades, and practical travel tips to smooth your journey."
  },
  {
    icon: <Headset className="h-6 w-6 text-white" />,
    title: "24/7 Helpline Support",
    description: "We are always here for you. Enjoy round-the-clock customer support dedicated purely to your comfort and peace of mind."
  }
];

// Reusable component for the form fields
function BookingField({
  icon,
  label,
  children,
  className,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("text-left p-2 rounded-md hover:bg-gray-50 transition-colors", className)}>
      <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">
        {icon}
        <span>{label}</span>
      </div>
      {children}
    </div>
  );
}

export function BookingForm() {
  const router = useRouter();

  // --- Form State ---
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [toDate, setToDate] = useState<Date | undefined>(undefined);
  const [adults, setAdults] = useState(1);
  const [infants, setInfants] = useState(0);
  const [fromValue, setFromValue] = useState("DEL");
  const [toValue, setToValue] = useState("LHR");
  const [travelClass, setTravelClass] = useState("business");
  const [loading, setLoading] = useState(false);

  const today = new Date(new Date().setHours(0, 0, 0, 0));
  const passengersLabel = `${adults} Passenger${adults > 1 ? 's' : ''}${infants > 0 ? `, ${infants} Infant${infants > 1 ? 's' : ''}` : ''}`;

  const handleSwap = () => {
    const temp = fromValue;
    setFromValue(toValue);
    setToValue(temp);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromDate || !toDate || !fromValue || !toValue) {
      toast.error("Please fill in all departure, arrival, and date fields.");
      return;
    }
    setLoading(true);
    try {
      const outbound_date = format(fromDate, 'yyyy-MM-dd');
      const return_date = format(toDate, 'yyyy-MM-dd');
      const queryString = new URLSearchParams({
        departure_id: fromValue,
        arrival_id: toValue,
        outbound_date: outbound_date,
        return_date: return_date,
        travel_class: travelClass,
        adults: adults.toString(),
        infants_on_lap: infants.toString(),
      }).toString();
      router.push(`/flights/results?${queryString}`);
    } catch (error: any) {
      toast.error("Search Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#fdfdfd]" id="booking-form-section">

      {/* 1. Shared Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-50/40 via-white to-white" />
      </div>

      {/* 2. The Main Glow (Extended to flow behind everything) */}
      <div
        className="absolute top-[600px] left-1/2 -translate-x-1/2 -translate-y-1/2 
                   w-[800px] h-[500px] 
                   rounded-full bg-[#FF8C00] 
                   blur-[200px] opacity-25 z-0 pointer-events-none"
      />

      {/* 3. Main Content Container */}
      <div className="relative z-10 container mx-auto px-6 pt-20 pb-24 md:pt-24">

        {/* --- PART 1: HERO & FORM --- */}
        <div className="mb-32"> {/* Added margin-bottom to separate from features */}

          {/* Headline */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center mb-10 mt-10">

            {/* Left Column: Text */}
            <div className="text-center sm:text-left pl-10">
              <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-gray-900 leading-[1.1] mb-6">
                Your Dream Trip <br />
                Starts with a <span className="text-[#FF8C00]">Smart Search</span>
              </h1>
              <p className="text-lg text-gray-600 font-normal max-w-xl leading-relaxed">
                We&apos;ve streamlined the booking process. Enter your details below to compare the world's best airlines and lock in your perfect itinerary in seconds.
              </p>
            </div>

            {/* Right Column: Image */}
            <div className="relative w-full hidden md:block flex justify-center lg:justify-end">
              {/* Adjust width/height as needed based on your actual image dimensions */}
              <div className="relative w-[600px] h-[500px]">
                <Image
                  src="/images/booking-banner.png"
                  alt="Booking Process"
                  fill
                  className="object-cover drop-shadow-xl " // Added drop-shadow for better blending
                  priority
                />
              </div>
            </div>
          </div>

          {/* Form Card */}
          <Card className="w-full max-w-4xl mx-auto border-none shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[2rem] bg-white relative">
            <CardContent className="p-5 md:p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Top Row */}
                <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr_auto_1.2fr_1fr] gap-2 items-center">
                  {/* From */}
                  <BookingField icon={<PlaneTakeoff className="h-3.5 w-3.5" />} label="From">
                    <AirportAutocomplete
                      placeholder="City/Airport"
                      value={fromValue}
                      onChange={(id) => setFromValue(id)}
                      className="text-black bg-transparent border-none shadow-none font-bold text-base md:text-lg p-0 h-auto focus-visible:ring-0"
                    />
                  </BookingField>
                  {/* Departure */}
                  <BookingField icon={<CalendarIcon className="h-3.5 w-3.5" />} label="Departure">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant={"outline"} className={cn("w-full justify-start text-left font-bold bg-transparent border-none shadow-none p-0 h-auto text-base md:text-lg hover:bg-transparent", !fromDate && "text-muted-foreground")}>
                          {fromDate ? format(fromDate, "d MMM, yyyy") : <span className="text-gray-300">Add Date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={fromDate} onSelect={setFromDate} disabled={(date) => date < today} autoFocus />
                      </PopoverContent>
                    </Popover>
                  </BookingField>
                  {/* Swap */}
                  <div className="flex justify-center md:px-2">
                    <Button variant="ghost" size="icon" className="rounded-full w-8 h-8 bg-gray-100 hover:bg-orange-100 text-gray-600 hover:text-[#FF8C00]" type="button" onClick={handleSwap}>
                      <ArrowRightLeft className="h-4 w-4" />
                    </Button>
                  </div>
                  {/* To */}
                  <BookingField icon={<PlaneLanding className="h-3.5 w-3.5" />} label="To">
                    <AirportAutocomplete
                      placeholder="City/Airport"
                      value={toValue}
                      onChange={(id) => setToValue(id)}
                      className="text-black bg-transparent border-none shadow-none font-bold text-base md:text-lg p-0 h-auto focus-visible:ring-0"
                    />
                  </BookingField>
                  {/* Return */}
                  <BookingField icon={<CalendarIcon className="h-3.5 w-3.5" />} label="Return">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant={"outline"} className={cn("w-full justify-start text-left font-bold bg-transparent border-none shadow-none p-0 h-auto text-base md:text-lg hover:bg-transparent", !toDate && "text-muted-foreground")}>
                          {toDate ? format(toDate, "d MMM, yyyy") : <span className="text-gray-300">Add Date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={toDate} onSelect={setToDate} disabled={(date) => date < (fromDate || today)} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </BookingField>
                </div>
                {/* Divider */}
                <div className="h-px bg-gray-100 my-4" />
                {/* Bottom Row */}
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1.5fr] gap-4 items-center">
                  {/* Class */}
                  <BookingField icon={<Armchair className="h-3.5 w-3.5" />} label="Class">
                    <Select defaultValue={travelClass} onValueChange={setTravelClass}>
                      <SelectTrigger className="w-full font-bold bg-transparent border-none shadow-none p-0 h-auto text-base focus:ring-0 focus:ring-offset-0 hover:bg-transparent">
                        <SelectValue placeholder="Class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="economy">Economy</SelectItem>
                        <SelectItem value="premium economy">Premium Eco</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="first">First Class</SelectItem>
                      </SelectContent>
                    </Select>
                  </BookingField>
                  {/* Travelers */}
                  <BookingField icon={<Users className="h-3.5 w-3.5" />} label="Travelers">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-bold bg-transparent border-none shadow-none p-0 h-auto text-base hover:bg-transparent">
                          <span className="truncate">{passengersLabel}</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-4 flex flex-col gap-3">
                        <div className="flex items-center justify-between gap-4">
                          <span className="font-medium">Adults</span>
                          <div className="flex items-center gap-2">
                            <Button type="button" variant="outline" size="icon" className="h-8 w-8" onClick={() => setAdults(Math.max(1, adults - 1))}><Minus className="h-3 w-3" /></Button>
                            <span className="w-6 text-center font-semibold">{adults}</span>
                            <Button type="button" variant="outline" size="icon" className="h-8 w-8" onClick={() => setAdults(adults + 1)}><Plus className="h-3 w-3" /></Button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <span className="font-medium">Infants</span>
                          <div className="flex items-center gap-2">
                            <Button type="button" variant="outline" size="icon" className="h-8 w-8" onClick={() => setInfants(Math.max(0, infants - 1))}><Minus className="h-3 w-3" /></Button>
                            <span className="w-6 text-center font-semibold">{infants}</span>
                            <Button type="button" variant="outline" size="icon" className="h-8 w-8" onClick={() => setInfants(infants + 1)}><Plus className="h-3 w-3" /></Button>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </BookingField>
                  {/* Submit Button */}
                  <div className="md:pl-2">
                    <Button type="submit" size="lg" className="w-full h-12 text-base font-bold bg-[#FF8C00] hover:bg-[#ff9514] rounded-xl shadow-lg shadow-orange-200 transition-all hover:shadow-orange-300 hover:scale-[1.01]" disabled={loading}>
                      {loading ? "Searching..." : (
                        <>
                          <Search className="mr-2 h-4 w-4" />
                          Search Flights
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* --- PART 2: WHY CHOOSE US --- */}

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group bg-white p-8 rounded-3xl border border-gray-200 flex flex-col items-center text-center relative z-10"
            >
              {/* Icon Wrapper */}
              <div className="flex-shrink-0 mb-6 p-4 bg-[#FF8C00] rounded-full shadow-lg shadow-orange-200 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>

              {/* Card Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
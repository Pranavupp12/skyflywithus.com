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
  CheckCircle,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { useRouter } from 'next/navigation'; // <-- Import useRouter
import { Volkhov } from 'next/font/google'; // <-- 1. Import the new font

// 2. Initialize the font (Oswald needs a bold weight to be visible)
const volkhov = Volkhov({
  subsets: ['latin'],
  weight: '700', 
});

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
    <div className={cn("text-left", className)}>
      <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
        {icon}
        <span>{label}</span>
      </div>
      {children}
    </div>
  );
}

export function BookingForm() {
  const router = useRouter();
  
  // --- State from previous form ---
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [toDate, setToDate] = useState<Date | undefined>(undefined);
  const [adults, setAdults] = useState(1);
  const [infants, setInfants] = useState(0);
  const [fromValue, setFromValue] = useState("DEL"); // Using IATA Code for testing
  const [toValue, setToValue] = useState("LHR"); // Using IATA Code for testing
  const [travelClass, setTravelClass] = useState("business"); 
  const [loading, setLoading] = useState(false); // Used for UI feedback

  const today = new Date(new Date().setHours(0, 0, 0, 0));
  const passengersLabel = `${adults} Passenger${adults > 1 ? 's' : ''}${infants > 0 ? `, ${infants} Infant${infants > 1 ? 's' : ''}` : ''}`;

  const handleSwap = () => {
    const temp = fromValue;
    setFromValue(toValue);
    setToValue(temp);
  };

  // --- FINAL SUBMISSION HANDLER ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!fromDate || !toDate || !fromValue || !toValue) {
      toast.error("Please fill in all departure, arrival, and date fields.");
      return;
    }
    
    setLoading(true); // Start loading feedback

    try {
        // 1. Format dates correctly for YYYY-MM-DD API format
        const outbound_date = format(fromDate, 'yyyy-MM-dd');
        const return_date = format(toDate, 'yyyy-MM-dd');

        // 2. Construct the query string for the API/redirect
        const queryString = new URLSearchParams({
            departure_id: fromValue,
            arrival_id: toValue,
            outbound_date: outbound_date,
            return_date: return_date,
            travel_class: travelClass, // Pass travel class name (e.g., "business")
            adults: adults.toString(),
            infants_on_lap: infants.toString(),
            // Infants are not included as a separate field in the base SerpApi adults count
        }).toString();

        // 3. Perform client-side redirect to the results page
        router.push(`/flights/results?${queryString}`);

    } catch (error: any) {
      toast.error("Search Failed", {
        description: "An error occurred during search preparation.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full bg-[#FF8C00] pt-20 mx-10 pb-25 text-center" id="booking-form-section">
      {/* 2. Image Container */}
     <div className="lg:block hidden h-[400px] overflow-hidden relative mb-[-10px] z-10">
        <Image
          src="/images/web-banner-50.png"
          fill
          className="object-cover"
          priority={true}
          sizes="(max-width: 768px) 100vw, 100vw"
          alt="Airplane landing"
        />

        {/* Title */}
        {/* FIX: Moved title up by changing 'top-1/2' to 'top-[40%]' and removing mb-14 
       { <h1 className="absolute z-10 top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2
          text-3xl md:text-7xl font-extrabold text-white drop-shadow-xl"
        >
          Your <span className={`${volkhov.className}`}>Trip</span> Starts here
        </h1>}*/}
       
      </div>

      {/* Feature Pills */}
      {/* FIX: Increased negative margin to pull pills higher onto the image */}
      <div className="relative z-20 flex flex-wrap justify-center gap-3 mt-[-60px] mb-5">
        <div className="flex items-center gap-2 rounded-full bg-white shadow-md px-4 py-1.5">
          <CheckCircle className="h-4 w-4 text-[#FF8C00]" />
          <span className="text-sm font-medium text-gray-700">Best Price Guarantee</span>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-white shadow-md px-4 py-1.5">
          <CheckCircle className="h-4 w-4 text-[#FF8C00]" />
          <span className="text-sm font-medium text-gray-700">24/7 Customer Support</span>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-white shadow-md px-4 py-1.5">
          <CheckCircle className="h-4 w-4 text-[#FF8C00]" />
          <span className="text-sm font-medium text-gray-700">No Hidden Fees</span>
        </div>
      </div>

      {/* 3. Form Card */}
      <Card className="-w-6xl mx-5 md:mx-15 p-6 md:p-8 relative z-20 shadow-lg shadow-white/60">
        <CardContent className="p-0">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Top Row: From, Dates, To, Return Date */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
              
              {/* From (Departure ID) */}
              <BookingField icon={<PlaneTakeoff className="h-4 w-4 text-[#FF8C00]" />} label="From">
                <AirportAutocomplete
                  placeholder="City or Airport Code (e.g., London)"
                  value={fromValue}
                  // We only need the ID, so we ignore the name for now
                  onChange={(id) => setFromValue(id)} 
                  className="text-black"
                />
              </BookingField>
              
              {/* Departure Date (Outbound Date) */}
              <BookingField icon={<CalendarIcon className="h-4 w-4 text-[#FF8C00]" />} label="Departure">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-semibold border-0 border-b rounded-none p-0 text-md",
                        !fromDate && "text-muted-foreground"
                      )}
                    >
                      {fromDate ? format(fromDate, "PP") : <span className="text-black">Select a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={fromDate} onSelect={setFromDate} disabled={(date) => date < today} autoFocus />
                  </PopoverContent>
                </Popover>
              </BookingField>

              {/* Swap Button */}
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-10 h-10 mx-auto flex-shrink-0"
                type="button"
                onClick={handleSwap}
                aria-label="Swap departure and arrival"
              >
                <ArrowRightLeft className="h-4 w-4 text-[#FF8C00]" />
              </Button>

              {/* To (Arrival ID) */}
              <BookingField icon={<PlaneLanding className="h-4 w-4 text-[#FF8C00]" />} label="To">
                <AirportAutocomplete
                  placeholder="City or Airport Code (e.g., Dubai)"
                  value={toValue}
                  onChange={(id) => setToValue(id)}
                  className="text-black"
                />
              </BookingField>

              {/* Return Date (Return Date) */}
              <BookingField icon={<CalendarIcon className="h-4 w-4 text-[#FF8C00]" />} label="Return">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-semibold border-0 border-b rounded-none p-0 text-md",
                        !toDate && "text-muted-foreground"
                      )}
                    >
                      {toDate ? format(toDate, "PP") : <span className="text-black">Select a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={toDate} onSelect={setToDate} disabled={(date) => date < (fromDate || today)} initialFocus />
                  </PopoverContent>
                </Popover>
              </BookingField>
            </div>

            {/* Bottom Row: Class, Travelers, Submit */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              
              {/* Travel Class */}
              <BookingField icon={<Armchair className="h-4 w-4 text-[#FF8C00]" />} label="Travel Class">
                <Select 
                  defaultValue={travelClass} // Use state value
                  onValueChange={setTravelClass} 
                >
                  <SelectTrigger className="w-full font-semibold border-0 border-b rounded-none p-0 text-md focus:ring-0 focus:ring-offset-0">
                    <SelectValue placeholder="Choose your Class" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Travel Class Options (maps to API codes 1-4) */}
                    <SelectItem value="economy">Economy</SelectItem>
                    <SelectItem value="premium economy">Premium Economy</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="first">First</SelectItem>
                  </SelectContent>
                </Select>
              </BookingField>

              {/* Travelers (Adults only for API) */}
              <BookingField icon={<Users className="h-4 w-4 text-[#FF8C00]" />} label="Travelers">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-semibold border-0 border-b rounded-none p-0 text-md"
                    >
                      <span className="truncate">{passengersLabel}</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-4 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Adults</span>
                      <div className="flex items-center gap-2">
                        <Button type="button" variant="outline" size="icon" onClick={() => setAdults(Math.max(1, adults - 1))}><Minus className="h-4 w-4" /></Button>
                        <span className="w-6 text-center">{adults}</span>
                        <Button type="button" variant="outline" size="icon" onClick={() => setAdults(adults + 1)}><Plus className="h-4 w-4" /></Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Infants</span>
                      <div className="flex items-center gap-2">
                        <Button type="button" variant="outline" size="icon" onClick={() => setInfants(Math.max(0, infants - 1))}><Minus className="h-4 w-4" /></Button>
                        <span className="w-6 text-center">{infants}</span>
                        <Button type="button" variant="outline" size="icon" onClick={() => setInfants(infants + 1)}><Plus className="h-4 w-4" /></Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </BookingField>

              {/* Submit Button */}
              <Button type="submit" size="lg" className="w-full h-14 text-lg bg-[#FF8C00] hover:bg-[#FFA749]" disabled={loading}>
                {loading ? "Searching..." : (
                  <>
                    <Search className="mr-2 h-5 w-5" />
                    Find Your Ticket
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
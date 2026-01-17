"use client";

import { notFound } from 'next/navigation';
import { FlightCard } from '@/components/flight_components/flight-card';
import { Button } from '@/components/ui/button';
import { FlightSpinner } from '@/components/flight_components/flight-spinner';
import { useState, useEffect, use, useMemo } from 'react'; 
import Link from 'next/link';
import { ArrowRight, SearchX, SlidersHorizontal, ArrowUpDown, Clock, DollarSign } from 'lucide-react';

// Define the expected structure for URLSearchParams
interface SearchParamsObject {
    [key: string]: string | string[] | undefined;
}

// --- HELPER FUNCTIONS ---
function formatDuration(minutes: number) {
    if (typeof minutes !== 'number' || isNaN(minutes)) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
}

const mapFlightData = (flightData: any) => {
    const firstSegment = flightData.flights[0];
    const lastSegment = flightData.flights[flightData.flights.length - 1];
    const durationText = formatDuration(flightData.total_duration);
    
    const depName = firstSegment.departure_airport.name || firstSegment.departure_airport.id;
    const arrName = lastSegment.arrival_airport.name || lastSegment.arrival_airport.id;

    return {
        imageUrl: "/images/airplane-wing2.jpg",
        airline: firstSegment.airline,
        flightCode: firstSegment.flight_number,
        flightClass: firstSegment.travel_class,
        departureCode: firstSegment.departure_airport.id,
        departureCity: depName.split(',')[0],
        departureTime: firstSegment.departure_airport.time,
        arrivalCode: lastSegment.arrival_airport.id,
        arrivalCity: arrName.split(',')[0],
        arrivalTime: lastSegment.arrival_airport.time,
        duration: durationText,
        price: flightData.price,
    };
};

export default function FlightResultsPage({ searchParams }: any) {
    // --- STATE ---
    const [loading, setLoading] = useState(true);
    const [flightResults, setFlightResults] = useState<any | null>(null);
    const [statusText, setStatusText] = useState('');
    
    // New State for Sorting & Filtering
    const [sortBy, setSortBy] = useState<'cheapest' | 'fastest' | 'earliest'>('cheapest');
    const [filterAirline, setFilterAirline] = useState<string>('all');

    // --- PARAMS HANDLING ---
    const resolvedSearchParams = use(searchParams) as SearchParamsObject;
    const cleanEntries = Object.entries(resolvedSearchParams).filter(
        ([, value]) => typeof value === 'string'
    ) as [string, string][];
    const params = new URLSearchParams(cleanEntries);

    // --- FETCH LOGIC ---
    const fetchResults = async () => {
        setLoading(true);
        setStatusText('');

        //const apiUrl = `/api/fail-search`; 
        const apiUrl = `/api/flights?${params.toString()}`;
        const searchPayload = Object.fromEntries(params);

        if (!params.get('departure_id') || !params.get('outbound_date')) {
            return notFound();
        }

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (!response.ok) throw new Error(data.error);

            setFlightResults(data);
        } catch (error) {
            await fetch('/api/manual-booking', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(searchPayload),
            });
            setStatusText("Confirmation Received!");
        } finally {
            setTimeout(() => setLoading(false), 1000);
        }
    };

    useEffect(() => {
        if (params.get('departure_id') && params.get('outbound_date')) {
            fetchResults();
        }
    }, [searchParams]);

    // --- FILTERING & SORTING LOGIC ---
    
    // 1. Combine all flights first
    const allFlights = useMemo(() => {
        return (flightResults?.best_flights || []).concat(flightResults?.other_flights || []);
    }, [flightResults]);

    // 2. Extract Unique Airlines for the dropdown
    const uniqueAirlines = useMemo(() => {
        const airlines = new Set(allFlights.map((f: any) => f.flights[0].airline));
        return Array.from(airlines) as string[];
    }, [allFlights]);

    // 3. Process the data based on user selection
    const processedFlights = useMemo(() => {
        let result = [...allFlights];

        // Filter by Airline
        if (filterAirline !== 'all') {
            result = result.filter((f: any) => f.flights[0].airline === filterAirline);
        }

        // Sort
        result.sort((a: any, b: any) => {
            if (sortBy === 'cheapest') return a.price - b.price;
            if (sortBy === 'fastest') return a.total_duration - b.total_duration;
            if (sortBy === 'earliest') {
                return new Date(a.flights[0].departure_airport.time).getTime() - 
                       new Date(b.flights[0].departure_airport.time).getTime();
            }
            return 0;
        });

        return result;
    }, [allFlights, sortBy, filterAirline]);

    const hasResults = allFlights.length > 0;


    // ==========================================
    // 1. LOADING STATE
    // ==========================================
    if (loading || statusText) {
        const adultCount = parseInt(params.get('adults') || '1', 10);
        const infantCount = parseInt(params.get('infants_on_lap') || '0', 10);
        const passengerText = `${adultCount} Adult${adultCount > 1 ? 's' : ''}`;
        const infantsText = infantCount > 0 ? `${infantCount} Infant${infantCount > 1 ? 's' : ''}` : '';
        const classText = params.get('travel_class') || 'Economy';

        return (
            <main className="w-full min-h-screen bg-[#FFF5EB]/50 py-24 flex flex-col items-center justify-center">
                <div className="container mx-auto px-6 mt-10 text-center max-w-3xl">
                    <h2 className="text-3xl md:text-5xl font-bold text-[#FF8C00] mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {statusText || "Searching Best Deals..."}
                    </h2>
                    <div className="mb-12">
                         <FlightSpinner
                            statusText={statusText ? "We are processing your request." : "Scanning airlines for the lowest fares..."}
                            departure_id={params.get('departure_id') || 'N/A'}
                            arrival_id={params.get('arrival_id') || 'N/A'}
                            outbound_date={params.get('outbound_date') || ''}
                            return_date={params.get('return_date') || ''}
                            passengers={passengerText} 
                            infants={infantsText}
                            travelClass={classText}
                        />
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-orange-100/50">
                        <p className="text-lg md:text-xl font-medium text-gray-700 mb-6">
                            Need help or a corporate discount? <br className="hidden md:block"/>
                            <span className='text-[#FF8C00] font-bold'>Our team is ready to assist you instantly.</span>
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                            <Link href="/contact" passHref className="w-full sm:w-auto">
                                <Button className="w-full sm:w-auto h-12 px-8 bg-white text-[#FF8C00] border-2 border-[#FF8C00] hover:bg-orange-50 font-bold rounded-full text-base transition-all">
                                    Contact Support
                                </Button>
                            </Link>
                            <Link href="/" passHref className="w-full sm:w-auto">
                                <Button className="w-full sm:w-auto h-12 px-8 bg-[#FF8C00] hover:bg-[#ff9d24] text-white font-bold rounded-full text-base shadow-md hover:shadow-lg transition-all">
                                    Back to Home
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    // ==========================================
    // 2. SUCCESS RESULTS STATE
    // ==========================================
    if (hasResults) {
        return (
            <main className="w-full min-h-screen bg-[#FFF5EB]/50 py-10 md:py-24">
                <div className="container mx-auto px-6 mt-10">
                    
                    {/* Header: Route Info */}
                    <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-gray-200/60 pb-6">
                        <div>
                            <p className="text-sm font-bold text-[#FF8C00] uppercase tracking-wider mb-2">Flight Results</p>
                            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 flex items-center gap-3">
                                <span>{params.get('departure_id')}</span>
                                <ArrowRight className="text-gray-400 h-6 w-6 md:h-8 md:w-8" />
                                <span>{params.get('arrival_id')}</span>
                            </h1>
                            <p className="text-gray-500 mt-2">
                                {allFlights.length} flights found • {params.get('outbound_date')}
                            </p>
                        </div>
                        {flightResults?.price_insights?.lowest_price > 0 && (
                            <div className="mt-4 md:mt-0 bg-green-100 text-green-800 px-4 py-2 rounded-full font-bold text-sm shadow-sm flex items-center gap-2">
                                <DollarSign className="w-4 h-4" />
                                Lowest Price: ${flightResults.price_insights.lowest_price}
                            </div>
                        )}
                    </div>

                    {/* --- NEW: SORT & FILTER TOOLBAR --- */}
                    <div className="sticky top-0 z-40 py-4 -mx-6 px-6 bg-white backdrop-blur-md border-b border-orange-100 transition-all shadow-sm">
                        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                            
                            {/* Sort Controls */}
                            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto no-scrollbar">
                                <span className="text-sm font-bold text-gray-500 mr-2 flex items-center gap-1 whitespace-nowrap">
                                    <ArrowUpDown className="w-4 h-4" /> Sort by:
                                </span>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => setSortBy('cheapest')}
                                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border whitespace-nowrap ${
                                            sortBy === 'cheapest' 
                                            ? 'bg-[#FF8C00] text-white border-[#FF8C00] shadow-md' 
                                            : 'bg-white text-gray-600 border-gray-200 hover:bg-orange-50'
                                        }`}
                                    >
                                        Cheapest
                                    </button>
                                    <button 
                                        onClick={() => setSortBy('fastest')}
                                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border whitespace-nowrap ${
                                            sortBy === 'fastest' 
                                            ? 'bg-[#FF8C00] text-white border-[#FF8C00] shadow-md' 
                                            : 'bg-white text-gray-600 border-gray-200 hover:bg-orange-50'
                                        }`}
                                    >
                                        Fastest
                                    </button>
                                    <button 
                                        onClick={() => setSortBy('earliest')}
                                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border whitespace-nowrap ${
                                            sortBy === 'earliest' 
                                            ? 'bg-[#FF8C00] text-white border-[#FF8C00] shadow-md' 
                                            : 'bg-white text-gray-600 border-gray-200 hover:bg-orange-50'
                                        }`}
                                    >
                                        Earliest
                                    </button>
                                </div>
                            </div>

                            {/* Filter Controls */}
                            <div className="flex items-center gap-3 w-full md:w-auto">
                                <span className="text-sm font-bold text-gray-500 flex items-center gap-1 whitespace-nowrap">
                                    <SlidersHorizontal className="w-4 h-4" /> Airline:
                                </span>
                                <div className="relative w-full md:w-auto">
                                    <select 
                                        value={filterAirline}
                                        onChange={(e) => setFilterAirline(e.target.value)}
                                        className="w-full md:w-auto appearance-none bg-white border border-gray-200 text-gray-700 py-2 pl-4 pr-10 rounded-xl leading-tight focus:outline-none focus:bg-white focus:border-[#FF8C00] font-medium text-sm cursor-pointer shadow-sm"
                                    >
                                        <option value="all">All Airlines</option>
                                        {uniqueAirlines.map((airline) => (
                                            <option key={airline} value={airline}>{airline}</option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results Grid - ADDED MARGIN TOP TO PREVENT OVERLAP */}
                    <div className="mt-6">
                        {processedFlights.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {processedFlights.map((flight: any, index: number) => {
                                    const cardProps = mapFlightData(flight);
                                    return <FlightCard key={index} {...cardProps} />;
                                })}
                            </div>
                        ) : (
                            // Empty State
                            <div className="text-center py-20 bg-white/50 rounded-2xl border border-dashed border-gray-300">
                                <SearchX className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-gray-900">No flights match these filters</h3>
                                <p className="text-gray-500 mb-6">Try selecting "All Airlines" or changing your sort criteria.</p>
                                <Button 
                                    onClick={() => { setFilterAirline('all'); setSortBy('cheapest'); }}
                                    variant="outline"
                                >
                                    Reset Filters
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Bottom CTA */}
                    <div className="mt-16 text-center">
                         <p className="text-gray-500 mb-4">Don't see what you're looking for?</p>
                         <Link href="/contact">
                            <Button variant="outline" className="border-[#FF8C00] text-[#FF8C00] hover:bg-orange-50">
                                Request Custom Quote
                            </Button>
                         </Link>
                    </div>
                </div>
            </main>
        );
    }

    // ==========================================
    // 3. NO RESULTS STATE (API Returned 0)
    // ==========================================
    return (
        <main className="-mx-5 md:-mx-15 min-h-screen bg-[#FFF5EB]/50 py-20 flex items-center justify-center">
            <div className="container mx-auto px-6">
                <div className="max-w-md mx-auto text-center bg-white p-10 rounded-3xl shadow-lg border border-gray-100">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <SearchX className="h-8 w-8 text-[#FF8C00]" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">No Flights Found</h2>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                        We couldn't find any flights matching your criteria. Try changing your dates or airports.
                    </p>
                    <Link href="/">
                        <Button className="w-full h-12 bg-[#FF8C00] hover:bg-[#ff9d24] text-white font-bold rounded-xl text-base shadow-md">
                            Start New Search
                        </Button>
                    </Link>
                </div>
            </div>
        </main>
    );
}
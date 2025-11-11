"use client";

import { notFound } from 'next/navigation';
import { FlightCard } from '@/components/flight_components/flight-card';
import { Button } from '@/components/ui/button';
import { FlightSpinner } from '@/components/flight_components/flight-spinner';
import { useState, useEffect, use } from 'react'; // <-- Import 'use' hook
import Link from 'next/link';

// Define the expected structure for URLSearchParams
interface SearchParamsObject {
    [key: string]: string | string[] | undefined;
}

// Helper functions (formatDuration, mapFlightData, etc.) remain the same
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
    const defaultImageUrl = "/images/airplane-front5.jpg";

    return {
        imageUrl: defaultImageUrl,
        airline: firstSegment.airline,
        flightCode: firstSegment.flight_number,
        flightClass: firstSegment.travel_class,
        departureCode: firstSegment.departure_airport.id,
        departureCity: firstSegment.departure_airport.name.split(',')[0] || firstSegment.departure_airport.id,
        departureTime: firstSegment.departure_airport.time,
        arrivalCode: lastSegment.arrival_airport.id,
        arrivalCity: lastSegment.arrival_airport.name.split(',')[0] || lastSegment.arrival_airport.id,
        arrivalTime: lastSegment.arrival_airport.time,
        duration: durationText,
        price: flightData.price,
    };
};
// End Helpers


export default function FlightResultsPage({ searchParams }: any) {
    // State to manage the asynchronous process
    const [loading, setLoading] = useState(true);
    const [flightResults, setFlightResults] = useState<any | null>(null);
    const [statusText, setStatusText] = useState('');

    // --- FIX 1: Safely unwrap the Promise and cast the type ---
    const resolvedSearchParams = use(searchParams) as SearchParamsObject;

    // 2. Safely create URLSearchParams by ensuring only string entries are used
    const cleanEntries = Object.entries(resolvedSearchParams).filter(
        ([, value]) => typeof value === 'string'
    ) as [string, string][];

    const params = new URLSearchParams(cleanEntries);
    // --------------------------------------------------------

    // Client-side function to handle fetching
    const fetchResults = async () => {
        setLoading(true);
        setStatusText('');

        const apiUrl = `/api/flights?${params.toString()}`;
        //const apiUrl = `/api/fail-search`;

        const searchPayload = Object.fromEntries(params);

        // --- Basic Validation Guard (Check before proceeding) ---
        if (!params.get('departure_id') || !params.get('outbound_date')) {
            return notFound();
        }

        try {
            const response = await fetch(apiUrl);
            const status = response.status;
            const data = await response.json();

            console.log("data:", data);


            if (!response.ok) {
                throw new Error(data.error || `External search failed with status ${status}.`);
            }

            // SUCCESS
            setFlightResults(data);

        } catch (error) {
            // --- FAILURE: Trigger persistent loading/lead capture state ---

            // 1. Attempt lead capture silently
            await fetch('/api/manual-booking', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(searchPayload),
            });

            // 2. Set the persistent, positive message
            setStatusText("Confirmation Received!");

        } finally {
            // Delay hide loading to ensure spinner is visible for a moment
            setTimeout(() => setLoading(false), 1000);
        }
    };

    useEffect(() => {
        // We only fetch if the required parameters are present after resolution
        if (params.get('departure_id') && params.get('outbound_date')) {
            fetchResults();
        }
    }, [searchParams]);


    // --- RENDERING LOGIC ---

    const allFlights = (flightResults?.best_flights || []).concat(flightResults?.other_flights || []);
    const hasResults = allFlights.length > 0;


    // 1. Show Spinner while loading or during persistent fallback
    if (loading || statusText) {

        const adultCount = parseInt(params.get('adults') || '1', 10);
        const infantCount = parseInt(params.get('infants_on_lap') || '0', 10);
        const passengerText = `${adultCount} Adult${adultCount > 1 ? 's' : ''}`;
        const infantsText = infantCount > 0 ? `${infantCount} Infant${infantCount > 1 ? 's' : ''}` : '';
        
        // --- THIS IS THE MISSING LINE ---
        const classText = params.get('travel_class') || 'Economy';

        return (
            <main className="flex min-h-[500px] bg-white rounded-2xl mx-10 md:mx-80  mb-20 mt-20 flex-col items-center justify-center p-10">
                <h2 className="text-3xl md:text-5xl font-bold text-indigo-700 mb-3">
                    {/* Status text is used if available, otherwise generic message */}
                    {statusText}
                </h2>

                {/* Keep the spinner running for the required visual effect */}
                <FlightSpinner
                    statusText={"Searching for the best ticket prices..."}
                    departure_id={params.get('departure_id') || 'N/A'}
                    arrival_id={params.get('arrival_id') || 'N/A'}
                    outbound_date={params.get('outbound_date') || ''}
                    return_date={params.get('return_date') || ''}
                    passengers={passengerText} 
                    infants={infantsText}
                    travelClass={classText}

                />

                {/* --- NEW CORPORATE BOOKING CALL-TO-ACTION --- */}
                <p className="text-lg font-medium text-gray-800 mt-6 mb-4">
                    You can also contact our team for <span className='text-indigo-500'>Corporate bookings and discounts</span>!
                </p>

                <div className="flex justify-center space-x-4">
                    {/* 1. Button for Contact Page */}
                    <Link href="/contact" passHref>
                        <Button variant="outline" className="bg-white border-indigo-600 text-indigo-600">
                            Contact Our Team
                        </Button>
                    </Link>

                    {/* 2. Back to Home Button */}
                    <Link href="/" passHref>
                        <Button className="bg-indigo-600 hover:bg-indigo-700">
                            Back to Home
                        </Button>
                    </Link>
                </div>
            </main>
        );
    }

    // 2. Display Actual Results (Success: !loading AND hasResults)
    if (hasResults) {
        return (
            <main className="mx-10 md:mx-20 bg-white rounded-2xl p-10 mb-20 mt-20">
                <h1 className="text-3xl md:text-5xl font-regular mb-3 text-black">
                    Flights from <span className='text-indigo-500 font-semibold'>{params.get('departure_id')}</span> to <span className='text-indigo-500 font-semibold'>{params.get('arrival_id')}</span>
                </h1>

                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold border-b pb-2">
                        {flightResults?.price_insights?.lowest_price > 0 && (
                            <span className="ml-4 text-base font-normal text-indigo-600">
                                (Lowest Price: ${flightResults.price_insights.lowest_price})
                            </span>
                        )}
                    </h2>

                    {/* Display Flight Cards (3 per row) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {allFlights.map((flight: any, index: number) => {
                            const cardProps = mapFlightData(flight);
                            return <FlightCard key={index} {...cardProps} />;
                        })}
                    </div>
                </div>
            </main>
        );
    }

    // 3. Handle case where API call succeeds but returns 0 results
    return (
        <main className="container mx-auto py-16 px-4">
            <div className="text-center p-12 border rounded-lg bg-gray-50">
                <p className="text-lg font-medium">No flights found matching your criteria. Please try different dates or airports.</p>
                <Link href="/">
                    <Button className="mt-4 bg-indigo-600 hover:bg-indigo-700">New Search</Button>
                </Link>
            </div>
        </main>
    );
}
import { NextResponse } from 'next/server';

const SERPAPI_KEY = process.env.SERPAPI_API_KEY;
const SERPAPI_URL = "https://serpapi.com/search";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    
    // 1. Extract required parameters from your booking form (passed via query string)
    const departureId = searchParams.get('departure_id');
    const arrivalId = searchParams.get('arrival_id');
    const outboundDate = searchParams.get('outbound_date');
    const returnDate = searchParams.get('return_date');
    const travelClass = searchParams.get('travel_class');
    const adults = searchParams.get('adults');
    
    // Basic validation
    if (!departureId || !arrivalId || !outboundDate || !returnDate) {
        return NextResponse.json({ error: 'Missing required flight parameters.' }, { status: 400 });
    }

    // 2. Map form data to API parameters
    const params = new URLSearchParams({
        engine: 'google_flights',
        api_key: SERPAPI_KEY || '', // CRUCIAL: Pass the hidden key securely
        
        // Map your form fields to the required API fields
        departure_id: departureId,
        arrival_id: arrivalId,
        outbound_date: outboundDate,
        return_date: returnDate,
        
        // Map simplified travel class to API's numbered class
        travel_class: mapTravelClassToCode(travelClass), 
        
        // Passengers
        adults: adults || '1',
        // type: '1', // Default to Round trip
        // deep_search: 'true', // Optional: for more precise results
    });

    try {
        // 3. Call the external SerpApi endpoint
        const response = await fetch(`${SERPAPI_URL}?${params.toString()}`);
        
        if (!response.ok) {
            // Handle external API error response
            const errorBody = await response.json();
            if (response.status === 429 || response.status >= 500) {
                 // Return a controlled, specific error message for the frontend to catch
                 return NextResponse.json({ error: 'External API Quota Exceeded or Failed' }, { status: 503 }); 
            }
            
            // Handle other external API errors
            return NextResponse.json({ error: 'External API Error', details: errorBody }, { status: response.status });
        }

        const flightData = await response.json();
        return NextResponse.json(flightData, { status: 200 });

    } catch (error) {
        console.error('Flight Search API Crash:', error);
        return NextResponse.json({ error: 'Internal Server Error during API fetch.' }, { status: 500 });
    }
}

// Helper function to map your descriptive classes to the API's numerical codes
function mapTravelClassToCode(className: string | null): string {
    if (!className) return '1'; // Default Economy
    switch (className.toLowerCase()) {
        case 'premium economy':
            return '2';
        case 'business':
        case 'business & first': // Your form option
            return '3';
        case 'first':
            return '4';
        default:
            return '1'; // Economy
    }
}
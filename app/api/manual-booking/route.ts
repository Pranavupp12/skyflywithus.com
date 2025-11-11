import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Use relative path to access lib/prisma.ts

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // 1. Validation: Ensure required parameters from the frontend form exist
    if (!data.departure_id || !data.arrival_id || !data.outbound_date || !data.return_date) {
      return NextResponse.json({ error: 'Missing required fields for lead capture' }, { status: 400 });
    }

    // 2. Map the payload keys from the frontend form to the database schema
    const booking = await prisma.booking.create({
      data: {
        // Map IATA codes from frontend to DB fields
        fromLocation: data.departure_id,
        toLocation: data.arrival_id,
        
        // Convert date strings to Date objects for the MongoDB schema
        departureDate: new Date(data.outbound_date),
        returnDate: new Date(data.return_date),
        
        // Use provided values or safe defaults
        travelClass: data.travel_class || 'economy', 
        adults: parseInt(data.adults || '1', 10),
        infants: 0, // Infants are not explicitly passed in this API call structure
      },
    });

    return NextResponse.json({ 
        message: "Booking details successfully captured for manual follow-up.", 
        id: booking.id 
    }, { status: 200 });
    
  } catch (error) {
    console.error('Manual Booking Capture Error:', error);
    // Return a 500 error if Prisma fails to save the data
    return NextResponse.json({ error: 'Internal database error during lead capture.' }, { status: 500 });
  }
}
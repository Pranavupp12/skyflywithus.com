import { NextResponse } from 'next/server';
// --- THIS IS THE FIX ---
// We use a relative path to go up two folders (from 'bookings' to 'api', then to 'app')
// and then find the 'lib' folder.
import prisma from '../../../lib/prisma';

console.log("IS DATABASE_URL LOADED?", !!process.env.DATABASE_URL);

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Basic validation
    if (!data.fromLocation || !data.toLocation || !data.departureDate || !data.returnDate || !data.travelClass) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const booking = await (prisma as any).booking.create({
      data: {
        fromLocation: data.fromLocation,
        toLocation: data.toLocation,
        departureDate: new Date(data.departureDate),
        returnDate: new Date(data.returnDate),
        travelClass: data.travelClass,
        adults: parseInt(data.adults, 10),
        infants: parseInt(data.infants, 10),
      },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error: any) {
    console.error('Booking Error:', error);
    // Check if the error is from Prisma (e.g., prisma is still undefined)
    if (error instanceof TypeError && error.message.includes("Cannot read properties of undefined")) {
      return NextResponse.json({ error: 'Database client is not initialized.' }, { status: 500 });
    }
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
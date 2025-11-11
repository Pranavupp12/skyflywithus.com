import { NextResponse } from 'next/server';

export async function GET() {
  console.log("--- SIMULATING EXTERNAL API FAILURE (Quota Exhausted) ---");
  
  // Return a 429 status code (Quota Exceeded) to simulate the external failure.
  // Your frontend is designed to catch any non-200 status as a failure.
  return NextResponse.json(
    { error: 'External Search Quota Exceeded (Test Mode)' }, 
    { status: 429 } 
  );
}
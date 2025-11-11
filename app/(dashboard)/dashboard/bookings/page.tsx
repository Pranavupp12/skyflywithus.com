import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/lib/prisma";
import { Booking } from "@prisma/client";
import { formatDate } from "@/lib/utils";
import { PaginationControls } from "@/components/ui/pagination-controls"; // Import Pagination

// Define the expected return structure
interface PaginatedData {
    data: Booking[];
    metadata: {
        totalPosts: number;
        totalPages: number;
        currentPage: number;
        limit: number;
    };
}

// --- FIX 1: Update fetch function to accept pagination params ---
async function getBookings(page: number, limit: number): Promise<PaginatedData> {
  const skip = (page - 1) * limit;

  // Define a safe fallback for metadata
  const emptyResult = { data: [], metadata: { totalPosts: 0, totalPages: 1, currentPage: page, limit: limit } };

  try {
    // 1. Get total count
    const totalPosts = await prisma.booking.count();

    // 2. Get paginated bookings
    const bookings = await prisma.booking.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      skip: skip,
      take: limit,
    });
    
    // 3. Construct and return the full paginated response
    return {
        data: bookings,
        metadata: {
            totalPosts: totalPosts,
            totalPages: Math.ceil(totalPosts / limit),
            currentPage: page,
            limit: limit,
        },
    };
    
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    return emptyResult;
  }
}
// -----------------------------------------------------------------


// --- FIX 2: Update default export to accept searchParams ---
export default async function BookingsPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  
  // Await the searchParams Promise to resolve the parameters
  const resolvedSearchParams = await searchParams;
  
  const currentPage = parseInt(resolvedSearchParams.page || '1', 10); // Access from resolved object
  const limit = 10; // Set display limit
  
  // Fetch data using the current page and limit
  const { data: bookings, metadata } = await getBookings(currentPage, limit);

  return (
    <div className="w-full">
      <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
        Booking Submissions
      </h1>
      
      <div className="rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">S.No.</TableHead>
              <TableHead>Date Submitted</TableHead>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead>Departure</TableHead>
              <TableHead>Return</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Passengers</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking: Booking, index: number) => (
              <TableRow key={booking.id}>
                {/* Calculate S.No based on current page */}
                <TableCell>{(currentPage - 1) * limit + index + 1}</TableCell> 
                <TableCell>{formatDate(booking.createdAt)}</TableCell>
                <TableCell>{booking.fromLocation}</TableCell>
                <TableCell>{booking.toLocation}</TableCell>
                <TableCell>{formatDate(booking.departureDate)}</TableCell>
                <TableCell>{formatDate(booking.returnDate)}</TableCell>
                <TableCell>{booking.travelClass}</TableCell>
                <TableCell>{booking.adults + booking.infants}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {bookings.length === 0 && (
          <p className="text-center text-gray-500 py-8">
            No booking submissions found.
          </p>
        )}
      </div>

      {/* FIX 3: Add Pagination Controls */}
      <PaginationControls 
        currentPage={metadata.currentPage}
        totalPages={metadata.totalPages}
      />
    </div>
  );
}
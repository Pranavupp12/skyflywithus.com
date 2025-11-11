// app/(dashboard)/dashboard/bookings/page.tsx

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

// We will NOT import 'Booking' because the import is broken.
// We will get the type directly from the function.

async function getBookings() {
  try {
    // This line will work fine because prisma.booking *does* exist
    // The error is in VS Code's *type-checking*, not in the runtime.
    const bookings = await prisma.booking.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return bookings;
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    return [];
  }
}


export default async function BookingsPage() {
  const bookings = await getBookings();

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
            {/* We use our new 'Booking' type here */}
            {bookings.map((booking: Booking, index: number) => (
              <TableRow key={booking.id}>
                <TableCell>{index + 1}</TableCell>
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
    </div>
  );
}
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import prisma from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { ContactMessage } from "@prisma/client";
import { PaginationControls } from "@/components/ui/pagination-controls"; // Import Pagination

// 1. Define the expected return structure for paginated data
interface PaginatedData {
    data: ContactMessage[];
    metadata: {
        totalPosts: number;
        totalPages: number;
        currentPage: number;
        limit: number;
    };
}

// 2. Update fetch function to accept pagination params
async function getContactMessages(page: number, limit: number): Promise<PaginatedData> {
  const skip = (page - 1) * limit;

  // Define a safe fallback for metadata
  const emptyResult = { data: [], metadata: { totalPosts: 0, totalPages: 1, currentPage: page, limit: limit } };

  try {
    // a. Get total count
    const totalPosts = await prisma.contactMessage.count();

    // b. Get paginated messages
    const messages = await prisma.contactMessage.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      skip: skip,
      take: limit,
    });
    
    // c. Construct and return the full paginated response
    return {
        data: messages,
        metadata: {
            totalPosts: totalPosts,
            totalPages: Math.ceil(totalPosts / limit),
            currentPage: page,
            limit: limit,
        },
    };
    
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    return emptyResult;
  }
}

// 3. Define props interface to handle searchParams as a Promise
interface ContactsPageProps {
    searchParams: Promise<{ page?: string }>;
}


// 4. Update default export to await searchParams and use pagination
export default async function ContactsPage({ searchParams }: ContactsPageProps) {
  
  // Await the searchParams Promise to resolve the parameters
  const resolvedSearchParams = await searchParams;
  
  const currentPage = parseInt(resolvedSearchParams.page || '1', 10);
  const limit = 10; // Set display limit
  
  // Fetch data using the current page and limit
  const { data: messages, metadata } = await getContactMessages(currentPage, limit);

  return (
    <div className="w-full">
      <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
        Contact Form Messages
      </h1>
      
      <TooltipProvider>
        <div className="rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">S.No.</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Message</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {messages.map((msg: ContactMessage, index: number) => (
                <TableRow key={msg.id}>
                  {/* Calculate S.No based on current page */}
                  <TableCell>{(currentPage - 1) * limit + index + 1}</TableCell>
                  <TableCell>{formatDate(msg.createdAt)}</TableCell>
                  <TableCell>{msg.name}</TableCell>
                  <TableCell>{msg.email}</TableCell>
                  <TableCell>{msg.company || "N/A"}</TableCell>
                  <TableCell className="max-w-sm">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <p className="truncate">{msg.message}</p>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-md p-2">{msg.message}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {messages.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              No messages found.
            </p>
          )}
        </div>
      </TooltipProvider>

      {/* 5. Add Pagination Controls */}
      <PaginationControls 
        currentPage={metadata.currentPage}
        totalPages={metadata.totalPages}
      />
    </div>
  );
}
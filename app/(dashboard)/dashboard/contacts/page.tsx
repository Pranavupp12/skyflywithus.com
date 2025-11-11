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
import { ContactMessage } from "@prisma/client"; // Import the correct type

// This function runs on the server to fetch data
async function getContactMessages() {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return messages;
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    return [];
  }
}

export default async function ContactsPage() {
  const messages = await getContactMessages();

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
                  <TableCell>{index + 1}</TableCell>
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
    </div>
  );
}
import type { Metadata } from 'next';
import { Figtree } from 'next/font/google'; // Or Quicksand, just keep it consistent
import '@/globals.css'; // <-- Loads the global CSS
import { SessionProvider } from "@/components/auth/session-provider";
import { getServerSession } from "next-auth";
import { Toaster } from "sonner";


const figtree = Figtree({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'SkyFlyWithUs - Cheap Flights and Travel Blogs',
    template: '%s | SkyFlyWithUs', // %s will be replaced by the page's title
  },
  description: 'Book cheap flights and read travel blogs on SkyFlyWithUs.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en">
      {/* Use the font here */}
      <body className={`${figtree.className}`}>
        {/* SessionProvider and Toaster wrap EVERYTHING */}
        <SessionProvider session={session}>
          {children} {/* <-- This will be your (main) or (dashboard) layout */}
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
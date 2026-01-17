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

  metadataBase: new URL('https://skyflywithus.com'),

  title: {
    default: 'SkyFlyWithUs - Cheap Flights and Travel Blogs',
    template: '%s | SkyFlyWithUs', // %s will be replaced by the page's title
  },
  description: 'Book cheap flights and read travel blogs on SkyFlyWithUs.',
  robots: {
    index: false, // Tells search engines NOT to index any page
    follow: false, // Tells search engines NOT to follow any links from any page
  },
  // 1. ICONS (Favicon, Apple Touch, Shortcut)
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png' },
    ],
    shortcut: ['/favicon.icon'],
    apple: [
      { url: '/apple-touch-icon.png' },
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },

  // 2. OPEN GRAPH (Facebook, WhatsApp, Instagram, LinkedIn)
  openGraph: {
    title: "SkyFlyWithUs - Fly For Less",
    description: "Compare hundreds of airlines and book the cheapest flights instantly. No hidden fees.",
    url: 'https://skyflywithus.com',
    siteName: 'SkyFlyWithUs',
    images: [
      {
        url: '/og-image.jpg', // Must be in public folder, approx 1200x630px
        width: 1200,
        height: 630,
        alt: 'SkyFlyWithUs - Flight Booking Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  // 3. TWITTER CARDS (Twitter/X)
  twitter: {
    card: 'summary_large_image', // Shows the big image
    title: "SkyFlyWithUs - Best Flight Deals",
    description: "Don't overpay for flights. Compare prices and book smart with SkyFlyWithUs.",
    images: ['/og-image.jpg'], // Re-use the OG image or a specific Twitter one
    creator: '@SkyFlyWithUs', // Your Twitter handle
  },
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
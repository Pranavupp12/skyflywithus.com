import type { Metadata } from 'next';
import ContactPageClient from '@/components/contact_components/contact-client-page'; // Import the new client component

// This file is now a Server Component, so 'metadata' is allowed
export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the SkyFlyWithUs team for support or corporate booking inquiries.',
};

// This is the Server Component page
export default function ContactPage() {
  // It renders the Client Component that contains the form logic
  return <ContactPageClient />;
}
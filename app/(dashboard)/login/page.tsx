import type { Metadata } from 'next';
import LoginForm from '../_components/login-form'; // Import the new client component

// This file is now a Server Component, so 'metadata' is allowed
export const metadata: Metadata = {
  title: 'Admin Login',
  robots: {
    index: false, // Do not index this page
    follow: false, // Do not follow links from this page
  },
};

// This is the Server Component page
export default function LoginPage() {
  // It renders the Client Component that contains the form logic
  return <LoginForm />;
}
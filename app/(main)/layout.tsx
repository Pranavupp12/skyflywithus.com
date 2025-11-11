import { Footer } from '@/components/main_components/Footer';
import SiteHeader from '@/components/main_components/SiteHeader';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // We remove <html>, <body>, and SessionProvider.
    // We just return the layout for the main site.
    <div className="flex flex-col min-h-screen bg-indigo-50">
      <SiteHeader /> 
      <main className="flex-grow ">
        {children}
      </main>
      <Footer />
    </div>
  );
}

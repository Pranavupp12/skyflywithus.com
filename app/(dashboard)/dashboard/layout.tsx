
import { Plane } from "lucide-react";
import { SidebarFooter } from "../_components/SidebarFooter";
import { SidebarNav } from "../_components/SidebarNav";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    // 2. Add 'flex flex-col' to the aside
    <div className="flex min-h-screen">
      <aside className="w-64 bg-white dark:bg-gray-900 border-r dark:border-gray-700 p-4 shadow-md flex flex-col sticky top-0 h-screen ">
        {/* Top section of sidebar */}
        <div >
          <div className="flex items-center gap-2 mb-8 p-2">
            <Plane className="h-6 w-6 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              SkyFlyWithUs
            </span>
          </div>
          <div className="flex-grow overflow-y-auto pb-4" >  
           {/* Sidebar Navigation */}
            <SidebarNav />
          </div>
       

        </div>
        {/* 3. Add the SidebarFooter here. 'mt-auto' in its own file will push it down. */}
        <SidebarFooter />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 p-8 bg-gray-50 dark:bg-gray-950">
        {children}
      </div>
    </div>
  );
}
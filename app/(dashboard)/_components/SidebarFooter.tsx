"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { LogOut } from "lucide-react";
import { LetterAvatar } from "@/components/ui/letter-avatar"; // Reuse your existing component

export function SidebarFooter() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    toast.success("Logged Out");
    router.push("/login");
  };

  const userName = session?.user?.name || "Admin";

  return (
    <div className="mt-auto space-y-4">
      {/* User Info Card */}
      <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
        <LetterAvatar name={userName} size={36} />
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {userName}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
            {session?.user?.email}
          </p>
        </div>
      </div>

      {/* Sign Out Button */}
      <Button onClick={handleSignOut} variant="outline" className="w-full">
        <LogOut className="mr-2 h-4 w-4" />
        Sign Out
      </Button>
    </div>
  );
}
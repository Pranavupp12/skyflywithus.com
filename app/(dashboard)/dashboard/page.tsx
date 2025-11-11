import { redirect } from "next/navigation";

export default function DashboardPage() {
  // This page is now just a redirect to the default section
  redirect("/dashboard/bookings");
}
// app/(dashboard)/login/page.tsx

"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Plane } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Login',
  robots: {
    index: false, // Do not index this page
    follow: false, // Do not follow links from this page
  },
};

export default function DashboardLoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isLogin) {
      // --- LOGIN LOGIC ---
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        toast.error("Login Failed", {
          description: result.error,
        });
        setLoading(false);
      } else {
        toast.success("Success", {
          description: "Logged in successfully! Redirecting...",
        });
        router.push("/dashboard"); // Redirect to dashboard on success
      }
    } else {
      // --- SIGNUP LOGIC ---
      try {
        const response = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          toast.success("Success", {
            description: "Account created! Please log in.",
          });
          setIsLogin(true); // Switch to login view
        } else {
          toast.error("Signup Failed", {
            description: data.error || "Something went wrong.",
          });
        }
      } catch (error) {
        toast.error("Error", {
          description: "An unexpected error occurred.",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 mb-4">
            <Plane className="h-8 w-8 text-indigo-600" />
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              SkyFlyWithUs
            </span>
          </div>
          <h2 className="text-xl text-gray-600 dark:text-gray-300">
            Admin Dashboard
          </h2>
        </div>

        <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
          <h3 className="mb-6 text-center text-2xl font-bold text-gray-900 dark:text-white">
            {isLogin ? "Welcome Back" : "Create Admin Account"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700"
              disabled={loading}
            >
              {loading ? "Loading..." : isLogin ? "Login" : "Sign Up"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-medium text-indigo-600 hover:text-indigo-500 disabled:opacity-50"
              disabled={loading}
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
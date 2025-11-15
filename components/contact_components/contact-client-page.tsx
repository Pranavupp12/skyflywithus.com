"use client"; // This file is the Client Component

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ConfirmationDialog } from "@/components/home_components/Confirmation-dialog";
import { toast } from "sonner";
import { HiOutlineMail } from "react-icons/hi";
import { HiOutlinePhone } from "react-icons/hi";
import { HiOutlineLocationMarker } from "react-icons/hi";

// Rename the function to avoid conflicts
export default function ContactPageClient() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const contactMethods = [
    {
      icon: <HiOutlineMail className="w-6 h-6 " />,
      contact: "support@skyflywithus.com",
    },
    {
      icon: <HiOutlinePhone className="w-6 h-6 " />,
      contact: "+1 (555) 123-4567",
    },
    {
      icon: <HiOutlineLocationMarker className="w-6 h-6 " />,
      contact: "123 Aviation Ave, New York, NY",
    },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("full-name") as string,
      email: formData.get("email") as string,
      company: formData.get("company") as string,
      message: formData.get("message") as string,
    };

    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setIsSubmitted(true);
      (e.target as HTMLFormElement).reset();
    } catch (error: any) {
      console.error(error);
      toast.error("Submission Failed", {
        description: error.message || "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main >
      <div className=" mx-5 md:mx-30 mt-20 mb-20 ">
        <div className="max-w-lg mx-auto gap-6 justify-between lg:flex lg:max-w-5xl">
          {/* Left Side: Contact Info */}
          <div className="max-w-lg space-y-3">
            <h3 className="text-[#FF8C00] text-lg font-semibold">Contact</h3>
            <p className="text-black dark:text-white text-3xl font-semibold sm:text-4xl">
              Let us know how we can help
            </p>
            <p className="text-gray-800 text-lg dark:text-gray-300">
              We are here to help and answer any question you might have. We look
              forward to hearing from you! Please fill out the form, or use
              the contact information below.
            </p>
            <div>
              <ul className="mt-6 flex flex-wrap gap-x-10 gap-y-6 items-center">
                {contactMethods.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-x-3">
                    <div className="flex-none text-[#FF8C00]">{item.icon}</div>
                    <p className="text-gray-700 dark:text-gray-300">{item.contact}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Right Side: Form */}
          <div className="flex-1 p-10 border border-[#FF8C00] bg-white rounded-xl mt-12 sm:max-w-lg lg:max-w-md">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="full-name" className="font-medium">
                  Full name
                </Label>
                <Input id="full-name" name="full-name" type="text" required disabled={loading} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="font-medium">
                  Email
                </Label>
                <Input id="email" name="email" type="email" required disabled={loading} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company" className="font-medium">
                  Company <span className="text-gray-500">(Optional)</span>
                </Label>
                <Input id="company" name="company" type="text" disabled={loading} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="font-medium">
                  Message
                </Label>
                <Textarea id="message" name="message" required className="h-36" disabled={loading} />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#FF8C00] hover:bg-[#FFA749]"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </div>
        </div>
      </div>
      {/* Confirmation Dialog */}
      <ConfirmationDialog 
        open={isSubmitted} 
        onOpenChange={setIsSubmitted} 
      />
    </main>
  );
}
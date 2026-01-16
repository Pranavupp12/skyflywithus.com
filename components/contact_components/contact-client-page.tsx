"use client"; 

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
    // FIX APPLIED HERE:
    // 1. Added '-mx-5 md:-mx-15' to stretch background full width
    // 2. Added 'bg-[#FFF5EB]/50'
    // 3. Added 'py-20' for vertical spacing
    <main className="w-full py-24 bg-[#FFF5EB]/50 min-h-screen">
      
      {/* Container to align content properly */}
      <div className="container mx-auto px-6 mt-10">
        
        <div className="max-w-lg mx-auto gap-12 justify-between lg:flex lg:max-w-6xl">
          
          {/* Left Side: Contact Info */}
          <div className="max-w-lg space-y-3 lg:pt-10">
            <h3 className="text-[#FF8C00] text-lg font-bold uppercase tracking-wider">Contact Us</h3>
            <p className="text-black dark:text-white text-4xl font-bold sm:text-5xl leading-tight">
              Let us know how <br /> we can help
            </p>
            <p className="text-gray-600 text-lg dark:text-gray-300 mt-4 leading-relaxed">
              If you have any queries about bookings, cancellations, or just want to say hello, 
              fill out the form and our team will get back to you shortly.
            </p>
            
            <div className="pt-8">
              <ul className="space-y-6">
                {contactMethods.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-x-4">
                    <div className="flex-none p-3 rounded-full bg-white text-[#FF8C00] shadow-sm">
                        {item.icon}
                    </div>
                    <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                            {idx === 0 ? "Email" : idx === 1 ? "Phone" : "Office"}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                        {item.contact}
                        </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="flex-1 p-8 sm:p-10 border border-orange-100 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-2xl shadow-xl mt-12 lg:mt-0 sm:max-w-lg lg:max-w-md">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="full-name" className="font-medium text-gray-700 dark:text-gray-200">
                  Full name
                </Label>
                <Input
                  id="full-name"
                  name="full-name"
                  type="text"
                  placeholder="John Doe"
                  required
                  disabled={loading}
                  className="h-11 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus-visible:ring-[#FF8C00]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="font-medium text-gray-700 dark:text-gray-200">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                  disabled={loading}
                  className="h-11 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus-visible:ring-[#FF8C00]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company" className="font-medium text-gray-700 dark:text-gray-200">
                  Company <span className="text-gray-400 text-sm font-normal">(Optional)</span>
                </Label>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Your Company"
                  disabled={loading}
                  className="h-11 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus-visible:ring-[#FF8C00]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="font-medium text-gray-700 dark:text-gray-200">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  placeholder="How can we help you?"
                  className="h-36 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus-visible:ring-[#FF8C00] resize-none"
                  disabled={loading}
                />
              </div>
              <Button
                type="submit"
                className="w-full h-12 text-base font-bold bg-[#FF8C00] hover:bg-[#ff9514] text-white rounded-lg shadow-md transition-all hover:shadow-lg mt-2"
                disabled={loading}
              >
                {loading ? "Sending Message..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
      
      {/* Confirmation Dialog */}
      <ConfirmationDialog open={isSubmitted} onOpenChange={setIsSubmitted} />
    </main>
  );
}
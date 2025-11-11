"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; // Using standard Dialog
import { Button } from "@/components/ui/button";
import { Trash2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

interface FaqDeleteDialogProps {
  faqId: string;
  onDeleteSuccess: () => void;
}

export function FaqDeleteDialog({ faqId, onDeleteSuccess }: FaqDeleteDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    toast.loading(`Deleting FAQ...`, { id: 'delete-faq-status' });

    try {
      // API Call to Delete the FAQ item (sends DELETE request to /api/faqs/[faqId])
      const response = await fetch(`/api/faqs/${faqId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error("Failed to delete FAQ.");
      }

      toast.success("FAQ Deleted", { 
        description: "The FAQ item was successfully removed.",
        id: 'delete-faq-status' 
      });
      setOpen(false); // Close the modal on success
      onDeleteSuccess(); // Refresh the parent table

    } catch (error: any) {
      toast.error("Deletion Failed", { 
        description: error.message || "An unexpected error occurred.",
        id: 'delete-faq-status' 
      });
    } finally {
        setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
            <div className="flex items-center justify-center pt-2 pb-4">
                <AlertTriangle className="h-10 w-10 text-red-500" />
            </div>
            <DialogTitle className="text-center text-xl">
                Confirm Deletion
            </DialogTitle>
            <DialogDescription className="text-center">
                Are you sure you want to permanently delete this FAQ item (ID: **{faqId}**)?
                <br />
                This action cannot be undone.
            </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4 sm:justify-center">
          <Button 
            variant="outline" 
            onClick={() => setOpen(false)} 
            disabled={loading}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDelete} 
            disabled={loading}
            className="bg-red-600 hover:bg-red-700"
          >
            {loading ? "Deleting..." : "Yes, Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
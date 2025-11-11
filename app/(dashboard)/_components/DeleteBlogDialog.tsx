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
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DeleteBlogDialogProps {
  blogSlug: string;
  blogTitle: string;
}

export function DeleteBlogDialog({ blogSlug, blogTitle }: DeleteBlogDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    toast.loading(`Deleting "${blogTitle}"...`, { id: 'delete-status' });

    try {
      // API Call to Delete the Blog Post (sends DELETE request to /api/blogs/[blogId])
      const response = await fetch(`/api/blogs/${blogSlug}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete post.");
      }

      toast.success("Post Deleted", { 
        description: `"${blogTitle}" was successfully removed.`,
        id: 'delete-status' 
      });
      setOpen(false); // Close the modal on success
      router.refresh(); // Refresh the table on the server component

    } catch (error: any) {
      toast.error("Deletion Failed", { 
        description: error.message,
        id: 'delete-status' 
      });
    } finally {
        setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
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
                Are you sure you want to permanently delete the blog post:
                <br />
                <span className="font-semibold text-red-600">"{blogTitle}"</span>?
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
            {loading ? "Deleting..." : "Yes, Delete Post"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
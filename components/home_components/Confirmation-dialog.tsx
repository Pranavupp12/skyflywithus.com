// components/home_component/confirmation-dialog.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Confetti from "react-confetti"; // <-- Import Confetti
import { useEffect, useState } from "react"; // <-- Import useEffect and useState

interface ConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ConfirmationDialog({ open, onOpenChange }: ConfirmationDialogProps) {
  // State to control confetti visibility and duration
  const [showConfetti, setShowConfetti] = useState(false);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  // Effect to show confetti when dialog opens and hide it after a delay
  useEffect(() => {
    if (open) {
      // Set width and height dynamically based on window size
      // This is important for confetti to cover the whole screen
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
      
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false); // Stop confetti after 5 seconds
      }, 5000); 

      // Cleanup function to clear the timer if component unmounts or dialog closes
      return () => clearTimeout(timer);
    } else {
      setShowConfetti(false); // Ensure confetti is off when dialog closes
    }
  }, [open]); // Re-run effect when 'open' prop changes

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={false} // Don't loop confetti
          numberOfPieces={200} // Number of confetti pieces
          gravity={0.1} // How fast confetti falls
          tweenDuration={3000} // Duration of the animation
          // You can customize colors, initial velocity, etc.
          // colors={['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6']}
        />
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thank you!</DialogTitle>
          <DialogDescription>
            Your request has been received. Our team will reach back to you
            shortly.
          </DialogDescription>
        </DialogHeader>
        <Button onClick={() => onOpenChange(false)}>Close</Button>
      </DialogContent>
    </Dialog>
  );
}
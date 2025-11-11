"use client";

import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface FaqItem { id: string; question: string; answer: string; blogId: string; }

interface FaqUpdateDialogProps {
    faq: FaqItem;
    onUpdateSuccess: () => void;
}

export function FaqUpdateDialog({ faq, onUpdateSuccess }: FaqUpdateDialogProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [question, setQuestion] = useState(faq.question);
    const [answer, setAnswer] = useState(faq.answer);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        toast.loading(`Updating FAQ...`, { id: 'update-faq-status' });

        try {
            const response = await fetch(`/api/faqs/${faq.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question, answer }),
            });

            if (!response.ok) {
                throw new Error("Failed to update FAQ.");
            }

            toast.success("FAQ Updated", { id: 'update-faq-status' });
            onUpdateSuccess();
            setOpen(false);

        } catch (error: any) {
            toast.error("Update Failed", { description: error.message, id: 'update-faq-status' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <Pencil className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle>Edit FAQ</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="question">Question</Label>
                        <Input id="question" value={question} onChange={(e) => setQuestion(e.target.value)} required disabled={loading} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="answer">Answer</Label>
                        <Textarea id="answer" value={answer} onChange={(e) => setAnswer(e.target.value)} required rows={4} disabled={loading} />
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={loading} className="bg-indigo-600 hover:bg-indigo-700">
                            {loading ? "Saving..." : "Save Changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
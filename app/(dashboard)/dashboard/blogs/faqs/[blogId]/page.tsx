"use client";

import { ArrowLeft, PlusCircle, Trash2, Pencil } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { FaqDeleteDialog } from "../../../../_components/FaqDeleteDialog"; // Import Delete Modal
import { FaqUpdateDialog } from "../../../../_components/FaqUpdateDialog"; // Import Update Modal

// Define the full payload needed for the page
interface FaqPageData {
    blogTitle: string;
    blogId: string;
    faqs: FaqItem[];
}
// Define FAQ type (must match what's in schema)
interface FaqItem {
    id: string; 
    question: string; 
    answer: string; 
    blogId: string; // Add blogId for consistency
}

export default function FaqManagerPage() {
    const pathname = usePathname();
    const blogId = pathname ? pathname.split('/').pop() || "" : "";

    const [data, setData] = useState<FaqPageData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [newQuestion, setNewQuestion] = useState("");
    const [newAnswer, setNewAnswer] = useState("");


    // --- Data Fetching ---
    const fetchFaqs = async () => {
        setIsLoading(true);
        try {
            const blogTitleResponse = await fetch(`/api/blogs/${blogId}`); // Assumes you create a GET endpoint here too
            const blogTitleData = await blogTitleResponse.json();

            const response = await fetch(`/api/faqs?blogId=${blogId}`);
            if (!response.ok) throw new Error("Failed to fetch FAQs list");

            const faqs = await response.json();
            
            setData({
                blogId: blogId,
                blogTitle: blogTitleData.title || "Blog Post", // Get title from blog API
                faqs: faqs,
            });
        } catch (error) {
             setData({ blogId: blogId, blogTitle: "Blog Post (Error)", faqs: [] });
             toast.error("Could not load blog data or FAQs.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (blogId) fetchFaqs();
    }, [blogId]);

    // Handle form submission (Add New FAQ)
    const handleAddFaq = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        toast.loading("Creating new FAQ...", { id: 'create-faq-status' });

        try {
            const response = await fetch('/api/faqs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ blogId, question: newQuestion, answer: newAnswer }),
            });

            if (!response.ok) {
                throw new Error("Failed to create FAQ.");
            }

            toast.success("FAQ created successfully!", { id: 'create-faq-status' });
            setNewQuestion("");
            setNewAnswer("");
            await fetchFaqs(); // Refresh the table
        } catch (error: any) {
            toast.error("Creation Failed", { description: error.message, id: 'create-faq-status' });
        } finally {
            setIsSubmitting(false);
        }
    };


    if (isLoading || !data) {
        return <div className="text-center py-12 text-lg text-gray-500">Loading FAQ Manager...</div>;
    }

    return (
        <div className="w-full space-y-8">
            <div className="flex justify-between items-center">
                <Link href="/dashboard/blogs" className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors">
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Back to Manage Blogs
                </Link>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                    Manage FAQs
                </h1>
            </div>

            {/* --- 1. Create New FAQ Form --- */}
            <div className="rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md p-6">
                <h2 className="text-2xl font-semibold mb-4">
                    Create New FAQ for: {data.blogTitle}
                </h2>
                <form onSubmit={handleAddFaq} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="new-question">Question</Label>
                            <Input id="new-question" value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} required disabled={isSubmitting} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="new-answer">Answer</Label>
                            <Input id="new-answer" value={newAnswer} onChange={(e) => setNewAnswer(e.target.value)} required disabled={isSubmitting} />
                        </div>
                    </div>
                    <Button type="submit" disabled={isSubmitting} className="bg-indigo-600 hover:bg-indigo-700">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        {isSubmitting ? "Adding..." : "Add FAQ"}
                    </Button>
                </form>
            </div>

            {/* --- 2. FAQ Table --- */}
            <div className="rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">S.No.</TableHead>
                            <TableHead>Question</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.faqs.map((faq, index) => (
                            <TableRow key={faq.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell className="font-medium max-w-lg">{faq.question}</TableCell>
                                <TableCell className="text-right flex justify-end gap-2">
                                    <FaqUpdateDialog faq={faq} onUpdateSuccess={fetchFaqs} />
                                    <FaqDeleteDialog faqId={faq.id} onDeleteSuccess={fetchFaqs} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {data.faqs.length === 0 && (
                    <p className="text-center text-gray-500 py-8">No FAQs found for this blog post.</p>
                )}
            </div>
        </div>
    );
}
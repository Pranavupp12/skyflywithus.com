"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MultiSelect } from "@/components/ui/multi-select";
import { RichTextEditor } from "./rich_text_editor";

// --- HARDCODED CATEGORIES (Added) ---
const blogCategories = [
    { name: "Cancellation and Refund", slug: "cancellation-and-refund" },
    { name: "Change Flight", slug: "change-flight" },
    { name: "Compensation", slug: "compensation" },
    { name: "Seat Upgrade", slug: "seat-upgrade" },
    { name: "Voucher", slug: "voucher" },
    { name: "Lost and Found", slug: "lost-and-found" },
    { name: "Check In", slug: "check-in" },
    { name: "Airport", slug: "airport" },
];
// ------------------------------------

// Helper function to create a slug
function slugify(text: string) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-');
}

const categoryOptions = blogCategories.map(cat => ({ label: cat.name, value: cat.name }));

// Define the shape of the data received from the table and used in the form
interface BlogData {
    id: string;
    title: string;
    slug: string;
    categories: string[];
    content: string;
    image: string; // Current image URL
    metaTitle: string;
    focusKeyword?: string;
    metaDesc: string;
    metaKeywords: string;
    author: { name: string };
}

// Define the props for the update dialog
interface UpdateBlogDialogProps {
    blog: BlogData;
}

export function UpdateBlogDialog({ blog }: UpdateBlogDialogProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [imageSourceType, setImageSourceType] = useState(blog.image && blog.image.startsWith('http') ? "url" : "upload");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        formState: { errors },
        reset,
    } = useForm<BlogData>({
        defaultValues: {
            ...blog,
            focusKeyword: blog.focusKeyword || ""
        },
    });

    // --- Slug Generation Logic ---
    const titleValue = watch("title");
    useEffect(() => {
        if (!isSlugManuallyEdited && open && titleValue !== blog.title) {
            const newSlug = slugify(titleValue);
            setValue("slug", newSlug, { shouldValidate: true });
        }
    }, [titleValue, isSlugManuallyEdited, setValue, open, blog.title]);


    // Reset form state and inputs when modal closes
    useEffect(() => {
        if (!open) {
            reset(blog);
            setImageSourceType(blog.image && blog.image.startsWith('http') ? "url" : "upload");
            setImageFile(null);
            setIsSlugManuallyEdited(false);
        }
    }, [open, blog, reset]);


    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setImageFile(file);
        if (file) {
            toast.info(`Ready to upload: ${file.name}`);
        } else {
            toast.warning("No file selected.");
        }
    };

    const onSubmit = async (data: BlogData) => {
        setLoading(true);
        toast.loading(`Updating ${data.title}...`, { id: 'update-status' });

        let finalImageUrl = data.image;

        // --- 1. CLOUDINARY UPLOAD LOGIC ---
        if (imageSourceType === "upload" && imageFile) {
            toast.loading(`Uploading new image...`, { id: 'image-upload' });
            try {
                const formData = new FormData();
                formData.append('file', imageFile);

                const uploadResponse = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });

                if (!uploadResponse.ok) {
                    const errorData = await uploadResponse.json();
                    throw new Error(errorData.error || "Upload failed.");
                }

                const uploadData = await uploadResponse.json();
                finalImageUrl = uploadData.imageUrl;
                toast.success("New image uploaded!", { id: 'image-upload' });

            } catch (error: any) {
                toast.error("Image Upload Failed", { description: error.message, id: 'update-status' });
                setLoading(false);
                return;
            }
        }

        // 2. Final URL check and submission
        if (!finalImageUrl) {
            toast.error("Missing Image", { description: "Please provide an image URL or upload a file." });
            setLoading(false);
            return;
        }

        try {
            // Send PATCH request to the dynamic route /api/blogs/[id]
            const response = await fetch(`/api/blogs/${blog.slug}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data, image: finalImageUrl }), // Use final URL
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to update post.");
            }

            toast.success("Post Updated", {
                description: `Changes to "${data.title}" saved successfully.`,
                id: 'update-status'
            });
            setOpen(false);
            router.refresh();

        } catch (error: any) {
            toast.error("Update Failed", {
                description: error.message,
                id: 'update-status'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <Pencil className="h-4 w-4 mr-2" />
                    Update
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Update Blog Post: {blog.title}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Title */}
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" {...register("title", { required: "Title is required" })} />
                        {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
                    </div>

                    {/* Slug */}
                    <div className="space-y-2">
                        <Label htmlFor="slug">Blog URL (Slug)</Label>
                        <Input
                            id="slug"
                            {...register("slug", { required: "Slug is required" })}
                            onInput={() => setIsSlugManuallyEdited(true)}
                        />
                        {errors.slug && <p className="text-sm text-red-500">{errors.slug.message}</p>}
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                        <Label htmlFor="categories">Categories</Label>
                        <Controller
                            name="categories"
                            control={control}
                            rules={{ required: "At least one category is required" }}
                            render={({ field }) => (
                                <MultiSelect
                                    options={categoryOptions}
                                    selected={field.value || []} // Ensure array
                                    onChange={field.onChange}
                                />
                            )}
                        />
                        {errors.categories && <p className="text-sm text-red-500">{errors.categories.message}</p>}
                    </div>

                    {/* Content (Tiptap) */}
                    <div className="space-y-2">
                        <Label>Content</Label>
                        <Controller
                            name="content"
                            control={control}
                            rules={{ required: "Content is required" }}
                            render={({ field }) => (
                                <RichTextEditor
                                    value={field.value}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                />
                            )}
                        />
                        {errors.content && <p className="text-sm text-red-500">{errors.content.message}</p>}
                    </div>

                    {/* --- Image Configuration --- */}
                    <div className="space-y-2 border-t pt-4">
                        <Label>Featured Image (Current Image: {blog.image ? "Available" : "None"})</Label>
                        <RadioGroup
                            defaultValue={imageSourceType}
                            className="flex gap-4"
                            onValueChange={setImageSourceType}
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="url" id="r-url" />
                                <Label htmlFor="r-url">Paste URL (Current: {blog.image ? "Yes" : "No"})</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="upload" id="r-upload" />
                                <Label htmlFor="r-upload">Upload New Image</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {imageSourceType === "url" ? (
                        <div className="space-y-2">
                            <Label htmlFor="image">Image URL</Label>
                            <Input
                                id="image"
                                placeholder="https://your-image-url.com/image.jpg"
                                {...register("image", { required: "Image URL is required" })}
                            />
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <Label htmlFor="imageUpload">New Image Upload</Label>
                            <Input
                                id="imageUpload"
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                            {imageFile && <p className="text-sm text-muted-foreground">Selected: {imageFile.name}</p>}
                        </div>
                    )}
                    {/* End Image Configuration */}

                    {/* --- SEO Section --- */}
                    <div className="space-y-4 pt-4 border-t dark:border-gray-700">
                        <h3 className="text-lg font-medium">SEO Settings</h3>
                        <div className="space-y-2">
                            <Label htmlFor="focusKeyword" className="text-[#FF8C00]">Focus Keyword</Label>
                            <Input
                                id="focusKeyword"
                                {...register("focusKeyword")}
                                placeholder="e.g. flight refund"
                            />
                            <p className="text-xs text-muted-foreground">Used for SEO analysis scoring.</p>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="metaTitle">Meta Title</Label>
                            <Input id="metaTitle" {...register("metaTitle", { required: "Meta Title is required" })} />
                            {errors.metaTitle && <p className="text-sm text-red-500">{errors.metaTitle.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="metaDesc">Meta Description (Card Summary)</Label>
                            <Textarea id="metaDesc" {...register("metaDesc", { required: "Meta Description is required" })} />
                            {errors.metaDesc && <p className="text-sm text-red-500">{errors.metaDesc.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="metaKeywords">Meta Keywords</Label>
                            <Input id="metaKeywords" {...register("metaKeywords", { required: "Keywords are required" })} />
                            {errors.metaKeywords && <p className="text-sm text-red-500">{errors.metaKeywords.message}</p>}
                        </div>
                    </div>


                    <div className="flex justify-end pt-4">
                        <Button type="submit" disabled={loading} className="bg-indigo-600 hover:bg-indigo-700">
                            {loading ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
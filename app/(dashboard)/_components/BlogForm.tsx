// app/(dashboard)/_components/BlogForm.tsx

"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RichTextEditor } from "./rich_text_editor";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

// --- HARDCODED CATEGORIES ---
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
// -----------------------------


// Helper function to create a slug (client-side logic)
function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

// Define the shape of our form data
type BlogFormInputs = {
  title: string;
  slug: string;
  category: string;
  content: string;
  image: string; // This will hold the final URL
  metaTitle: string;
  metaDesc: string;
  metaKeywords: string;
};

export function BlogForm() {
  const router = useRouter();
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [imageSourceType, setImageSourceType] = useState("url");
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const {
    register, handleSubmit, control, watch, setValue, reset,
    formState: { errors },
  } = useForm<BlogFormInputs>({
    defaultValues: { title: "", slug: "", category: "", content: "", image: "", metaTitle: "", metaDesc: "", metaKeywords: "" },
  });

  // --- Auto-slug generation ---
  const titleValue = watch("title");
  useEffect(() => {
    if (!isSlugManuallyEdited && titleValue) {
      const newSlug = slugify(titleValue);
      setValue("slug", newSlug, { shouldValidate: true });
    }
  }, [titleValue, isSlugManuallyEdited, setValue]);
  // ---

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setImageFile(file);
    if (file) {
        toast.info(`Ready to upload: ${file.name}`);
        setValue("image", "", { shouldValidate: true }); // Clear URL field
    }
  };

  const onSubmit = async (data: BlogFormInputs) => {
    setIsFormSubmitting(true);
    toast.loading("Submitting blog post...", { id: 'blog-submit' });
    
    let finalImageUrl = data.image; // Start with the URL input value

    // --- CLOUDINARY UPLOAD LOGIC ---
    if (imageSourceType === "upload" && imageFile) {
        toast.loading(`Uploading image: ${imageFile.name}...`, { id: 'image-upload' });
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
            toast.success("Image uploaded successfully!", { id: 'image-upload' });

        } catch (error: any) {
            toast.error("Image Upload Failed", { description: error.message, id: 'blog-submit' });
            setIsFormSubmitting(false);
            return; 
        }
    }
    
    if (!finalImageUrl) {
        toast.error("Missing Image", { description: "Please provide an image URL or upload a file.", id: 'blog-submit' });
        setIsFormSubmitting(false);
        return;
    }

    // --- BLOG POST CREATION ---
    try {
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, image: finalImageUrl }), // Use final URL
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create post");
      }

      toast.success("Blog post created successfully!", { id: 'blog-submit' });
      reset(); 
      setImageFile(null);
      router.refresh(); 

    } catch (error: any) {
      toast.error("Error creating post", {
        description: error.message, id: 'blog-submit'
      });
    } finally {
      setIsFormSubmitting(false);
    }
  };


  return (
    <div className="rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-6 space-y-6">
          <h2 className="text-2xl font-semibold">Create New Blog Post</h2>
          
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Your blog post title"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
          </div>

          {/* Blog URL (Slug) */}
          <div className="space-y-2">
            <Label htmlFor="slug">Blog URL (Slug)</Label>
            <Input
              id="slug"
              placeholder="my-new-post-slug"
              {...register("slug", { required: "Slug is required" })}
              onInput={() => setIsSlugManuallyEdited(true)}
            />
            {errors.slug && <p className="text-sm text-red-500">{errors.slug.message}</p>}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Controller
              name="category"
              control={control}
              rules={{ required: "Category is required" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* --- USE HARDCODED CATEGORIES --- */}
                    {blogCategories.map((cat) => (
                      <SelectItem key={cat.slug} value={cat.name}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
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

          {/* Image Toggle */}
          <div className="space-y-2">
            <Label>Featured Image</Label>
            <RadioGroup
              defaultValue="url"
              className="flex gap-4"
              onValueChange={setImageSourceType}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="url" id="r-url" />
                <Label htmlFor="r-url">Paste Image URL</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="upload" id="r-upload" />
                <Label htmlFor="r-upload">Upload Image</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Image URL / Upload Field */}
          {imageSourceType === "url" ? (
            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                placeholder="https://your-image-url.com/image.jpg"
                {...register("image", { required: "Image URL is required" })}
              />
              {errors.image && <p className="text-sm text-red-500">{errors.image.message}</p>}
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="imageUpload">Upload File</Label>
              <Input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <p className="text-sm text-muted-foreground">
                {imageFile ? `Selected: ${imageFile.name}` : "No file chosen."}
              </p>
            </div>
          )}

          {/* --- SEO Section --- */}
          <div className="space-y-4 pt-4 border-t dark:border-gray-700">
            <h3 className="text-lg font-medium">SEO Settings (metaDesc is used for card summary)</h3>
            <div className="space-y-2">
              <Label htmlFor="metaTitle">Meta Title</Label>
              <Input
                id="metaTitle"
                placeholder="SEO-friendly title"
                {...register("metaTitle", { required: "Meta Title is required" })}
              />
              {errors.metaTitle && <p className="text-sm text-red-500">{errors.metaTitle.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="metaDesc">Meta Description</Label>
              <Textarea
                id="metaDesc"
                placeholder="SEO-friendly description (max 160 chars)"
                {...register("metaDesc", { required: "Meta Description is required" })}
              />
              {errors.metaDesc && <p className="text-sm text-red-500">{errors.metaDesc.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="metaKeywords">Meta Keywords</Label>
              <Input
                id="metaKeywords"
                placeholder="e.g., travel, flights, airport"
                {...register("metaKeywords", { required: "Keywords are required" })}
              />
              {errors.metaKeywords && <p className="text-sm text-red-500">{errors.metaKeywords.message}</p>}
            </div>
          </div>
        </div>

        <div className="p-6 bg-gray-50 dark:bg-gray-900 border-t dark:border-gray-700 rounded-b-lg">
          <Button type="submit" disabled={isFormSubmitting} className="bg-indigo-600 hover:bg-indigo-700">
            {isFormSubmitting ? "Saving Post..." : "Save Post"}
          </Button>
        </div>
      </form>
    </div>
  );
}
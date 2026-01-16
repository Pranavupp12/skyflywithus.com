"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image"; // Import Image component
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RichTextEditor } from "./rich_text_editor";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SEOAnalyzer } from "./SeoAnalyser";
import { MultiSelect } from "@/components/ui/multi-select"; 

// --- CATEGORIES ---
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

const categoryOptions = blogCategories.map(cat => ({ label: cat.name, value: cat.name }));

function slugify(text: string) {
  return text.toString().toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-');
}

type BlogFormInputs = {
  title: string;
  slug: string;
  categories: string[]; 
  content: string;
  image: string;
  focusKeyword: string; 
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
  
  // NEW: State for showing the image preview
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const {
    register, handleSubmit, control, watch, setValue, reset,
    formState: { errors },
  } = useForm<BlogFormInputs>({
    defaultValues: { 
        title: "", slug: "", categories: [], content: "", image: "", 
        focusKeyword: "", metaTitle: "", metaDesc: "", metaKeywords: "" 
    },
  });

  const watchedValues = watch(); 
  const titleValue = watch("title");
  
  // Watch the image URL input to update preview live
  const imageUrlValue = watch("image");

  // Update preview when URL input changes (only for "url" mode)
  useEffect(() => {
    if (imageSourceType === "url" && imageUrlValue) {
      setPreviewUrl(imageUrlValue);
    } else if (imageSourceType === "url" && !imageUrlValue) {
      setPreviewUrl(null);
    }
  }, [imageUrlValue, imageSourceType]);

  useEffect(() => {
    if (!isSlugManuallyEdited && titleValue) {
      const newSlug = slugify(titleValue);
      setValue("slug", newSlug, { shouldValidate: true });
    }
  }, [titleValue, isSlugManuallyEdited, setValue]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setImageFile(file);
    
    if (file) {
        // Create a fake local URL just for previewing
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);
        setValue("image", "", { shouldValidate: true }); // Clear URL field to avoid conflicts
    } else {
        setPreviewUrl(null);
    }
  };

  const onSubmit = async (data: BlogFormInputs) => {
    setIsFormSubmitting(true);
    toast.loading("Submitting blog post...", { id: 'blog-submit' });
    
    let finalImageUrl = data.image; 

    // --- UPLOAD LOGIC (Happens on Save) ---
    if (imageSourceType === "upload" && imageFile) {
        toast.loading(`Uploading image: ${imageFile.name}...`, { id: 'blog-submit' }); // Update toast
        try {
            const formData = new FormData();
            formData.append('file', imageFile);
            const uploadResponse = await fetch("/api/upload", { method: "POST", body: formData });
            
            if (!uploadResponse.ok) throw new Error("Upload failed.");
            
            const uploadData = await uploadResponse.json();
            finalImageUrl = uploadData.imageUrl; 
            toast.success("Image uploaded!", { id: 'blog-submit' });
        } catch (error: any) {
            toast.error("Image Upload Failed", { id: 'blog-submit' });
            setIsFormSubmitting(false);
            return; 
        }
    }
    
    if (!finalImageUrl) {
        toast.error("Missing Image", { description: "Please provide an image.", id: 'blog-submit' });
        setIsFormSubmitting(false);
        return;
    }

    try {
      const { focusKeyword, ...submissionData } = data; 

      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...submissionData, image: finalImageUrl }), 
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create post");
      }

      toast.success("Blog post created successfully!", { id: 'blog-submit' });
      reset(); 
      setImageFile(null);
      setPreviewUrl(null); // Clear preview
      router.refresh(); 

    } catch (error: any) {
      toast.error("Error creating post", { description: error.message, id: 'blog-submit' });
    } finally {
      setIsFormSubmitting(false);
    }
  };


  return (
    <div className="rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-6 space-y-6">
          <h2 className="text-2xl font-semibold">Create New Blog Post</h2>
          
          {/* Title & Slug Inputs (Unchanged) */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="Title" {...register("title", { required: "Title is required" })} />
            {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Blog URL (Slug)</Label>
            <Input id="slug" placeholder="slug" {...register("slug", { required: "Slug is required" })} onInput={() => setIsSlugManuallyEdited(true)} />
             {errors.slug && <p className="text-sm text-red-500">{errors.slug.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="categories">Categories</Label>
            <Controller
              name="categories"
              control={control}
              rules={{ required: "At least one category is required" }}
              render={({ field }) => (
                <MultiSelect 
                    options={categoryOptions}
                    selected={field.value}
                    onChange={field.onChange}
                    placeholder="Select categories..."
                />
              )}
            />
             {errors.categories && <p className="text-sm text-red-500">{errors.categories.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>Content</Label>
            <Controller name="content" control={control} rules={{ required: "Content is required" }} render={({ field }) => (
                <RichTextEditor value={field.value} onChange={field.onChange} onBlur={field.onBlur} />
              )}
            />
             {errors.content && <p className="text-sm text-red-500">{errors.content.message}</p>}
          </div>

           {/* --- UPDATED IMAGE SECTION --- */}
           <div className="space-y-4 border p-4 rounded-md bg-gray-50 dark:bg-gray-900/50">
            <Label className="text-lg font-medium">Featured Image</Label>
            
            {/* Image Source Toggle */}
            <RadioGroup defaultValue="url" className="flex gap-4 mb-4" onValueChange={(val) => {
                setImageSourceType(val);
                setPreviewUrl(null); // Clear preview on switch
            }}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="url" id="r-url" />
                <Label htmlFor="r-url">Paste Image URL</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="upload" id="r-upload" />
                <Label htmlFor="r-upload">Upload Image</Label>
              </div>
            </RadioGroup>

            {/* Input Fields */}
            {imageSourceType === "url" ? (
                <div className="space-y-2">
                    <Input id="image" placeholder="https://..." {...register("image")} />
                     {errors.image && <p className="text-sm text-red-500">{errors.image.message}</p>}
                </div>
            ) : (
                <div className="space-y-2">
                    <Input id="imageUpload" type="file" accept="image/*" onChange={handleImageUpload} />
                    <p className="text-xs text-muted-foreground">The image will be uploaded when you click "Save Post".</p>
                </div>
            )}

            {/* PREVIEW BOX */}
            {previewUrl && (
                <div className="relative mt-4 w-full h-64 rounded-lg overflow-hidden border border-gray-200">
                    <Image 
                        src={previewUrl} 
                        alt="Preview" 
                        fill 
                        className="object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 text-xs rounded">
                        Preview
                    </div>
                </div>
            )}
          </div>
          {/* ----------------------------- */}

          {/* SEO Section (Unchanged) */}
          <div className="pt-6 border-t dark:border-gray-700">
             <div className="grid gap-8 lg:grid-cols-2">
                <div className="space-y-4">
                    <h3 className="text-lg font-medium">SEO Metadata</h3>
                    <div className="space-y-2">
                        <Label htmlFor="focusKeyword" className="text-[#FF8C00]">Focus Keyword (Analysis Only)</Label>
                        <Input id="focusKeyword" {...register("focusKeyword")} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="metaKeywords">Meta Keywords (Tags)</Label>
                        <Input id="metaKeywords" {...register("metaKeywords", { required: true })} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="metaTitle">Meta Title</Label>
                        <Input id="metaTitle" {...register("metaTitle", { required: true })} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="metaDesc">Meta Description</Label>
                        <Textarea id="metaDesc" {...register("metaDesc", { required: true })} />
                    </div>
                </div>
                 <div className="lg:mt-0 mb-4">
                    <Label className="mb-2 block">Real-time Analysis</Label>
                    <SEOAnalyzer
                        content={watchedValues.content || ""}
                        keyword={watchedValues.focusKeyword || ""} 
                        title={watchedValues.title || ""}
                        metaTitle={watchedValues.metaTitle || ""}
                        metaDesc={watchedValues.metaDesc || ""}
                    />
                </div>
             </div>
          </div>
        </div>

        <div className="p-6 bg-gray-50 dark:bg-gray-900 border-t dark:border-gray-700 rounded-b-lg">
          <Button type="submit" disabled={isFormSubmitting} className="bg-[#FF8C00] hover:bg-[#FFB667] w-full md:w-auto">
            {isFormSubmitting ? "Saving Post..." : "Save Post"}
          </Button>
        </div>
      </form>
    </div>
  );
}
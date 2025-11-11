import { BlogTable } from "../../_components/BlogTable"; // BlogTable is still the data fetcher/renderer
import { BlogForm } from "../../_components/BlogForm"; // BlogForm is now the client component
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner"; // We'll assume a Spinner component exists for loading state

// --- Blog Table Loading State ---
// This is used while the table data is being fetched
function BlogTableLoading() {
  return (
    <div className="rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md p-8 text-center">
      { <Spinner size="lg" />}
    </div>
  );
}

// --- Main Server Component Page ---
export default  function ManageBlogsParentPage({ searchParams }: { searchParams: { page?: string } }) {

  return (
    <div className="w-full space-y-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
        Manage Blogs
      </h1>
      
      {/* 1. Client Component (Form) is rendered here */}
      {/* We rely on BlogForm's own 'use client' directive */}
      <BlogForm />
      
      {/* 2. Server Component (Table) is rendered with Suspense */}
      <Suspense fallback={<BlogTableLoading />}>
        {/* BlogTable is now an async Server Component */}
        <BlogTable searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
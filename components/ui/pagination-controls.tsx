// components/ui/pagination-controls.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePathname, useSearchParams } from 'next/navigation'; 
import { cn } from '@/lib/utils';
import React, { useMemo } from 'react';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
}

export function PaginationControls({ currentPage, totalPages }: PaginationControlsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) {
    return null; // Don't show controls if only one page exists
  }
  
  if (!searchParams) {
    return null; 
  }

  // Calculate the stable base search parameters string
  const baseParams = useMemo(() => {
    return searchParams.toString(); 
  }, [searchParams]);

  const createPageUrl = (page: number) => {
    const newParams = new URLSearchParams(baseParams);
    
    newParams.set('page', page.toString());
    return `${pathname}?${newParams.toString()}`;
  };
  
  // Handle previous and next page
  const prevPage = currentPage > 1 ? currentPage - 1 : 1;
  const nextPage = currentPage < totalPages ? currentPage + 1 : totalPages;
  
  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;
  
  return (
    <div className="flex justify-center items-center space-x-2 mt-10">
      
      {/* 1. Previous Button (Disabled if on Page 1) */}
      <Link href={createPageUrl(prevPage)} passHref>
        <Button
          variant="outline"
          size="icon"
          // FIX: Disable if currentPage is 1
          disabled={isPrevDisabled} 
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </Link>

      {/* 2. Current Page Tile (Simplified) */}
      <Button
        variant="default"
        className={cn(
            "w-10 bg-indigo-600 hover:bg-indigo-700 cursor-default"
        )}
      >
        {currentPage}
      </Button>

      {/* 3. Next Button (Disabled if on Last Page) */}
      <Link href={createPageUrl(nextPage)} passHref>
        <Button
          variant="outline"
          size="icon"
          // FIX: Disable if currentPage is totalPages
          disabled={isNextDisabled} 
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}
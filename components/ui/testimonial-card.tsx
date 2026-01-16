"use client"

import * as React from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export interface TestimonialProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  role: string
  company?: string
  testimonial: string
  rating?: number
  image?: string
}

const Testimonial = React.forwardRef<HTMLDivElement, TestimonialProps>(
  ({ name, role, company, testimonial, rating = 5, image, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 md:p-8",
          className
        )}
        {...props}
      >
        <div className="absolute right-6 top-6 text-6xl font-serif text-gray-200 dark:text-gray-800 select-none">
          "
        </div>

        <div className="flex flex-col gap-4 justify-between h-full relative z-10">
          {rating > 0 && (
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  size={16}
                  className={cn(
                    index < rating
                      ? "fill-[#FF8C00] text-[#FF8C00]" // Using your orange brand color
                      : "fill-gray-200 text-gray-200"
                  )}
                />
              ))}
            </div>
          )}

          <p className="text-base text-gray-600 dark:text-gray-300">
            {testimonial}
          </p>

          <div className="flex items-center gap-4 justify-start pt-4">
              <Avatar>
                {image && <AvatarImage src={image} alt={name} />}
                <AvatarFallback>{name[0]}</AvatarFallback>
              </Avatar>

              <div className="flex flex-col">
                <h3 className="font-semibold text-gray-900 dark:text-white">{name}</h3>
                <p className="text-sm text-[#FF8C00] font-medium"> {/* Orange for role */}
                  {role}
                  {company && <span className="text-gray-500 font-normal"> @ {company}</span>}
                </p>
              </div>
          </div>
        </div>
      </div>
    )
  }
)
Testimonial.displayName = "Testimonial"

export { Testimonial }
// components/ui/letter-avatar.tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface LetterAvatarProps {
  name: string; // The author's full name
  size?: number; // Size in pixels, default to 32
  className?: string; // Additional class names for the div
  textClassName?: string; // Additional class names for the text
}

const colors = [
  'bg-red-500', 'bg-pink-500', 'bg-purple-500', 'bg-indigo-500', 'bg-blue-500',
  'bg-cyan-500', 'bg-teal-500', 'bg-green-500', 'bg-lime-500', 'bg-yellow-500'
]; // Tailwind CSS classes for various background colors

export const LetterAvatar: React.FC<LetterAvatarProps> = ({
  name,
  size = 32,
  className,
  textClassName,
}) => {
  const initial = name ? name.charAt(0).toUpperCase() : '';

  // Simple hash function to pick a consistent color for each name
  const getBackgroundColor = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash % colors.length);
    return colors[index];
  };

  const bgColorClass = getBackgroundColor(name);

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full text-white font-semibold flex-shrink-0",
        bgColorClass,
        className
      )}
      style={{ width: size, height: size, minWidth: size, minHeight: size }} // Ensure consistent size
    >
      <span className={cn("text-sm", textClassName)} style={{ fontSize: size * 0.45 }}>
        {initial}
      </span>
    </div>
  );
};
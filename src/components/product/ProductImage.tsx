import React from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from '@/lib/utils';

interface ProductImageProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl'; // Corresponds to Tailwind width/height classes
  aspectRatio?: number; // e.g., 1 for square, 16/9 for wide
  className?: string; // Additional classes for the wrapper
  imgClassName?: string; // Additional classes for the img element
  rounded?: boolean;
}

const sizeClasses = {
  sm: 'w-12 h-12 md:w-16 md:h-16',
  md: 'w-20 h-20 md:w-24 md:h-24',
  lg: 'w-32 h-32 md:w-40 md:h-40',
  xl: 'w-48 h-48 md:w-64 md:h-64',
};

const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  size = 'md',
  aspectRatio = 1, // Default to square
  className,
  imgClassName,
  rounded = true,
}) => {
  console.log("Rendering ProductImage for alt:", alt);

  return (
    <div className={cn(sizeClasses[size], rounded && "overflow-hidden rounded-md", className)}>
      <AspectRatio ratio={aspectRatio} className="bg-gray-100">
        <img
          src={src || '/placeholder.svg'}
          alt={alt}
          className={cn("object-cover w-full h-full", imgClassName)}
          onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          loading="lazy"
        />
      </AspectRatio>
    </div>
  );
};

export default ProductImage;
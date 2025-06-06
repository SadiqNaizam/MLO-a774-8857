import React, { useState, useEffect } from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { cn } from '@/lib/utils'; // For conditional class names

interface ImageItem {
  src: string;
  alt: string;
  id: string | number;
}

interface ProductImageGalleryProps {
  images: ImageItem[];
  mainImageRatio?: number;
  thumbnailSize?: string; // Tailwind classes e.g. 'w-16 h-16'
  enableZoom?: boolean;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
  mainImageRatio = 1, // Default to square
  thumbnailSize = 'w-16 h-16 md:w-20 md:h-20',
  enableZoom = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Reset to first image if images array changes and current index is out of bounds
    if (images.length > 0 && currentIndex >= images.length) {
      setCurrentIndex(0);
    }
  }, [images, currentIndex]);

  console.log("Rendering ProductImageGallery, current index:", currentIndex, "Total images:", images.length);

  if (!images || images.length === 0) {
    return (
      <div className="w-full bg-gray-100 flex items-center justify-center rounded-lg">
        <AspectRatio ratio={mainImageRatio}>
            <div className="flex items-center justify-center h-full text-gray-400">
                No image available
            </div>
        </AspectRatio>
      </div>
    );
  }

  const currentImage = images[currentIndex];

  const handleThumbnailClick = (index: number) => {
    console.log("Thumbnail clicked, setting index to:", index);
    setCurrentIndex(index);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  
  // Placeholder for zoom functionality
  const handleZoom = () => {
    console.log("Zooming image:", currentImage.src);
    // Implement zoom logic here (e.g., open in a modal)
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative group">
        <AspectRatio ratio={mainImageRatio} className="bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={currentImage.src || '/placeholder.svg'}
            alt={currentImage.alt || 'Main product image'}
            className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-105"
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        </AspectRatio>
        {images.length > 1 && (
          <>
            <Button variant="outline" size="icon" onClick={handlePrev} className="absolute left-2 top-1/2 -translate-y-1/2 opacity-50 group-hover:opacity-100 transition-opacity" aria-label="Previous image">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleNext} className="absolute right-2 top-1/2 -translate-y-1/2 opacity-50 group-hover:opacity-100 transition-opacity" aria-label="Next image">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </>
        )}
        {enableZoom && (
             <Button variant="outline" size="icon" onClick={handleZoom} className="absolute top-2 right-2 opacity-50 group-hover:opacity-100 transition-opacity" aria-label="Zoom image">
                <ZoomIn className="h-5 w-5" />
            </Button>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1"> {/* Negative margin for scrollbar visibility */}
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => handleThumbnailClick(index)}
              className={cn(
                "block rounded-md overflow-hidden border-2 transition-all flex-shrink-0",
                thumbnailSize,
                index === currentIndex ? 'border-green-500 shadow-md' : 'border-transparent hover:border-gray-300 hover:opacity-80'
              )}
              aria-label={`View image ${index + 1}`}
            >
              <img
                src={image.src || '/placeholder.svg'}
                alt={image.alt || `Thumbnail ${index + 1}`}
                className="object-cover w-full h-full"
                onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
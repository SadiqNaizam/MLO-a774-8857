import React from 'react';
import { Star, StarHalf } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number; // e.g., 4.5
  maxRating?: number;
  size?: number; // size of the star icons in pixels
  className?: string;
  starColor?: string; // Tailwind color class for filled stars e.g. "text-yellow-400"
  emptyStarColor?: string; // Tailwind color class for empty stars e.g. "text-gray-300"
  showLabel?: boolean; // whether to show text like "4.5 stars"
  reviewCount?: number; // Optionally display review count
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = 20,
  className,
  starColor = "text-yellow-400",
  emptyStarColor = "text-gray-300",
  showLabel = false,
  reviewCount,
}) => {
  console.log("Rendering StarRating for rating:", rating);
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0 && (rating % 1) >= 0.25 && (rating % 1) < 0.75; // Adjust threshold for half star
  const halfStarIsCloserToFull = (rating % 1) >= 0.75; // If closer to full, render as full
  
  let effectiveFullStars = fullStars;
  if (halfStarIsCloserToFull) {
    effectiveFullStars +=1;
  }


  const stars = [];
  for (let i = 1; i <= maxRating; i++) {
    if (i <= effectiveFullStars) {
      stars.push(<Star key={`full-${i}`} fill="currentColor" size={size} className={starColor} />);
    } else if (i === effectiveFullStars + 1 && hasHalfStar && !halfStarIsCloserToFull) {
      stars.push(<StarHalf key={`half-${i}`} fill="currentColor" size={size} className={starColor} />);
    } else {
      stars.push(<Star key={`empty-${i}`} fill="currentColor" size={size} className={emptyStarColor} />);
    }
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {stars}
      {showLabel && (
        <span className="ml-2 text-sm text-gray-600">
          {rating.toFixed(1)} star{rating !== 1 ? 's' : ''}
        </span>
      )}
      {reviewCount !== undefined && (
         <span className="ml-1 text-sm text-gray-500">
            ({reviewCount} review{reviewCount !== 1 ? 's' : ''})
        </span>
      )}
    </div>
  );
};

export default StarRating;
import React from 'react';
import StarRating from './StarRating'; // Assuming StarRating component is in the same directory
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Review {
  id: string | number;
  authorName: string;
  authorAvatarUrl?: string;
  authorInitials?: string;
  rating: number; // 1-5
  title?: string;
  comment: string;
  date: string; // Formatted date string e.g., "January 1, 2024"
  isVerifiedPurchase?: boolean;
  helpfulVotes?: number;
  notHelpfulVotes?: number;
}

interface ReviewCardProps {
  review: Review;
  onHelpfulVote?: (reviewId: string | number, voteType: 'up' | 'down') => void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, onHelpfulVote }) => {
  console.log("Rendering ReviewCard for author:", review.authorName);

  const handleVote = (voteType: 'up' | 'down') => {
    if (onHelpfulVote) {
        onHelpfulVote(review.id, voteType);
    }
    console.log(`Voted ${voteType} for review ${review.id}`);
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
                <Avatar>
                    <AvatarImage src={review.authorAvatarUrl} alt={review.authorName} />
                    <AvatarFallback>{review.authorInitials || review.authorName.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-semibold text-gray-800">{review.authorName}</p>
                    <p className="text-xs text-gray-500">{review.date}</p>
                </div>
            </div>
            <StarRating rating={review.rating} size={16} />
        </div>
        {review.title && <CardTitle className="text-lg mt-2">{review.title}</CardTitle>}
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 text-sm leading-relaxed">{review.comment}</p>
        {review.isVerifiedPurchase && (
            <p className="text-xs text-green-600 mt-2 font-medium">Verified Purchase</p>
        )}
      </CardContent>
      {onHelpfulVote && (
        <CardFooter className="flex items-center justify-between pt-3 text-sm text-gray-500">
            <span>Was this review helpful?</span>
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => handleVote('up')} className="flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4" /> Yes {review.helpfulVotes ? `(${review.helpfulVotes})` : ''}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleVote('down')} className="flex items-center gap-1">
                    <ThumbsDown className="h-4 w-4" /> No {review.notHelpfulVotes ? `(${review.notHelpfulVotes})` : ''}
                </Button>
            </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default ReviewCard;
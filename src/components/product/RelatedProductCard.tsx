import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import StarRating from './StarRating'; // Assuming StarRating component
import { ShoppingCart } from 'lucide-react';

interface RelatedProductCardProps {
  product: {
    id: string | number;
    name: string;
    price: number;
    imageUrl: string;
    productUrl: string; // Link to the product detail page
    rating?: number; // Optional average rating
    oldPrice?: number; // Optional original price for sales
    category?: string;
  };
  onAddToCart?: (productId: string | number) => void;
}

const RelatedProductCard: React.FC<RelatedProductCardProps> = ({ product, onAddToCart }) => {
  console.log("Rendering RelatedProductCard:", product.name);

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation if button is inside Link
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product.id);
      console.log("Added to cart from related product:", product.name);
    }
  };

  return (
    <Card className="w-full overflow-hidden group transition-all duration-300 hover:shadow-xl">
      <Link to={product.productUrl} aria-label={`View details for ${product.name}`}>
        <CardHeader className="p-0">
          <AspectRatio ratio={4 / 3} className="bg-gray-100">
            <img
              src={product.imageUrl || '/placeholder.svg'}
              alt={product.name}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
            />
          </AspectRatio>
          {product.category && (
            <Badge variant="secondary" className="absolute top-2 left-2">
              {product.category}
            </Badge>
          )}
        </CardHeader>
        <CardContent className="p-3 space-y-1.5">
          <h3 className="text-sm font-semibold text-gray-800 truncate group-hover:text-green-600">
            {product.name}
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1.5">
                <span className="text-md font-bold text-green-700">${product.price.toFixed(2)}</span>
                {product.oldPrice && (
                    <span className="text-xs text-gray-500 line-through">${product.oldPrice.toFixed(2)}</span>
                )}
            </div>
            {product.rating !== undefined && <StarRating rating={product.rating} size={14} />}
          </div>
        </CardContent>
      </Link>
      {onAddToCart && (
        <CardFooter className="p-3 pt-0">
          <Button size="sm" className="w-full" onClick={handleAddToCartClick}>
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default RelatedProductCard;
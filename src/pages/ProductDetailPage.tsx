import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import ProductImageGallery from '@/components/product/ProductImageGallery';
import StarRating from '@/components/product/StarRating';
import ColorSwatch from '@/components/product/ColorSwatch';
import QuantityStepper from '@/components/product/QuantityStepper';
import ReviewCard from '@/components/product/ReviewCard';
import RelatedProductCard from '@/components/product/RelatedProductCard';
import Carousel from '@/components/common/Carousel';

import { Button } from '@/components/ui/button';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { toast } from "sonner"; // Using sonner for toast notifications

// Placeholder Data
const placeholderProduct = {
  id: 'p123',
  name: 'Premium Smartwatch Pro X',
  price: 249.99,
  shortDescription: 'Experience the next level of connectivity and health tracking with our most advanced smartwatch yet. Featuring a stunning display and long battery life.',
  images: [
    { id: 'img1', src: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c21hcnR3YXRjaHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60', alt: 'Smartwatch Front View' },
    { id: 'img2', src: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c21hcnR3YXRjaHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60', alt: 'Smartwatch Side View' },
    { id: 'img3', src: 'https://images.unsplash.com/photo-1520895657902-49053a009534?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNtYXJ0d2F0Y2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60', alt: 'Smartwatch on Wrist' },
  ],
  rating: 4.7,
  reviewCount: 152,
  colors: [
    { id: 'black', name: 'Midnight Black', hexColor: '#333333', isAvailable: true },
    { id: 'silver', name: 'Silver Stone', hexColor: '#C0C0C0', isAvailable: true },
    { id: 'gold', name: 'Rose Gold', hexColor: '#B76E79', isAvailable: false },
  ],
  sizes: ['S/M', 'M/L'],
  fullDescription: "<p>The Premium Smartwatch Pro X is engineered for excellence. It boasts a vibrant AMOLED display, advanced health sensors including ECG and SpO2 monitoring, and seamless integration with your smartphone. With up to 7 days of battery life, GPS, and water resistance up to 50 meters, it's your perfect companion for an active lifestyle.</p> <p>Key features: GPS, Heart Rate Monitor, Sleep Tracking, NFC for payments, Customizable Watch Faces.</p>",
  specifications: [
    { name: 'Display', value: '1.4" AMOLED, 454x454 pixels' },
    { name: 'Battery Life', value: 'Up to 7 days' },
    { name: 'Water Resistance', value: '5 ATM (50 meters)' },
    { name: 'Connectivity', value: 'Bluetooth 5.0, Wi-Fi, NFC' },
    { name: 'Sensors', value: 'Accelerometer, Gyro, HRM, SpO2, ECG, Barometer' },
  ],
  reviews: [
    { id: 'r1', authorName: 'Alice Wonderland', authorAvatarUrl: 'https://placeimg.com/40/40/people/1', rating: 5, title: 'Absolutely Love It!', comment: 'This smartwatch exceeded my expectations. The display is gorgeous and the battery life is amazing.', date: 'July 15, 2024', isVerifiedPurchase: true, helpfulVotes: 10 },
    { id: 'r2', authorName: 'Bob The Builder', authorAvatarUrl: 'https://placeimg.com/40/40/people/2', rating: 4, title: 'Great features, a bit pricey', comment: 'Solid performance and tons of features. A bit on the expensive side but worth it if you use all the functionalities.', date: 'July 10, 2024', isVerifiedPurchase: true, helpfulVotes: 5 },
  ],
  relatedProducts: [
    { id: 'rp1', name: 'Wireless Earbuds Pro', price: 129.00, imageUrl: 'https://images.unsplash.com/photo-1606220741028-f2e173fdf535?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZWFyYnVkc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=300&q=60', productUrl: '/products/rp1', rating: 4.6 },
    { id: 'rp2', name: 'Smart Fitness Scale', price: 49.99, imageUrl: 'https://images.unsplash.com/photo-1575029639142-9f456e605421?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c21hcnQlMjBzY2FsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=300&q=60', productUrl: '/products/rp2', rating: 4.3 },
    { id: 'rp3', name: 'Extra Charging Cable', price: 19.99, imageUrl: 'https://images.unsplash.com/photo-1600097400002-89f3d0790584?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hhcmdpbmclMjBjYWJsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=300&q=60', productUrl: '/products/rp3' },
  ]
};

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  console.log('ProductDetailPage loaded for productId:', productId);
  // In a real app, fetch product data based on productId
  const product = placeholderProduct;

  const [selectedColorId, setSelectedColorId] = useState<string | number | null>(product.colors.find(c => c.isAvailable)?.id || null);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [cartItemCount, setCartItemCount] = React.useState(0); // Example cart count for nav
  const [isAddedToCartDialogOpen, setIsAddedToCartDialogOpen] = useState(false);


  const handleAddToCart = () => {
    console.log('Adding to cart:', { productId: product.id, color: selectedColorId, size: selectedSize, quantity });
    toast.success(`${product.name} added to cart!`, {
      description: `Color: ${selectedColorId}, Size: ${selectedSize}, Quantity: ${quantity}`,
      action: {
        label: "View Cart",
        onClick: () => { /* navigate to cart */ console.log("Navigate to cart")},
      },
    });
    setCartItemCount(prev => prev + quantity);
    setIsAddedToCartDialogOpen(true); // Show dialog (optional, if toast is not enough)
  };
  
  const handleWishlist = () => {
    console.log('Adding to wishlist:', { productId: product.id });
    toast.info(`${product.name} added to wishlist!`);
  };

  if (!product) {
    return <div>Loading product...</div>; // Or a NotFound component
  }

  const relatedProductSlides = product.relatedProducts.map(p => <RelatedProductCard key={p.id} product={p} onAddToCart={() => console.log('Add related to cart:', p.id)} />);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavigationMenu brandName="ElectroMart" cartItemCount={cartItemCount} />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/products">Products</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>{product.name}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column: Product Images */}
          <section aria-labelledby="product-images">
             <h2 id="product-images" className="sr-only">Product Images</h2>
            <ProductImageGallery images={product.images} mainImageRatio={4/3} />
          </section>

          {/* Right Column: Product Details & Actions */}
          <section aria-labelledby="product-details" className="space-y-6">
            <h1 id="product-details" className="text-3xl lg:text-4xl font-bold text-gray-800">{product.name}</h1>
            <div className="flex items-center space-x-2">
              <StarRating rating={product.rating} reviewCount={product.reviewCount} showLabel />
            </div>
            <p className="text-3xl font-semibold text-green-600">${product.price.toFixed(2)}</p>
            <p className="text-gray-600 leading-relaxed">{product.shortDescription}</p>
            
            <form className="space-y-6">
              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <Label htmlFor="color-swatch" className="text-sm font-medium text-gray-700 mb-2 block">Color: <span className="font-normal">{product.colors.find(c=>c.id === selectedColorId)?.name}</span></Label>
                  <ColorSwatch
                    options={product.colors}
                    selectedColorId={selectedColorId}
                    onColorSelect={setSelectedColorId}
                    swatchSize="md"
                  />
                </div>
              )}

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <Label htmlFor="size-toggle" className="text-sm font-medium text-gray-700 mb-2 block">Size: <span className="font-normal">{selectedSize}</span></Label>
                  <ToggleGroup
                    type="single"
                    value={selectedSize}
                    onValueChange={(value) => { if (value) setSelectedSize(value); }}
                    aria-label="Select size"
                    id="size-toggle"
                    className="justify-start"
                  >
                    {product.sizes.map(size => (
                      <ToggleGroupItem key={size} value={size} aria-label={`Size ${size}`} className="px-4 py-2">
                        {size}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </div>
              )}

              {/* Quantity Stepper */}
              <div>
                <Label htmlFor="quantity-stepper" className="text-sm font-medium text-gray-700 mb-2 block">Quantity</Label>
                <QuantityStepper initialValue={1} minValue={1} maxValue={10} onChange={setQuantity} />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button type="button" size="lg" className="flex-1 bg-green-600 hover:bg-green-700" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
                <Button type="button" size="lg" variant="outline" className="flex-1" onClick={handleWishlist}>
                  Add to Wishlist
                </Button>
              </div>
            </form>
          </section>
        </div>

        {/* Tabs: Description, Specs, Reviews */}
        <section className="mt-12 lg:mt-16" aria-labelledby="product-information-tabs">
          <h2 id="product-information-tabs" className="sr-only">Product Information</h2>
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="description">Full Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="prose max-w-none p-4 bg-white rounded-md shadow">
              <div dangerouslySetInnerHTML={{ __html: product.fullDescription }} />
            </TabsContent>
            <TabsContent value="specifications" className="p-4 bg-white rounded-md shadow">
              <ul className="space-y-2">
                {product.specifications.map(spec => (
                  <li key={spec.name} className="flex justify-between border-b pb-2">
                    <span className="font-medium text-gray-700">{spec.name}:</span>
                    <span className="text-gray-600">{spec.value}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="reviews" className="p-4 bg-white rounded-md shadow">
              <div className="space-y-6">
                {product.reviews.map(review => (
                  <ReviewCard key={review.id} review={review} onHelpfulVote={(id, type) => console.log(`Voted ${type} on review ${id}`)} />
                ))}
                {product.reviews.length === 0 && <p>No reviews yet for this product.</p>}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Related Products Section */}
        <section className="mt-12 lg:mt-16" aria-labelledby="related-products-heading">
          <Separator className="my-8" />
          <h2 id="related-products-heading" className="text-2xl font-bold text-gray-800 mb-6">You Might Also Like</h2>
          {relatedProductSlides.length > 0 ? (
            <Carousel slides={relatedProductSlides} options={{ slidesToScroll: 'auto', containScroll: 'trimSnaps' }} slideClassName="flex-[0_0_90%] sm:flex-[0_0_45%] md:flex-[0_0_30%] lg:flex-[0_0_23%] p-2" />
          ) : (
            <p>No related products to show.</p>
          )}
        </section>
      </main>

      <Dialog open={isAddedToCartDialogOpen} onOpenChange={setIsAddedToCartDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Added to Cart!</DialogTitle>
            <DialogDescription>
              {product.name} (Qty: {quantity}) has been successfully added to your shopping cart.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start gap-2">
            <Button type="button" variant="secondary" onClick={() => setIsAddedToCartDialogOpen(false)}>
              Continue Shopping
            </Button>
            <Button type="button" asChild onClick={() => setIsAddedToCartDialogOpen(false)}>
                <Link to="/cart">View Cart & Checkout</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer brandName="ElectroMart" />
    </div>
  );
};

export default ProductDetailPage;
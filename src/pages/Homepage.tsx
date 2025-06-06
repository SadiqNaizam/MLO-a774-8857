import React from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import Carousel from '@/components/common/Carousel';
import RelatedProductCard from '@/components/product/RelatedProductCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const placeholderHeroSlides = [
  <div key="slide1" className="relative h-[400px] md:h-[500px] lg:h-[600px] bg-gray-200">
    <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1200&q=60" alt="Hero Promotion 1" className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center p-4">
      <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Latest Tech Gadgets</h2>
      <p className="text-lg md:text-xl text-gray-200 mb-6">Discover innovation that inspires.</p>
      <Button size="lg" asChild>
        <Link to="/products">Shop Now</Link>
      </Button>
    </div>
  </div>,
  <div key="slide2" className="relative h-[400px] md:h-[500px] lg:h-[600px] bg-gray-200">
    <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1200&q=60" alt="Hero Promotion 2" className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center p-4">
      <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Exclusive Deals This Week</h2>
      <p className="text-lg md:text-xl text-gray-200 mb-6">Don't miss out on limited-time offers.</p>
      <Button size="lg" variant="secondary" asChild>
         <Link to="/products?sort=sale">View Offers</Link>
      </Button>
    </div>
  </div>,
];

const placeholderFeaturedProducts = [
  { id: 'fp1', name: 'Wireless Headphones', price: 149.99, imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=300&q=60', productUrl: '/products/fp1', category: 'Audio', rating: 4.5 },
  { id: 'fp2', name: 'Smart Watch Series X', price: 299.00, imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=300&q=60', productUrl: '/products/fp2', category: 'Wearables', rating: 4.8, oldPrice: 329.00 },
  { id: 'fp3', name: 'Portable Bluetooth Speaker', price: 79.50, imageUrl: 'https://images.unsplash.com/photo-1542496658-606a756a2536?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=300&q=60', productUrl: '/products/fp3', category: 'Audio', rating: 4.2 },
  { id: 'fp4', name: 'Ergonomic Mouse', price: 45.00, imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=300&q=60', productUrl: '/products/fp4', category: 'Accessories', rating: 4.0 },
];

const Homepage = () => {
  console.log('Homepage loaded');
  const [cartItemCount, setCartItemCount] = React.useState(0); // Example cart count

  const handleSearch = (query: string) => {
    console.log('Homepage search:', query);
    // Navigate to product listing page with search query
    // Example: navigate(`/products?search=${query}`);
  };

  const handleAddToCart = (productId: string | number) => {
    console.log(`Adding product ${productId} to cart from Homepage`);
    setCartItemCount(prev => prev + 1);
    // Add actual add to cart logic here
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavigationMenu brandName="ElectroMart" onSearch={handleSearch} cartItemCount={cartItemCount} />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="mb-12">
          <Carousel slides={placeholderHeroSlides} options={{ loop: true }} autoplayOptions={{ delay: 5000 }} />
        </section>

        {/* Featured Products Section */}
        <section className="py-12 px-4 container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {placeholderFeaturedProducts.map(product => (
              <RelatedProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
            ))}
          </div>
        </section>

        {/* New Arrivals Section (Example with generic Cards) */}
        <section className="py-12 px-4 bg-white">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">New Arrivals</h2>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { id: 'na1', title: 'Latest Smartphone', description: 'Experience the future with our new flagship phone.', imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGhvbmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60', link: '/products/na1' },
                        { id: 'na2', title: 'Ultra HD Monitor', description: 'Immersive visuals for work and play.', imageUrl: 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vbml0b3J8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60', link: '/products/na2' },
                        { id: 'na3', title: 'Gaming Laptop', description: 'Power up your gaming experience.', imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGFwdG9wfGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60', link: '/products/na3' },
                    ].map(item => (
                        <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                             <Link to={item.link}>
                                <CardHeader className="p-0">
                                    <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover"/>
                                </CardHeader>
                                <CardContent className="p-4">
                                    <CardTitle className="text-xl mb-2">{item.title}</CardTitle>
                                    <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                                    <Button variant="outline" className="w-full">View Details</Button>
                                </CardContent>
                            </Link>
                        </Card>
                    ))}
                 </div>
            </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 bg-green-600 text-white">
          <div className="container mx-auto text-center px-4">
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-lg mb-8">Sign up for our newsletter to get exclusive deals and updates.</p>
            <form className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto">
              <input type="email" placeholder="Enter your email" className="px-4 py-2 rounded-md text-gray-800 sm:flex-grow" />
              <Button type="submit" size="lg" variant="secondary">Subscribe</Button>
            </form>
          </div>
        </section>
      </main>
      <Footer brandName="ElectroMart" />
    </div>
  );
};

export default Homepage;
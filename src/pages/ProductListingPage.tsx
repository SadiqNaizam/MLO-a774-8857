import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import RelatedProductCard from '@/components/product/RelatedProductCard';

import { Button } from '@/components/ui/button';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Input } from '@/components/ui/input'; // For search within page if needed
import { Filter, SortAsc, SlidersHorizontal } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';


const placeholderProducts = Array.from({ length: 12 }, (_, i) => ({
  id: `plp${i + 1}`,
  name: `Awesome Gadget ${i + 1}`,
  price: 50 + Math.random() * 250,
  imageUrl: `https://images.unsplash.com/photo-1587033229854-46f55080f88d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=300&q=60&h=200&c=${i}`,
  productUrl: `/products/plp${i + 1}`,
  category: (i % 3 === 0) ? 'Electronics' : (i % 3 === 1) ? 'Accessories' : 'Wearables',
  rating: 3.5 + Math.random() * 1.5,
}));

const categories = ['All', 'Electronics', 'Accessories', 'Wearables', 'Audio'];
const brands = ['BrandA', 'BrandB', 'BrandC', 'BrandD'];
const sortOptions = [
  { value: 'relevant', label: 'Relevance' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating-desc', label: 'Rating: High to Low' },
  { value: 'newest', label: 'Newest Arrivals' },
];

const ProductListingPage = () => {
  console.log('ProductListingPage loaded');
  const [searchParams, setSearchParams] = useSearchParams();
  const [cartItemCount, setCartItemCount] = React.useState(0); // Example cart count
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  // Filters state
  const [selectedCategories, setSelectedCategories] = useState<string[]>(searchParams.getAll('category') || ['All']);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedBrand, setSelectedBrand] = useState<string | undefined>(searchParams.get('brand') || undefined);
  const [sortBy, setSortBy] = useState<string>(searchParams.get('sort') || 'relevant');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
    // Update searchParams
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    // Update searchParams
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    // Update searchParams
  };
  
  const totalPages = Math.ceil(placeholderProducts.length / productsPerPage);
  const currentProducts = placeholderProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0,0);
  }

  const FilterContent = () => (
    <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-700">Categories</h3>
          <div className="space-y-2">
            {categories.map(category => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox 
                  id={`cat-${category}`} 
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => handleCategoryChange(category)}
                />
                <Label htmlFor={`cat-${category}`} className="text-gray-600 cursor-pointer">{category}</Label>
              </div>
            ))}
          </div>
        </div>
        <Separator />
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-700">Price Range</h3>
          <Slider
            defaultValue={[0, 500]}
            max={1000}
            step={10}
            value={priceRange}
            onValueChange={(value: [number, number]) => setPriceRange(value)}
            className="my-4"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
        <Separator />
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-700">Brand</h3>
          <RadioGroup value={selectedBrand} onValueChange={handleBrandChange} className="space-y-1">
            {brands.map(brand => (
              <div key={brand} className="flex items-center space-x-2">
                <RadioGroupItem value={brand} id={`brand-${brand}`} />
                <Label htmlFor={`brand-${brand}`} className="text-gray-600 cursor-pointer">{brand}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <Button className="w-full mt-4" onClick={() => setIsMobileFiltersOpen(false)}>Apply Filters</Button>
      </div>
  );


  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavigationMenu brandName="ElectroMart" cartItemCount={cartItemCount} />
      
      <div className="container mx-auto px-4 py-6 flex-grow">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>Products</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Desktop Sidebar */}
          <Sidebar title="Filters" className="hidden md:block w-1/4 min-w-[250px] bg-white p-6 rounded-lg shadow">
            <FilterContent />
          </Sidebar>

          {/* Main Content Area */}
          <main className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 p-4 bg-white rounded-lg shadow">
              <h1 className="text-2xl font-bold text-gray-800 mb-2 sm:mb-0">
                {searchParams.get('category') || 'All Products'}
              </h1>
              <div className="flex items-center gap-4">
                {/* Mobile Filter Trigger */}
                <Sheet open={isMobileFiltersOpen} onOpenChange={setIsMobileFiltersOpen}>
                    <SheetTrigger asChild>
                        <Button variant="outline" className="md:hidden flex items-center gap-2">
                            <SlidersHorizontal className="h-4 w-4" /> Filters
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px] sm:w-[340px] p-0">
                        <SheetHeader className="p-4 border-b">
                            <SheetTitle>Filter Products</SheetTitle>
                        </SheetHeader>
                        <div className="p-4 overflow-y-auto h-[calc(100vh-60px)]">
                             <FilterContent />
                        </div>
                    </SheetContent>
                </Sheet>
                <Select value={sortBy} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-auto sm:w-[180px]">
                    <SortAsc className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map(opt => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {currentProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentProducts.map(product => (
                  <RelatedProductCard key={product.id} product={product} onAddToCart={(id) => { console.log(`Added ${id} to cart`); setCartItemCount(prev => prev + 1); }} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Products Found</h2>
                <p className="text-gray-500">Try adjusting your filters or searching for something else.</p>
              </div>
            )}

            {totalPages > 1 && (
              <Pagination className="mt-10">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); if(currentPage > 1) handlePageChange(currentPage - 1)}} disabled={currentPage === 1} />
                  </PaginationItem>
                  {[...Array(totalPages)].map((_, i) => {
                     const pageNum = i + 1;
                     // Basic pagination display logic (can be improved for many pages)
                     if (totalPages <= 5 || pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage -1 && pageNum <= currentPage + 1)) {
                        return (
                            <PaginationItem key={pageNum}>
                                <PaginationLink href="#" onClick={(e) => { e.preventDefault(); handlePageChange(pageNum)}} isActive={currentPage === pageNum}>
                                {pageNum}
                                </PaginationLink>
                            </PaginationItem>
                        );
                     } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                        return <PaginationEllipsis key={`ellipsis-${pageNum}`} />;
                     }
                     return null;
                  })}
                  <PaginationItem>
                    <PaginationNext href="#" onClick={(e) => { e.preventDefault(); if(currentPage < totalPages) handlePageChange(currentPage + 1)}} disabled={currentPage === totalPages}/>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </main>
        </div>
      </div>
      <Footer brandName="ElectroMart" />
    </div>
  );
};

export default ProductListingPage;
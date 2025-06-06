import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import ProductImage from '@/components/product/ProductImage';
import QuantityStepper from '@/components/product/QuantityStepper';

import { Button } from '@/components/ui/button';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, ShoppingBag } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  productUrl: string;
  variantInfo?: string; // e.g., "Color: Black, Size: M"
}

const initialCartItems: CartItem[] = [
  { id: 'cart1', name: 'Premium Smartwatch Pro X', price: 249.99, quantity: 1, imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c21hcnR3YXRjaHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=100&q=60', productUrl: '/products/p123', variantInfo: 'Color: Midnight Black, Size: M/L' },
  { id: 'cart2', name: 'Wireless Headphones', price: 149.99, quantity: 2, imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=100&q=60', productUrl: '/products/fp1' },
];

const CartPage = () => {
  console.log('CartPage loaded');
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    setCartItems(items => items.map(item => item.id === itemId ? { ...item, quantity: newQuantity } : item));
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems(items => items.filter(item => item.id !== itemId));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const estimatedShipping = cartItems.length > 0 ? 5.00 : 0; // Example shipping
  const total = subtotal + estimatedShipping;
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);


  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavigationMenu brandName="ElectroMart" cartItemCount={cartItemCount} />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>Shopping Cart</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12 bg-white p-8 rounded-lg shadow">
            <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your Cart is Empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
            <Button asChild size="lg">
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items Table */}
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Cart Items ({cartItemCount})</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px] hidden sm:table-cell">Product</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-center">Quantity</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-center">Remove</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cartItems.map(item => (
                    <TableRow key={item.id}>
                      <TableCell className="hidden sm:table-cell">
                        <ProductImage src={item.imageUrl} alt={item.name} size="sm" rounded />
                      </TableCell>
                      <TableCell>
                        <Link to={item.productUrl} className="font-medium text-gray-800 hover:text-green-600">{item.name}</Link>
                        {item.variantInfo && <p className="text-xs text-gray-500">{item.variantInfo}</p>}
                         <div className="sm:hidden mt-1"> {/* Image for mobile */}
                            <ProductImage src={item.imageUrl} alt={item.name} size="sm" rounded />
                        </div>
                      </TableCell>
                      <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center">
                           <QuantityStepper
                            initialValue={item.quantity}
                            minValue={1}
                            maxValue={10} // Or from product stock
                            onChange={(newQuantity) => handleQuantityChange(item.id, newQuantity)}
                            size="sm"
                            />
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">${(item.price * item.quantity).toFixed(2)}</TableCell>
                      <TableCell className="text-center">
                        <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.id)} aria-label="Remove item">
                          <Trash2 className="h-5 w-5 text-red-500 hover:text-red-700" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Order Summary Card */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24"> {/* Sticky for desktop */}
                <CardHeader>
                  <CardTitle className="text-xl">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Estimated Shipping</span>
                    <span>${estimatedShipping.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg text-gray-800">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                  <Button size="lg" className="w-full" asChild>
                    <Link to="/checkout">Proceed to Checkout</Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/products">Continue Shopping</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </main>
      <Footer brandName="ElectroMart" />
    </div>
  );
};

export default CartPage;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';

import { Button } from '@/components/ui/button';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

const shippingAddressSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  addressLine1: z.string().min(5, "Address is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State/Province is required"),
  zipCode: z.string().min(5, "Zip/Postal code is required"),
  country: z.string().min(2, "Country is required"),
  phone: z.string().optional(),
});

const paymentDetailsSchema = z.object({
    cardNumber: z.string().length(16, "Card number must be 16 digits").regex(/^\d+$/, "Invalid card number"),
    expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry date (MM/YY)"),
    cvv: z.string().length(3, "CVV must be 3 digits").regex(/^\d+$/, "Invalid CVV"),
    cardHolderName: z.string().min(2, "Card holder name is required"),
});

type ShippingAddressForm = z.infer<typeof shippingAddressSchema>;
type PaymentDetailsForm = z.infer<typeof paymentDetailsSchema>;

// Placeholder order summary details
const orderSummaryItems = [
  { id: 'os1', name: 'Premium Smartwatch Pro X', quantity: 1, price: 249.99, imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c21hcnR3YXRjaHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=50&q=60' },
  { id: 'os2', name: 'Wireless Headphones', quantity: 2, price: 149.99, imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=50&q=60' },
];
const subtotal = orderSummaryItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
const shippingCost = 5.00;
const totalAmount = subtotal + shippingCost;

const CheckoutPage = () => {
  console.log('CheckoutPage loaded');
  const navigate = useNavigate();
  const [cartItemCount] = React.useState(orderSummaryItems.reduce((sum, item) => sum + item.quantity, 0)); // Based on summary
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('credit-card');

  const { register: registerShipping, handleSubmit: handleShippingSubmit, formState: { errors: shippingErrors } } = useForm<ShippingAddressForm>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: { country: 'USA'} // Default country
  });
  const { register: registerPayment, handleSubmit: handlePaymentSubmit, formState: { errors: paymentErrors } } = useForm<PaymentDetailsForm>({
    resolver: zodResolver(paymentDetailsSchema)
  });

  const onPlaceOrder: SubmitHandler<PaymentDetailsForm> = async (paymentData) => {
    // First, ensure shipping data is also valid (ideally combined form or stepped validation)
    handleShippingSubmit(async (shippingData) => {
      console.log('Placing order with:', { shippingData, paymentData, shippingMethod, paymentMethod });
      toast.success("Order Placed Successfully!", {
        description: "Thank you for your purchase. Your order confirmation will be sent to your email.",
      });
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate('/order-confirmation/ORD12345'); // Navigate to a confirmation page (needs to be created)
    }, (errors) => {
        console.error("Shipping form errors:", errors);
        toast.error("Please correct the errors in the shipping address.");
    })(); // Trigger shipping form validation
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavigationMenu brandName="ElectroMart" cartItemCount={cartItemCount} />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/cart">Cart</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>Checkout</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Checkout Form (Shipping & Payment) */}
          <form onSubmit={handlePaymentSubmit(onPlaceOrder)} className="lg:col-span-2 space-y-8">
            {/* Shipping Address Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Shipping Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" {...registerShipping("fullName")} />
                    {shippingErrors.fullName && <p className="text-red-500 text-sm mt-1">{shippingErrors.fullName.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" {...registerShipping("email")} />
                    {shippingErrors.email && <p className="text-red-500 text-sm mt-1">{shippingErrors.email.message}</p>}
                  </div>
                </div>
                <div>
                  <Label htmlFor="addressLine1">Address Line 1</Label>
                  <Input id="addressLine1" {...registerShipping("addressLine1")} />
                  {shippingErrors.addressLine1 && <p className="text-red-500 text-sm mt-1">{shippingErrors.addressLine1.message}</p>}
                </div>
                <div>
                  <Label htmlFor="addressLine2">Address Line 2 (Optional)</Label>
                  <Input id="addressLine2" {...registerShipping("addressLine2")} />
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" {...registerShipping("city")} />
                    {shippingErrors.city && <p className="text-red-500 text-sm mt-1">{shippingErrors.city.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="state">State / Province</Label>
                    <Input id="state" {...registerShipping("state")} />
                    {shippingErrors.state && <p className="text-red-500 text-sm mt-1">{shippingErrors.state.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="zipCode">Zip / Postal Code</Label>
                    <Input id="zipCode" {...registerShipping("zipCode")} />
                    {shippingErrors.zipCode && <p className="text-red-500 text-sm mt-1">{shippingErrors.zipCode.message}</p>}
                  </div>
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Select defaultValue="USA" onValueChange={(value) => { /* handle country change if needed */ }}>
                    <SelectTrigger id="country" {...registerShipping("country")}>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USA">United States</SelectItem>
                      <SelectItem value="CAN">Canada</SelectItem>
                      <SelectItem value="GBR">United Kingdom</SelectItem>
                    </SelectContent>
                  </Select>
                   {shippingErrors.country && <p className="text-red-500 text-sm mt-1">{shippingErrors.country.message}</p>}
                </div>
                 <div>
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <Input id="phone" type="tel" {...registerShipping("phone")} />
                  </div>
              </CardContent>
            </Card>

            {/* Shipping Method Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Shipping Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={shippingMethod} onValueChange={setShippingMethod} className="space-y-2">
                  <div className="flex items-center space-x-2 p-3 border rounded-md hover:border-green-500 cursor-pointer has-[:checked]:border-green-600 has-[:checked]:bg-green-50">
                    <RadioGroupItem value="standard" id="standard-shipping" />
                    <Label htmlFor="standard-shipping" className="flex-1 cursor-pointer">Standard Shipping (5-7 days) - $5.00</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-md hover:border-green-500 cursor-pointer has-[:checked]:border-green-600 has-[:checked]:bg-green-50">
                    <RadioGroupItem value="express" id="express-shipping" />
                    <Label htmlFor="express-shipping" className="flex-1 cursor-pointer">Express Shipping (1-3 days) - $15.00</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Payment Details Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Payment Details</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Payment Method Selection (Could be tabs or radio group) */}
                <RadioGroup defaultValue="credit-card" className="mb-4 flex gap-4" onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="credit-card" id="credit-card" />
                        <Label htmlFor="credit-card">Credit Card</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal">PayPal</Label>
                    </div>
                </RadioGroup>
                
                {paymentMethod === 'credit-card' && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardHolderName">Cardholder Name</Label>
                      <Input id="cardHolderName" {...registerPayment("cardHolderName")} />
                      {paymentErrors.cardHolderName && <p className="text-red-500 text-sm mt-1">{paymentErrors.cardHolderName.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="•••• •••• •••• ••••" {...registerPayment("cardNumber")} />
                      {paymentErrors.cardNumber && <p className="text-red-500 text-sm mt-1">{paymentErrors.cardNumber.message}</p>}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input id="expiryDate" placeholder="MM/YY" {...registerPayment("expiryDate")} />
                        {paymentErrors.expiryDate && <p className="text-red-500 text-sm mt-1">{paymentErrors.expiryDate.message}</p>}
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="•••" {...registerPayment("cvv")} />
                        {paymentErrors.cvv && <p className="text-red-500 text-sm mt-1">{paymentErrors.cvv.message}</p>}
                      </div>
                    </div>
                  </div>
                )}
                {paymentMethod === 'paypal' && (
                    <div className="p-4 border rounded-md bg-blue-50 text-blue-700">
                        <p>You will be redirected to PayPal to complete your payment securely.</p>
                        {/* PayPal button or redirect logic would go here */}
                    </div>
                )}
              </CardContent>
            </Card>
            <Button type="submit" size="lg" className="w-full">Place Order & Pay ${totalAmount.toFixed(2)}</Button>
          </form>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible defaultValue="item-1" className="w-full mb-4">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-base">Show Items ({orderSummaryItems.length})</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-3 py-2">
                        {orderSummaryItems.map(item => (
                          <li key={item.id} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                               <img src={item.imageUrl} alt={item.name} className="w-10 h-10 object-cover rounded"/>
                               <div>
                                   <span>{item.name} (x{item.quantity})</span>
                                   <p className="text-xs text-gray-500">${item.price.toFixed(2)} each</p>
                               </div>
                            </div>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>${shippingCost.toFixed(2)}</span>
                  </div>
                  {/* Add Discounts/Taxes here if applicable */}
                  <Separator className="my-2" />
                  <div className="flex justify-between font-semibold text-lg text-gray-800">
                    <span>Total</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer brandName="ElectroMart" />
    </div>
  );
};

export default CheckoutPage;
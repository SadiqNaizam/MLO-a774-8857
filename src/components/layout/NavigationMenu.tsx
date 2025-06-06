import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
}

interface NavigationMenuProps {
  navItems?: NavItem[];
  brandName?: string;
  onSearch?: (query: string) => void;
  cartItemCount?: number;
}

const defaultNavItems: NavItem[] = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

const NavigationMenu: React.FC<NavigationMenuProps> = ({
  navItems = defaultNavItems,
  brandName = 'StoreLogo',
  onSearch,
  cartItemCount = 0,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  console.log("Rendering NavigationMenu");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
    console.log('Search submitted:', searchQuery);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Brand/Logo */}
          <Link to="/" className="text-2xl font-bold text-gray-800">
            {brandName}
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-gray-600 hover:text-green-600 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop Search, Cart, Account */}
          <div className="hidden md:flex items-center space-x-4">
            {onSearch && (
              <form onSubmit={handleSearchSubmit} className="relative">
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pr-10 pl-4 py-2 rounded-full border-gray-300 focus:border-green-500 focus:ring-green-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  type="submit"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full w-10 text-gray-500 hover:text-green-600"
                  aria-label="Search"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </form>
            )}
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative" aria-label="Shopping Cart">
                <ShoppingCart className="h-6 w-6 text-gray-600 hover:text-green-600" />
                {cartItemCount > 0 && (
                  <Badge variant="destructive" className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>
            <Link to="/account">
              <Button variant="ghost" size="icon" aria-label="User Account">
                <User className="h-6 w-6 text-gray-600 hover:text-green-600" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-16 left-0 right-0 z-40">
          <div className="px-4 py-2 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-green-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {onSearch && (
              <form onSubmit={handleSearchSubmit} className="p-2">
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
            )}
             <div className="flex justify-around items-center pt-2 border-t mt-2">
                <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" size="sm" className="relative flex items-center" aria-label="Shopping Cart">
                        <ShoppingCart className="h-5 w-5 mr-1" /> Cart
                        {cartItemCount > 0 && (
                        <Badge variant="destructive" className="absolute -top-1 -right-1 px-1 py-0 text-xs">
                            {cartItemCount}
                        </Badge>
                        )}
                    </Button>
                </Link>
                <Link to="/account" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" size="sm" className="flex items-center" aria-label="User Account">
                        <User className="h-5 w-5 mr-1" /> Account
                    </Button>
                </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavigationMenu;
'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, Menu, X, Grid3X3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/CartContext';
import CartDrawer from '@/components/cart/CartDrawer';
import CategoriesSheet from '@/components/navigation/CategoriesSheet';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useQueryState, parseAsString } from 'nuqs';

function HeaderSearch() {
  const [searchQuery, setSearchQuery] = useQueryState('search', parseAsString.withDefault(''));

  return (
    <div className="relative hidden md:flex items-center">
      <Search className="absolute left-3 w-4 h-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-9 pr-4 w-64 lg:w-80"
      />
    </div>
  );
}

function MobileSearch() {
  const [searchQuery, setSearchQuery] = useQueryState('search', parseAsString.withDefault(''));

  return (
    <div className="relative flex items-center">
      <Search className="absolute left-3 w-4 h-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-9 pr-4 w-full"
      />
    </div>
  );
}

const Header = () => {
  const { itemCount, setIsOpen: setCartOpen } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="px-4 sm:px-6 lg:px-8">
          {/* Top bar
          <div className="hidden md:flex justify-between items-center py-2 text-sm text-muted-foreground border-b border-border">
            <div>Free shipping on orders over $500</div>
            <div className="flex gap-4">
              <Link href="/support" className="hover:text-foreground transition-colors">
                Support
              </Link>
              <Link href="/contact" className="hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>
          </div> */}

          {/* Main header */}
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 cursor-pointer">
              <Image src="/exsurion-logo.svg" alt="Logo" width={100} height={100} className='h-16 w-full object-cover' />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8 ml-8">
              <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/careers" className="text-sm font-medium hover:text-primary transition-colors">
                Careers
              </Link>
              <Link href="/team" className="text-sm font-medium hover:text-primary transition-colors">
                Team
              </Link>
              <Link href="/delivery" className="text-sm font-medium hover:text-primary transition-colors">
                Delivery
              </Link>
              <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
                Contact
              </Link>
            </nav>

            {/* Search - Desktop */}
            <Suspense fallback={<div className="hidden md:block w-64 lg:w-80" />}>
              <HeaderSearch />
            </Suspense>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              {/* Categories button (mobile only) */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="md:hidden"
                onClick={() => setIsCategoriesOpen(true)}
              >
                <Grid3X3 className="w-5 h-5" />
              </Button>

              {/* Mobile search - will be shown in mobile menu */}

              {/* Cart */}
              {/* <Button
                variant="ghost"
                size="sm"
                onClick={() => setCartOpen(true)}
                className="relative"
              >
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && ( 
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                    {itemCount}
                  </Badge>
                )}
              </Button> */}

              {/* Mobile menu toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden overflow-hidden border-t border-border"
              >
                {/* Mobile Search */}
                <div className="px-4 py-2 border-b border-border">
                  <Suspense fallback={<div className="h-10 w-full bg-muted animate-pulse rounded" />}>
                    <MobileSearch />
                  </Suspense>
                </div>
                <nav className="flex flex-col py-4 space-y-4">
                  <Link 
                    href="/about" 
                    className="px-4 py-2 text-base font-medium hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    About
                  </Link>
                  <Link 
                    href="/careers" 
                    className="px-4 py-2 text-base font-medium hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Careers
                  </Link>
                  <Link 
                    href="/team" 
                    className="px-4 py-2 text-base font-medium hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Team
                  </Link>
                  <Link 
                    href="/delivery" 
                    className="px-4 py-2 text-base font-medium hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Delivery
                  </Link>
                  <Link 
                    href="/contact" 
                    className="px-4 py-2 text-base font-medium hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact
                  </Link>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <CartDrawer />
      <CategoriesSheet isOpen={isCategoriesOpen} onClose={() => setIsCategoriesOpen(false)} />
    </>
  );
};

export default Header;
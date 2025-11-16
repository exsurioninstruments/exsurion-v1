'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCategories } from '@/lib/sanity/hooks';
import { transformCategory, getCategoryName, getSubcategoryName, getCategoryUrl, getSubcategoryUrl } from '@/lib/sanity/utils';

const CategoriesNavigation = () => {
  const router = useRouter();
  const { data: categories, loading, error } = useCategories();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Transform categories for backward compatibility
  const transformedCategories = Array.isArray(categories) ? categories.map(transformCategory) : [];

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const hasScroll = scrollWidth > clientWidth;
      setCanScrollLeft(hasScroll && scrollLeft > 0);
      setCanScrollRight(hasScroll && scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  const handleMouseEnter = (categoryId: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setOpenDropdown(categoryId);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const handleCategoryClick = (category: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const categorySlug = category.slug?.current || category.id || category._id;
    router.push(`/products?categories=${categorySlug}`);
  };

  const handleSubcategoryClick = (category: any, subcategory: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const categorySlug = category.slug?.current || category.id || category._id;
    const subcategorySlug = subcategory.slug?.current || subcategory.id || subcategory._id;
    router.push(`/products?categories=${categorySlug}&subcategories=${subcategorySlug}`);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      // Check scroll buttons on mount and when categories change
      const checkScroll = () => {
        setTimeout(() => {
          checkScrollButtons();
        }, 100);
      };
      
      checkScroll();
      container.addEventListener('scroll', checkScrollButtons);
      window.addEventListener('resize', checkScroll);
      
      return () => {
        container.removeEventListener('scroll', checkScrollButtons);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, [categories, transformedCategories.length]);

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="hidden md:block bg-background border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center py-3 overflow-visible">
          {/* Left scroll button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollLeft}
            className={`absolute left-0 z-20 h-full w-10 p-0 bg-gradient-to-r from-background via-background/95 to-transparent hover:from-background hover:via-background/98 ${
              canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'
            } transition-opacity flex items-center justify-center`}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          {/* Categories container */}
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-x-auto overflow-y-visible mx-10 hide-scrollbar"
            style={{ 
              WebkitOverflowScrolling: 'touch'
            }}
            onScroll={checkScrollButtons}
          >
            <div className="flex items-center space-x-8 min-w-max px-4">
              {loading ? (
                <div className="flex items-center space-x-8">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-8 w-24 bg-muted animate-pulse rounded" />
                  ))}
                </div>
              ) : error ? (
                <div className="text-sm text-muted-foreground">Failed to load categories</div>
              ) : (
                transformedCategories.map((category: any) => (
                  <DropdownMenu
                    key={category.id || category._id}
                    open={openDropdown === (category.id || category._id)}
                    onOpenChange={(open) => setOpenDropdown(open ? (category.id || category._id) : null)}
                  >
                    <DropdownMenuTrigger asChild>
                      <div
                        onMouseEnter={() => handleMouseEnter(category.id || category._id)}
                        onMouseLeave={handleMouseLeave}
                        className="relative"
                      >
                        <button
                          onClick={(e) => handleCategoryClick(category, e)}
                          className="flex items-center space-x-1 text-sm font-medium hover:text-primary transition-colors py-2 whitespace-nowrap group"
                        >
                          <span>{getCategoryName(category)}</span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === (category.id || category._id) ? 'rotate-180' : ''}`} />
                        </button>
                      </div>
                    </DropdownMenuTrigger>
                    
                    <DropdownMenuContent
                      onMouseEnter={() => handleMouseEnter(category.id || category._id)}
                      onMouseLeave={handleMouseLeave}
                      className="w-56"
                      sideOffset={8}
                      align="start"
                    >
                      {category.subcategories?.map((sub: any) => (
                        <DropdownMenuItem key={sub.id || sub._id} asChild>
                          <button
                            onClick={(e) => handleSubcategoryClick(category, sub, e)}
                            className="flex items-center justify-between w-full text-left"
                          >
                            <span>{getSubcategoryName(sub)}</span>
                            <span className="text-muted-foreground text-xs">
                              ({sub.productCount})
                            </span>
                          </button>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ))
              )}
            </div>
          </div>

          {/* Right scroll button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollRight}
            className={`absolute right-0 z-20 h-full w-10 p-0 bg-gradient-to-l from-background via-background/95 to-transparent hover:from-background hover:via-background/98 ${
              canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'
            } transition-opacity flex items-center justify-center`}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CategoriesNavigation;
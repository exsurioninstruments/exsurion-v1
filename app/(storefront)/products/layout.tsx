'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { X, Filter, RotateCcw } from 'lucide-react';
import { useQueryState, parseAsArrayOf, parseAsString, parseAsInteger } from 'nuqs';
import { useCategories, useProducts } from '@/lib/sanity/hooks';
import { transformCategory, getCategoryName, getSubcategoryName, transformProduct } from '@/lib/sanity/utils';
import HeroCarousel from '@/components/home/HeroCarousel';
// Sort options
const sortOptions = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'name', label: 'Name A-Z' }
];

interface ProductsLayoutProps {
  children: React.ReactNode;
}

function ProductsLayoutContent({ children }: ProductsLayoutProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [categorySearch, setCategorySearch] = useState('');
  
  // Fetch categories and products from Sanity
  const { data: categoriesData, loading: categoriesLoading } = useCategories();
  const { data: productsData, loading: productsLoading } = useProducts();
  
  // Calculate dynamic max price from products
  const allProducts = Array.isArray(productsData) ? productsData.map(transformProduct) : [];
  const maxProductPrice =
    allProducts.length > 0
      ? Math.max(
          ...allProducts
            .map((p) => typeof p.price === "number" ? p.price : 0)
        )
      : 1000;

        // URL state management with nuqs
        const [searchQuery, setSearchQuery] = useQueryState('search', parseAsString.withDefault(''));
        const [sortBy, setSortBy] = useQueryState('sort', parseAsString.withDefault('relevance'));
        const [minPrice, setMinPrice] = useQueryState('minPrice', parseAsInteger.withDefault(0));
        const [maxPrice, setMaxPrice] = useQueryState('maxPrice', parseAsInteger.withDefault(0));
        const [categories, setCategories] = useQueryState('categories', parseAsArrayOf(parseAsString).withDefault([]));
        const [subcategories, setSubcategories] = useQueryState('subcategories', parseAsArrayOf(parseAsString).withDefault([]));

  // Transform categories for backward compatibility
  const transformedCategories = Array.isArray(categoriesData) ? categoriesData.map(transformCategory) : [];
  
  // Filter categories based on search
  const filteredCategories = categorySearch
    ? transformedCategories.filter((category: any) => {
        const categoryName = getCategoryName(category).toLowerCase();
        const matchesCategory = categoryName.includes(categorySearch.toLowerCase());
        const matchesSubcategory = category.subcategories?.some((sub: any) =>
          getSubcategoryName(sub).toLowerCase().includes(categorySearch.toLowerCase())
        );
        return matchesCategory || matchesSubcategory;
      })
    : transformedCategories;
  // Set max price to the highest product price when products are loaded and max price is 0
  useEffect(() => {
    if (!productsLoading && maxProductPrice > 0 && (maxPrice === 0 || maxPrice === 1000)) {
      setMaxPrice(maxProductPrice);
    }
  }, [productsLoading, maxProductPrice, maxPrice, setMaxPrice]);
  
  // Price range options
  const priceRangeOptions = { min: 0, max: maxProductPrice };


  const handleCategoryToggle = (categoryId: string, categorySlug?: string) => {
    const hasId = categories.includes(categoryId);
    const hasSlug = categorySlug ? categories.includes(categorySlug) : false;

    let newCategories: string[];
    if (hasId || hasSlug) {
      // Deselect: remove both id and slug if present
      newCategories = categories.filter(c => c !== categoryId && c !== categorySlug);
    } else {
      // Select: add id (normalize to id going forward)
      newCategories = [...categories, categoryId];
    }

    setCategories(newCategories);

    // Clear subcategories when category is deselected
    if (hasId || hasSlug) {
      const category = transformedCategories.find((c: any) => (c.id === categoryId || c._id === categoryId || c.slug?.current === categorySlug));
      const newSubcategories = subcategories.filter(sub => 
        !category?.subcategories?.some((catSub: any) => (catSub.id === sub || catSub._id === sub))
      );
      setSubcategories(newSubcategories);
    }
  };

  const handleSubcategoryToggle = (subcategoryId: string) => {
    setSubcategories(prev => 
      prev.includes(subcategoryId)
        ? prev.filter(s => s !== subcategoryId)
        : [...prev, subcategoryId]
    );
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSortBy('relevance');
    setMinPrice(0);
    setMaxPrice(maxProductPrice);
    setCategories([]);
    setSubcategories([]);
  };

  const activeFiltersCount = categories.length + subcategories.length;

  return (
    <div className="min-h-screen bg-background">
      <HeroCarousel />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 min-h-screen">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Mobile filter toggle */}
          <div className="lg:hidden fixed top-20 right-4 z-50">
            <Button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="relative shadow-lg  border"
            >
              <Filter className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Filters</span>
              <span className="sm:hidden">Filter</span>
              {activeFiltersCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </div>

          {/* Sidebar - Desktop */}
          <div className="hidden lg:block w-72 xl:w-80 flex-shrink-0">
            <div className="sticky top-24 space-y-4 xl:space-y-6">
              {/* Sort */}
              {/* <div className="space-y-2">
                <Label htmlFor="sort">Sort by</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option: any) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div> */}

              {/* Price Range */}
              {/* <div className="space-y-4">
                <Label>Price Range</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label htmlFor="minPrice" className="text-xs text-muted-foreground">Min Price</Label>
                    <Input
                      id="minPrice"
                      type="number"
                      placeholder="0"
                      value={minPrice || ''}
                      onChange={(e) => setMinPrice(parseInt(e.target.value) || 0)}
                      min={0}
                      max={maxProductPrice}
                      className="text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="maxPrice" className="text-xs text-muted-foreground">Max Price</Label>
                    <Input
                      id="maxPrice"
                      type="number"
                      placeholder="1000"
                      value={maxPrice || ''}
                      onChange={(e) => setMaxPrice(parseInt(e.target.value) || 1000)}
                      min={minPrice}
                      max={maxProductPrice}
                      className="text-sm"
                    />
                  </div>
                </div>
              </div> */}

              <Separator />

              {/* Categories */}
              <div className="space-y-3">
                <Label>Categories</Label>
                {/* Category Search */}
                <Input
                  placeholder="Search categories..."
                  value={categorySearch}
                  onChange={(e) => setCategorySearch(e.target.value)}
                  className="text-sm"
                />
                {categoriesLoading ? (
                  <div className="space-y-2">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                        <div className="h-4 w-8 bg-muted animate-pulse rounded" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredCategories.map((category: any) => {
                      const isCategorySelected = categories.includes(category.id || category._id) || categories.includes(category.slug?.current);
                      return (
                        <div key={category.id || category._id} className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <button
                              type="button"
                              onClick={() => handleCategoryToggle(category.id || category._id, category.slug?.current)}
                              className={`text-sm font-medium transition-colors hover:opacity-80 ${
                                isCategorySelected
                                  ? 'text-primary font-semibold'
                                  : 'text-foreground'
                              }`}
                            >
                              {getCategoryName(category)}
                            </button>
                            <Badge variant="secondary" className="text-xs">
                              {category.productCount}
                            </Badge>
                          </div>
                          
                          {/* Subcategories */}
                          {isCategorySelected && category.subcategories && (
                            <div className="ml-6 space-y-1">
                              {category.subcategories.map((sub: any) => {
                                const isSubcategorySelected = subcategories.includes(sub.id || sub._id);
                                return (
                                  <div key={sub.id || sub._id} className="flex items-center space-x-2">
                                    <button
                                      type="button"
                                      onClick={() => handleSubcategoryToggle(sub.id || sub._id)}
                                      className={`text-xs transition-colors hover:opacity-80 ${
                                        isSubcategorySelected
                                          ? 'text-primary font-semibold'
                                          : 'text-muted-foreground'
                                      }`}
                                    >
                                      {getSubcategoryName(sub)}
                                    </button>
                                    <Badge variant="outline" className="text-xs">
                                      {sub.productCount}
                                    </Badge>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>


              {/* Reset Filters */}
              <Button
                variant="outline"
                onClick={handleResetFilters}
                className="w-full"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset Filters
              </Button>
            </div>
          </div>

          {/* Mobile Sidebar Overlay */}
          {isFilterOpen && (
            <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setIsFilterOpen(false)} />
          )}

          {/* Mobile Sidebar */}
          <div className={`lg:hidden fixed top-0 right-0 h-full w-full sm:w-80 bg-background border-l z-50 transform transition-transform ${
            isFilterOpen ? 'translate-x-0' : 'translate-x-full'
          }`}>
            <div className="p-6 h-full overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsFilterOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-6">
                {/* Sort */}
                <div className="space-y-2">
                  <Label htmlFor="mobile-sort">Sort by</Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {sortOptions.map((option: any) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                {/* <div className="space-y-4">
                  <Label>Price Range</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label htmlFor="mobile-minPrice" className="text-xs text-muted-foreground">Min Price</Label>
                      <Input
                        id="mobile-minPrice"
                        type="number"
                        placeholder="0"
                        value={minPrice || ''}
                        onChange={(e) => setMinPrice(parseInt(e.target.value) || 0)}
                        min={0}
                        max={maxProductPrice}
                        className="text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="mobile-maxPrice" className="text-xs text-muted-foreground">Max Price</Label>
                      <Input
                        id="mobile-maxPrice"
                        type="number"
                        placeholder="1000"
                        value={maxPrice || ''}
                        onChange={(e) => setMaxPrice(parseInt(e.target.value) || 1000)}
                        min={minPrice}
                        max={maxProductPrice}
                        className="text-sm"
                      />
                    </div>
                  </div>
                </div> */}

                <Separator />

                {/* Categories */}
                <div className="space-y-3">
                  <Label>Categories</Label>
                  {/* Category Search */}
                  <Input
                    placeholder="Search categories..."
                    value={categorySearch}
                    onChange={(e) => setCategorySearch(e.target.value)}
                    className="text-sm"
                  />
                  {categoriesLoading ? (
                    <div className="space-y-2">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                          <div className="h-4 w-8 bg-muted animate-pulse rounded" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {filteredCategories.map((category: any) => {
                        const isCategorySelected = categories.includes(category.id || category._id) || categories.includes(category.slug?.current);
                        return (
                          <div key={category.id || category._id} className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <button
                                type="button"
                                onClick={() => handleCategoryToggle(category.id || category._id, category.slug?.current)}
                                className={`text-sm font-medium transition-colors hover:opacity-80 ${
                                  isCategorySelected
                                    ? 'text-primary font-semibold'
                                    : 'text-foreground'
                                }`}
                              >
                                {getCategoryName(category)}
                              </button>
                              <Badge variant="secondary" className="text-xs">
                                {category.productCount}
                              </Badge>
                            </div>
                            
                            {/* Subcategories */}
                            {isCategorySelected && category.subcategories && (
                              <div className="ml-6 space-y-1">
                                {category.subcategories.map((sub: any) => {
                                  const isSubcategorySelected = subcategories.includes(sub.id || sub._id);
                                  return (
                                    <div key={sub.id || sub._id} className="flex items-center space-x-2">
                                      <button
                                        type="button"
                                        onClick={() => handleSubcategoryToggle(sub.id || sub._id)}
                                        className={`text-xs transition-colors hover:opacity-80 ${
                                          isSubcategorySelected
                                            ? 'text-primary font-semibold'
                                            : 'text-muted-foreground'
                                        }`}
                                      >
                                        {getSubcategoryName(sub)}
                                      </button>
                                      <Badge variant="outline" className="text-xs">
                                        {sub.productCount}
                                      </Badge>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>


                {/* Reset Filters */}
                <Button
                  variant="outline"
                  onClick={handleResetFilters}
                  className="w-full"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0 lg:ml-0">
            {children}
          </div>
        </div>
      </div>
      {/* Show surgical hero if the current path is /products */}
      <section className="w-full bg-white py-20 md:py-32 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-2 md:gap-4 px-4">
        {/* Top heading */}
        <h1 className="text-6xl md:text-[12rem] font-bold tracking-widest text-black leading-none text-balance">
          EXSURION
        </h1>

        {/* Bottom subheading */}
        <p className="text-3xl md:text-8xl font-bold tracking-widest text-black/90 mt-4 md:mt-6">Instruments</p>
      </div>
    </section>
    </div>
  );
}

export default function ProductsLayout({ children }: ProductsLayoutProps) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 min-h-screen">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="hidden lg:block w-72 xl:w-80 flex-shrink-0">
              <div className="sticky top-24 space-y-4 xl:space-y-6">
                <div className="h-10 w-full bg-muted animate-pulse rounded" />
                <div className="h-64 bg-muted animate-pulse rounded" />
              </div>
            </div>
            <div className="flex-1 min-w-0 lg:ml-0">
              {children}
            </div>
          </div>
        </div>
      </div>
    }>
      <ProductsLayoutContent>{children}</ProductsLayoutContent>
    </Suspense>
  );
}

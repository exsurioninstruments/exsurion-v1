'use client';

import React, { useMemo, Suspense } from 'react';
import ProductCard from '@/components/products/ProductCard';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Grid, List, Filter } from 'lucide-react';
import { useQueryState, parseAsString, parseAsInteger, parseAsArrayOf } from 'nuqs';
import { useProducts } from '@/lib/sanity/hooks';
import { transformProduct, getProductName, getProductDescription } from '@/lib/sanity/utils';

function ProductsPageContent() {
  const [viewMode, setViewMode] = useQueryState('view', parseAsString.withDefault('grid'));
  const [currentPage, setCurrentPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const productsPerPage = 12;

  // Fetch products from Sanity
  const { data: productsData, loading, error } = useProducts();

  // Get filter values from URL state
  const [searchQuery] = useQueryState('search', parseAsString.withDefault(''));
  const [sortBy] = useQueryState('sort', parseAsString.withDefault('relevance'));
  const [minPrice] = useQueryState('minPrice', parseAsInteger.withDefault(0));
  const [maxPrice] = useQueryState('maxPrice', parseAsInteger.withDefault(0));
  const [materials] = useQueryState('materials', parseAsArrayOf(parseAsString).withDefault([]));
  const [brands] = useQueryState('brands', parseAsArrayOf(parseAsString).withDefault([]));
  const [categories] = useQueryState('categories', parseAsArrayOf(parseAsString).withDefault([]));
  const [subcategories] = useQueryState('subcategories', parseAsArrayOf(parseAsString).withDefault([]));
  const [inStockOnly] = useQueryState('inStock', parseAsString.withDefault('false'));
  const [rating] = useQueryState('rating', parseAsInteger.withDefault(0));

  // Transform products for backward compatibility
  const allProducts: Product[] = Array.isArray(productsData) ? productsData.map(transformProduct) : [];
  
  // Note: Max price is handled by the parent layout component

  // Filter products based on URL state
  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product => {
        const productName = getProductName(product);
        const productDescription = getProductDescription(product);
        return productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
               productDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
               (product.tags && product.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase())));
      });
    }

    // Price range filter
    filtered = filtered.filter(product =>
      product.price && product.price >= minPrice && product.price <= maxPrice
    );

    // Materials filter
    if (materials.length > 0) {
      filtered = filtered.filter(product =>
        product.material && materials.includes(product.material)
      );
    }

   

    // Categories filter
    if (categories.length > 0) {
      filtered = filtered.filter(product => {
        const categoryId = typeof product.category === 'string'
          ? product.category
          : product.category?._id;
        const categorySlug = typeof product.category === 'object'
          ? product.category?.slug?.current
          : undefined;
        const matchesById = categoryId && categories.includes(categoryId);
        const matchesBySlug = categorySlug && categories.includes(categorySlug);
        return Boolean(matchesById || matchesBySlug);
      });
    }

    // Subcategories filter
    if (subcategories.length > 0) {
      filtered = filtered.filter(product => {
        const subcategoryId = typeof product.subCategory === 'string' 
          ? product.subCategory 
          : product.subCategory?._id;
        const matches = subcategoryId && subcategories.includes(subcategoryId);
        return matches;
      });
    }

    

    // Rating filter
    if (rating > 0) {
      filtered = filtered.filter(product => (product.rating || 0) >= rating);
    }

    // Sort products
    switch (sortBy) {
      
      
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
        // For now, sort by ID (assuming higher IDs are newer)
        // In a real app, you'd have a createdAt field
        filtered.sort((a, b) => (b.id || b._id || '').localeCompare(a.id || a._id || ''));
        break;
      case 'name':
        filtered.sort((a, b) => getProductName(a).localeCompare(getProductName(b)));
        break;
      default: // relevance
        // Keep original order
        break;
    }

    return filtered;
  }, [allProducts, searchQuery, minPrice, maxPrice, materials, brands, categories, subcategories, inStockOnly, rating, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearFilters = () => {
    // Reset all filters by navigating to the same page without query params
    window.location.href = '/products';
  };

  // Show loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="h-8 w-64 bg-muted animate-pulse rounded mb-2" />
            <div className="h-4 w-48 bg-muted animate-pulse rounded" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-6 w-20 bg-muted animate-pulse rounded" />
            <div className="h-8 w-16 bg-muted animate-pulse rounded" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="aspect-square bg-muted animate-pulse" />
              <div className="p-4 space-y-2">
                <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
                <div className="h-3 w-1/2 bg-muted animate-pulse rounded" />
                <div className="h-4 w-1/3 bg-muted animate-pulse rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
          <Filter className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Failed to load products</h3>
        <p className="text-muted-foreground mb-4">
          There was an error loading the products. Please try again later.
        </p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold truncate">Surgical Instruments</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Professional-grade tools for medical excellence
          </p>
        </div>
        
        <div className="flex items-center gap-2 flex-shrink-0">
          <Badge variant="secondary" className="text-xs sm:text-sm">
            {filteredProducts.length} products
          </Badge>
          
          <div className="hidden md:flex items-center border rounded-md">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none px-2 sm:px-3"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none px-2 sm:px-3"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Products Grid/List */}
      {currentProducts.length > 0 ? (
        <>
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4 sm:gap-6'
              : 'space-y-4'
          }>
            {currentProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                priority={currentPage === 1}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-1 sm:space-x-2 pt-6 sm:pt-8">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="text-xs sm:text-sm px-2 sm:px-3"
              >
                <span className="hidden sm:inline">Previous</span>
                <span className="sm:hidden">Prev</span>
              </Button>
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNumber;
                  if (totalPages <= 5) {
                    pageNumber = i + 1;
                  } else if (currentPage <= 3) {
                    pageNumber = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i;
                  } else {
                    pageNumber = currentPage - 2 + i;
                  }
                  
                  return (
                    <Button
                      key={pageNumber}
                      variant={currentPage === pageNumber ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handlePageChange(pageNumber)}
                      className="w-8 h-8 sm:w-10 sm:h-10 p-0 text-xs sm:text-sm"
                    >
                      {pageNumber}
                    </Button>
                  );
                })}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="text-xs sm:text-sm px-2 sm:px-3"
              >
                Next
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
            <Filter className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No products found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your filters or search terms
          </p>
          <Button variant="outline" onClick={handleClearFilters}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="h-8 w-64 bg-muted animate-pulse rounded mb-2" />
            <div className="h-4 w-48 bg-muted animate-pulse rounded" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-6 w-20 bg-muted animate-pulse rounded" />
            <div className="h-8 w-16 bg-muted animate-pulse rounded" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="aspect-square bg-muted animate-pulse" />
              <div className="p-4 space-y-2">
                <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
                <div className="h-3 w-1/2 bg-muted animate-pulse rounded" />
                <div className="h-4 w-1/3 bg-muted animate-pulse rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    }>
      <ProductsPageContent />
    </Suspense>
  );
}

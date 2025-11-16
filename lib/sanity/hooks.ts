'use client';

import { useState, useEffect } from 'react';
import { client } from './client';
import { StoreSettings, Order } from '@/types';
import { 
  PRODUCTS_QUERY, 
  FEATURED_PRODUCTS_QUERY, 
  CATEGORIES_QUERY, 
  BANNERS_QUERY, 
  STORE_SETTINGS_QUERY,
  PRODUCT_QUERY,
  CATEGORY_QUERY,
  SUBCATEGORY_QUERY,
  PRODUCTS_BY_CATEGORY_QUERY,
  PRODUCTS_BY_SUBCATEGORY_QUERY,
  SEARCH_PRODUCTS_QUERY,
  FILTER_OPTIONS_QUERY,
  ORDER_QUERY,
  ORDERS_BY_CUSTOMER_QUERY
} from './queries';

// Generic hook for fetching data
function useSanityData<T>(query: string, params: Record<string, any> = {}) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const result = await client.fetch(query, params);
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Sanity fetch error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [query, JSON.stringify(params)]);

  return { data, loading, error };
}

// Products hooks
export function useProducts() {
  return useSanityData(PRODUCTS_QUERY);
}

export function useFeaturedProducts() {
  return useSanityData(FEATURED_PRODUCTS_QUERY);
}

export function useProduct(slug: string) {
  return useSanityData(PRODUCT_QUERY, { slug });
}

export function useProductsByCategory(categoryId: string) {
  return useSanityData(PRODUCTS_BY_CATEGORY_QUERY, { categoryId });
}

export function useProductsBySubcategory(subcategoryId: string) {
  return useSanityData(PRODUCTS_BY_SUBCATEGORY_QUERY, { subcategoryId });
}

export function useSearchProducts(searchTerm: string) {
  return useSanityData(SEARCH_PRODUCTS_QUERY, { searchTerm });
}

// Categories hooks
export function useCategories() {
  return useSanityData(CATEGORIES_QUERY);
}

export function useCategory(slug: string) {
  return useSanityData(CATEGORY_QUERY, { slug });
}

export function useSubcategory(slug: string) {
  return useSanityData(SUBCATEGORY_QUERY, { slug });
}

// Content hooks
export function useBanners() {
  return useSanityData(BANNERS_QUERY);
}

export function useStoreSettings() {
  return useSanityData<StoreSettings>(STORE_SETTINGS_QUERY);
}

export function useFilterOptions() {
  return useSanityData(FILTER_OPTIONS_QUERY);
}

// Order hooks
export function useOrder(orderId: string) {
  return useSanityData<Order>(ORDER_QUERY, { orderId });
}

export function useOrdersByCustomer(email: string) {
  return useSanityData<Order[]>(ORDERS_BY_CUSTOMER_QUERY, { email });
}

// Custom hook for filtered products
export function useFilteredProducts(filters: {
  search?: string;
  categories?: string[];
  subcategories?: string[];
  priceRange?: [number, number];
  materials?: string[];
  brands?: string[];
  inStockOnly?: boolean;
  sortBy?: string;
}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFilteredProducts() {
      try {
        setLoading(true);
        setError(null);
        
        // Build GROQ query based on filters
        let query = '*[_type == "product"';
        const params: Record<string, any> = {};
        
        // Add category filter
        if (filters.categories && filters.categories.length > 0) {
          query += ' && category._ref in $categoryIds';
          params.categoryIds = filters.categories;
        }
        
        // Add subcategory filter
        if (filters.subcategories && filters.subcategories.length > 0) {
          query += ' && subCategory._ref in $subcategoryIds';
          params.subcategoryIds = filters.subcategories;
        }
        
        // Add price range filter
        if (filters.priceRange) {
          query += ' && price >= $minPrice && price <= $maxPrice';
          params.minPrice = filters.priceRange[0];
          params.maxPrice = filters.priceRange[1];
        }
        
        // Add in stock filter
        if (filters.inStockOnly) {
          query += ' && stock > 0';
        }
        
        query += ']';
        
        // Add sorting
        switch (filters.sortBy) {
          case 'price-low':
            query += ' | order(price asc)';
            break;
          case 'price-high':
            query += ' | order(price desc)';
            break;
          case 'newest':
            query += ' | order(_createdAt desc)';
            break;
          case 'name':
            query += ' | order(title asc)';
            break;
          default:
            query += ' | order(_createdAt desc)';
        }
        
        // Add projection
        query += ` {
          _id,
          title,
          slug,
          description,
          price,
          stock,
          category->{
            _id,
            title,
            slug
          },
          subCategory->{
            _id,
            title,
            slug,
            parent->{
              _id,
              title,
              slug
            }
          },
          images[]{
            asset->{
              _id,
              url,
              metadata {
                dimensions
              }
            }
          },
          colors[]->{
            _id,
            name,
            value
          },
          materials[]->{
            _id,
            name
          },
          isFeatured,
          seo {
            title,
            description,
            keywords,
            ogImage {
              asset->{
                url
              }
            }
          }
        }`;
        
        const result = await client.fetch(query, params);
        
        // Apply client-side filters that are harder to do in GROQ
        let filteredResult = result;
        
        // Search filter
        if (filters.search) {
          const searchTerm = filters.search.toLowerCase();
          filteredResult = filteredResult.filter((product: any) =>
            product.title.toLowerCase().includes(searchTerm) ||
            product.description.some((block: any) => 
              block.children?.some((child: any) => 
                child.text?.toLowerCase().includes(searchTerm)
              )
            ) ||
            product.category?.title.toLowerCase().includes(searchTerm) ||
            product.subCategory?.title.toLowerCase().includes(searchTerm)
          );
        }
        
        // Materials filter
        if (filters.materials && filters.materials.length > 0) {
          filteredResult = filteredResult.filter((product: any) => {
            if (!product.materials || !Array.isArray(product.materials)) return false;
            const productMaterials = product.materials.map((m: any) => 
              typeof m === 'object' && m?.name ? m.name : (typeof m === 'string' ? m : '')
            ).filter(Boolean);
            return filters.materials!.some(filterMaterial => 
              productMaterials.includes(filterMaterial)
            );
          });
        }
        
        // Brands filter (legacy support - can be removed if not needed)
        if (filters.brands && filters.brands.length > 0) {
          filteredResult = filteredResult.filter((product: any) =>
            filters.brands!.includes(product.brand)
          );
        }
        
        setData(filteredResult);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Filtered products fetch error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchFilteredProducts();
  }, [JSON.stringify(filters)]);

  return { data, loading, error };
}

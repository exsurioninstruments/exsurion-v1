import { Product, Category, Subcategory, Banner, SanityImage } from '@/types';
import { formatBlockContent, getImageUrl } from './client';

// Transform Sanity product to legacy format for backward compatibility
export function transformProduct(sanityProduct: any): Product {
  return {
    ...sanityProduct,
    // Map Sanity fields to legacy fields
    id: sanityProduct._id,
    name: sanityProduct.title,
    description: formatBlockContent(sanityProduct.description) || '',
    // Keep images as SanityImage[] for the main interface
    images: sanityProduct.images || [],
    category: sanityProduct.category || null,
    subCategory: sanityProduct.subCategory || null,
    inStock: (sanityProduct.stock || 0) > 0,
    stockCount: sanityProduct.stock || 0,
    // Include new product fields
    sku: sanityProduct.sku,
    productCode: sanityProduct.productCode,
    variant: sanityProduct.variant,
    colors: sanityProduct.colors || [],
    materials: sanityProduct.materials || [],
    tipShapes: sanityProduct.tipShapes || [],
    code: sanityProduct.code,
  };
}

// Transform Sanity category to legacy format
export function transformCategory(sanityCategory: any): Category {
  return {
    ...sanityCategory,
    id: sanityCategory._id,
    name: sanityCategory.title,
    image: getImageUrl(sanityCategory.image) || '/excurion.svg',
    subcategories: sanityCategory.subcategories?.map(transformSubcategory) || []
  };
}

// Transform Sanity subcategory to legacy format
export function transformSubcategory(sanitySubcategory: any): Subcategory {
  return {
    ...sanitySubcategory,
    id: sanitySubcategory._id,
    name: sanitySubcategory.title
  };
}

// Transform Sanity banner to legacy format
export function transformBanner(sanityBanner: any): Banner {
  return {
    ...sanityBanner,
    image: getImageUrl(sanityBanner.image) || '',
    buttonUrl: sanityBanner.buttonUrl || '/products' // Default to products page if no URL
  };
}

// Get product display name (handles both formats)
export function getProductName(product: Product): string {
  return product.name || product.title || '';
}

// Get product display description (handles both formats)
export function getProductDescription(product: Product): string {
  if (typeof product.description === 'string') {
    return product.description;
  }
  return formatBlockContent(product.description) || '';
}

// Get product images (handles both formats)
export function getProductImages(product: Product): string[] {
  if (Array.isArray(product.images) && product.images.length > 0) {
    // Check if it's already an array of strings
    if (typeof product.images[0] === 'string') {
      return product.images as unknown as string[];
    }
    // Transform Sanity images to URLs
    return product.images.map((img: any) => getImageUrl(img));
  }
  return [];
}

// Get category display name (handles both formats)
export function getCategoryName(category: Category): string {
  if (!category) return '';
  const name = category.name || category.title;
  if (typeof name === 'string') return name;
  if (typeof name === 'object' && name !== null) {
    // If name is an object, try to extract a string value
    return (name as any).title || (name as any).name || '';
  }
  return '';
}

// Get product images (handles both formats)
export function getCategoryImages(category: Category): SanityImage | null {
    if (category.image) {
      // Check if it's already an array of strings
      if (typeof category.image === 'string') {
        return category.image as unknown as SanityImage;
      }
      // Transform Sanity images to URLs
      return category.image;
    }
    return null;
  }

// Get subcategory display name (handles both formats)
export function getSubcategoryName(subcategory: Subcategory): string {
  if (!subcategory) return '';
  const name = subcategory.name || subcategory.title;
  if (typeof name === 'string') return name;
  if (typeof name === 'object' && name !== null) {
    // If name is an object, try to extract a string value
    return (name as any).title || (name as any).name || '';
  }
  return '';
}

// Get brand display name (handles both object and string formats) - Legacy support
export function getBrandName(product: Product): string {
  if (!product.brand) return '';
  if (typeof product.brand === 'string') return product.brand;
  if (typeof product.brand === 'object' && product.brand !== null) {
    return (product.brand as any).name || '';
  }
  return '';
}

// Get material display names (handles array of objects and strings)
export function getMaterialNames(product: Product): string[] {
  if (!product.materials || !Array.isArray(product.materials)) return [];
  return product.materials.map(material => {
    if (typeof material === 'string') return material;
    if (typeof material === 'object' && material !== null) {
      return (material as any).name || '';
    }
    return '';
  }).filter(Boolean);
}

// Get first material name (for backward compatibility)
export function getMaterialName(product: Product): string {
  const materials = getMaterialNames(product);
  return materials[0] || '';
}




// Generate product URL
export function getProductUrl(product: Product): string {
  const slug = product.slug?.current || product.id || product._id;
  return `/product/${slug}`;
}

// Generate category URL
export function getCategoryUrl(category: Category): string {
  const slug = category.slug?.current || category.id || category._id;
  return `/products?categories=${slug}`;
}

// Generate subcategory URL
export function getSubcategoryUrl(category: Category, subcategory: Subcategory): string {
  const categorySlug = category.slug?.current || category.id || category._id;
  const subcategorySlug = subcategory.slug?.current || subcategory.id || subcategory._id;
  return `/products?categories=${categorySlug}&subcategories=${subcategorySlug}`;
}

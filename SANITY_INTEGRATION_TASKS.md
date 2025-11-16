# Sanity CMS Integration Tasks

## Overview
This document outlines the tasks to integrate Sanity CMS with the e-commerce frontend, replacing static data with dynamic content from Sanity.

## Schema Analysis
Based on the Sanity schemas, we have:
- **Product**: title, slug, description, price, stock, category, subCategory, images, isFeatured, seo
- **Category**: title, slug, description, seo
- **SubCategory**: title, slug, parent, seo
- **Banner**: title, image, headline, subText, buttonText, buttonUrl, order, isActive
- **StoreSettings**: storeName, logo, headerLinks, footerLinks, footerText, socialLinks

## Tasks

### Phase 1: GROQ Queries & Data Layer
- [ ] **Task 1.1**: Create GROQ queries for products
- [ ] **Task 1.2**: Create GROQ queries for categories with subcategories
- [ ] **Task 1.3**: Create GROQ queries for banners
- [ ] **Task 1.4**: Create GROQ queries for store settings
- [ ] **Task 1.5**: Create data fetching utilities and hooks

### Phase 2: Update Type Definitions
- [ ] **Task 2.1**: Update Product interface to match Sanity schema
- [ ] **Task 2.2**: Update Category interface to match Sanity schema
- [ ] **Task 2.3**: Update SubCategory interface to match Sanity schema
- [ ] **Task 2.4**: Create Banner interface
- [ ] **Task 2.5**: Create StoreSettings interface

### Phase 3: Component Updates
- [ ] **Task 3.1**: Update CategoriesNavigation to use Sanity data
- [ ] **Task 3.2**: Update ProductCard to use Sanity data
- [ ] **Task 3.3**: Update FeaturedProducts to use Sanity data
- [ ] **Task 3.4**: Update CategoriesSection to use Sanity data
- [ ] **Task 3.5**: Update HeroCarousel to use Sanity data

### Phase 4: Filter System Integration
- [ ] **Task 4.1**: Update products layout filters to use Sanity categories
- [ ] **Task 4.2**: Update products page filtering logic for Sanity data
- [ ] **Task 4.3**: Add dynamic filter options based on Sanity data
- [ ] **Task 4.4**: Update search functionality for Sanity content

### Phase 5: SEO Implementation
- [ ] **Task 5.1**: Implement dynamic SEO for product pages
- [ ] **Task 5.2**: Implement dynamic SEO for category pages
- [ ] **Task 5.3**: Add Open Graph meta tags
- [ ] **Task 5.4**: Implement structured data (JSON-LD)

### Phase 6: Image Optimization
- [ ] **Task 6.1**: Update all components to use Sanity image URLs
- [ ] **Task 6.2**: Implement responsive image loading
- [ ] **Task 6.3**: Add image optimization with Sanity's image API

### Phase 7: Performance & Caching
- [ ] **Task 7.1**: Implement ISR (Incremental Static Regeneration)
- [ ] **Task 7.2**: Add proper caching strategies
- [ ] **Task 7.3**: Optimize bundle size

## Implementation Order
1. Start with Phase 1 (GROQ queries)
2. Move to Phase 2 (Type definitions)
3. Update components one by one (Phase 3)
4. Integrate filters (Phase 4)
5. Add SEO (Phase 5)
6. Optimize images (Phase 6)
7. Performance improvements (Phase 7)

## Notes
- All queries should include proper error handling
- Use TypeScript for type safety
- Implement proper loading states
- Add fallbacks for missing data
- Ensure responsive design is maintained

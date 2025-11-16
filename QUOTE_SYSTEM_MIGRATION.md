# Quote System Migration Plan

## Overview
Converting the e-commerce system from order-based to quote-based system:
- Remove stock/quantity tracking from products
- Add quantity input fields in product and cart pages
- Replace order creation with quote request emails
- Remove price display throughout the application
- Send quote request to supplier and thank you email to customer

## Tasks

### Phase 1: Schema Updates
- [x] Task 1.1: Remove `stock` field from product schema (sanity/schemaTypes/product.ts)
- [x] Task 1.2: Update product type definitions (types/index.ts) - remove stock fields

### Phase 2: Product Page Updates
- [x] Task 2.1: Add quantity input field to product detail page
- [x] Task 2.2: Remove price display from product detail page
- [x] Task 2.3: Update add to cart functionality to use quantity input

### Phase 3: Cart Updates
- [x] Task 3.1: Add quantity input field to cart drawer/page
- [x] Task 3.2: Remove price display from cart
- [x] Task 3.3: Update cart context to handle quantity changes

### Phase 4: Checkout Page Updates
- [x] Task 4.1: Make all contact information fields required
- [x] Task 4.2: Change button text from "Place Order" to "Get Quote"
- [x] Task 4.3: Remove all price displays from checkout page
- [x] Task 4.4: Create quote request email template for supplier
- [x] Task 4.5: Create thank you email template for customer
- [x] Task 4.6: Implement email sending functionality (supplier + customer)
- [x] Task 4.7: Remove order creation API call

### Phase 5: Remove Price Display from Other Pages
- [x] Task 5.1: Remove price from ProductCard component
- [x] Task 5.2: Remove price from products listing page
- [x] Task 5.3: Remove price from featured products section

### Phase 6: API Route Updates
- [x] Task 6.1: Update or remove /api/orders route (replace with quote endpoint if needed)
- [x] Task 6.2: Create /api/quote endpoint for sending quote requests

### Phase 7: Utility Updates
- [x] Task 7.1: Update sanity utils to remove stock-related functions
- [x] Task 7.2: Update product queries if needed

## ✅ Implementation Complete

All tasks have been successfully completed. The system has been converted from an order-based to a quote-based system.

### Summary of Changes:
1. **Product Schema**: Removed `stock` field from Sanity product schema
2. **Product Types**: Made `price` optional and removed stock-related fields
3. **Product Detail Page**: Added quantity input, removed price and stock displays
4. **Cart Components**: Removed all price displays, kept quantity controls
5. **Checkout Page**: Changed to quote request system with email notifications
6. **API Endpoint**: Created `/api/quote` endpoint for sending quote requests
7. **Email System**: Implemented quote request emails to supplier and thank you emails to customers
8. **UI Components**: Removed all price displays from ProductCard and other components

## Implementation Order
1. Phase 1 (Schema) - Foundation changes
2. Phase 2 (Product Page) - Individual product experience
3. Phase 3 (Cart) - Cart functionality
4. Phase 4 (Checkout) - Quote request system
5. Phase 5 (Price Removal) - UI cleanup
6. Phase 6 (API) - Backend updates
7. Phase 7 (Utils) - Code cleanup


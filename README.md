# E-Commerce Platform - Exsurion

This is a [Next.js](https://nextjs.org) e-commerce platform built with TypeScript, Sanity CMS, and modern UI components. The platform specializes in surgical and dental instruments with a quote-based ordering system.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), [pnpm](https://pnpm.io/), or [bun](https://bun.sh/)
- A Gmail account (for email functionality)
- A Sanity account and project (for CMS)

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd e-commerce
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory of the project:

```env
# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-09-12

# Sanity API Token (for server-side operations)
SANITY_API_TOKEN=your_sanity_api_token

# Gmail Configuration (for contact form and email functionality)
GMAIL_USER=your_email@gmail.com
GMAIL_APP_PASSWORD=your_gmail_app_password

# Contact Email (optional - defaults to GMAIL_USER if not set)
CONTACT_EMAIL=your_contact_email@example.com
```

#### How to Get Your Environment Variables:

**Sanity CMS:**
1. Go to [sanity.io](https://www.sanity.io/) and create an account
2. Create a new project or use an existing one
3. Get your Project ID from the Sanity dashboard
4. Create an API token with read/write permissions in Sanity Studio → API → Tokens

**Gmail App Password:**
1. Go to your Google Account settings
2. Enable 2-Step Verification if not already enabled
3. Go to Security → 2-Step Verification → App passwords
4. Generate a new app password for "Mail"
5. Use this 16-character password as `GMAIL_APP_PASSWORD`

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The page auto-updates as you edit the file. You can start editing the page by modifying `app/page.tsx`.

### 5. Access Sanity Studio (Optional)

To manage your content via Sanity Studio, navigate to:
```
http://localhost:3000/studio
```

## Available Scripts

- `npm run dev` - Start the development server with Turbopack
- `npm run build` - Build the production application
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check for code issues

## Project Structure

```
e-commerce/
├── app/                          # Next.js app router
│   ├── (storefront)/            # Storefront route group
│   │   ├── about/               # About page
│   │   ├── careers/             # Careers page
│   │   ├── contact/             # Contact page
│   │   ├── delivery/            # Delivery information page
│   │   ├── product/             # Product detail pages
│   │   │   └── [productId]/     # Dynamic product route
│   │   ├── products/            # Products listing page
│   │   ├── team/                # Team page
│   │   ├── layout.tsx           # Storefront layout
│   │   └── page.tsx             # Home page
│   ├── api/                     # API routes
│   │   ├── contact/             # Contact form API
│   │   ├── orders/             # Order processing API
│   │   └── quote/               # Quote request API
│   ├── cart/                    # Shopping cart page
│   ├── checkout/                # Checkout flow
│   │   ├── page.tsx             # Checkout form
│   │   └── thank-you/           # Thank you page
│   ├── studio/                  # Sanity Studio
│   │   └── [[...tool]]/         # Sanity Studio route
│   ├── layout.tsx                # Root layout
│   └── globals.css              # Global styles
├── components/                   # React components
│   ├── cart/                    # Cart components
│   │   └── CartDrawer.tsx       # Shopping cart drawer
│   ├── home/                    # Home page components
│   │   ├── BestSeller.tsx      # Best seller section
│   │   ├── Categories.tsx      # Categories section
│   │   ├── CategoriesSection.tsx
│   │   ├── FeaturedProducts.tsx # Featured products
│   │   ├── Hero.tsx             # Hero section
│   │   └── HeroCarousel.tsx     # Hero carousel
│   ├── layout/                   # Layout components
│   │   ├── Footer.tsx           # Site footer
│   │   ├── Header.tsx           # Site header/navigation
│   │   └── WhatsAppButton.tsx   # WhatsApp contact button
│   ├── navigation/              # Navigation components
│   │   ├── CategoriesNavigation.tsx
│   │   └── CategoriesSheet.tsx  # Mobile categories sheet
│   ├── products/                # Product components
│   │   └── ProductCard.tsx      # Product card component
│   ├── ui/                      # shadcn/ui components (47 components)
│   │   ├── accordion.tsx
│   │   ├── alert-dialog.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── carousel.tsx
│   │   ├── dialog.tsx
│   │   ├── drawer.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   └── ... (and more)
│   ├── animated-counter.tsx
│   ├── carousel.tsx
│   ├── contact-widget.tsx        # Contact widget
│   ├── services-expertise.tsx
│   ├── surgical-hero.tsx
│   ├── testimonials-section.tsx
│   ├── testimonials.tsx
│   ├── theme-provider.tsx        # Theme provider (dark mode)
│   └── trusted-by-section.tsx
├── context/                      # React contexts
│   └── CartContext.tsx           # Shopping cart context
├── hooks/                        # Custom React hooks
│   └── use-mobile.ts             # Mobile detection hook
├── lib/                          # Utility functions
│   ├── sanity/                   # Sanity CMS utilities
│   │   ├── client.ts             # Sanity client
│   │   ├── hooks.ts              # Custom Sanity hooks
│   │   ├── queries.ts            # GROQ queries
│   │   ├── serverOrderOperations.ts
│   │   └── utils.ts              # Sanity utility functions
│   ├── data.ts                   # Static data (if any)
│   ├── sendEmail.ts              # Email sending utility
│   └── utils.ts                   # General utilities
├── sanity/                       # Sanity CMS configuration
│   ├── components/               # Sanity Studio components
│   │   ├── ProductCodeInput.tsx
│   │   └── SKUInput.tsx
│   ├── lib/                      # Sanity library functions
│   │   ├── client.ts
│   │   ├── image.ts
│   │   └── live.ts
│   ├── schemaTypes/              # Sanity schemas
│   │   ├── banner.ts
│   │   ├── category.ts
│   │   ├── code.ts
│   │   ├── color.ts
│   │   ├── material.ts
│   │   ├── order.ts
│   │   ├── product.ts
│   │   ├── storeSettings.ts
│   │   ├── subCategory.ts
│   │   ├── tipShape.ts
│   │   ├── variant.ts
│   │   └── index.ts
│   ├── structure.ts              # Sanity desk structure
│   ├── env.ts
│   ├── sanity.cli.ts
│   └── sanity.config.ts
├── types/                        # TypeScript type definitions
│   └── index.ts                  # Main type definitions
├── public/                       # Static assets
└── package.json
```

## Routes

### Public Routes (Storefront)

- `/` - Home page with hero, categories, featured products, testimonials, and trusted by sections
- `/products` - Products listing page with filtering, sorting, and pagination
- `/product/[productId]` - Individual product detail page with images, variants, and add to cart
- `/about` - About page with company mission, vision, and team members
- `/careers` - Careers page
- `/contact` - Contact form page with email submission
- `/delivery` - Delivery information page
- `/team` - Team page
- `/cart` - Shopping cart page
- `/checkout` - Checkout/quote request form
- `/checkout/thank-you` - Thank you page after quote submission
- `/studio` - Sanity Studio for content management

### API Routes

- `POST /api/contact` - Handle contact form submissions
  - Sends email to admin and thank you email to user
  - Validates email format and required fields
  
- `POST /api/orders` - Process orders
  - Creates orders in Sanity CMS
  - Validates order data
  
- `GET /api/orders?email=...` - Retrieve orders by customer email
  
- `POST /api/quote` - Handle quote requests
  - Sends quote request to supplier/admin
  - Sends confirmation email to customer
  - Includes product details, variants (color, material, tip shape), and shipping information

## Components

### Layout Components

- **Header** (`components/layout/Header.tsx`)
  - Responsive navigation with mobile menu
  - Search functionality
  - Cart icon with item count
  - Categories navigation
  - Logo and main navigation links

- **Footer** (`components/layout/Footer.tsx`)
  - Multi-column footer with links
  - Categories from Sanity
  - Social media links
  - Company information
  - Awards and certifications

- **WhatsAppButton** (`components/layout/WhatsAppButton.tsx`)
  - Floating WhatsApp contact button

### Home Page Components

- **Hero** (`components/home/Hero.tsx`)
  - Main hero section with call-to-action

- **HeroCarousel** (`components/home/HeroCarousel.tsx`)
  - Image carousel for hero section

- **Categories** (`components/home/Categories.tsx`)
  - Category grid/section

- **CategoriesSection** (`components/home/CategoriesSection.tsx`)
  - Alternative categories display

- **FeaturedProducts** (`components/home/FeaturedProducts.tsx`)
  - Displays featured products from Sanity

- **BestSeller** (`components/home/BestSeller.tsx`)
  - Best seller products section

### Product Components

- **ProductCard** (`components/products/ProductCard.tsx`)
  - Product card for grid/list views
  - Displays image, title, price, and add to cart button

### Cart Components

- **CartDrawer** (`components/cart/CartDrawer.tsx`)
  - Slide-out shopping cart drawer
  - Displays cart items with quantity controls
  - Shows total and checkout button

### Navigation Components

- **CategoriesNavigation** (`components/navigation/CategoriesNavigation.tsx`)
  - Horizontal categories navigation bar

- **CategoriesSheet** (`components/navigation/CategoriesSheet.tsx`)
  - Mobile categories sheet/drawer

### Other Components

- **ContactWidget** (`components/contact-widget.tsx`)
  - Floating contact widget

- **TestimonialsSection** (`components/testimonials-section.tsx`)
  - Customer testimonials section

- **TrustedBySection** (`components/trusted-by-section.tsx`)
  - Trusted by/partners section

- **ServicesExpertise** (`components/services-expertise.tsx`)
  - Services and expertise section

- **SurgicalHero** (`components/surgical-hero.tsx`)
  - Surgical instruments hero section

- **AnimatedCounter** (`components/animated-counter.tsx`)
  - Animated number counter component

### UI Components (shadcn/ui)

The project uses [shadcn/ui](https://ui.shadcn.com/) components. All UI components are located in `components/ui/`:

- Accordion, Alert, Alert Dialog, Aspect Ratio, Avatar
- Badge, Breadcrumb, Button, Calendar, Card
- Carousel, Chart, Checkbox, Collapsible, Command
- Context Menu, Dialog, Drawer, Dropdown Menu
- Form, Hover Card, Input, Input OTP, Label
- Menubar, Navigation Menu, Pagination, Popover
- Progress, Radio Group, Resizable, Scroll Area
- Select, Separator, Sheet, Sidebar, Skeleton
- Slider, Sonner (Toast), Switch, Table, Tabs
- Textarea, Toggle, Toggle Group, Tooltip

## Features

### Shopping Cart System

- **Cart Context** (`context/CartContext.tsx`)
  - Global cart state management
  - Add/remove/update items
  - Quantity management
  - LocalStorage persistence
  - Support for product variants (color, material, tip shape)

### Product Features

- Product variants: Color, Material, Tip Shape
- Product codes and SKUs
- Multiple product images with zoom
- Featured products
- Product categories and subcategories
- Search functionality
- Filtering by category, price, material, etc.
- Sorting options (relevance, price, name, newest, rating)

### Quote System

- Quote-based ordering (no direct payment)
- Quote request form with customer and shipping information
- Email notifications to supplier and customer
- Product variant selection in quotes

### Email System

- Contact form email notifications
- Quote request emails
- Thank you emails
- Uses Nodemailer with Gmail

### Sanity CMS Integration

- **Content Types:**
  - Products (with variants, images, pricing)
  - Categories and Subcategories
  - Orders
  - Banners
  - Store Settings
  - Colors, Materials, Tip Shapes
  - Product Codes

- **Custom Hooks** (`lib/sanity/hooks.ts`):
  - `useProducts()` - Fetch all products
  - `useFeaturedProducts()` - Fetch featured products
  - `useProduct(slug)` - Fetch single product
  - `useCategories()` - Fetch categories
  - `useCategory(slug)` - Fetch single category
  - `useBanners()` - Fetch banners
  - `useStoreSettings()` - Fetch store settings
  - `useFilteredProducts(filters)` - Fetch filtered products
  - And more...

### Theme System

- Dark theme (forced)
- Theme provider using `next-themes`
- Consistent color scheme throughout

### Responsive Design

- Mobile-first approach
- Responsive navigation with mobile menu
- Responsive product grids
- Mobile-optimized forms

## Key Technologies

- **Framework:** Next.js 15.5.3 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **UI Components:** shadcn/ui (Radix UI)
- **CMS:** Sanity 4.8.1
- **Animations:** Framer Motion 12.23.24
- **Forms:** React Hook Form + Zod
- **State Management:** React Context API
- **Email:** Nodemailer
- **Icons:** Lucide React, Tabler Icons
- **URL State:** nuqs (for query parameters)
- **Notifications:** Sonner (Toast)

## Sanity CMS Schemas

The project includes the following Sanity schemas:

1. **Product** - Main product schema with variants, images, pricing
2. **Category** - Product categories
3. **SubCategory** - Subcategories with parent reference
4. **Order** - Order management
5. **Banner** - Homepage banners
6. **StoreSettings** - Store configuration
7. **Variant** - Product variants
8. **Color** - Product colors
9. **Material** - Product materials
10. **TipShape** - Tip shape options
11. **Code** - Product codes

## Development Notes

- The project uses Next.js App Router with route groups
- Client components are marked with `'use client'`
- Server components are used where possible for better performance
- TypeScript is strictly typed throughout
- ESLint is configured for code quality
- Turbopack is used for faster development builds

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Sanity Documentation](https://www.sanity.io/docs) - learn about Sanity CMS
- [React Documentation](https://react.dev/) - learn about React
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - learn about Tailwind CSS
- [shadcn/ui Documentation](https://ui.shadcn.com/) - learn about UI components
- [Framer Motion Documentation](https://www.framer.com/motion/) - learn about animations

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Make sure to add all your environment variables in the Vercel dashboard under Project Settings → Environment Variables.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

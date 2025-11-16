// GROQ queries for Sanity CMS

// Product queries
export const PRODUCT_QUERY = `*[_type == "product" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description,
  price,
  stock,
  sku,
  productCode,
  variant->{
    _id,
    name
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
  tipShapes[]->{
    _id,
    name
  },
  code->{
    _id,
    value
  },
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

export const PRODUCTS_QUERY = `*[_type == "product"] | order(_createdAt desc) {
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

export const FEATURED_PRODUCTS_QUERY = `*[_type == "product" && isFeatured == true] | order(_createdAt desc) [0...8] {
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

export const PRODUCTS_BY_CATEGORY_QUERY = `*[_type == "product" && category._ref == $categoryId] | order(_createdAt desc) {
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

export const PRODUCTS_BY_SUBCATEGORY_QUERY = `*[_type == "product" && subCategory._ref == $subcategoryId] | order(_createdAt desc) {
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

// Category queries
export const CATEGORIES_QUERY = `*[_type == "category"] | order(title asc) {
  _id,
  title,
  slug,
  description,
  image {
    asset->{
      _id,
      url,
      metadata {
        dimensions
      }
    }
  },
  seo {
    title,
    description,
    keywords,
    ogImage {
      asset->{
        url
      }
    }
  },
  "productCount": count(*[_type == "product" && category._ref == ^._id]),
  "subcategories": *[_type == "subCategory" && parent._ref == ^._id] | order(title asc) {
    _id,
    title,
    slug,
    "productCount": count(*[_type == "product" && subCategory._ref == ^._id])
  }
}`;

export const CATEGORY_QUERY = `*[_type == "category" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description,
  seo {
    title,
    description,
    keywords,
    ogImage {
      asset->{
        url
      }
    }
  },
  "productCount": count(*[_type == "product" && category._ref == ^._id]),
  "subcategories": *[_type == "subCategory" && parent._ref == ^._id] | order(title asc) {
    _id,
    title,
    slug,
    "productCount": count(*[_type == "product" && subCategory._ref == ^._id])
  }
}`;

// SubCategory queries
export const SUBCATEGORY_QUERY = `*[_type == "subCategory" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  parent->{
    _id,
    title,
    slug
  },
  seo {
    title,
    description,
    keywords,
    ogImage {
      asset->{
        url
      }
    }
  },
  "productCount": count(*[_type == "product" && subCategory._ref == ^._id])
}`;

// Banner queries
export const BANNERS_QUERY = `*[_type == "banner" && isActive == true] | order(order asc) {
  _id,
  title,
  image {
    asset->{
      _id,
      url,
      metadata {
        dimensions
      }
    }
  },
  headline,
  subText,
  buttonText,
  buttonUrl,
  order,
  isActive
}`;

// Store settings query
export const STORE_SETTINGS_QUERY = `*[_type == "storeSettings"][0] {
  _id,
  storeName,
  logo {
    asset->{
      _id,
      url,
      metadata {
        dimensions
      }
    }
  },
  headerLinks[]{
    label,
    url
  },
  footerLinks[]{
    label,
    url
  },
  footerText,
  socialLinks[]{
    platform,
    url
  },
  shippingCharges {
    fixedCharge,
    freeShippingThreshold
  },
  taxSettings {
    taxPercentage,
    taxLabel
  },
  heroSection {
    headline,
    description,
    primaryButton {
      text,
      url
    },
    secondaryButton {
      text,
      url
    }
  },
  carouselImages[]{
    image {
      asset->{
        _id,
        url,
        metadata {
          dimensions
        }
      }
    },
    altText
  },
  companyInfo {
    companyName,
    tagline,
    description
  },
  seoSettings {
    siteTitle,
    siteDescription,
    ogImage {
      asset->{
        _id,
        url,
        metadata {
          dimensions
        }
      }
    }
  },
  whatsappNumber
}`;

// Search query
export const SEARCH_PRODUCTS_QUERY = `*[_type == "product" && (
  title match $searchTerm ||
  description match $searchTerm ||
  category->title match $searchTerm ||
  subCategory->title match $searchTerm
)] | order(_createdAt desc) {
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

// Order queries
export const ORDER_QUERY = `*[_type == "order" && _id == $orderId][0] {
  _id,
  orderNumber,
  customer {
    email,
    firstName,
    lastName,
    phone
  },
  shippingAddress {
    address,
    city,
    state,
    zipCode
  },
  items[] {
    product-> {
      _id,
      title,
      price,
      images[0] {
        asset-> {
          _id,
          url,
          metadata {
            dimensions
          }
        }
      }
    },
    quantity,
    price,
    total
  },
  paymentMethod,
  status,
  pricing {
    subtotal,
    shipping,
    tax,
    total
  },
  notes,
  orderDate
}`;

export const ORDERS_BY_CUSTOMER_QUERY = `*[_type == "order" && customer.email == $email] | order(orderDate desc) {
  _id,
  orderNumber,
  customer {
    email,
    firstName,
    lastName,
    phone
  },
  status,
  pricing {
    total
  },
  orderDate
}`;

// Filter options queries
export const FILTER_OPTIONS_QUERY = `{
  "categories": *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    "productCount": count(*[_type == "product" && category._ref == ^._id])
  },
  "subcategories": *[_type == "subCategory"] | order(title asc) {
    _id,
    title,
    slug,
    parent->{
      _id,
      title,
      slug
    },
    "productCount": count(*[_type == "product" && subCategory._ref == ^._id])
  },
  "materials": array::unique(*[_type == "product"].materials[]->name),
  "priceRange": {
    "min": min(*[_type == "product"].price),
    "max": max(*[_type == "product"].price)
  }
}`;

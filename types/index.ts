// Sanity-based interfaces
export interface SanityImage {
  asset: {
    _id: string;
    url: string;
    metadata: {
      dimensions: {
        width: number;
        height: number;
      };
    };
  };
}

export interface SEO {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: SanityImage;
}

export interface Product {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description: any[]; // Sanity block content
  price?: number;
  category: {
    _id: string;
    title: string;
    slug: {
      current: string;
    };
  };
  subCategory?: {
    _id: string;
    title: string;
    slug: {
      current: string;
    };
    parent: {
      _id: string;
      title: string;
      slug: {
        current: string;
      };
    };
  };
  images: SanityImage[];
  isFeatured: boolean;
  seo?: SEO;
  sku?: string;
  productCode?: string;
  variant?: {
    _id: string;
    name: string;
  } | string;
  colors?: Array<{
    _id: string;
    name: string;
    value: string;
  } | string>;
  materials?: Array<{
    _id: string;
    name: string;
  } | string>;
  tipShapes?: Array<{
    _id: string;
    name: string;
  } | string>;
  // Legacy field for backward compatibility
  brand?: {
    _id: string;
    name: string;
  } | string;
  code?: {
    _id: string;
    value: string;
  } | string;
  // Legacy fields for backward compatibility
  id?: string;
  name?: string;
  originalPrice?: number;
  rating?: number;
  reviewCount?: number;
  specifications?: { [key: string]: string };
  isOnSale?: boolean;
  tags?: string[];
  material?: string;
}
  
export interface Category {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description: string;
  seo?: SEO;
  productCount: number;
  subcategories: Subcategory[];
  // Legacy fields for backward compatibility
  id?: string;
  name?: string;
  image?: SanityImage;
}

export interface Subcategory {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  parent: {
    _id: string;
    title: string;
    slug: {
      current: string;
    };
  };
  seo?: SEO;
  productCount: number;
  // Legacy fields for backward compatibility
  id?: string;
  name?: string;
}
  
  export interface CartItem {
    product: Product;
    quantity: number;
    selectedColor?: string | null;
    selectedMaterial?: string | null;
    selectedTipShape?: string | null;
  }
  
export interface SortOption {
  value: string;
  label: string;
}

export interface Banner {
  _id: string;
  title: string;
  image: SanityImage;
  headline: string;
  subText: string;
  buttonText: string;
  buttonUrl: string;
  order: number;
  isActive: boolean;
}

export interface StoreSettings {
  _id: string;
  storeName: string;
  logo: SanityImage;
  headerLinks: Array<{
    label: string;
    url: string;
  }>;
  footerLinks: Array<{
    label: string;
    url: string;
  }>;
  footerText: string;
  socialLinks: Array<{
    platform: string;
    url: string;
  }>;
  shippingCharges: {
    fixedCharge: number;
    freeShippingThreshold: number;
  };
  taxSettings: {
    taxPercentage: number;
    taxLabel: string;
  };
  heroSection?: {
    headline: string;
    description: string;
    primaryButton: {
      text: string;
      url: string;
    };
    secondaryButton: {
      text: string;
      url: string;
    };
  };
  carouselImages?: Array<{
    image: SanityImage;
    altText: string;
  }>;
  companyInfo?: {
    companyName: string;
    tagline?: string;
    description?: string;
  };
  seoSettings?: {
    siteTitle: string;
    siteDescription: string;
    ogImage: SanityImage;
  };
  whatsappNumber: string;
}

export interface FilterOptions {
  categories: Category[];
  subcategories: Subcategory[];
  materials: string[];
  brands: string[];
  priceRange: [number, number];
}

export interface OrderItem {
  product: {
    _ref: string;
    _type: 'reference';
  };
  quantity: number;
  price: number;
  total: number;
}

export interface Order {
  _id?: string;
  orderNumber: string;
  customer: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
  };
  shippingAddress: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  items: OrderItem[];
  paymentMethod: string;
  status: 'Pending' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Cancelled';
  pricing: {
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
  };
  notes?: string;
  orderDate: string;
}
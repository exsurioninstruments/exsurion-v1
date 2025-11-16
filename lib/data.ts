import { Product, Category } from "../types";

// export const categories: Category[] = [
//   {
//     id: 'scissors',
//     name: 'Surgical Scissors',
//     description: 'Precision cutting instruments for various surgical procedures',
//     image: 'https://images.pexels.com/photos/4202325/pexels-photo-4202325.jpeg',
//     productCount: 24,
//     subcategories: [
//       { id: 'general', name: 'General Purpose', productCount: 8 },
//       { id: 'dissecting', name: 'Dissecting Scissors', productCount: 6 },
//       { id: 'specialty', name: 'Specialty Scissors', productCount: 10 }
//     ]
//   },
//   {
//     id: 'forceps',
//     name: 'Forceps',
//     description: 'Grasping and holding instruments for surgical procedures',
//     image: 'https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg',
//     productCount: 32,
//     subcategories: [
//       { id: 'tissue', name: 'Tissue Forceps', productCount: 12 },
//       { id: 'hemostatic', name: 'Hemostatic Forceps', productCount: 10 },
//       { id: 'dressing', name: 'Dressing Forceps', productCount: 10 }
//     ]
//   },
//   {
//     id: 'retractors',
//     name: 'Retractors',
//     description: 'Instruments for holding back tissues during surgery',
//     image: 'https://images.pexels.com/photos/4226881/pexels-photo-4226881.jpeg',
//     productCount: 18,
//     subcategories: [
//       { id: 'handheld', name: 'Handheld Retractors', productCount: 8 },
//       { id: 'self-retaining', name: 'Self-Retaining', productCount: 10 }
//     ]
//   },
//   {
//     id: 'diagnostic',
//     name: 'Diagnostic Tools',
//     description: 'Essential tools for medical examination and diagnosis',
//     image: 'https://images.pexels.com/photos/4047145/pexels-photo-4047145.jpeg',
//     productCount: 15,
//     subcategories: [
//       { id: 'stethoscopes', name: 'Stethoscopes', productCount: 5 },
//       { id: 'otoscopes', name: 'Otoscopes', productCount: 4 },
//       { id: 'reflex-hammers', name: 'Reflex Hammers', productCount: 6 }
//     ]
//   },
//   {
//     id: 'orthopedic',
//     name: 'Orthopedic Instruments',
//     description: 'Specialized tools for bone and joint procedures',
//     image: 'https://images.pexels.com/photos/4167544/pexels-photo-4167544.jpeg',
//     productCount: 21,
//     subcategories: [
//       { id: 'bone-cutters', name: 'Bone Cutters', productCount: 7 },
//       { id: 'chisels', name: 'Chisels & Osteotomes', productCount: 8 },
//       { id: 'mallets', name: 'Mallets', productCount: 6 }
//     ]
//   }
// ];

// export const featuredProducts: Product[] = [
//   {
//     id: '1',
//     name: 'Mayo Scissors - Curved',
//     description: 'High-quality stainless steel curved Mayo scissors for general surgical procedures',
//     price: 89.99,
//     originalPrice: 109.99,
//     images: [
//       'https://images.pexels.com/photos/4202325/pexels-photo-4202325.jpeg',
//       'https://images.pexels.com/photos/4202328/pexels-photo-4202328.jpeg'
//     ],
//     category: 'scissors',
//     subcategory: 'general',
//     brand: 'MedPro',
//     material: 'Stainless Steel',
//     inStock: true,
//     stockCount: 15,
//     rating: 4.8,
//     reviewCount: 24,
//     specifications: {
//       'Length': '6.5 inches',
//       'Material': 'German Stainless Steel',
//       'Sterilization': 'Autoclavable',
//       'Warranty': '2 years'
//     },
//     isFeatured: true,
//     isOnSale: true,
//     tags: ['curved', 'general-surgery', 'autoclavable']
//   },
//   {
//     id: '2',
//     name: 'Adson Tissue Forceps',
//     description: 'Precision tissue forceps with fine teeth for delicate tissue handling',
//     price: 45.99,
//     images: [
//       'https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg'
//     ],
//     category: 'forceps',
//     subcategory: 'tissue',
//     brand: 'SurgiTech',
//     material: 'Stainless Steel',
//     inStock: true,
//     stockCount: 8,
//     rating: 4.9,
//     reviewCount: 31,
//     specifications: {
//       'Length': '4.75 inches',
//       'Teeth': 'Fine 1x2',
//       'Material': 'Premium Stainless Steel',
//       'Sterilization': 'Autoclavable'
//     },
//     isFeatured: true,
//     isOnSale: false,
//     tags: ['tissue', 'delicate', 'precision']
//   },
//   {
//     id: '3',
//     name: 'Weitlaner Retractor',
//     description: 'Self-retaining spreader for wound retraction during surgical procedures',
//     price: 125.99,
//     images: [
//       'https://images.pexels.com/photos/4226881/pexels-photo-4226881.jpeg'
//     ],
//     category: 'retractors',
//     subcategory: 'self-retaining',
//     brand: 'ProSurg',
//     material: 'Stainless Steel',
//     inStock: true,
//     stockCount: 12,
//     rating: 4.7,
//     reviewCount: 18,
//     specifications: {
//       'Length': '5.5 inches',
//       'Prongs': '4 sharp',
//       'Opening': 'Self-retaining mechanism',
//       'Material': 'Surgical Grade Steel'
//     },
//     isFeatured: true,
//     isOnSale: false,
//     tags: ['self-retaining', 'wound-retraction']
//   },
//   {
//     id: '4',
//     name: 'Premium Stethoscope',
//     description: 'High-quality dual-head stethoscope for accurate auscultation',
//     price: 199.99,
//     originalPrice: 249.99,
//     images: [
//       'https://images.pexels.com/photos/4047145/pexels-photo-4047145.jpeg'
//     ],
//     category: 'diagnostic',
//     subcategory: 'stethoscopes',
//     brand: 'MediCore',
//     material: 'Aluminum & Brass',
//     inStock: true,
//     stockCount: 20,
//     rating: 4.9,
//     reviewCount: 67,
//     specifications: {
//       'Chest Piece': 'Dual-head',
//       'Tubing': 'Latex-free',
//       'Length': '27 inches',
//       'Weight': '150g'
//     },
//     isFeatured: true,
//     isOnSale: true,
//     tags: ['cardiology', 'dual-head', 'premium']
//   }
// ];

// export const bannerSlides = [
//   {
//     id: 1,
//     title: 'Premium Surgical Instruments',
//     subtitle: 'Professional-grade tools for medical excellence',
//     ctaText: 'Shop Now',
//     ctaLink: '/products',
//     image: 'https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg'
//   },
//   {
//     id: 2,
//     title: 'New Orthopedic Collection',
//     subtitle: 'Advanced instruments for bone and joint procedures',
//     ctaText: 'Explore Collection',
//     ctaLink: '/category/orthopedic',
//     image: 'https://images.pexels.com/photos/4167544/pexels-photo-4167544.jpeg'
//   },
//   {
//     id: 3,
//     title: 'Quality You Can Trust',
//     subtitle: 'Precision-crafted instruments with 2-year warranty',
//     ctaText: 'Learn More',
//     ctaLink: '/about',
//     image: 'https://images.pexels.com/photos/4202325/pexels-photo-4202325.jpeg'
//   }
// ];

// export const sortOptions = [
//   { value: 'relevance', label: 'Relevance' },
//   { value: 'price-low', label: 'Price: Low to High' },
//   { value: 'price-high', label: 'Price: High to Low' },
//   { value: 'newest', label: 'Newest' },
//   { value: 'rating', label: 'Highest Rated' },
//   { value: 'name', label: 'Name A-Z' }
// ];

// export const materials = [
//   'Stainless Steel',
//   'German Stainless Steel',
//   'Titanium',
//   'Aluminum',
//   'Carbon Steel'
// ];

// export const brands = [
//   'MedPro',
//   'SurgiTech',
//   'ProSurg',
//   'MediCore',
//   'PrecisionMed'
// ];
'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { 
  ShoppingCart, 
  Heart, 
  ArrowLeft, 
  CheckCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useProduct } from '@/lib/sanity/hooks';
import { transformProduct, getProductName, getProductDescription, getProductImages } from '@/lib/sanity/utils';

export default function ProductDetailPage() {
  const params = useParams();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageZoom, setImageZoom] = useState({ x: 0, y: 0, isHovering: false });
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  const [selectedTipShape, setSelectedTipShape] = useState<string | null>(null);

  // Fetch single product by slug from Sanity
  const { data: productData, loading, error } = useProduct(params.productId as string);

  // Get product data using utility functions (before early returns to use in hooks)
  const product = productData ? transformProduct(productData) : null;
  const productName = product ? getProductName(product) : '';
  const productDescription = product ? getProductDescription(product) : '';
  const productImages = product ? getProductImages(product) : [];

  // Initialize selected color and material when product loads
  useEffect(() => {
    if (product) {
      // Set first color as selected if available and none selected
      if (product.colors && product.colors.length > 0) {
        const firstColor = product.colors[0];
        const firstColorId = typeof firstColor === 'object' && firstColor?._id 
          ? firstColor._id 
          : `color-0`;
        setSelectedColor(prev => prev || firstColorId);
      }
      
      // Set first material as selected if available and none selected
      if (product.materials && product.materials.length > 0) {
        const firstMaterial = product.materials[0];
        const firstMaterialId = typeof firstMaterial === 'object' && firstMaterial?._id 
          ? firstMaterial._id 
          : `material-0`;
        setSelectedMaterial(prev => prev || firstMaterialId);
      }
      
      // Set first tip shape as selected if available and none selected
      if (product.tipShapes && product.tipShapes.length > 0) {
        const firstTipShape = product.tipShapes[0];
        const firstTipShapeId = typeof firstTipShape === 'object' && firstTipShape?._id 
          ? firstTipShape._id 
          : `tipShape-0`;
        setSelectedTipShape(prev => prev || firstTipShapeId);
      }
    }
  }, [product]);

  // Keyboard navigation for images (must be before early returns)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (productImages.length <= 1) return;
      if (e.key === 'ArrowLeft') {
        setSelectedImage((prev) => (prev === 0 ? productImages.length - 1 : prev - 1));
      } else if (e.key === 'ArrowRight') {
        setSelectedImage((prev) => (prev === productImages.length - 1 ? 0 : prev + 1));
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [productImages.length]);

  // Show loading state
  if (loading) {
    return (
      <motion.div
        className="min-h-screen flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="h-8 w-48 bg-muted animate-pulse rounded mb-4 mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          />
          <motion.div
            className="h-4 w-64 bg-muted animate-pulse rounded mb-6 mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          />
          <motion.div
            className="h-10 w-32 bg-muted animate-pulse rounded mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          />
        </motion.div>
      </motion.div>
    );
  }

  // Show error state
  if (error) {
    return (
      <motion.div
        className="min-h-screen flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="text-2xl font-bold mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            Failed to load product
          </motion.h1>
          <motion.p
            className="text-muted-foreground mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            There was an error loading the product. Please try again later.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }

  if (!product) {
    return (
      <motion.div
        className="min-h-screen flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="text-2xl font-bold mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            Product Not Found
          </motion.h1>
          <motion.p
            className="text-muted-foreground mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            The product you&apos;re looking for doesn&apos;t exist.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/products">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Products
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity, selectedColor, selectedMaterial, selectedTipShape);
    }
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handlePreviousImage = () => {
    setSelectedImage((prev) => (prev === 0 ? productImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev === productImages.length - 1 ? 0 : prev + 1));
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
        duration: 0.4,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
    },
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
    },
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
    },
  };

  // Generate structured data for SEO
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://exsurion.com";
  const productUrl = `${baseUrl}/product/${params.productId}`;
  
  const structuredData = product ? {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": productName,
    "description": productDescription,
    "image": productImages.length > 0 ? productImages : [],
    "sku": product.sku || product.productCode || "",
    "mpn": product.productCode || product.sku || "",
    "brand": {
      "@type": "Brand",
      "name": "Exsurion"
    },
    "offers": {
      "@type": "Offer",
      "url": productUrl,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      "itemCondition": "https://schema.org/NewCondition"
    },
    "category": product.category?.title || "",
    "manufacturer": {
      "@type": "Organization",
      "name": "Exsurion"
    }
  } : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Structured Data for SEO */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
      
      {/* Decorative background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Breadcrumb */}
        <motion.div
          className="flex items-center space-x-2 text-sm text-muted-foreground mb-8"
          variants={itemVariants}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span className="text-muted-foreground/50">/</span>
          <Link href="/products" className="hover:text-foreground transition-colors">Products</Link>
          <span className="text-muted-foreground/50">/</span>
          <span className="text-foreground font-medium">{productName}</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <motion.div
            className="space-y-6"
            variants={slideInLeft}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Main Image */}
            <motion.div
              className="aspect-square relative overflow-hidden rounded-2xl border-2 border-border/50 bg-card shadow-2xl group cursor-zoom-in"
              variants={imageVariants}
              whileHover={{ scale: 1.01, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              onMouseEnter={() => setImageZoom(prev => ({ ...prev, isHovering: true }))}
              onMouseLeave={() => setImageZoom(prev => ({ ...prev, isHovering: false }))}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                setImageZoom({ x, y, isHovering: true });
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={productImages[selectedImage] || '/background.png'}
                    alt={`${productName} - Image ${selectedImage + 1}`}
                    fill
                    className="object-cover transition-transform duration-300"
                    style={{
                      transform: imageZoom.isHovering 
                        ? `scale(2) translate(${(50 - imageZoom.x) * 0.5}%, ${(50 - imageZoom.y) * 0.5}%)`
                        : 'scale(1)',
                      transformOrigin: `${imageZoom.x}% ${imageZoom.y}%`,
                    }}
                    priority={selectedImage === 0}
                  />
                </motion.div>
              </div>
              
              {/* Carousel Navigation Buttons */}
              {productImages.length > 1 && (
                <>
                  {/* Previous Button */}
                  <motion.div
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-30"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.3 }}
                    onMouseEnter={() => setImageZoom(prev => ({ ...prev, isHovering: false }))}
                    onMouseLeave={() => setImageZoom(prev => ({ ...prev, isHovering: false }))}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePreviousImage();
                      }}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg border border-border/50 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
                    </Button>
                  </motion.div>

                  {/* Next Button */}
                  <motion.div
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-30"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.3 }}
                    onMouseEnter={() => setImageZoom(prev => ({ ...prev, isHovering: false }))}
                    onMouseLeave={() => setImageZoom(prev => ({ ...prev, isHovering: false }))}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNextImage();
                      }}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg border border-border/50 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
                    </Button>
                  </motion.div>

                  {/* Image Counter */}
                  <motion.div
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.3 }}
                    onMouseEnter={() => setImageZoom(prev => ({ ...prev, isHovering: false }))}
                    onMouseLeave={() => setImageZoom(prev => ({ ...prev, isHovering: false }))}
                  >
                    <div className="px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-medium opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                      {selectedImage + 1} / {productImages.length}
                    </div>
                  </motion.div>
                </>
              )}
              
              {/* Badges */}
              <motion.div
                className="absolute top-6 left-6 flex flex-col gap-3 z-20"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                
                {product.isFeatured && (
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Badge className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg px-3 py-1.5 text-sm font-semibold">
                      ⭐ Featured
                    </Badge>
                  </motion.div>
                )}
              </motion.div>

              {/* Wishlist Button */}
              <motion.div
                className="absolute top-6 right-6 z-20"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleWishlist}
                  className="w-12 h-12 p-0 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-full border border-border/50"
                >
                  <Heart className={`w-5 h-5 transition-all ${isWishlisted ? 'fill-red-500 text-red-500 scale-110' : 'text-gray-700'}`} />
                </Button>
              </motion.div>
            </motion.div>

            {/* Thumbnail Images */}
            {productImages.length > 1 && (
              <motion.div
                className="grid grid-cols-4 gap-3"
                variants={itemVariants}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              >
                {productImages.map((image, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square relative overflow-hidden rounded-xl border-2 transition-all duration-300 group ${
                      selectedImage === index 
                        ? 'border-primary shadow-lg ring-2 ring-primary/20 scale-105' 
                        : 'border-border/50 hover:border-primary/50'
                    }`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
                    whileHover={{ scale: 1.08, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                    <Image
                      src={image || '/background.png'}
                      alt={`${productName} ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {selectedImage === index && (
                      <motion.div
                        className="absolute inset-0 border-2 border-primary rounded-xl"
                        layoutId="selectedImage"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            className="space-y-8"
            variants={slideInRight}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Header */}
            <motion.div
              className="space-y-4"
              variants={itemVariants}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            >
              <motion.h1
                className="text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {product.name}
              </motion.h1>
              
              {product.productCode && (
                <motion.p
                  className="text-muted-foreground text-lg leading-relaxed max-w-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  Product Code: <span className="font-semibold text-foreground">{product.productCode}</span>
                </motion.p>
              )}

            </motion.div>

            {/* Product Details, Quantity and Add to Cart */}
            <motion.div
              className="space-y-6 p-6 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm"
              variants={itemVariants}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Product Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-border/50">
                {product.sku && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">SKU</p>
                    <p className="text-sm font-semibold">{product.sku}</p>
                  </div>
                )}
                
                
                {/* Color Selector */}
                {product.colors && product.colors.length > 0 && (
                  <div>
                    <Label className="text-sm font-semibold text-foreground mb-3 block">Select Color</Label>
                    <TooltipProvider>
                      <div className="flex flex-wrap gap-3">
                        {product.colors.map((color, index) => {
                          const colorObj = typeof color === 'object' ? color : null;
                          const colorName = colorObj?.name || (typeof color === 'string' ? color : '');
                          const colorValue = colorObj?.value || '#000000';
                          const colorId = colorObj?._id || `color-${index}`;
                          const isSelected = selectedColor === colorId;
                          
                          return (
                            <Tooltip key={colorId}>
                              <TooltipTrigger asChild>
                                <motion.button
                                  onClick={() => setSelectedColor(colorId)}
                                  className={`w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                                    isSelected 
                                      ? 'border-white shadow-lg ring-2 ring-primary ring-offset-2 ring-offset-background scale-110' 
                                      : 'border-border/50 hover:border-white/50 hover:scale-105'
                                  }`}
                                  style={{ backgroundColor: colorValue }}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.95 }}
                                  aria-label={colorName}
                                />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{colorName}</p>
                              </TooltipContent>
                            </Tooltip>
                          );
                        })}
                      </div>
                    </TooltipProvider>
                  </div>
                )}

                {/* Material Selector */}
                {product.materials && product.materials.length > 0 && (
                  <div>
                    <Label className="text-sm font-semibold text-foreground mb-3 block">Select Material</Label>
                    <div className="flex flex-wrap gap-3">
                      {product.materials.map((material, index) => {
                        const materialObj = typeof material === 'object' ? material : null;
                        const materialName = materialObj?.name || (typeof material === 'string' ? material : '');
                        const materialId = materialObj?._id || `material-${index}`;
                        const isSelected = selectedMaterial === materialId;
                        
                        return (
                          <motion.button
                            key={materialId}
                            onClick={() => setSelectedMaterial(materialId)}
                            className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 text-sm font-medium ${
                              isSelected
                                ? 'border-white bg-primary text-primary-foreground shadow-lg ring-2 ring-primary ring-offset-2 ring-offset-background'
                                : 'border-border/50 bg-card hover:border-white/50 hover:bg-card/80'
                            }`}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {materialName}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Tip Shape Selector */}
                {product.tipShapes && product.tipShapes.length > 0 && (
                  <div>
                    <Label className="text-sm font-semibold text-foreground mb-3 block">Select Tip Shape</Label>
                    <div className="flex flex-wrap gap-3">
                      {product.tipShapes.map((tipShape, index) => {
                        const tipShapeObj = typeof tipShape === 'object' ? tipShape : null;
                        const tipShapeName = tipShapeObj?.name || (typeof tipShape === 'string' ? tipShape : '');
                        const tipShapeId = tipShapeObj?._id || `tipShape-${index}`;
                        const isSelected = selectedTipShape === tipShapeId;
                        
                        return (
                          <motion.button
                            key={tipShapeId}
                            onClick={() => setSelectedTipShape(tipShapeId)}
                            className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 text-sm font-medium ${
                              isSelected
                                ? 'border-white bg-primary text-primary-foreground shadow-lg ring-2 ring-primary ring-offset-2 ring-offset-background'
                                : 'border-border/50 bg-card hover:border-white/50 hover:bg-card/80'
                            }`}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {tipShapeName}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Quantity */}
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                <Label htmlFor="quantity" className="text-sm font-semibold text-foreground">Quantity:</Label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-10 w-10 shrink-0"
                  >
                    <span className="text-lg">−</span>
                  </Button>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    max="9999"
                    value={quantity}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 1;
                      setQuantity(Math.max(1, Math.min(9999, value)));
                    }}
                    className="h-10 w-20 text-center text-base font-semibold"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.min(9999, quantity + 1))}
                    className="h-10 w-10 shrink-0"
                  >
                    <span className="text-lg">+</span>
                  </Button>
                </div>
              </motion.div>

              {/* Add to Cart */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.4 }}
              >
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full"
                >
                  <Button
                    onClick={handleAddToCart}
                    size="lg"
                    className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-stone-100 to-orange-200 text-gray-800 hover:from-stone-200 hover:to-orange-300 shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Custom Design Info */}
            <motion.div
              className="pt-6"
              variants={itemVariants}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            >
              <motion.div
                className="p-6 rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.4 }}
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/20 flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2 text-foreground">Custom Design Available</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Contact us to design custom colors, materials, and sizes for this instrument. We'll work with you to create the perfect solution for your specific needs.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Product Details Section with Tabs */}
        <motion.div
          className="mt-16 lg:mt-20"
          variants={itemVariants}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.div
            className="bg-white border-2 border-border/50 rounded-3xl p-8 lg:p-12 shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="description" className="text-base font-semibold">
                  Description
                </TabsTrigger>
                <TabsTrigger value="delivery" className="text-base font-semibold">
                  Delivery
                </TabsTrigger>
                <TabsTrigger value="returns" className="text-base font-semibold">
                  Return Policy
                </TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h3 className="text-2xl font-bold mb-4 text-black">Product Description</h3>
                  <div className="prose prose-lg max-w-none">
                    <p className=" leading-relaxed text-base mb-6 text-black">
                      {productDescription}
                    </p>
                  </div>
                  {product.tags && product.tags.length > 0 && (
                    <div className="mt-8 pt-8 border-t border-border/50">
                      <h4 className="font-bold text-xl mb-4">Key Features:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {product.tags.slice(0, 6).map((tag, index) => (
                          <motion.div
                            key={index}
                            className="flex items-center gap-2 p-3 rounded-lg bg-muted/30 border border-border/50"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.3 }}
                          >
                            <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                            <span className="text-sm capitalize">{tag.replace('-', ' ')}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </TabsContent>

              <TabsContent value="delivery" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h3 className="text-2xl font-bold mb-4 text-black">Delivery Information</h3>
                  <div className="space-y-4 text-black">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Standard Delivery</h4>
                      <p className="leading-relaxed">
                        We offer standard delivery within 5-7 business days for most locations. 
                        Orders are processed within 1-2 business days after payment confirmation.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Express Delivery</h4>
                      <p className="leading-relaxed">
                        Express delivery is available for an additional fee. Orders placed before 2 PM 
                        on weekdays will be delivered within 2-3 business days.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Free Shipping</h4>
                      <p className="leading-relaxed">
                        Free standard shipping is available on orders over $50. Free shipping applies 
                        to standard delivery only.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">International Delivery</h4>
                      <p className="leading-relaxed">
                        International shipping is available to select countries. Delivery times vary 
                        by location and may take 10-21 business days. Additional customs fees may apply.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Tracking</h4>
                      <p className="leading-relaxed">
                        Once your order ships, you'll receive a tracking number via email. You can 
                        track your package in real-time through our tracking portal.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="returns" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h3 className="text-2xl font-bold mb-4 text-black">Return Policy</h3>
                  <div className="space-y-4 text-black">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">30-Day Return Window</h4>
                      <p className="leading-relaxed">
                        You have 30 days from the date of delivery to return items in their original 
                        condition. Items must be unused, unwashed, and with all original tags attached.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Return Process</h4>
                      <p className="leading-relaxed">
                        To initiate a return, please contact our customer service team or use our 
                        online return portal. You'll receive a return authorization and shipping label. 
                        Returns are free of charge for eligible items.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Refund Processing</h4>
                      <p className="leading-relaxed">
                        Once we receive and inspect your returned item, we'll process your refund 
                        within 5-7 business days. Refunds will be issued to the original payment method.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Non-Returnable Items</h4>
                      <p className="leading-relaxed">
                        Customized items, personalized products, and items damaged by misuse are not 
                        eligible for return. Sale items may have different return policies.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Exchanges</h4>
                      <p className="leading-relaxed">
                        We're happy to exchange items for a different size or color, subject to 
                        availability. Please contact customer service to arrange an exchange.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

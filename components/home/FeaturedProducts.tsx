'use client';

import React from 'react';
import { useFeaturedProducts } from '@/lib/sanity/hooks';
import { transformProduct } from '@/lib/sanity/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductCard from '../products/ProductCard';

const FeaturedProducts = () => {
  const { data: featuredProducts, loading, error } = useFeaturedProducts();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Transform products for backward compatibility
  const transformedProducts = Array.isArray(featuredProducts) ? featuredProducts.map(transformProduct) : [];
  return (
    <section className="py-16 bg-background">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div className="mb-6 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Discover our most popular and highest-rated surgical instruments, 
              trusted by medical professionals worldwide.
            </p>
          </div>
          <Link href="/products">
            <Button variant="outline" className="flex items-center space-x-2">
              <span>View All Products</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-card border border-border rounded-lg overflow-hidden shadow-sm h-80 animate-pulse">
                <div className="aspect-square bg-muted" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-muted rounded" />
                  <div className="h-3 bg-muted rounded w-2/3" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Failed to load featured products</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {transformedProducts.map((product: any, index: number) => (
              <motion.div key={product.id || product._id} variants={itemVariants}>
                <ProductCard product={product} priority={index < 4} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
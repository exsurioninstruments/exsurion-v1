'use client';
import React from 'react';
import ProductCard from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useProducts } from '@/lib/sanity/hooks';

const BestSellers = () => {
  const { data: products, loading, error } = useProducts();

  // Handle loading and error states if needed
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading products.</div>;

  // Ensure products is an array before filtering
  const bestSellingProducts =
    Array.isArray(products) ? products.filter((product: any) => product.isOnSale) : [];

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

  return (
    <section className="py-16 bg-muted/20">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="w-6 h-6 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold">
                Best Sellers & On Sale
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Don't miss out on our most popular surgical instruments at special prices. 
              Limited time offers on professional-grade equipment.
            </p>
          </div>
          <Link href="/sale">
            <Button variant="outline" className="flex items-center space-x-2">
              <span>View All Deals</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {bestSellingProducts.map((product: any, index: number) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard product={product} priority={index < 4} />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 bg-primary text-primary-foreground rounded-lg p-8 md:p-12 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Need Help Choosing the Right Instruments?
          </h3>
          <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
            Our expert team is here to help you find the perfect surgical instruments for your practice. 
            Get personalized recommendations based on your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="secondary" size="lg">
                Contact Expert
              </Button>
            </Link>
            <Link href="/catalog">
              <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
                Download Catalog
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BestSellers;
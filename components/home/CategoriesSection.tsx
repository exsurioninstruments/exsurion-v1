'use client';

import React from 'react';
import Link from 'next/link';
import { useCategories } from '@/lib/sanity/hooks';
import { transformCategory, getCategoryName, getCategoryUrl } from '@/lib/sanity/utils';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const CategoriesSection = () => {
  const { data: categories, loading, error } = useCategories();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Transform categories for backward compatibility
  const transformedCategories = Array.isArray(categories) ? categories.map(transformCategory) : [];
  return (
    <section className="py-16 bg-background">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our comprehensive range of professional surgical instruments, 
            carefully organized by specialty and procedure type.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-card border border-border rounded-lg overflow-hidden shadow-sm animate-pulse">
                <div className="aspect-[4/3] bg-muted" />
                <div className="p-6 space-y-2">
                  <div className="h-5 bg-muted rounded" />
                  <div className="h-3 bg-muted rounded" />
                  <div className="h-3 bg-muted rounded w-2/3" />
                  <div className="flex justify-between items-center">
                    <div className="h-3 bg-muted rounded w-1/3" />
                    <div className="w-4 h-4 bg-muted rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Failed to load categories</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
          >
            {transformedCategories.map((category: any) => (
              <motion.div
                key={category.id || category._id}
                variants={cardVariants}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <Link href={getCategoryUrl(category)} className="h-full">
                  <div className="group bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <div
                        className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                        style={{ backgroundImage: `url(${category.image || '/excurion.svg'})` }}
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                        {getCategoryName(category)}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 leading-relaxed line-clamp-3 flex-1">
                        {category.description}
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-sm text-muted-foreground">
                          {category.productCount} products
                        </span>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CategoriesSection;
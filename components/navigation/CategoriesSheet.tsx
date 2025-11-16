'use client';

import React, { useState } from 'react';
import { X, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useCategories } from '@/lib/sanity/hooks';
import { transformCategory, getCategoryName, getSubcategoryName, getCategoryUrl, getSubcategoryUrl } from '@/lib/sanity/utils';

interface CategoriesSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const CategoriesSheet: React.FC<CategoriesSheetProps> = ({ isOpen, onClose }) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const { data: categoriesData, loading, error } = useCategories();

  // Transform categories for backward compatibility
  const transformedCategories = Array.isArray(categoriesData) ? categoriesData.map(transformCategory) : [];

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const sheetVariants = {
    hidden: { x: '-100%' },
    visible: { x: 0 }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const subcategoryVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: 'auto', opacity: 1 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/50 md:hidden"
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            variants={sheetVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 z-50 h-full w-full max-w-sm bg-background border-r border-border shadow-xl md:hidden"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="text-lg font-semibold">Categories</h2>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Categories list */}
              <div className="flex-1 overflow-y-auto p-6">
                {loading ? (
                  <div className="space-y-2">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="border border-border rounded-lg overflow-hidden">
                        <div className="flex items-center justify-between p-4">
                          <div className="h-4 w-32 bg-muted animate-pulse rounded" />
                          <div className="h-4 w-4 bg-muted animate-pulse rounded" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : error ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Failed to load categories</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {transformedCategories.map((category: any) => (
                      <div key={category.id || category._id} className="border border-border rounded-lg overflow-hidden">
                        <div className="flex items-center justify-between">
                          <Link
                            href={getCategoryUrl(category)}
                            className="flex-1 px-4 py-3 text-sm font-medium hover:bg-accent transition-colors"
                            onClick={onClose}
                          >
                            {getCategoryName(category)}
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleCategory(category.id || category._id)}
                            className="px-3 py-3"
                          >
                            {expandedCategory === (category.id || category._id) ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
                            )}
                          </Button>
                        </div>

                        <AnimatePresence>
                          {expandedCategory === (category.id || category._id) && (
                            <motion.div
                              variants={subcategoryVariants}
                              initial="hidden"
                              animate="visible"
                              exit="hidden"
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="border-t border-border bg-muted/20">
                                {category.subcategories?.map((sub: any) => (
                                  <Link
                                    key={sub.id || sub._id}
                                    href={getSubcategoryUrl(category, sub)}
                                    className="block px-6 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                                    onClick={onClose}
                                  >
                                    {getSubcategoryName(sub)}
                                    <span className="text-muted-foreground/70 ml-2">({sub.productCount})</span>
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-border">
                <Link href="/products" className="block">
                  <Button className="w-full" onClick={onClose}>
                    View All Products
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CategoriesSheet;
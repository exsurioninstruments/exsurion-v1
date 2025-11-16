'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { X, ShoppingBag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { getProductName, getProductImages, getBrandName } from '@/lib/sanity/utils';

const CartPage = () => {
  const { items, updateQuantity, removeFromCart } = useCart();

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
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -100 }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added any instruments to your cart yet.
          </p>
          <Link href="/">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground">
            Review your selected surgical instruments before checkout
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              <AnimatePresence>
                {items.map((item, index) => (
                  <motion.div
                    key={`${item.product.id || item.product._id}-${item.selectedColor || 'no-color'}-${item.selectedMaterial || 'no-material'}-${item.selectedTipShape || 'no-tipshape'}-${index}`}
                    variants={itemVariants}
                    layout
                    exit="exit"
                    className="bg-card border border-border rounded-lg p-6"
                  >
                    <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                      <Image
                        src={getProductImages(item.product)[0] || '/background.png'}
                        alt={getProductName(item.product)}
                        width={96}
                        height={96}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">
                          {getProductName(item.product)}
                        </h3>
                        {item.product.productCode && (
                          <p className="text-sm text-muted-foreground mb-1">Product Code: {item.product.productCode}</p>
                        )}
                        {item.product.sku && (
                          <p className="text-sm text-muted-foreground mb-1">SKU: {item.product.sku}</p>
                        )}
                        {/* Product details: Color, Material, and Tip Shape */}
                        <div className="flex flex-wrap gap-2 mb-2">
                          {item.selectedColor && item.product.colors && (
                            (() => {
                              const selectedColorObj = item.product.colors.find((c: any) => 
                                (typeof c === 'object' && c?._id === item.selectedColor) || 
                                (typeof c === 'string' && c === item.selectedColor)
                              );
                              const colorName = typeof selectedColorObj === 'object' && selectedColorObj?.name 
                                ? selectedColorObj.name 
                                : item.selectedColor;
                              const colorValue = typeof selectedColorObj === 'object' && selectedColorObj?.value 
                                ? selectedColorObj.value 
                                : '#000000';
                              return (
                                <div className="flex items-center gap-1.5">
                                  <div 
                                    className="w-4 h-4 rounded-full border border-border/50" 
                                    style={{ backgroundColor: colorValue }}
                                  />
                                  <span className="text-sm text-muted-foreground">{colorName}</span>
                                </div>
                              );
                            })()
                          )}
                          {item.selectedMaterial && item.product.materials && (
                            (() => {
                              const selectedMaterialObj = item.product.materials.find((m: any) => 
                                (typeof m === 'object' && m?._id === item.selectedMaterial) || 
                                (typeof m === 'string' && m === item.selectedMaterial)
                              );
                              const materialName = typeof selectedMaterialObj === 'object' && selectedMaterialObj?.name 
                                ? selectedMaterialObj.name 
                                : item.selectedMaterial;
                              return (
                                <span className="text-sm text-muted-foreground px-2 py-1 bg-muted/50 rounded">
                                  {materialName}
                                </span>
                              );
                            })()
                          )}
                          {item.selectedTipShape && item.product.tipShapes && (
                            (() => {
                              const selectedTipShapeObj = item.product.tipShapes.find((t: any) => 
                                (typeof t === 'object' && t?._id === item.selectedTipShape) || 
                                (typeof t === 'string' && t === item.selectedTipShape)
                              );
                              const tipShapeName = typeof selectedTipShapeObj === 'object' && selectedTipShapeObj?.name 
                                ? selectedTipShapeObj.name 
                                : item.selectedTipShape;
                              return (
                                <span className="text-sm text-muted-foreground px-2 py-1 bg-muted/50 rounded">
                                  Tip: {tipShapeName}
                                </span>
                              );
                            })()
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between md:justify-end space-x-4">
                        {/* Quantity Input */}
                        <Input
                          type="number"
                          min="1"
                          max="9999"
                          value={item.quantity}
                          onChange={(e) => {
                            const value = parseInt(e.target.value) || 1;
                            updateQuantity(item.product.id || item.product._id, Math.max(1, Math.min(9999, value)));
                          }}
                          className="w-20 h-10 text-center text-sm font-medium"
                        />

                        {/* Remove */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.product.id || item.product._id)}
                          className="text-muted-foreground hover:text-destructive p-1"
                        >
                          <X className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Continue Shopping */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8"
            >
              <Link href="/">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="bg-card border border-border rounded-lg p-6 sticky top-8">
              <h2 className="font-semibold text-lg mb-6">Quote Request Summary</h2>
              
              <div className="bg-muted/20 border border-border rounded-lg p-4 mb-6">
                <p className="text-sm text-muted-foreground">
                  Our team will review your quote request and contact you within 24-48 hours with pricing and availability information.
                </p>
              </div>

              <div className="mt-6 space-y-3">
                <Link href="/checkout" className="block">
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    Request Quote
                  </Button>
                </Link>
              </div>

              {/* Security badges */}
              <div className="mt-6 pt-6 border-t border-border text-center">
                <p className="text-xs text-muted-foreground mb-2">Secure Checkout</p>
                <div className="flex justify-center space-x-2 text-xs text-muted-foreground">
                  <span>🔒 SSL Encrypted</span>
                  <span>• 256-bit Security</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
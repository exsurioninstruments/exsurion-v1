'use client';

import React from 'react';
import { X, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { getProductName, getProductImages, getBrandName } from '@/lib/sanity/utils';

const CartDrawer = () => {
  const { items, total, itemCount, isOpen, setIsOpen, updateQuantity, removeFromCart } = useCart();

  const drawerVariants = {
    hidden: { x: '100%' },
    visible: { x: 0 }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
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
            className="fixed inset-0 z-50 bg-black/50"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-background border-l border-border shadow-xl"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="w-5 h-5" />
                  <h2 className="text-lg font-semibold">Shopping Cart</h2>
                  {itemCount > 0 && (
                    <Badge variant="secondary">{itemCount}</Badge>
                  )}
                </div>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Cart items */}
              <div className="flex-1 overflow-y-auto p-6">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <ShoppingBag className="w-12 h-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
                    <p className="text-muted-foreground mb-6">
                      Discover our premium surgical instruments
                    </p>
                    <Link href="/products">
                      <Button onClick={() => setIsOpen(false)}>
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <motion.div layout className="space-y-4">
                    <AnimatePresence>
                      {items.map((item, index) => (
                        <motion.div
                          key={`${item.product.id || item.product._id}-${item.selectedColor || 'no-color'}-${item.selectedMaterial || 'no-material'}-${item.selectedTipShape || 'no-tipshape'}-${index}`}
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          layout
                          className="flex space-x-4 bg-muted/20 p-4 rounded-lg"
                        >
                          <Image
                            src={getProductImages(item.product)[0] || '/background.png'}
                            alt={getProductName(item.product)}
                            width={64}
                            height={64}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm leading-tight mb-1">
                              {getProductName(item.product)}
                            </h4>
                            {item.product.productCode && (
                              <p className="text-xs text-muted-foreground mb-1">Product Code: {item.product.productCode}</p>
                            )}
                            {item.product.sku && (
                              <p className="text-xs text-muted-foreground mb-1">SKU: {item.product.sku}</p>
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
                                        className="w-3 h-3 rounded-full border border-border/50" 
                                        style={{ backgroundColor: colorValue }}
                                      />
                                      <span className="text-xs text-muted-foreground">{colorName}</span>
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
                                    <span className="text-xs text-muted-foreground px-2 py-0.5 bg-muted/50 rounded">
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
                                    <span className="text-xs text-muted-foreground px-2 py-0.5 bg-muted/50 rounded">
                                      Tip: {tipShapeName}
                                    </span>
                                  );
                                })()
                              )}
                            </div>
                            <div className="flex items-center justify-end">
                              <Input
                                type="number"
                                min="1"
                                max="9999"
                                value={item.quantity}
                                onChange={(e) => {
                                  const value = parseInt(e.target.value) || 1;
                                  updateQuantity(item.product.id || item.product._id, Math.max(1, Math.min(9999, value)));
                                }}
                                className="w-16 h-8 text-center text-sm font-medium"
                              />
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground hover:text-destructive p-1"
                            onClick={() => removeFromCart(item.product.id || item.product._id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="p-6 border-t border-border space-y-4">
                  <div className="space-y-2">
                    <Link href="/cart" className="block">
                      <Button 
                        className="w-full" 
                        variant="outline"
                        onClick={() => setIsOpen(false)}
                      >
                        View Cart
                      </Button>
                    </Link>
                    <Link href="/checkout" className="block">
                      <Button 
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                        onClick={() => setIsOpen(false)}
                      >
                        Checkout
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
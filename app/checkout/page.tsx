'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Truck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import Image from 'next/image';
import { getProductName, getProductImages } from '@/lib/sanity/utils';

const CheckoutPage = () => {
  const { items, clearCart } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      // Prepare quote request data
      const quoteItems = items.map((item) => {
        const productId = item.product._id || item.product.id;
        if (!productId) {
          throw new Error(`Product ID not found for item: ${getProductName(item.product)}`);
        }

        const sku = item.product.sku || '';
        const productCode = item.product.productCode || '';
        
        // Get selected color name
        let colorName: string | null = null;
        if (item.selectedColor && item.product.colors) {
          const selectedColorObj = item.product.colors.find((c: any) => 
            (typeof c === 'object' && c?._id === item.selectedColor) || 
            (typeof c === 'string' && c === item.selectedColor)
          );
          if (selectedColorObj) {
            colorName = typeof selectedColorObj === 'object' && selectedColorObj?.name 
              ? selectedColorObj.name 
              : item.selectedColor;
          }
        }
        
        // Get selected material name
        let materialName: string | null = null;
        if (item.selectedMaterial && item.product.materials) {
          const selectedMaterialObj = item.product.materials.find((m: any) => 
            (typeof m === 'object' && m?._id === item.selectedMaterial) || 
            (typeof m === 'string' && m === item.selectedMaterial)
          );
          if (selectedMaterialObj) {
            materialName = typeof selectedMaterialObj === 'object' && selectedMaterialObj?.name 
              ? selectedMaterialObj.name 
              : item.selectedMaterial;
          }
        }

        // Get selected tip shape name
        let tipShapeName: string | null = null;
        if (item.selectedTipShape && item.product.tipShapes) {
          const selectedTipShapeObj = item.product.tipShapes.find((t: any) => 
            (typeof t === 'object' && t?._id === item.selectedTipShape) || 
            (typeof t === 'string' && t === item.selectedTipShape)
          );
          if (selectedTipShapeObj) {
            tipShapeName = typeof selectedTipShapeObj === 'object' && selectedTipShapeObj?.name 
              ? selectedTipShapeObj.name 
              : item.selectedTipShape;
          }
        }
        
        return {
          productId,
          productName: getProductName(item.product),
          sku,
          ...(productCode ? { productCode } : {}),
          quantity: item.quantity,
          ...(colorName ? { color: colorName } : {}),
          ...(materialName ? { material: materialName } : {}),
          ...(tipShapeName ? { tipShape: tipShapeName } : {}),
        };
      });

      const quoteData = {
        customer: {
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
        },
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
        },
        items: quoteItems,
      };

      // Send quote request via API route
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quoteData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit quote request');
      }

      clearCart();
      
      // Redirect to thank you page
      router.push('/checkout/thank-you');
      
    } catch (error) {
      console.error('Quote request error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to submit quote request. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No items in cart</h1>
          <p className="text-muted-foreground mb-8">
            Add some products to your cart before checking out.
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
    <div className="min-h-screen bg-muted/20">
      <div className="container-custom py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Request a Quote</h1>
          <p className="text-muted-foreground">
            Fill in your information to receive a quote for professional surgical instruments
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <motion.form
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <span>Contact Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Truck className="w-5 h-5" />
                    <span>Shipping Address</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="address">Street Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              <Button
                type="submit"
                className="w-full py-3 text-lg"
                disabled={isProcessing}
              >
                {isProcessing ? 'Submitting...' : 'Get Quote'}
              </Button>
            </motion.form>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-1"
          >
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Quote Request Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items */}
                <div className="space-y-3">
                  {items.map((item) => {
                    // Get selected color name and value
                    let colorName: string | null = null;
                    let colorValue: string | null = null;
                    if (item.selectedColor && item.product.colors) {
                      const selectedColorObj = item.product.colors.find((c: any) => 
                        (typeof c === 'object' && c?._id === item.selectedColor) || 
                        (typeof c === 'string' && c === item.selectedColor)
                      );
                      if (selectedColorObj) {
                        colorName = typeof selectedColorObj === 'object' && selectedColorObj?.name 
                          ? selectedColorObj.name 
                          : item.selectedColor;
                        colorValue = typeof selectedColorObj === 'object' && selectedColorObj?.value 
                          ? selectedColorObj.value 
                          : null;
                      }
                    }
                    
                    // Get selected material name
                    let materialName: string | null = null;
                    if (item.selectedMaterial && item.product.materials) {
                      const selectedMaterialObj = item.product.materials.find((m: any) => 
                        (typeof m === 'object' && m?._id === item.selectedMaterial) || 
                        (typeof m === 'string' && m === item.selectedMaterial)
                      );
                      if (selectedMaterialObj) {
                        materialName = typeof selectedMaterialObj === 'object' && selectedMaterialObj?.name 
                          ? selectedMaterialObj.name 
                          : item.selectedMaterial;
                      }
                    }

                    // Get selected tip shape name
                    let tipShapeName: string | null = null;
                    if (item.selectedTipShape && item.product.tipShapes) {
                      const selectedTipShapeObj = item.product.tipShapes.find((t: any) => 
                        (typeof t === 'object' && t?._id === item.selectedTipShape) || 
                        (typeof t === 'string' && t === item.selectedTipShape)
                      );
                      if (selectedTipShapeObj) {
                        tipShapeName = typeof selectedTipShapeObj === 'object' && selectedTipShapeObj?.name 
                          ? selectedTipShapeObj.name 
                          : item.selectedTipShape;
                      }
                    }

                    return (
                      <div key={item.product.id || item.product._id} className="flex gap-3 items-start">
                        <Image
                          src={getProductImages(item.product)[0] || '/background.png'}
                          alt={getProductName(item.product)}
                          width={64}
                          height={64}
                          className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium line-clamp-2">
                            {getProductName(item.product)}
                          </h4>
                          <div className="mt-1 space-y-1">
                            {item.product.productCode && (
                              <p className="text-xs text-muted-foreground">Product Code: {item.product.productCode}</p>
                            )}
                            {item.product.sku && (
                              <p className="text-xs text-muted-foreground">SKU: {item.product.sku}</p>
                            )}
                            <p className="text-xs text-muted-foreground">Quantity: {item.quantity}</p>
                            {(colorName || materialName || tipShapeName) && (
                              <div className="text-xs text-muted-foreground space-y-1">
                                {colorName && (
                                  <div className="flex items-center gap-1.5">
                                    <span>Color:</span>
                                    {colorValue && (
                                      <div 
                                        className="w-3 h-3 rounded-full border border-border/50" 
                                        style={{ backgroundColor: colorValue }}
                                      />
                                    )}
                                    <span>{colorName}</span>
                                  </div>
                                )}
                                {materialName && <p>Material: {materialName}</p>}
                                {tipShapeName && <p>Tip Shape: {tipShapeName}</p>}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Separator />

                <div className="bg-muted/20 border border-border rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">
                    Our team will review your quote request and contact you within 24-48 hours with pricing and availability information.
                  </p>
                </div>

                {/* Security Info */}
                <div className="mt-6 pt-4 border-t border-border">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Shield className="w-4 h-4" />
                    <span>Secure 256-bit SSL encryption</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
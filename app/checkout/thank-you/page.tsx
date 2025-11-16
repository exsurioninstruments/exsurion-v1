'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle, ShoppingBag, Mail, Phone } from 'lucide-react';
import Link from 'next/link';

const ThankYouPage = () => {
  return (
    <div className="min-h-screen bg-muted/20 flex items-center justify-center py-12">
      <div className="container-custom max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-card border border-border rounded-3xl p-8 lg:p-12 shadow-2xl text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 mb-6"
          >
            <CheckCircle className="w-12 h-12 text-green-500" />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl lg:text-4xl font-bold mb-4"
          >
            Thank You for Your Quote Request!
          </motion.h1>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-4 mb-8"
          >
            <p className="text-lg text-muted-foreground">
              We've received your quote request and our team will review it carefully.
            </p>
            <p className="text-muted-foreground">
              You can expect to hear from us within <strong>24-48 hours</strong> with pricing and availability information for your requested products.
            </p>
          </motion.div>

          {/* Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
          >
            <div className="bg-muted/50 border border-border rounded-xl p-4">
              <Mail className="w-5 h-5 text-primary mb-2 mx-auto" />
              <p className="text-sm font-medium mb-1">Email Confirmation</p>
              <p className="text-xs text-muted-foreground">
                A confirmation email has been sent to your inbox
              </p>
            </div>
            <div className="bg-muted/50 border border-border rounded-xl p-4">
              <Phone className="w-5 h-5 text-primary mb-2 mx-auto" />
              <p className="text-sm font-medium mb-1">Quick Response</p>
              <p className="text-xs text-muted-foreground">
                We'll contact you via phone or email within 24-48 hours
              </p>
            </div>
          </motion.div>

          {/* Continue Shopping Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/products">
              <Button size="lg" className="w-full sm:w-auto">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Continue Shopping
              </Button>
            </Link>
            <Link href="/">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Back to Home
              </Button>
            </Link>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 pt-8 border-t border-border"
          >
            <p className="text-sm text-muted-foreground">
              Need immediate assistance?{' '}
              <Link href="/contact" className="text-primary hover:underline font-medium">
                Contact us
              </Link>
              {' '}or reach out via our{' '}
              <Link href="/contact" className="text-primary hover:underline font-medium">
                contact form
              </Link>
              .
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ThankYouPage;




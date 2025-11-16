'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useBanners } from '@/lib/sanity/hooks';
import { transformBanner } from '@/lib/sanity/utils';

const HeroCarousel = () => {
  const { data: banners, loading, error } = useBanners();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Transform banners for backward compatibility
  const transformedBanners = Array.isArray(banners) ? banners.map(transformBanner) : [];

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying || transformedBanners.length === 0) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % transformedBanners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, transformedBanners.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % transformedBanners.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + transformedBanners.length) % transformedBanners.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  if (loading) {
    return (
      <section className="relative h-[500px] md:h-[600px] overflow-hidden bg-muted/20">
        <div className="absolute inset-0 bg-muted animate-pulse" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container-custom text-center">
            <div className="h-16 bg-muted rounded mb-4 mx-auto w-3/4 animate-pulse" />
            <div className="h-6 bg-muted rounded mb-8 mx-auto w-1/2 animate-pulse" />
            <div className="h-12 bg-muted rounded mx-auto w-48 animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  if (error || transformedBanners.length === 0) {
    return (
      <section className="relative h-[500px] md:h-[600px] overflow-hidden bg-muted/20">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container-custom text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight text-foreground">
              Professional Surgical Instruments
            </h1>
            <p className="text-lg md:text-xl mb-8 text-muted-foreground max-w-2xl mx-auto">
              Discover our comprehensive range of high-quality medical tools
            </p>
            <Link href="/products">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 py-3">
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden bg-muted/20">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <div
            className="w-full h-full bg-cover bg-center relative"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${transformedBanners[currentSlide].image})`
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="container-custom text-center text-white">
                <motion.h1
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-4xl md:text-6xl font-bold mb-4 leading-tight"
                >
                  {transformedBanners[currentSlide].headline}
                </motion.h1>
                <motion.p
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl mx-auto"
                >
                  {transformedBanners[currentSlide].subText}
                </motion.p>
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  {transformedBanners[currentSlide].buttonUrl && (
                    <Link href={transformedBanners[currentSlide].buttonUrl}>
                      <Button size="lg" className="bg-white text-black hover:bg-gray-100 font-semibold px-8 py-3">
                        {transformedBanners[currentSlide].buttonText || 'Learn More'}
                      </Button>
                    </Link>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      <Button
        variant="ghost"
        size="sm"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-2"
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-2"
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      {/* Dots indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {transformedBanners.map((_: any, index: number) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
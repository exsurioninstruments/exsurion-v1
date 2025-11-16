"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useStoreSettings } from "@/lib/sanity/hooks"
import { getImageUrl } from "@/lib/sanity/client"

// Fallback images (current images as placeholders)
const fallbackImages = [
  {
    src: "/image1.jpg",
    alt: "Medical professional using microscope",
  },
  {
    src: "/image2.jpg",
    alt: "Healthcare workers in surgery",
  },
  {
    src: "/image3.jpg",
    alt: "Modern medical equipment",
  },
  {
    src: "/image4.jpg",
    alt: "Medical research laboratory",
  },
  {
    src: "/image5.jpg",
    alt: "Healthcare innovation",
  },
  {
    src: "/image6.jpg",
    alt: "Medical collaboration",
  },
]

export function InfiniteCarousel() {
  const { data: storeSettings, loading, error } = useStoreSettings()

  // Get carousel images from Sanity or use fallback
  const carouselImages = storeSettings?.carouselImages && storeSettings.carouselImages.length > 0 
    ? storeSettings.carouselImages.map((item: any) => ({
        src: getImageUrl(item.image) || "/placeholder.svg",
        alt: item.altText || "Carousel image"
      }))
    : fallbackImages

  if (loading) {
    return (
      <div className="overflow-hidden">
        <div className="flex gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex-shrink-0 w-80 h-48 rounded-2xl overflow-hidden bg-muted animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  if (error || carouselImages.length === 0) {
    return (
      <div className="overflow-hidden">
        <div className="flex gap-6">
          <div className="flex-shrink-0 w-80 h-48 rounded-2xl overflow-hidden bg-muted flex items-center justify-center">
            <p className="text-muted-foreground">No carousel images available</p>
          </div>
        </div>
      </div>
    )
  }

  // Duplicate the images array to create seamless loop
  const duplicatedImages = [...carouselImages, ...carouselImages]

  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex gap-6"
        animate={{
          x: [0, `-${carouselImages.length * (320 + 24)}px`],
        }}
        transition={{
          x: {
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            duration: 40,
            ease: "linear",
          },
        }}
        style={{
          width: `${duplicatedImages.length * 320 + (duplicatedImages.length - 1) * 24}px`,
        }}
      >
        {duplicatedImages.map((image, index) => (
          <div key={index} className="flex-shrink-0 w-90 h-[390px] rounded-2xl overflow-hidden bg-muted">
            <Image
              src={image.src || "/background.png"}
              alt={image.alt}
              width={360}
              height={320}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

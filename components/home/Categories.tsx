"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useCategories } from "@/lib/sanity/hooks"
import { getCategoryUrl, transformCategory } from "@/lib/sanity/utils"
import { getImageUrl } from "@/lib/sanity/client"
import Link from "next/link"
import Image from "next/image"

export function CategorySection() {
  const { data: categoriesData, loading, error } = useCategories()
  const displayedCategories = Array.isArray(categoriesData) ? categoriesData.map(transformCategory).slice(0, 9) : []

  if (error) {
    return (
      <section className="bg-black text-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-red-400 text-sm sm:text-base">Failed to load categories.</p>
        </div>
      </section>
    )
  }

  if (loading) {
    return (
      <section className="bg-black text-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="h-6 sm:h-8 w-3/4 sm:w-1/2 bg-gray-800 rounded mb-3 sm:mb-4" />
          <div className="h-3 sm:h-4 w-5/6 sm:w-2/3 bg-gray-800 rounded mb-8 sm:mb-10" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="h-64 sm:h-72 md:h-80 bg-gray-800 rounded-xl sm:rounded-2xl" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (!displayedCategories.length) return null

  return (
    <section className="bg-black text-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-center items-center mb-10 sm:mb-12 md:mb-16 text-center">
          <div className="max-w-2xl text-center px-2 sm:px-0">
            <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-light mb-4 sm:mb-6 text-balance">
              Discover The Innovations We've Brought To Life
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed mb-4 sm:mb-6">
              From life-saving MedTech innovations to intuitive digital experiences, breakthrough consumer products, and
              cutting-edge industrial solutions, explore our projects.
            </p>
            <Link href="/products">
            <Button
            size="lg"
            variant="secondary"
            className="bg-gradient-to-r from-stone-100 to-orange-200 text-gray-800 hover:from-stone-200 hover:to-orange-300 ring-gray-400 rounded-lg font-medium cursor-pointer mt-2 sm:mt-4 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
          >
            Explore →
          </Button>
          </Link>
          </div>
          
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {displayedCategories.map((category, index) => (
            <motion.div
              key={`${category.id}-${index}`}
              className="h-64 sm:h-72 md:h-80 rounded-xl sm:rounded-2xl overflow-hidden relative group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
              {(() => {
                const src = typeof category.image === "string" ? category.image : getImageUrl(category.image)
                return (
                  <Image
                    src={src || "/background.png"}
                    alt={category.title || category.name || "Category"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    width={400}
                    height={320}
                  />
                )
              })()}

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6 z-20">
                <h3 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4 text-balance">{category.title}</h3>
                <Link href={getCategoryUrl(category)} className="text-orange-400 hover:text-orange-300 transition-colors border-b border-orange-400 hover:border-orange-300 pb-1 text-sm sm:text-base">
                  Explore
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

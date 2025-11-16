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
      <section className="bg-black text-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-red-400">Failed to load categories.</p>
        </div>
      </section>
    )
  }

  if (loading) {
    return (
      <section className="bg-black text-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="h-8 w-1/2 bg-gray-800 rounded mb-4" />
          <div className="h-4 w-2/3 bg-gray-800 rounded mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="h-80 bg-gray-800 rounded-2xl" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (!displayedCategories.length) return null

  return (
    <section className="bg-black text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-center items-center mb-16 text-center">
          <div className="max-w-2xl text-center">
            <h2 className="text-2xl md:text-5xl font-light mb-6 text-balance">
              Discover The Innovations We've Brought To Life
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              From life-saving MedTech innovations to intuitive digital experiences, breakthrough consumer products, and
              cutting-edge industrial solutions, explore our projects.
            </p>
            <Link href="/products">
            <Button
            size="lg"
            variant="secondary"
            className="bg-white text-black hover:bg-gray-100 rounded-lg font-medium cursor-pointer mt-4"
          >
            Explore →
          </Button>
          </Link>
          </div>
          
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedCategories.map((category, index) => (
            <motion.div
              key={`${category.id}-${index}`}
              className="h-80 rounded-2xl overflow-hidden relative group cursor-pointer"
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
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className="text-xl font-medium mb-4 text-balance">{category.title}</h3>
                <Link href={getCategoryUrl(category)} className="text-orange-400 hover:text-orange-300 transition-colors border-b border-orange-400 hover:border-orange-300 pb-1">
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

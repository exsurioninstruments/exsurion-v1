"use client"

import { Button } from "@/components/ui/button"
import { InfiniteCarousel } from "@/components/carousel"
import { useStoreSettings } from "@/lib/sanity/hooks"
import { getImageUrl } from "@/lib/sanity/client"
import Link from "next/link"

export function HeroSection() {
  const { data: storeSettings, loading, error } = useStoreSettings()

  // Fallback content (current text as placeholders)
  const fallbackContent = {
    headline: "Together, we design\ninnovations that\nshape our future",
    description: "Exsurion is a leading product development firm in North America that merges Strategy, Human Factors, Design, and Engineering to bring innovative solutions to life.",
    primaryButton: {
      text: "Explore Projects →",
      url: "/products"
    },
    secondaryButton: {
      text: "Discover Exsurion",
      url: "/about"
    }
  }

  const heroContent = storeSettings?.heroSection || fallbackContent
  const companyName = storeSettings?.companyInfo?.companyName || "Exsurion"

  if (loading) {
    return (
      <section className="min-h-screen flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-20">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="h-24 bg-muted animate-pulse rounded" />
            <div className="h-6 bg-muted animate-pulse rounded max-w-3xl mx-auto" />
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4">
              <div className="h-12 w-40 bg-muted animate-pulse rounded" />
              <div className="h-6 w-32 bg-muted animate-pulse rounded" />
            </div>
          </div>
        </div>
        <div className="pb-8">
          <InfiniteCarousel />
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen flex flex-col">
      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-3xl md:text-6xl lg:text-7xl font-light leading-tight text-balance">
            {heroContent.headline?.split('\n').map((line: string, index: number) => (
              <span key={index}>
                {line}
                {index < heroContent.headline.split('\n').length - 1 && <br />}
              </span>
            )) || fallbackContent.headline.split('\n').map((line: string, index: number) => (
              <span key={index}>
                {line}
                {index < fallbackContent.headline.split('\n').length - 1 && <br />}
              </span>
            ))}
          </h1>

          <p className="text-base md:text-xl max-w-3xl mx-auto leading-relaxed">
            {heroContent.description || fallbackContent.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4">
            <Link href={heroContent.primaryButton?.url || fallbackContent.primaryButton.url}>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-stone-100 to-orange-200 text-gray-800 hover:from-stone-200 hover:to-orange-300 px-4 py-1 text-sm font-bold rounded-full transition-all duration-300
                ring-1 ring-gray-400"
              >
                {heroContent.primaryButton?.text || fallbackContent.primaryButton.text}
              </Button>
            </Link>
            <Link href={heroContent.secondaryButton?.url || fallbackContent.secondaryButton.url}>
              <button className="transition-colors text-base font-medium bg-transparent text-white hover:bg-gradient-to-r hover:from-stone-100 hover:to-orange-200 hover:text-black outline outline-1 outline-white rounded-full px-5 py-2">
                {heroContent.secondaryButton?.text || fallbackContent.secondaryButton.text}
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Infinite carousel */}
      <div className="pb-8">
        <InfiniteCarousel />
      </div>
    </section>
  )
}

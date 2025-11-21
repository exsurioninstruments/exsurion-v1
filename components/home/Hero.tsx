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
      text: "Explore Product →",
      url: "/products"
    },
    secondaryButton: {
      text: "Discover Exsurion →",
      url: "/about"
    }
  }

  const heroContent = storeSettings?.heroSection || fallbackContent
  const companyName = storeSettings?.companyInfo?.companyName || "Exsurion"

  if (loading) {
    return (
      <section className="min-h-screen flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
          <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
            <div className="h-16 sm:h-20 md:h-24 bg-muted animate-pulse rounded" />
            <div className="h-4 sm:h-5 md:h-6 bg-muted animate-pulse rounded max-w-3xl mx-auto" />
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center pt-4">
              <div className="h-10 sm:h-12 w-32 sm:w-40 bg-muted animate-pulse rounded" />
              <div className="h-8 sm:h-10 w-28 sm:w-32 bg-muted animate-pulse rounded" />
            </div>
          </div>
        </div>
        <div className="pb-4 sm:pb-6 md:pb-8">
          <InfiniteCarousel />
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen flex flex-col">
      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 pt-6 sm:pt-8">
        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight text-balance">
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

          <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
            {heroContent.description || fallbackContent.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center pt-4 px-4 sm:px-0">
            <Link href={heroContent.primaryButton?.url || fallbackContent.primaryButton.url}>
              <Button 
                size="lg" 
                className="
                  relative group overflow-hidden 
                  bg-black 
                  ring-1 ring-black hover:ring-white 
                  text-gray-800 hover:text-black
                  px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base md:text-lg font-bold rounded-full 
                  transition-colors duration-300 w-full sm:w-auto
                "
              >
                {/* Background Gradient Span:
                  - Visible by default (scale-x-100).
                  - On Hover: It scales down to 0 (scale-x-0), revealing the transparent background.
                  - origin-left: It shrinks towards the left side (or slides out to left).
                */}
                <span 
                  className="
                    absolute inset-0 z-0 
                    bg-gradient-to-r from-stone-100 to-orange-200 
                    origin-left scale-x-100 group-hover:scale-x-0 
                    transition-transform duration-300 ease-in-out
                  " 
                />
                
                {/* Text Content (z-10 keeps it on top) */}
                <span className="relative z-10">
                  {heroContent.primaryButton?.text || fallbackContent.primaryButton.text}
                </span>
              </Button>
            </Link>
            <Link href={heroContent.secondaryButton?.url || fallbackContent.secondaryButton.url} className="w-full sm:w-auto">
              <button className="relative group overflow-hidden transition-colors text-sm sm:text-base font-medium 
              bg-transparent text-white hover:text-black outline outline-1 outline-white rounded-full 
              px-4 sm:px-5 py-2 w-full sm:w-auto">
                {/* Sliding Background Animation */}
                <span 
                  className="absolute inset-0 z-0 bg-gradient-to-r from-stone-100 to-orange-200 scale-x-0 
                  origin-left group-hover:scale-x-100 transition-transform duration-300 ease-in-out" 
                  aria-hidden="true"
                />
                
                {/* Button Text (z-10 ensures it stays on top) */}
                <span className="relative z-10">
                  {heroContent.secondaryButton?.text || fallbackContent.secondaryButton.text}
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Infinite carousel */}
      <div className="pb-4 sm:pb-6 md:pb-8">
        <InfiniteCarousel />
      </div>
    </section>
  )
}

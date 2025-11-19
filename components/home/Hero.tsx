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
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-20 pt-8">
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
                className="
                  relative group overflow-hidden 
                  bg-black 
                  ring-1 ring-black hover:ring-white 
                  text-gray-800 hover:text-black /* Text turns white on hover */
                  px-8 py-3 text-lg font-bold rounded-full 
                  transition-colors duration-300
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
            <Link href={heroContent.secondaryButton?.url || fallbackContent.secondaryButton.url}>
              <button className="relative group overflow-hidden transition-colors text-base font-medium 
              bg-transparent text-lg text-white hover:text-black outline outline-1 outline-white rounded-full 
              px-5 py-2">
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
      <div className="pb-8">
        <InfiniteCarousel />
      </div>
    </section>
  )
}

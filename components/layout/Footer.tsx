"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Facebook, Instagram, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCategories } from "@/lib/sanity/hooks"
import { transformCategory, getCategoryName, getCategoryUrl } from "@/lib/sanity/utils"
import Image from "next/image"

// Custom TikTok Icon Component
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
)

// Custom Pinterest Icon Component
const PinterestIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/>
  </svg>
)

const Footer = () => {
  const { data: categoriesData, loading: categoriesLoading } = useCategories()
  const [email, setEmail] = useState("")

  // Transform categories for backward compatibility
  const transformedCategories = Array.isArray(categoriesData) ? categoriesData.map(transformCategory) : []

  const expertiseLinks = [
    { name: "Human Factors Engineering", href: "/expertise/human-factors" },
    { name: "User Experience & User Interface Design", href: "/expertise/ux-ui" },
    { name: "Industrial Design", href: "/expertise/industrial" },
    { name: "Mechanical Engineering", href: "/expertise/mechanical" },
    { name: "Electronic Engineering", href: "/expertise/electronic" },
    { name: "Embedded Software Development", href: "/expertise/embedded" },
    { name: "Software Development", href: "/expertise/software" },
    { name: "Quality Assurance", href: "/expertise/qa" },
  ]

  const whatWeDoLinks = [
    { name: "Innovation Strategy", href: "/services/innovation" },
    { name: "Human Factors Engineering", href: "/services/human-factors" },
    { name: "Medical Device Design & Engineering", href: "/services/medical-device" },
    { name: "Medical & Healthcare Software Development", href: "/services/healthcare-software" },
    { name: "Connected Devices (IoT) & Cloud Platforms", href: "/services/iot" },
    { name: "Manufacturing Support and Sourcing", href: "/services/manufacturing" },
    { name: "Quality Assurance & Regulatory Compliance for Medical Devices", href: "/services/compliance" },
  ]

  const contentHubLinks = [
    { name: "Blog", href: "/blog" },
    { name: "Downloads & Ebooks", href: "/downloads" },
  ]

  const aboutLinks = [
    { name: "About Us", href: "/about" },
    { name: "Culture", href: "/culture" },
    { name: "Team", href: "/team" },
    { name: "Careers", href: "/careers" },
  ]

  const contactLinks = [
    { name: "Contact Us", href: "/contact" },
    { name: "Book Free Consultation", href: "/consultation" },
  ]

  const socialLinks = [
    { name: "LinkedIn",  href: "https://www.linkedin.com/in/exsurioninstruments", icon: Linkedin },
    { name: "Facebook", href: "https://www.facebook.com/exsurion.instruments/", icon: Facebook },
    { name: "Instagram", href: "https://www.instagram.com/exsurion.instruments/", icon: Instagram },
    { name: "TikTok", href: "https://www.tiktok.com/@exsurion.instruments", icon: TikTokIcon },
    { name: "Pinterest", href: "https://www.pinterest.com/exsurioninstruments", icon: PinterestIcon },
  ]

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    setEmail("")
  }

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top section with logo and newsletter */}
        {/* UPDATED THIS LINE */}
        <div className="py-12 flex flex-col lg:flex-row justify-center items-center gap-8">
          {/* Logo and certification */}
          <div className="flex items-center gap-6">
            <div className="flex items-center space-x-3">
            <Image src="/exsurion.svg" alt="Logo" width={100} height={100} className='h-16 w-full object-cover' />
            </div>
            {/* Certification badge placeholder */}
            
          </div>


        </div>

        {/* Main footer content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Expertise */}
          <div>
            <h3 className="text-lg font-semibold mb-6 ">Expertise</h3>
            <ul className="space-y-3">
              {expertiseLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors leading-relaxed"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* What We Do */}
          <div>
            <h3 className="text-lg font-semibold mb-6 ">What We Do</h3>
            <ul className="space-y-3">
              {whatWeDoLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors leading-relaxed"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="text-base font-semibold mt-8 mb-4 ">Content Hub & Insights</h4>
            <ul className="space-y-3">
              {contentHubLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-300 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* We are Exsurion */}
          <div>
            <h3 className="text-lg font-semibold mb-6 ">We are Exsurion</h3>
            <ul className="space-y-3">
              {aboutLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-300 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="text-base font-semibold mt-8 mb-4 ">Let's Talk</h4>
            <ul className="space-y-3">
              {contactLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-300 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories (keeping original functionality) */}
          <div>
            <h3 className="text-lg font-semibold mb-6 ">Categories</h3>
            {categoriesLoading ? (
              <ul className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <li key={i}>
                    <div className="h-4 w-24 bg-gray-700 animate-pulse rounded" />
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="space-y-3">
                {transformedCategories.map((category: any) => (
                  <li key={category.id || category._id}>
                    <Link
                      href={getCategoryUrl(category)}
                      className="text-sm text-gray-300 hover:text-white transition-colors"
                    >
                      {getCategoryName(category)}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Awards and certifications section */}
        <div className="py-8 border-t border-gray-800">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            {/* Awards placeholders */}
            <div className="flex items-center gap-8 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-xs font-bold text-black">CLUTCH</span>
                </div>
                <div className="text-xs text-gray-400">Top 5 Award</div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-xs font-bold text-black">GL</span>
                </div>
                <div className="text-xs text-gray-400">
                  <div>greenlight guru</div>
                  <div>TOP 5 Medical Device</div>
                  <div>Product Design Companies</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-xs font-bold text-black">GP</span>
                </div>
                <div className="text-xs text-gray-400">
                  <div>GRANDS PRIX</div>
                  <div>DU DESIGN</div>
                  <div>Platinum Award</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-xs font-bold text-black">GF</span>
                </div>
                <div className="text-xs font-bold text-white">
                  <div>  Exsurion</div>
                  <div className="bg-green-600 text-white px-2 py-1 rounded text-xs">VERIFIED</div>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">Stay Connected</span>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white-800 hover:text-white hover:bg-stone-500 transition-colors"
                  >
                    <social.icon className="w-9 h-9" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-gray-800 flex flex-col lg:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>© 2025 Exsurion – All Rights Reserved.</span>
            <span className="flex items-center gap-1">
              Made with <span className="text-red-500">❤</span> by Exsurion.
            </span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-4 h-6 bg-black dark:bg-white rounded-sm"></div>
              <span className="text-sm font-semibold">
                Achieving
                <br />
                Together
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
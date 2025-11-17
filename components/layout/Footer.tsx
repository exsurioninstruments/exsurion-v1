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
    { name: "LinkedIn", href: "#", icon: Linkedin },
    { name: "Facebook", href: "#", icon: Facebook },
    { name: "Instagram", href: "#", icon: Instagram },
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
        <div className="py-12 flex flex-col lg:flex-row justify-between items-start gap-8">
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
                <div className="text-xs font-bold text-black">
                  <div>GoodFirms</div>
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
                    className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                  >
                    <social.icon className="w-4 h-4" />
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

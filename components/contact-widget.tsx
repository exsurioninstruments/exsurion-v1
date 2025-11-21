"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useStoreSettings } from "@/lib/sanity/hooks"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { IconBrandWhatsapp } from "@tabler/icons-react"
import { Mail, PhoneCall, ShoppingCart } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { Badge } from "./ui/badge"
import axios from "axios"

export function ContactWidget() {
  const { data: storeSettings, loading } = useStoreSettings()
  const { itemCount, setIsOpen: setCartOpen } = useCart()
  const [isSidebarHidden, setIsSidebarHidden] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [showChatModal, setShowChatModal] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  })

  useEffect(() => {
    // Show tooltip animation after 2 seconds
    const timer = setTimeout(() => {
      setShowTooltip(true)
      setTimeout(() => setShowTooltip(false), 1000)
    }, 2000)

    const interval = setInterval(() => {
      setShowTooltip(true)
      setTimeout(() => setShowTooltip(false), 1000)
    }, 3000)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [])

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (submitError) {
      setSubmitError(null)
    }
    if (submitSuccess) {
      setSubmitSuccess(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)
    setSubmitSuccess(false)

    try {
      // Map name to fullName for the API
      const response = await axios.post('/api/contact', {
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        message: formData.message,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      setSubmitSuccess(true)
      setFormData({ name: "", phone: "", email: "", message: "" })
      setHoveredItem(null)
      
      // Reset success message after 3 seconds
      setTimeout(() => setSubmitSuccess(false), 3000)
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        setSubmitError(error.response.data.error)
      } else {
        setSubmitError('Failed to send message. Please try again.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleWhatsAppClick = () => {
    if (!storeSettings?.whatsappNumber) return
    // Clean the phone number (remove any spaces or special characters except +)
    const cleanedNumber = storeSettings.whatsappNumber.replace(/[^\d+]/g, '')
    // Create WhatsApp URL with the phone number
    const whatsappUrl = `https://wa.me/${cleanedNumber}`
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank')
  }

  // Don't render if loading or no WhatsApp number
  if (loading || !storeSettings?.whatsappNumber) {
    return null
  }

  // Format phone number for display (use WhatsApp number as fallback for phone)
  const displayPhone = storeSettings.whatsappNumber
  const cleanedPhone = displayPhone.replace(/[^\d+]/g, '')

  return (
    <div>
      {/* Toggle Arrow Button */}
      <button
        onClick={() => setIsSidebarHidden(!isSidebarHidden)}
        className={`fixed right-0 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-white rounded-l-xl sm:rounded-l-2xl flex items-center justify-center z-10 hover:bg-gray-200 active:bg-gray-300 transition-all ${isSidebarHidden ? "translate-x-0" : ""}`}
        aria-label="Toggle contact widget"
      >
        <svg
          className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 fill-black transition-transform ${isSidebarHidden ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
        >
          <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
        </svg>
      </button>

      {/* Sidebar Wrapper */}
      <div
        className={`fixed right-0 bottom-16 sm:bottom-24 md:bottom-32 lg:bottom-60 z-40 flex flex-col transition-all duration-300 ${
          isSidebarHidden 
            ? "translate-x-full sm:translate-x-64 md:translate-x-72" 
            : "translate-x-0"
        }`}
      >
        {/* Contact Tab - CONTACT US Form Slide Out */}
        <div 
          onMouseEnter={() => setHoveredItem("form")} 
          onMouseLeave={() => setHoveredItem(null)} 
          onClick={() => setHoveredItem(hoveredItem === "form" ? null : "form")}
          className="relative"
        >
          <div className="bg-gray-100 text-white w-12 h-28 sm:w-14 sm:h-32 md:w-16 md:h-36 lg:w-16 lg:h-40 cursor-pointer flex flex-col items-center justify-center gap-1.5 sm:gap-2 md:gap-2.5 hover:bg-gray-300 active:bg-gray-400 transition-all rounded-tl-xl sm:rounded-tl-2xl">
            <svg className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 fill-black -rotate-90" viewBox="0 0 24 24">
              <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
            </svg>
            <span className="text-black text-xs sm:text-xs md:text-sm font-semibold tracking-wider sm:tracking-widest" style={{ writingMode: "vertical-rl" }}>
              CONTACT US
            </span>
          </div>

          <div
            className={`absolute right-12 sm:right-16 md:right-20 top-0 w-[calc(100vw-4rem)] sm:w-80 md:w-96 max-w-[calc(100vw-2rem)] sm:max-w-none bg-white rounded-l-xl sm:rounded-l-2xl shadow-2xl transition-all duration-300 origin-right ${
              hoveredItem === "form" ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full sm:translate-x-96 pointer-events-none"
            }`}
          >
            <div className="p-4 sm:p-6 md:p-8">
              <div className="mb-4 sm:mb-5 md:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">Contact Form</h2>
                <p className="text-xs sm:text-sm text-gray-600">We endeavour to answer all enquiries within 24 hours</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Name*"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 sm:px-5 py-2.5 sm:py-3 border-2 border-gray-300 rounded-2xl sm:rounded-3xl text-sm text-black focus:outline-none focus:border-purple-500 transition-colors disabled:opacity-50"
                  />
                </div>

                <div>
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="Phone*"
                    value={formData.phone}
                    onChange={handleFormChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 sm:px-5 py-2.5 sm:py-3 border-2 border-gray-300 rounded-2xl sm:rounded-3xl text-sm text-black focus:outline-none focus:border-purple-500 transition-colors disabled:opacity-50"
                  />
                </div>

                <div>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email*"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 sm:px-5 py-2.5 sm:py-3 border-2 border-gray-300 rounded-2xl sm:rounded-3xl text-sm text-black focus:outline-none focus:border-purple-500 transition-colors disabled:opacity-50"
                  />
                </div>

                <div>
                  <Textarea
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleFormChange}
                    rows={4}
                    disabled={isSubmitting}
                    className="w-full px-4 sm:px-5 py-2.5 sm:py-3 border-2 border-gray-300 rounded-xl sm:rounded-2xl text-sm text-black focus:outline-none focus:border-purple-500 transition-colors resize-none disabled:opacity-50"
                  />
                </div>

                {submitSuccess && (
                  <div className="p-2.5 sm:p-3 bg-green-50 border border-green-200 rounded-lg sm:rounded-xl text-xs sm:text-sm text-green-800">
                    Thank you for your message! We will get back to you within 24 hours.
                  </div>
                )}

                {submitError && (
                  <div className="p-2.5 sm:p-3 bg-red-50 border border-red-200 rounded-lg sm:rounded-xl text-xs sm:text-sm text-red-800">
                    {submitError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-2.5 sm:py-3 rounded-2xl sm:rounded-3xl transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Social Icons with Hover Slide Out */}
        <div className="relative flex flex-col">
          

          {/* Phone */}
          <div
            onMouseEnter={() => setHoveredItem("phone")}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => setHoveredItem(hoveredItem === "phone" ? null : "phone")}
            className="relative"
          >
            <a
              href={`tel:${cleanedPhone}`}
              className="w-12 h-14 sm:w-14 sm:h-16 md:w-16 md:h-20 bg-black hover:bg-gray-800 active:bg-gray-900 flex items-center justify-center transition-all"
            >
              <PhoneCall className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0 text-white" />
            </a>

            <div
              className={`absolute right-12 sm:right-16 md:right-20 top-1/2 -translate-y-1/2 bg-white px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl shadow-2xl whitespace-nowrap transition-all duration-300 origin-right ${
                hoveredItem === "phone" ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full sm:translate-x-96 pointer-events-none"
              }`}
            >
              <p className="text-gray-800 font-semibold text-xs sm:text-sm">Phone: {displayPhone}</p>
            </div>
          </div>

          {/* Cart */}
          <div
            onMouseEnter={() => setHoveredItem("cart")}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => setHoveredItem(hoveredItem === "cart" ? null : "cart")}
            className="relative"
          >
            <button
              onClick={() => setCartOpen(true)}
              className="w-12 h-14 sm:w-14 sm:h-16 md:w-16 md:h-20 bg-gray-100 hover:bg-gray-300 active:bg-gray-400 flex items-center justify-center transition-all relative"
            >
              <ShoppingCart className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-black flex-shrink-0" />
              {itemCount > 0 && (
                <Badge className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 md:top-2 md:right-2 h-4 w-4 sm:h-4 sm:w-4 md:h-5 md:w-5 p-0 flex items-center justify-center text-[10px] sm:text-xs bg-white text-black border-0">
                  {itemCount}
                </Badge>
              )}
            </button>

            <div
              className={`absolute right-12 sm:right-16 md:right-20 top-1/2 -translate-y-1/2 bg-white px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl shadow-2xl whitespace-nowrap transition-all duration-300 origin-right ${
                hoveredItem === "cart"
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-full sm:translate-x-96 pointer-events-none"
              }`}
            >
              <p className="text-black font-semibold text-xs sm:text-sm">
                Cart {itemCount > 0 && `(${itemCount} item${itemCount > 1 ? 's' : ''})`}
              </p>
            </div>
          </div>

          {/* Email */}
          <div
            onMouseEnter={() => setHoveredItem("email")}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => setHoveredItem(hoveredItem === "email" ? null : "email")}
            className="relative"
          >
            <a
              href="mailto:info@example.com"
              className="w-12 h-14 sm:w-14 sm:h-16 md:w-16 md:h-20 bg-red-500 hover:bg-red-600 active:bg-red-700 flex items-center justify-center transition-all rounded-bl-xl sm:rounded-bl-2xl"
            >
              <Mail className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0 text-white" /> 
            </a>

            <div
              className={`absolute right-12 sm:right-16 md:right-20 top-1/2 -translate-y-1/2 bg-white px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl shadow-2xl whitespace-nowrap transition-all duration-300 origin-right ${
                hoveredItem === "email" ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full sm:translate-x-96 pointer-events-none"
              }`}
            >
              <p className="text-gray-800 font-semibold text-xs sm:text-sm break-all sm:break-normal">Email: exsurion.instruments@gmail.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Widget Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-20 z-40">
        <Button
          onClick={() => setShowChatModal(!showChatModal)}
          className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-20 lg:h-20 rounded-full bg-green-500 hover:bg-green-600 active:bg-green-700 flex items-center justify-center shadow-2xl transition-all animate-pulse"
        >
          <div
            className={`absolute right-16 sm:right-20 md:right-24 lg:right-28 top-1/2 -translate-y-1/2 bg-white px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-full shadow-lg whitespace-nowrap text-xs sm:text-sm font-semibold transition-all hidden sm:block ${
              showTooltip ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
            }`}
          >
            <span className="text-gray-800">
              Need Help? <span className="text-green-500">Chat with us</span>
            </span>
          </div>

          <IconBrandWhatsapp className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 fill-white" />
        </Button>

        {/* Chat Modal Backdrop */}
        {showChatModal && <div className="fixed inset-0 bg-black/30 z-30" onClick={() => setShowChatModal(false)} />}

        {/* Chat Modal */}
        <div
          className={`absolute bottom-16 sm:bottom-20 md:bottom-24 lg:bottom-28 right-0 bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-5 w-[calc(100vw-2rem)] sm:w-64 md:w-72 max-w-sm transition-all transform origin-bottom-right z-40 ${
            showChatModal ? "scale-100 opacity-100" : "scale-90 opacity-0 pointer-events-none"
          }`}
        >
          <div className="text-center text-xs sm:text-sm font-semibold text-gray-900 mb-3 sm:mb-4">Choose Chat Option</div>

          {/* WhatsApp Option */}
          <button
            onClick={() => {
              handleWhatsAppClick()
              setShowChatModal(false)
            }}
            className="w-full flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 mb-2 sm:mb-3 border-2 border-gray-300 rounded-lg sm:rounded-xl hover:border-green-500 hover:bg-green-50 active:bg-green-100 transition-all cursor-pointer"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
              <IconBrandWhatsapp className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 fill-white" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-900 text-xs sm:text-sm">Chat on WhatsApp</p>
              <p className="text-[10px] sm:text-xs text-gray-600">Start conversation instantly</p>
            </div>
          </button>

          
        </div>
      </div>
    </div>
  )
}

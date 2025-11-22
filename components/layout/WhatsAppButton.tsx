'use client';

import { useStoreSettings } from '@/lib/sanity/hooks';
import { ChevronLeft, Mail, MessageCircle, MessageCircleMore, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

export default function WhatsAppButton() {
  const { data: storeSettings, loading } = useStoreSettings();
  const [isVisible, setIsVisible] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" })

  // Show button after a delay for a smooth entrance effect
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading || !storeSettings?.whatsappNumber) {
    return null;
  }

  const handleWhatsAppClick = () => {
    // Clean the phone number (remove any spaces or special characters except +)
    const cleanedNumber = storeSettings.whatsappNumber.replace(/[^\d+]/g, '');
    
    // Create WhatsApp URL with the phone number
    const whatsappUrl = `https://wa.me/${cleanedNumber}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Contact form submitted:", formData)
    setFormData({ name: "", phone: "", email: "", message: "" })
    setShowEmailForm(false)
  }

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Main contact buttons container */}
      <div className="flex flex-col items-center gap-3">
        <div className="flex flex-col items-center gap-3 bg-white p-4 rounded">
        {/* Back arrow button */}
        <button className="flex items-center justify-center w-10 h-10 bg-gray-700 hover:bg-gray-800 text-white rounded-full shadow-lg transition-all duration-300">
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Contact Us text vertical */}
        <div className="flex items-center justify-center h-16">
          <span
            className="text-xs font-bold text-gray-700 tracking-wider"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            CONTACT US
          </span>
        </div>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setShowEmailForm(true)}
          onMouseLeave={() => setShowEmailForm(false)}
        >
          {/* Contact form - positioned above the email button */}
          <div
            className={`absolute bottom-6 right-0 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 p-6 transition-all duration-300 ${
              showEmailForm
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900">Contact Form</h3>
              <button onClick={() => setShowEmailForm(false)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-4">We endeavor to answer all inquiries within 24 hours</p>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Name*</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Email*</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Message*</label>
                <textarea
                  placeholder="Enter your message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={4}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-full transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Email button */}
          <button className="flex items-center justify-center w-12 h-12 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
            <Mail className="w-6 h-6" />
          </button>
        </div>

        {/* WhatsApp button with popover */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={"ghost"} size={"icon"} >
              <MessageCircle className="w-12" style={{ height: '80px', width: '48px' }} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-72 p-0">
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-4 text-center">Choose Chat Option</h4>
              <div className="space-y-2">
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full flex items-center gap-3 p-3 hover:bg-green-50 rounded-lg border border-gray-200 hover:border-green-300 transition-colors"
                >
                  <div className="flex items-center justify-center w-10 h-10 bg-green-500 text-white rounded-full">
                    <MessageCircle className="w-8 h-8" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Chat on WhatsApp</p>
                    <p className="text-xs text-gray-500">Start a conversation</p>
                  </div>
                </button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}




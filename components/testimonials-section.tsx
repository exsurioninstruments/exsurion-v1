"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { AnimatedTestimonialsDemo } from "./testimonials"

const testimonials = [
  {
    id: 1,
    text: "Working with Exsurion has been an outstanding experience. Their seamless integration with our internal resources has greatly enhanced our approach to product design, always prioritizing the patient and their unique needs. The team's exceptional communication, effective project management, and technical expertise across the board have made every collaboration smooth and impactful. Exsurion's ability to bring innovative solutions while maintaining efficiency has truly set them apart, making them an invaluable partner in our efforts to create meaningful, patient-centric designs.",
    author: "Jenna B.",
    role: "Director of Engineering",
    avatar: "/image1.jpg",
  },
  {
    id: 2,
    text: "With the support of Exsurion, we are more confident than ever in the decisions made. All members of the Exsurion team are great experts and professionals, covering a broad spectrum of aspects that a medical device project needs. They approach their work with pleasure, dedication, and motivation.",
    author: "Dumitru L.",
    role: "Technical Director",
    avatar: "/image2.jpg",
  },
  {
    id: 3,
    text: "Exsurion's innovative approach to medical device development has transformed our product pipeline. Their deep understanding of regulatory requirements and user-centered design principles has been instrumental in bringing our vision to life.",
    author: "Sarah M.",
    role: "VP of Product Development",
    avatar: "/image3.jpg",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isDragging) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
      }, 6000)
      return () => clearInterval(timer)
    }
  }, [isDragging])

  return (
    <section className=" py-20 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative h-[600px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 h-full">
          {/* Left Column - Static Content */}
          <div className="flex flex-col justify-center">
            <div className="inline-block bg-white text-black px-4 py-2 rounded-full text-sm font-medium mb-8 w-fit">
              TESTIMONIALS
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-balance mb-8">
              What Our 300+ Partners Say About Us
            </h2>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-2">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
                <Star className="w-6 h-6 fill-yellow-400/50 text-yellow-400" />
              </div>
              <p className="text-lg text-gray-300">4.6 / 5 Stars Customer Satisfaction Rating</p>
            </div>

            <div className="flex gap-6">
              <div className="bg-white p-4 rounded-lg">
                <img src="/image1.jpg" alt="Clutch Award" className="h-16 w-auto" />
              </div>
              <div className="bg-white p-4 rounded-lg">
                <img src="/image2.jpg" alt="Greenlight Guru Award" className="h-16 w-auto" />
              </div>
            </div>
          </div>

          {/* Right Column - Animated Testimonials */}
          <div className="flex items-center justify-center w-full my-auto">
            <AnimatedTestimonialsDemo />
          </div>
        </div>
      </div>
    </section>
  )
}
